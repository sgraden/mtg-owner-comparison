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

interface NeededCardsList {
  name: string;
  cards: CardData[];
  uploadedAt: string;
}

interface GivingEntry {
  quantity: number;
  givenBy: string;
  givenFromList: string;
}

interface CardOwnershipStatus {
  cardName: string;
  neededCount: number;
  
  // Purchase tracking
  purchasedCount: number;
  purchasedBy?: string;
  
  // Giving tracking (supports multiple givers)
  givingEntries: GivingEntry[];
  
  // Metadata
  statusUpdatedAt: string;
  neededCountUpdatedAt?: string;
  flagged?: boolean;
}

interface StorageData {
  primaryLists: NeededCardsList[];
  uploadedLists: UploadedList[];
  ownershipStatuses: CardOwnershipStatus[];
}

// In-memory storage for local development
let memoryStorage: StorageData = { primaryLists: [], uploadedLists: [], ownershipStatuses: [] };

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
        // Data migration: ensure ownershipStatuses exists
        if (!parsed.ownershipStatuses) {
          parsed.ownershipStatuses = [];
        }
        console.log('Data loaded from R2:', { primaryLists: parsed.primaryLists.length, uploadedLists: parsed.uploadedLists.length, ownershipStatuses: parsed.ownershipStatuses.length });
        return parsed;
      } else {
        // No data in R2 yet, return empty
        console.log('No data in R2 yet, returning empty');
        return { primaryLists: [], uploadedLists: [], ownershipStatuses: [] };
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
      console.log('Data saved to R2:', { neededCards: data.primaryLists.length, uploadedLists: data.uploadedLists.length });
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
    // Remove only leading/trailing whitespace and dashes, not commas or other punctuation
    .replace(/^[\s\-_]+|[\s\-_]+$/g, '')
    .trim();
}

// Parse CSV or line-separated list
function parseCardList(content: string): CardData[] {
  const lines = content.split('\n').map(line => line.trim()).filter(line => line);
  const cardCounts: { [key: string]: number } = {};
  
  for (const line of lines) {
    let cardName = '';
    let quantity = 1;
    
    // Try to match CSV format: "cardname,quantity" (e.g., "Black Lotus,2")
    const csvMatch = line.match(/^(.+),(\d+)$/);
    if (csvMatch) {
      cardName = csvMatch[1].trim();
      quantity = parseInt(csvMatch[2]);
    } else {
      // Try to match format: "quantity cardname" (e.g., "2 Black Lotus")
      const quantityMatch = line.match(/^(\d+)\s+(.+)$/);
      if (quantityMatch) {
        quantity = parseInt(quantityMatch[1]);
        cardName = quantityMatch[2];
      } else {
        // Otherwise treat the whole line as a card name
        cardName = line;
      }
    }
    
    // Sanitize the card name
    cardName = sanitizeCardName(cardName);
    
    if (cardName) {
      cardCounts[cardName] = (cardCounts[cardName] || 0) + quantity;
    }
  }
  
  return Object.entries(cardCounts).map(([name, count]) => ({ name, count }));
}

// Helper: Get all card names from needed lists
function getAllNeededCardNames(primaryLists: NeededCardsList[]): Set<string> {
  const names = new Set<string>();
  for (const list of primaryLists) {
    for (const card of list.cards) {
      names.add(card.name);
    }
  }
  return names;
}

// Helper: Identify orphaned ownership statuses
function getOrphanedStatuses(statuses: CardOwnershipStatus[], neededCardNames: Set<string>): CardOwnershipStatus[] {
  return statuses.filter(status => !neededCardNames.has(status.cardName));
}

