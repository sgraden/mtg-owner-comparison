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

interface PrimaryList {
  name: string;
  cards: CardData[];
  uploadedAt: string;
}

interface StorageData {
  primaryLists: PrimaryList[];
  uploadedLists: UploadedList[];
}

// In-memory storage for local development
let memoryStorage: StorageData = { primaryLists: [], uploadedLists: [] };

// Helper to get storage data
async function getStorageData(env: any): Promise<StorageData> {
  // Always try R2 first (production)
  if (env.STORAGE) {
    try {
      const result = await env.STORAGE.get('mtg-data');
      if (result) {
        // R2 returns a GetResult object, need to call .text() to get the string
        const jsonString = await result.text();
        const parsed = JSON.parse(jsonString);
        console.log('Data loaded from R2:', { primaryLists: parsed.primaryLists.length, uploadedLists: parsed.uploadedLists.length });
        return parsed;
      } else {
        // No data in R2 yet, return empty
        console.log('No data in R2 yet, returning empty');
        return { primaryLists: [], uploadedLists: [] };
      }
    } catch (error) {
      console.error('R2 storage error:', error);
      // Fall back to in-memory only if R2 fails
      return memoryStorage;
    }
  }
  
  // Fallback to in-memory storage for local development
  return memoryStorage;
}

// Helper to save storage data
async function saveStorageData(env: any, data: StorageData): Promise<void> {
  // Always update in-memory storage as backup
  memoryStorage = JSON.parse(JSON.stringify(data));
  
  // Always try to save to R2 (production)
  if (env.STORAGE) {
    try {
      const jsonData = JSON.stringify(data);
      await env.STORAGE.put('mtg-data', jsonData);
      console.log('Data saved to R2:', { primaryCards: data.primaryList.length, uploadedLists: data.uploadedLists.length });
    } catch (error) {
      console.error('R2 storage error:', error);
      // If R2 fails, at least in-memory is updated
    }
  } else {
    console.log('No R2 storage available, using in-memory only');
  }
}

// Sanitize card name by removing quotes and other problematic characters
function sanitizeCardName(name: string): string {
  return name
    .trim()
    // Remove leading/trailing quotes (single, double, backticks)
    .replace(/^["'`]+|["'`]+$/g, '')
    // Remove other problematic characters from start/end
    .replace(/^[\s\-_:;,|()[\]{}]+|[\s\-_:;,|()[\]{}]+$/g, '')
    .trim();
}

// Parse CSV or line-separated list
function parseCardList(content: string): CardData[] {
  const lines = content.split('\n').map(line => line.trim()).filter(line => line);
  const cardCounts: { [key: string]: number } = {};
  
  for (const line of lines) {
    // Handle CSV format (name, quantity) or just names
    const parts = line.split(',').map(p => p.trim());
    let cardName = parts[0];
    const quantity = parseInt(parts[1]) || 1;
    
    // Sanitize the card name
    cardName = sanitizeCardName(cardName);
    
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
      const cards = parseCardList(content);
      
      const data = await getStorageData(env);
      // Append new primary list instead of replacing
      data.primaryLists.push({
        name: file.name,
        cards: cards,
        uploadedAt: new Date().toISOString()
      });
      await saveStorageData(env, data);
      
      return new Response(JSON.stringify({ success: true, count: cards.length }));
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

  // API: Delete primary list(s)
  if (pathname.startsWith('/api/primary') && method === 'DELETE') {
    try {
      const data = await getStorageData(env);
      const primaryName = decodeURIComponent(pathname.replace('/api/primary/', ''));
      
      if (primaryName === '') {
        // Delete all primary lists
        data.primaryLists = [];
      } else {
        // Delete specific primary list by name
        data.primaryLists = data.primaryLists.filter(list => list.name !== primaryName);
      }
      
      await saveStorageData(env, data);
      
      return new Response(JSON.stringify({ success: true }));
    } catch (error) {
      return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
    }
  }

  // API: Get card price from Card Kingdom
  if (pathname.startsWith('/api/price/') && method === 'GET') {
    try {
      const cardName = decodeURIComponent(pathname.replace('/api/price/', ''));
      
      // Card Kingdom's public API doesn't provide pricing via search
      // Return null for now - this feature would require their paid API or web scraping
      return new Response(JSON.stringify({ price: null }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error fetching price:', error);
      return new Response(JSON.stringify({ price: null, error: String(error) }), {
        headers: { 'Content-Type': 'application/json' }
      });
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
