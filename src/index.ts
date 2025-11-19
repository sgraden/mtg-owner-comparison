import { html } from './html';

interface CardData {
  name: string;
  count: number;
}

interface UploadedList {
  uploaderName: string;
  cards: CardData[];
  uploadedAt: string;
}

interface StorageData {
  primaryList: CardData[];
  uploadedLists: UploadedList[];
}

// In-memory storage for local development
let memoryStorage: StorageData = { primaryList: [], uploadedLists: [] };

// Helper to get storage data
async function getStorageData(env: any): Promise<StorageData> {
  try {
    // Try to use R2 storage if available
    if (env.STORAGE) {
      const data = await env.STORAGE.get('mtg-data');
      if (data) {
        return JSON.parse(data);
      }
    }
  } catch (error) {
    console.error('R2 storage error:', error);
  }
  
  // Fallback to in-memory storage for local development
  return memoryStorage;
}

// Helper to save storage data
async function saveStorageData(env: any, data: StorageData): Promise<void> {
  // Always update in-memory storage
  memoryStorage = JSON.parse(JSON.stringify(data));
  
  // Try to save to R2 if available
  try {
    if (env.STORAGE) {
      await env.STORAGE.put('mtg-data', JSON.stringify(data));
    }
  } catch (error) {
    console.error('R2 storage error:', error);
  }
}

// Parse CSV or line-separated list
function parseCardList(content: string): CardData[] {
  const lines = content.split('\n').map(line => line.trim()).filter(line => line);
  const cardCounts: { [key: string]: number } = {};
  
  for (const line of lines) {
    // Handle CSV format (name, quantity) or just names
    const parts = line.split(',').map(p => p.trim());
    const cardName = parts[0];
    const quantity = parseInt(parts[1]) || 1;
    
    if (cardName) {
      cardCounts[cardName] = (cardCounts[cardName] || 0) + quantity;
    }
  }
  
  return Object.entries(cardCounts).map(([name, count]) => ({ name, count }));
}

// Route handler
async function handleRequest(request: Request, env: any): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const method = request.method;

  // API: Upload primary list
  if (pathname === '/api/upload-primary' && method === 'POST') {
    try {
      const formData = await request.formData();
      const file = formData.get('file') as File;
      
      if (!file) {
        return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
      }
      
      const content = await file.text();
      const primaryList = parseCardList(content);
      
      const data = await getStorageData(env);
      data.primaryList = primaryList;
      await saveStorageData(env, data);
      
      return new Response(JSON.stringify({ success: true, count: primaryList.length }));
    } catch (error) {
      return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
    }
  }

  // API: Upload owned list
  if (pathname === '/api/upload-owned' && method === 'POST') {
    try {
      const formData = await request.formData();
      const file = formData.get('file') as File;
      const uploaderName = formData.get('uploaderName') as string;
      
      if (!file || !uploaderName) {
        return new Response(JSON.stringify({ error: 'File and uploader name required' }), { status: 400 });
      }
      
      const content = await file.text();
      const cards = parseCardList(content);
      
      const data = await getStorageData(env);
      
      // Remove existing list from same uploader
      data.uploadedLists = data.uploadedLists.filter(list => list.uploaderName !== uploaderName);
      
      // Add new list
      data.uploadedLists.push({
        uploaderName,
        cards,
        uploadedAt: new Date().toISOString()
      });
      
      await saveStorageData(env, data);
      
      return new Response(JSON.stringify({ success: true, count: cards.length }));
    } catch (error) {
      return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
    }
  }

  // API: Get all data
  if (pathname === '/api/data' && method === 'GET') {
    const data = await getStorageData(env);
    return new Response(JSON.stringify(data), {
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }

  // API: Delete owned list
  if (pathname.startsWith('/api/list/') && method === 'DELETE') {
    try {
      const uploaderName = decodeURIComponent(pathname.replace('/api/list/', ''));
      const data = await getStorageData(env);
      
      data.uploadedLists = data.uploadedLists.filter(list => list.uploaderName !== uploaderName);
      await saveStorageData(env, data);
      
      return new Response(JSON.stringify({ success: true }));
    } catch (error) {
      return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
    }
  }

  // API: Delete primary list
  if (pathname === '/api/primary' && method === 'DELETE') {
    try {
      const data = await getStorageData(env);
      data.primaryList = [];
      await saveStorageData(env, data);
      
      return new Response(JSON.stringify({ success: true }));
    } catch (error) {
      return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
    }
  }

  // Serve HTML
  if (pathname === '/' && method === 'GET') {
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }

  return new Response('Not Found', { status: 404 });
}

export default {
  fetch: handleRequest
};