// Helper: Check if card needs count has changed
function checkAndFlagCardChanges(statuses: CardOwnershipStatus[], primaryLists: NeededCardsList[]): CardOwnershipStatus[] {
  const cardNeededCounts = new Map<string, number>();
  
  // Build current needed counts
  for (const list of primaryLists) {
    for (const card of list.cards) {
      cardNeededCounts.set(card.name, (cardNeededCounts.get(card.name) || 0) + card.count);
    }
  }
  
  // Check each status and flag if needed count changed
  return statuses.map(status => {
    const currentNeeded = cardNeededCounts.get(status.cardName) || 0;
    const hasChanged = currentNeeded !== status.neededCount;
    return {
      ...status,
      flagged: hasChanged,
      neededCountUpdatedAt: hasChanged ? new Date().toISOString() : status.neededCountUpdatedAt
    };
  });
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

  // API: Save backup (from local mode)
  if (pathname === '/api/backup' && method === 'POST') {
    try {
      const data = await request.json() as StorageData;
      await saveStorageData(env, data);
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
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

  // API: Get ownership statuses with flagging
  if (pathname === '/api/ownership-status/statuses' && method === 'GET') {
    try {
      const data = await getStorageData(env);
      const neededCardNames = getAllNeededCardNames(data.primaryLists);
      let statuses = checkAndFlagCardChanges(data.ownershipStatuses, data.primaryLists);
      
      return new Response(JSON.stringify({
        statuses: statuses,
        orphaned: getOrphanedStatuses(statuses, neededCardNames)
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
    }
  }

  // API: Update single ownership status
  if (pathname === '/api/ownership-status/update' && method === 'POST') {
    try {
      const body = await request.json() as Partial<CardOwnershipStatus>;
      const data = await getStorageData(env);
      
      if (!body.cardName) {
        return new Response(JSON.stringify({ error: 'cardName required' }), { status: 400 });
      }
      
      // Find or create status entry
      let status = data.ownershipStatuses.find(s => s.cardName === body.cardName);
      if (!status) {
        status = {
          cardName: body.cardName,
          neededCount: body.neededCount || 0,
          purchasedCount: body.purchasedCount || 0,
          purchasedBy: body.purchasedBy,
          givingEntries: body.givingEntries || [],
          statusUpdatedAt: new Date().toISOString()
        };
        data.ownershipStatuses.push(status);
      } else {
        // Update existing status
        if (body.purchasedCount !== undefined) status.purchasedCount = body.purchasedCount;
        if (body.purchasedBy !== undefined) status.purchasedBy = body.purchasedBy;
        // Handle giving entries
        if (body.givingEntries !== undefined) {
          status.givingEntries = body.givingEntries;
        }
        if (body.neededCount !== undefined) status.neededCount = body.neededCount;
        status.statusUpdatedAt = new Date().toISOString();
      }
      
      await saveStorageData(env, data);
      return new Response(JSON.stringify({ success: true, status }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
    }
  }

  // API: Bulk update ownership statuses
  if (pathname === '/api/ownership-status/bulk-update' && method === 'POST') {
    try {
      const body = await request.json() as { cardNames: string[], update: Partial<CardOwnershipStatus> };
      const data = await getStorageData(env);
      
      if (!body.cardNames || !Array.isArray(body.cardNames)) {
        return new Response(JSON.stringify({ error: 'cardNames array required' }), { status: 400 });
      }
      
      let updated = 0;
      for (const cardName of body.cardNames) {
        let status = data.ownershipStatuses.find(s => s.cardName === cardName);
        if (!status) {
          status = {
            cardName: cardName,
            neededCount: body.update.neededCount || 0,
            purchasedCount: body.update.purchasedCount || 0,
            purchasedBy: body.update.purchasedBy,
            givingEntries: body.update.givingEntries || [],
            statusUpdatedAt: new Date().toISOString()
          };
          data.ownershipStatuses.push(status);
        } else {
          if (body.update.purchasedCount !== undefined) status.purchasedCount = body.update.purchasedCount;
          if (body.update.purchasedBy !== undefined) status.purchasedBy = body.update.purchasedBy;
          if (body.update.givingEntries !== undefined) status.givingEntries = body.update.givingEntries;
          status.statusUpdatedAt = new Date().toISOString();
        }
        updated++;
      }
      
      await saveStorageData(env, data);
      return new Response(JSON.stringify({ success: true, updated }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
    }
  }

  // API: Delete ownership status
  if (pathname.startsWith('/api/ownership-status/') && method === 'DELETE') {
    try {
      const cardName = decodeURIComponent(pathname.replace('/api/ownership-status/', ''));
      const data = await getStorageData(env);
      
      if (cardName === 'orphaned/all') {
        // Delete all orphaned statuses
        const neededCardNames = getAllNeededCardNames(data.primaryLists);
        data.ownershipStatuses = data.ownershipStatuses.filter(s => neededCardNames.has(s.cardName));
      } else {
        // Delete specific status
        data.ownershipStatuses = data.ownershipStatuses.filter(s => s.cardName !== cardName);
      }
      
      await saveStorageData(env, data);
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
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
