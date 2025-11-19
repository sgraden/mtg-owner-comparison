export const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MTG Card Comparison</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    header {
      background: white;
      border-radius: 12px;
      padding: 30px;
      margin-bottom: 30px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    h1 {
      color: #333;
      margin-bottom: 10px;
      font-size: 2.5em;
    }

    .subtitle {
      color: #666;
      font-size: 1.1em;
    }

    .main-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-bottom: 30px;
    }

    .card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .card h2 {
      color: #333;
      margin-bottom: 20px;
      font-size: 1.5em;
      border-bottom: 3px solid #667eea;
      padding-bottom: 10px;
    }

    .upload-section {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .upload-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    label {
      color: #333;
      font-weight: 600;
      font-size: 0.95em;
    }

    input[type="text"],
    input[type="file"] {
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1em;
      transition: border-color 0.3s;
    }

    input[type="text"]:focus,
    input[type="file"]:focus {
      outline: none;
      border-color: #667eea;
    }

    button {
      padding: 12px 20px;
      border: none;
      border-radius: 8px;
      font-size: 1em;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-primary {
      background: #667eea;
      color: white;
    }

    .btn-primary:hover {
      background: #5568d3;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    .btn-secondary {
      background: #f0f0f0;
      color: #333;
    }

    .btn-secondary:hover {
      background: #e0e0e0;
    }

    .btn-danger {
      background: #ff6b6b;
      color: white;
    }

    .btn-danger:hover {
      background: #ee5a52;
    }

    .btn-small {
      padding: 8px 12px;
      font-size: 0.9em;
    }

    .status-message {
      padding: 12px;
      border-radius: 8px;
      margin-top: 10px;
      display: none;
    }

    .status-message.success {
      background: #d4edda;
      color: #155724;
      display: block;
    }

    .status-message.error {
      background: #f8d7da;
      color: #721c24;
      display: block;
    }

    .lists-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-height: 400px;
      overflow-y: auto;
    }

    .list-item {
      background: #f8f9fa;
      padding: 12px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-left: 4px solid #667eea;
    }

    .list-item-name {
      font-weight: 600;
      color: #333;
    }

    .list-item-count {
      color: #666;
      font-size: 0.9em;
    }

    .comparison-section {
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .comparison-section h2 {
      color: #333;
      margin-bottom: 20px;
      font-size: 1.5em;
      border-bottom: 3px solid #667eea;
      padding-bottom: 10px;
    }

    .controls {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
      flex-wrap: wrap;
      align-items: center;
    }

    .filter-group {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .filter-group label {
      margin: 0;
      font-weight: 600;
      color: #333;
    }

    .filter-group select {
      padding: 8px 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 0.95em;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
      margin-bottom: 20px;
    }

    .card-item {
      background: #f8f9fa;
      border-radius: 8px;
      overflow: hidden;
      border: 2px solid #e0e0e0;
      transition: all 0.3s;
    }

    .card-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      border-color: #667eea;
    }

    .card-image {
      width: 100%;
      height: 280px;
      background: #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      font-size: 0.9em;
      text-align: center;
      padding: 10px;
    }

    .card-image img {
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
    }

    .card-info {
      padding: 12px;
    }

    .card-name {
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
      font-size: 0.95em;
    }

    .card-needed {
      color: #666;
      font-size: 0.85em;
      margin-bottom: 8px;
    }

    .card-owners {
      font-size: 0.85em;
      color: #667eea;
      margin-bottom: 8px;
    }

    .owner-badge {
      display: inline-block;
      background: #667eea;
      color: white;
      padding: 2px 8px;
      border-radius: 4px;
      margin-right: 4px;
      margin-bottom: 4px;
      font-size: 0.8em;
    }

    .owner-badge.owned {
      background: #51cf66;
    }

    .owner-badge.partial {
      background: #ffa94d;
    }

    .owner-badge.missing {
      background: #ff6b6b;
    }

    .empty-state {
      text-align: center;
      padding: 40px;
      color: #999;
    }

    .empty-state svg {
      width: 60px;
      height: 60px;
      margin-bottom: 15px;
      opacity: 0.5;
    }

    @media (max-width: 1024px) {
      .main-grid {
        grid-template-columns: 1fr;
      }

      .cards-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      }
    }

    .export-btn {
      margin-top: 20px;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin-bottom: 20px;
    }

    .stat-box {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      border-left: 4px solid #667eea;
    }

    .stat-value {
      font-size: 1.8em;
      font-weight: 700;
      color: #667eea;
    }

    .stat-label {
      color: #666;
      font-size: 0.9em;
      margin-top: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🃏 MTG Card Comparison</h1>
      <p class="subtitle">Upload your card lists and compare ownership across friends</p>
    </header>

    <div class="main-grid">
      <!-- Primary List Upload -->
      <div class="card">
        <h2>Primary Card List</h2>
        <div class="upload-section">
          <div class="upload-group">
            <label for="primaryFile">Upload Primary List (CSV or Line-separated)</label>
            <input type="file" id="primaryFile" accept=".csv,.txt">
          </div>
          <button class="btn-primary" onclick="uploadPrimaryList()">Upload Primary List</button>
          <div id="primaryStatus" class="status-message"></div>
          <div id="primaryInfo" style="margin-top: 15px; color: #666; font-size: 0.9em;"></div>
          <button class="btn-secondary btn-small" onclick="deletePrimaryList()" style="margin-top: 10px;">Clear Primary List</button>
        </div>
      </div>

      <!-- Owned Lists Upload -->
      <div class="card">
        <h2>Upload Owned Cards</h2>
        <div class="upload-section">
          <div class="upload-group">
            <label for="uploaderName">Your Name</label>
            <input type="text" id="uploaderName" placeholder="e.g., Alice, Bob, Charlie">
          </div>
          <div class="upload-group">
            <label for="ownedFile">Upload Your Card List (CSV or Line-separated)</label>
            <input type="file" id="ownedFile" accept=".csv,.txt">
          </div>
          <button class="btn-primary" onclick="uploadOwnedList()">Upload My Cards</button>
          <div id="ownedStatus" class="status-message"></div>
          <div style="margin-top: 20px;">
            <h3 style="color: #333; margin-bottom: 12px; font-size: 1.1em;">Uploaded Lists</h3>
            <div id="listsList" class="lists-container"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Comparison Section -->
    <div class="comparison-section">
      <h2>Card Comparison</h2>

      <div class="stats">
        <div class="stat-box">
          <div class="stat-value" id="totalCards">0</div>
          <div class="stat-label">Total Cards Needed</div>
        </div>
        <div class="stat-box">
          <div class="stat-value" id="fullyOwned">0</div>
          <div class="stat-label">Fully Owned</div>
        </div>
        <div class="stat-box">
          <div class="stat-value" id="partiallyOwned">0</div>
          <div class="stat-label">Partially Owned</div>
        </div>
        <div class="stat-box">
          <div class="stat-value" id="notOwned">0</div>
          <div class="stat-label">Not Owned</div>
        </div>
      </div>

      <div class="controls">
        <div class="filter-group">
          <label for="filterStatus">Filter by Status:</label>
          <select id="filterStatus" onchange="updateComparison()">
            <option value="all">All Cards</option>
            <option value="owned">Fully Owned</option>
            <option value="partial">Partially Owned</option>
            <option value="missing">Not Owned</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="filterOwner">Filter by Owner:</label>
          <select id="filterOwner" onchange="updateComparison()">
            <option value="">All Owners</option>
          </select>
        </div>
        <button class="btn-primary" onclick="exportToCSV()">Export Filtered List</button>
      </div>

      <div id="cardsContainer" class="cards-grid"></div>
    </div>
  </div>

  <script>
    let appData = { primaryList: [], uploadedLists: [] };

    // Cache management for card images
    const CACHE_KEY = 'mtg-card-cache';
    const CACHE_VERSION = 'v1';
    
    function getCardCache() {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          return JSON.parse(cached);
        }
      } catch (error) {
        console.error('Error reading cache:', error);
      }
      return {};
    }
    
    function saveCardCache(cache) {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      } catch (error) {
        console.error('Error saving cache:', error);
      }
    }
    
    function clearCardCache() {
      try {
        localStorage.removeItem(CACHE_KEY);
        console.log('Card cache cleared');
      } catch (error) {
        console.error('Error clearing cache:', error);
      }
    }

    // Load data on page load with retry logic
    async function loadData(retries = 3, delay = 500) {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('API returned ' + response.status);
        }
        const data = await response.json();
        
        // Verify data is valid
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid data format');
        }
        
        appData = data;
        updateUI();
      } catch (error) {
        console.error('Error loading data:', error);
        
        // Retry with exponential backoff
        if (retries > 0) {
          console.log(\`Retrying data load in \${delay}ms... (\${retries} retries left)\`);
          await new Promise(resolve => setTimeout(resolve, delay));
          await loadData(retries - 1, delay * 1.5);
        } else {
          console.error('Failed to load data after all retries');
        }
      }
    }

    function showStatus(elementId, message, isSuccess) {
      const element = document.getElementById(elementId);
      element.textContent = message;
      element.className = 'status-message ' + (isSuccess ? 'success' : 'error');
      setTimeout(() => {
        element.className = 'status-message';
      }, 5000);
    }

    async function uploadPrimaryList() {
      const file = document.getElementById('primaryFile').files[0];
      if (!file) {
        showStatus('primaryStatus', 'Please select a file', false);
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload-primary', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();
        if (response.ok) {
          showStatus('primaryStatus', \`Successfully uploaded \${result.count} cards\`, true);
          document.getElementById('primaryFile').value = '';
          await loadData();
        } else {
          showStatus('primaryStatus', result.error || 'Upload failed', false);
        }
      } catch (error) {
        showStatus('primaryStatus', 'Error uploading file: ' + error.message, false);
      }
    }

    async function uploadOwnedList() {
      const file = document.getElementById('ownedFile').files[0];
      const uploaderName = document.getElementById('uploaderName').value.trim();

      if (!file || !uploaderName) {
        showStatus('ownedStatus', 'Please enter your name and select a file', false);
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('uploaderName', uploaderName);

      try {
        const response = await fetch('/api/upload-owned', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();
        if (response.ok) {
          showStatus('ownedStatus', \`Successfully uploaded \${result.count} cards for \${uploaderName}\`, true);
          document.getElementById('ownedFile').value = '';
          document.getElementById('uploaderName').value = '';
          await loadData();
        } else {
          showStatus('ownedStatus', result.error || 'Upload failed', false);
        }
      } catch (error) {
        showStatus('ownedStatus', 'Error uploading file: ' + error.message, false);
      }
    }

    async function deleteList(uploaderName) {
      if (!confirm(\`Delete \${uploaderName}'s card list?\`)) return;

      try {
        const response = await fetch(\`/api/list/\${encodeURIComponent(uploaderName)}\`, {
          method: 'DELETE'
        });
        if (response.ok) {
          await loadData();
        }
      } catch (error) {
        console.error('Error deleting list:', error);
      }
    }

    async function deletePrimaryList() {
      if (!confirm('Delete the primary card list?')) return;

      try {
        const response = await fetch('/api/primary', {
          method: 'DELETE'
        });
        if (response.ok) {
          clearCardCache();
          await loadData();
        }
      } catch (error) {
        console.error('Error deleting primary list:', error);
      }
    }

    function updateUI() {
      updateListsList();
      updateFilterOwners();
      updateComparison();
    }

    function updateListsList() {
      const container = document.getElementById('listsList');
      if (appData.uploadedLists.length === 0) {
        container.innerHTML = '<div style="color: #999; text-align: center; padding: 20px;">No lists uploaded yet</div>';
        return;
      }

      container.innerHTML = appData.uploadedLists.map(list => \`
        <div class="list-item">
          <div>
            <div class="list-item-name">\${list.uploaderName}</div>
            <div class="list-item-count">\${list.cards.length} cards</div>
          </div>
          <button class="btn-secondary btn-small" onclick="deleteList('\${list.uploaderName}')">Remove</button>
        </div>
      \`).join('');
    }

    function updateFilterOwners() {
      const select = document.getElementById('filterOwner');
      const currentValue = select.value;
      
      select.innerHTML = '<option value="">All Owners</option>' + 
        appData.uploadedLists.map(list => 
          \`<option value="\${list.uploaderName}">\${list.uploaderName}</option>\`
        ).join('');
      
      select.value = currentValue;
    }

    async function updateComparison() {
      if (appData.primaryList.length === 0) {
        document.getElementById('cardsContainer').innerHTML = 
          '<div class="empty-state"><div>Upload a primary card list to get started</div></div>';
        updateStats([], 0, 0, 0);
        return;
      }

      // Show loading message
      document.getElementById('cardsContainer').innerHTML = 
        '<div class="empty-state"><div>Loading card images (rate-limited for Scryfall API)...</div></div>';

      const filterStatus = document.getElementById('filterStatus').value;
      const filterOwner = document.getElementById('filterOwner').value;

      const cardMap = new Map();

      // Build card ownership map
      for (const card of appData.primaryList) {
        if (!cardMap.has(card.name)) {
          cardMap.set(card.name, {
            name: card.name,
            needed: card.count,
            owners: {}
          });
        } else {
          cardMap.get(card.name).needed += card.count;
        }
      }

      // Add ownership data
      for (const list of appData.uploadedLists) {
        for (const card of list.cards) {
          if (cardMap.has(card.name)) {
            const cardData = cardMap.get(card.name);
            if (!cardData.owners[list.uploaderName]) {
              cardData.owners[list.uploaderName] = 0;
            }
            cardData.owners[list.uploaderName] += card.count;
          }
        }
      }

      // Filter cards
      let cards = Array.from(cardMap.values());
      
      cards = cards.filter(card => {
        const totalOwned = Object.values(card.owners).reduce((a, b) => a + b, 0);
        let status;
        
        if (totalOwned >= card.needed) status = 'owned';
        else if (totalOwned > 0) status = 'partial';
        else status = 'missing';

        if (filterStatus !== 'all' && filterStatus !== status) return false;
        if (filterOwner && !card.owners[filterOwner]) return false;

        return true;
      });

      // Fetch card images from Scryfall with caching and progressive loading
      const cache = getCardCache();
      const container = document.getElementById('cardsContainer');
      
      // Display cards as they load (progressive loading)
      displayCards(cards);
      
      // Fetch images in background
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        
        // Check cache first
        if (cache[card.name]) {
          card.imageUrl = cache[card.name];
          updateCardDisplay(card);
        } else {
          // Fetch from Scryfall
          try {
            // Format card name for Scryfall API: replace spaces with hyphens
            const formattedName = card.name.split(' ').join('-');
            console.log(\`Fetching card: '\${card.name}' -> '\${formattedName}'\`);
            const response = await fetch(\`https://api.scryfall.com/cards/search?q=!\${encodeURIComponent(formattedName)}&unique=prints\`);
            if (response.ok) {
              const data = await response.json();
              if (data.data && data.data.length > 0) {
                card.imageUrl = data.data[0].image_uris?.normal;
                if (card.imageUrl) {
                  cache[card.name] = card.imageUrl;
                }
              }
            }
          } catch (error) {
            console.error('Error fetching card image:', error);
          }
          updateCardDisplay(card);
        }
        
        // Rate limiting: wait 200ms between requests (5 requests per second)
        if (i < cards.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }
      
      // Save updated cache
      saveCardCache(cache);
      updateStats(cards, filterStatus, filterOwner, appData.uploadedLists.length);
    }

    function updateCardDisplay(card) {
      // Update individual card in the DOM
      const cardElements = document.querySelectorAll('.card-item');
      for (const element of cardElements) {
        const cardName = element.querySelector('.card-name');
        if (cardName && cardName.textContent === card.name) {
          const imageDiv = element.querySelector('.card-image');
          if (card.imageUrl && imageDiv.innerHTML.includes('No image available')) {
            imageDiv.innerHTML = \`<img src="\${card.imageUrl}" alt="\${card.name}" onerror="this.style.display='none'">\`;
          }
          break;
        }
      }
    }

    function displayCards(cards) {
      const container = document.getElementById('cardsContainer');
      
      if (cards.length === 0) {
        container.innerHTML = '<div class="empty-state"><div>No cards match your filters</div></div>';
        return;
      }

      container.innerHTML = cards.map(card => {
        const totalOwned = Object.values(card.owners).reduce((a, b) => a + b, 0);
        const isFullyOwned = totalOwned >= card.needed;
        const isPartiallyOwned = totalOwned > 0 && totalOwned < card.needed;
        
        const ownersList = Object.entries(card.owners)
          .map(([owner, count]) => {
            let badgeClass = 'owner-badge';
            if (count >= card.needed) badgeClass += ' owned';
            else if (count > 0) badgeClass += ' partial';
            else badgeClass += ' missing';
            return \`<span class="\${badgeClass}">\${owner}: \${count}</span>\`;
          })
          .join('');

        return \`
          <div class="card-item">
            <div class="card-image">
              \${card.imageUrl ? \`<img src="\${card.imageUrl}" alt="\${card.name}" onerror="this.style.display='none'">\` : 'No image available'}
            </div>
            <div class="card-info">
              <div class="card-name">\${card.name}</div>
              <div class="card-needed">Need: \${card.needed} | Owned: \${totalOwned}</div>
              <div class="card-owners">\${ownersList || 'Not owned'}</div>
            </div>
          </div>
        \`;
      }).join('');
    }

    function updateStats(cards, filterStatus, filterOwner, totalOwners) {
      let fullyOwned = 0;
      let partiallyOwned = 0;
      let notOwned = 0;

      for (const card of cards) {
        const totalOwned = Object.values(card.owners).reduce((a, b) => a + b, 0);
        if (totalOwned >= card.needed) fullyOwned++;
        else if (totalOwned > 0) partiallyOwned++;
        else notOwned++;
      }

      document.getElementById('totalCards').textContent = appData.primaryList.length;
      document.getElementById('fullyOwned').textContent = fullyOwned;
      document.getElementById('partiallyOwned').textContent = partiallyOwned;
      document.getElementById('notOwned').textContent = notOwned;
    }

    function exportToCSV() {
      const filterStatus = document.getElementById('filterStatus').value;
      const filterOwner = document.getElementById('filterOwner').value;

      const cardMap = new Map();

      for (const card of appData.primaryList) {
        if (!cardMap.has(card.name)) {
          cardMap.set(card.name, {
            name: card.name,
            needed: card.count,
            owners: {}
          });
        } else {
          cardMap.get(card.name).needed += card.count;
        }
      }

      for (const list of appData.uploadedLists) {
        for (const card of list.cards) {
          if (cardMap.has(card.name)) {
            const cardData = cardMap.get(card.name);
            if (!cardData.owners[list.uploaderName]) {
              cardData.owners[list.uploaderName] = 0;
            }
            cardData.owners[list.uploaderName] += card.count;
          }
        }
      }

      let cards = Array.from(cardMap.values());

      cards = cards.filter(card => {
        const totalOwned = Object.values(card.owners).reduce((a, b) => a + b, 0);
        let status;
        
        if (totalOwned >= card.needed) status = 'owned';
        else if (totalOwned > 0) status = 'partial';
        else status = 'missing';

        if (filterStatus !== 'all' && filterStatus !== status) return false;
        if (filterOwner && !card.owners[filterOwner]) return false;

        return true;
      });

      const ownerNames = [...new Set(appData.uploadedLists.map(l => l.uploaderName))];
      const headers = ['Card Name', 'Needed', 'Total Owned', 'Status', ...ownerNames];
      
      const rows = cards.map(card => {
        const totalOwned = Object.values(card.owners).reduce((a, b) => a + b, 0);
        let status = totalOwned >= card.needed ? 'Fully Owned' : totalOwned > 0 ? 'Partially Owned' : 'Not Owned';
        
        const row = [
          card.name,
          card.needed,
          totalOwned,
          status,
          ...ownerNames.map(owner => card.owners[owner] || 0)
        ];
        return row;
      });

      const csv = [
        headers.join(','),
        ...rows.map(row => row.map(cell => \`"\${cell}"\`).join(','))
      ].join('\\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mtg-comparison.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    }

    // Set up hot reload for development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      const eventSource = new EventSource('/__dev__/reload');
      eventSource.onmessage = () => {
        window.location.reload();
      };
    }

    // Load data on page load
    loadData();
  </script>
</body>
</html>`;
