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
      font-family: 'Beleren Bold', 'Segoe UI', Roboto, sans-serif;
      background: #0a0e27;
      color: #e0e6fc;
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    header {
      background: linear-gradient(135deg, #1a1f3a 0%, #2d1b4e 100%);
      border: 3px solid #d4af37;
      padding: 30px;
      margin-bottom: 30px;
      box-shadow: 0 0 30px rgba(212, 175, 55, 0.3), inset 0 0 20px rgba(212, 175, 55, 0.1);
    }

    h1 {
      color: #d4af37;
      margin-bottom: 10px;
      font-size: 2.5em;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    }

    .subtitle {
      color: #a8b8e6;
      font-size: 1.1em;
    }

    .main-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-bottom: 30px;
    }

    .card {
      background: linear-gradient(135deg, #1a1f3a 0%, #2d1b4e 100%);
      border: 2px solid #d4af37;
      padding: 25px;
      box-shadow: 0 0 20px rgba(212, 175, 55, 0.2), inset 0 0 10px rgba(212, 175, 55, 0.05);
    }

    .card h2 {
      color: #d4af37;
      margin-bottom: 20px;
      font-size: 1.5em;
      border-bottom: 3px solid #d4af37;
      padding-bottom: 10px;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
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
      color: #d4af37;
      font-weight: 600;
      font-size: 0.95em;
    }

    input[type="text"],
    input[type="file"] {
      padding: 12px;
      border: 2px solid #d4af37;
      background: #0f1428;
      color: #e0e6fc;
      border-radius: 0;
      font-size: 1em;
      transition: all 0.3s;
    }

    input[type="text"]:focus,
    input[type="file"]:focus {
      outline: none;
      border-color: #ffd700;
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
    }

    button {
      padding: 12px 20px;
      border: 2px solid #d4af37;
      border-radius: 0;
      font-size: 1em;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .btn-primary {
      background: #d4af37;
      color: #0a0e27;
    }

    .btn-primary:hover {
      background: #ffd700;
      transform: translateY(-2px);
      box-shadow: 0 0 20px rgba(212, 175, 55, 0.8);
    }

    .btn-secondary {
      background: #1a1f3a;
      color: #d4af37;
      border-color: #d4af37;
    }

    .btn-secondary:hover {
      background: #2d1b4e;
      box-shadow: 0 0 15px rgba(212, 175, 55, 0.5);
    }

    .btn-danger {
      background: #8b0000;
      color: #ffd700;
      border-color: #d4af37;
    }

    .btn-danger:hover {
      background: #a00000;
      box-shadow: 0 0 15px rgba(212, 175, 55, 0.5);
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
      background: #0f1428;
      padding: 12px;
      border-radius: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-left: 4px solid #d4af37;
      border: 2px solid #d4af37;
    }

    .list-item-name {
      font-weight: 600;
      color: #d4af37;
    }

    .list-item-count {
      color: #a8b8e6;
      font-size: 0.9em;
    }

    .comparison-section {
      background: linear-gradient(135deg, #1a1f3a 0%, #2d1b4e 100%);
      border: 2px solid #d4af37;
      padding: 25px;
      box-shadow: 0 0 20px rgba(212, 175, 55, 0.2), inset 0 0 10px rgba(212, 175, 55, 0.05);
    }

    .comparison-section h2 {
      color: #d4af37;
      margin-bottom: 20px;
      font-size: 1.5em;
      border-bottom: 3px solid #d4af37;
      padding-bottom: 10px;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
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
      color: #d4af37;
    }

    .filter-group select {
      padding: 8px 12px;
      border: 2px solid #d4af37;
      background: #0f1428;
      color: #e0e6fc;
      border-radius: 0;
      font-size: 0.95em;
    }

    .filter-labels {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 20px;
    }

    .filter-label {
      padding: 8px 16px;
      border: 2px solid #d4af37;
      background: #0f1428;
      color: #d4af37;
      cursor: pointer;
      transition: all 0.3s;
      border-radius: 0;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.85em;
    }

    .filter-label:hover {
      background: #1a1f3a;
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
    }

    .filter-label.active {
      background: #d4af37;
      color: #0a0e27;
      box-shadow: 0 0 15px rgba(212, 175, 55, 0.8);
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
      margin-bottom: 20px;
    }

    .card-item {
      background: #0f1428;
      border-radius: 0;
      overflow: hidden;
      border: 2px solid #d4af37;
      transition: all 0.3s;
    }

    .card-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 0 20px rgba(212, 175, 55, 0.6);
      border-color: #ffd700;
    }

    .card-image {
      width: 100%;
      height: 280px;
      background: #1a1f3a;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
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
      border-top: 2px solid #d4af37;
    }

    .card-name {
      font-weight: 600;
      color: #d4af37;
      margin-bottom: 8px;
      font-size: 0.95em;
    }

    .card-needed {
      color: #a8b8e6;
      font-size: 0.85em;
      margin-bottom: 8px;
    }

    .card-owners {
      font-size: 0.85em;
      color: #a8b8e6;
      margin-bottom: 8px;
    }

    .owner-badge {
      display: inline-block;
      background: #d4af37;
      color: #0a0e27;
      padding: 4px 10px;
      border-radius: 0;
      margin-right: 4px;
      margin-bottom: 4px;
      font-size: 0.75em;
      font-weight: 600;
      border: 1px solid #d4af37;
    }

    .owner-badge.owned {
      background: #2d5016;
      color: #7cfc00;
      border-color: #7cfc00;
    }

    .owner-badge.partial {
      background: #4a3200;
      color: #ffa500;
      border-color: #ffa500;
    }

    .owner-badge.missing {
      background: #4a0000;
      color: #ff6b6b;
      border-color: #ff6b6b;
    }

    .empty-state {
      text-align: center;
      padding: 40px;
      color: #666;
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
      background: #0f1428;
      padding: 15px;
      border-radius: 0;
      text-align: center;
      border: 2px solid #d4af37;
    }

    .stat-value {
      font-size: 2.2em;
      font-weight: 700;
      color: #ffd700;
      text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
    }

    .stat-label {
      color: #d4af37;
      font-size: 0.9em;
      margin-top: 5px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .stat-box {
      cursor: pointer;
    }

    .stat-box:hover {
      transform: scale(1.05);
      box-shadow: 0 0 25px rgba(212, 175, 55, 0.6);
    }

    .image-toggle {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
      padding: 10px;
      background: #0f1428;
      border: 2px solid #d4af37;
    }

    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 24px;
    }

    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #4a4a4a;
      transition: 0.4s;
      border: 2px solid #d4af37;
    }

    .toggle-slider:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 2px;
      bottom: 2px;
      background-color: #d4af37;
      transition: 0.4s;
    }

    input:checked + .toggle-slider {
      background-color: #2d5016;
    }

    input:checked + .toggle-slider:before {
      transform: translateX(26px);
    }

    .cards-table {
      width: 100%;
      border-collapse: collapse;
      background: #0f1428;
      border: 2px solid #d4af37;
    }

    .cards-table thead {
      background: #1a1f3a;
      border-bottom: 2px solid #d4af37;
    }

    .cards-table th {
      padding: 12px;
      text-align: left;
      color: #d4af37;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.85em;
      border-right: 1px solid #d4af37;
    }

    .cards-table th:last-child {
      border-right: none;
    }

    .cards-table td {
      padding: 12px;
      color: #e0e6fc;
      border-bottom: 1px solid #333;
      border-right: 1px solid #333;
    }

    .cards-table td:last-child {
      border-right: none;
    }

    .cards-table tbody tr:hover {
      background: #1a1f3a;
    }

    .cards-table .card-name {
      color: #d4af37;
      font-weight: 600;
    }

    .cards-table .owner-badge {
      display: inline-block;
      margin-right: 4px;
      margin-bottom: 2px;
    }

  </style>
</head>
<body>
  <div class="container">
    <header>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1>🃏 MTG Card Comparison</h1>
          <p class="subtitle">Upload your card lists and compare ownership across friends</p>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; margin-right: 20px;">
          <button class="btn-primary btn-small" id="shareViewOnlyBtn" onclick="copyViewOnlyLink()">Share View Only</button>
          <div class="image-toggle" style="display: flex; align-items: center; gap: 12px;">
            <label style="color: #d4af37; font-weight: 600;">Local Mode:</label>
            <label class="toggle-switch">
              <input type="checkbox" id="localModeToggle" onchange="toggleLocalMode()">
              <span class="toggle-slider"></span>
            </label>
            <button id="resetToBackupBtn" class="btn-secondary btn-small" onclick="resetToBackup()" style="display: none;">Reset to Backup</button>
          </div>
        </div>
      </div>
    </header>

    <div class="main-grid">
      <!-- Primary List Upload -->
      <div class="card">
        <h2>Primary Card List</h2>
        <div class="upload-section">
          <div class="upload-group" id="primaryDropZone" style="border: 2px dashed #d4af37; border-radius: 4px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.3s; background: rgba(212, 175, 55, 0.05);">
            <label for="primaryFile" style="cursor: pointer; display: block;">
              <div style="color: #d4af37; font-weight: 600; margin-bottom: 8px;">Drag files here or click to select</div>
              <div style="color: #999; font-size: 0.9em;">CSV or Line-separated files (supports multiple)</div>
            </label>
            <input type="file" id="primaryFile" accept=".csv,.txt" multiple style="display: none;">
          </div>
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
          <div class="upload-group" id="ownedDropZone" style="border: 2px dashed #d4af37; border-radius: 4px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.3s; background: rgba(212, 175, 55, 0.05);">
            <label for="ownedFile" style="cursor: pointer; display: block;">
              <div style="color: #d4af37; font-weight: 600; margin-bottom: 8px;">Drag files here or click to select</div>
              <div style="color: #999; font-size: 0.9em;">CSV or Line-separated files (supports multiple)</div>
            </label>
            <input type="file" id="ownedFile" accept=".csv,.txt" multiple style="display: none;">
          </div>
          <button class="btn-primary" onclick="uploadOwnedList()">Upload My Cards</button>
          <div id="ownedStatus" class="status-message"></div>
          <div style="margin-top: 20px;">
            <h3 style="color: #d4af37; margin-bottom: 12px; font-size: 1.1em;">Uploaded Lists</h3>
            <div id="listsList" class="lists-container"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Comparison Section -->
    <div class="comparison-section">
      <h2>Card Comparison</h2>

      <div class="stats">
        <div class="stat-box" onclick="filterByStat('all')">
          <div class="stat-value" id="totalCards">0</div>
          <div class="stat-label">Total Cards Needed</div>
        </div>
        <div class="stat-box" onclick="filterByStat('owned')">
          <div class="stat-value" id="fullyOwned">0</div>
          <div class="stat-label">Fully Owned</div>
        </div>
        <div class="stat-box" onclick="filterByStat('partial')">
          <div class="stat-value" id="partiallyOwned">0</div>
          <div class="stat-label">Partially Owned</div>
        </div>
        <div class="stat-box" onclick="filterByStat('missing')">
          <div class="stat-value" id="notOwned">0</div>
          <div class="stat-label">Not Owned</div>
        </div>
        <div class="stat-box" onclick="filterByStat('buy')">
          <div class="stat-value" id="cardsToBuy">0</div>
          <div class="stat-label">Cards to Buy</div>
        </div>
      </div>

      <div class="image-toggle">
        <label style="color: #d4af37; font-weight: 600;">Show Card Images:</label>
        <label class="toggle-switch">
          <input type="checkbox" id="imageToggle" onchange="toggleImages()">
          <span class="toggle-slider"></span>
        </label>
      </div>

      <div class="controls">
        <div style="width: 100%; display: flex; flex-direction: column; gap: 15px;">
          <div>
            <label style="display: block; margin-bottom: 10px;">Filter by Status:</label>
            <div class="filter-labels">
              <div class="filter-label active" data-filter-type="status" data-filter-value="all" onclick="toggleFilter(this)">All Cards</div>
              <div class="filter-label" data-filter-type="status" data-filter-value="owned" onclick="toggleFilter(this)">Fully Owned</div>
              <div class="filter-label" data-filter-type="status" data-filter-value="partial" onclick="toggleFilter(this)">Partially Owned</div>
              <div class="filter-label" data-filter-type="status" data-filter-value="missing" onclick="toggleFilter(this)">Not Owned</div>
            </div>
          </div>
          <div>
            <label style="display: block; margin-bottom: 10px;">Filter by Primary List:</label>
            <div id="primaryListFilters" class="filter-labels">
              <div class="filter-label active" data-filter-type="primaryList" data-filter-value="" onclick="toggleFilter(this)">All Lists</div>
            </div>
          </div>
          <div>
            <label style="display: block; margin-bottom: 10px;">Filter by Owner:</label>
            <div id="ownerFilters" class="filter-labels">
              <div class="filter-label active" data-filter-type="owner" data-filter-value="" onclick="toggleFilter(this)">All Owners</div>
            </div>
          </div>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="btn-primary" onclick="exportToCSV()">Export to CSV</button>
            <button class="btn-primary" onclick="exportToCardKingdom()">Export to Card Kingdom</button>
          </div>
        </div>
      </div>

      <div id="cardsContainer" class="cards-grid"></div>
    </div>
  </div>

  <script>
    let appData = { primaryLists: [], uploadedLists: [] };
    let localMode = false;
    let localModeHasChanges = false;
    let backupData = null;
    const LOCAL_MODE_KEY = 'mtg-local-mode';
    let viewOnlyMode = false;

    // Image fetching
    let imageAbortController = null;
    let pendingImageRequests = new Set();

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

    // Image toggle management
    const IMAGES_ENABLED_KEY = 'mtg-images-enabled';
    let imagesEnabled = false;

    function initImageToggle() {
      imagesEnabled = localStorage.getItem(IMAGES_ENABLED_KEY) === 'true';
      document.getElementById('imageToggle').checked = imagesEnabled;
    }

    function toggleImages() {
      imagesEnabled = document.getElementById('imageToggle').checked;
      localStorage.setItem(IMAGES_ENABLED_KEY, imagesEnabled);
      
      if (!imagesEnabled) {
        // Cancel pending image requests
        if (imageAbortController) {
          imageAbortController.abort();
          imageAbortController = null;
        }
      }
      
      updateComparison();
    }

    function filterByStat(statType) {
      // Clear all status filters first
      document.querySelectorAll('[data-filter-type="status"]').forEach(el => el.classList.remove('active'));
      
      if (statType === 'all') {
        document.querySelector('[data-filter-type="status"][data-filter-value="all"]').classList.add('active');
      } else if (statType === 'owned') {
        document.querySelector('[data-filter-type="status"][data-filter-value="owned"]').classList.add('active');
      } else if (statType === 'partial') {
        document.querySelector('[data-filter-type="status"][data-filter-value="partial"]').classList.add('active');
      } else if (statType === 'missing') {
        document.querySelector('[data-filter-type="status"][data-filter-value="missing"]').classList.add('active');
      } else if (statType === 'buy') {
        // "Cards to Buy" = Partially Owned + Not Owned
        document.querySelector('[data-filter-type="status"][data-filter-value="partial"]').classList.add('active');
        document.querySelector('[data-filter-type="status"][data-filter-value="missing"]').classList.add('active');
      }
      
      updateComparison();
    }

    function initLocalMode() {
      localMode = localStorage.getItem(LOCAL_MODE_KEY) === 'true';
      document.getElementById('localModeToggle').checked = localMode;
      updateResetButtonVisibility();
    }

    function updateResetButtonVisibility() {
      const btn = document.getElementById('resetToBackupBtn');
      if (localMode && localModeHasChanges) {
        btn.style.display = 'block';
      } else {
        btn.style.display = 'none';
      }
    }

    function markLocalChanges() {
      if (localMode) {
        localModeHasChanges = true;
        updateResetButtonVisibility();
      }
    }

    function toggleLocalMode() {
      const newLocalMode = document.getElementById('localModeToggle').checked;
      
      if (!localMode && newLocalMode) {
        // Switching TO local mode - save backup data and enable it
        backupData = JSON.parse(JSON.stringify(appData));
        localMode = true;
        localModeHasChanges = false;
        localStorage.setItem(LOCAL_MODE_KEY, 'true');
        updateResetButtonVisibility();
      } else if (localMode && !newLocalMode) {
        // Switching FROM local mode to backup mode
        if (localModeHasChanges) {
          // Only prompt if there are changes
          if (confirm('This will overwrite the backup with your current changes. Are you sure?')) {
            localMode = false;
            localModeHasChanges = false;
            localStorage.setItem(LOCAL_MODE_KEY, 'false');
            updateResetButtonVisibility();
            // Save current data to R2
            saveDataToBackup();
          } else {
            // User rejected, keep local mode enabled
            document.getElementById('localModeToggle').checked = true;
          }
        } else {
          // No changes, just disable local mode
          localMode = false;
          localStorage.setItem(LOCAL_MODE_KEY, 'false');
          updateResetButtonVisibility();
        }
      }
    }

    async function resetToBackup() {
      if (!confirm('Reset to backup? This will discard all local changes.')) return;
      
      appData = JSON.parse(JSON.stringify(backupData));
      localModeHasChanges = false;
      updateResetButtonVisibility();
      clearCardCache();
      updateUI();
    }

    async function saveDataToBackup() {
      try {
        const response = await fetch('/api/backup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(appData)
        });
        if (response.ok) {
          showStatus('primaryStatus', 'Backup saved successfully', true);
        }
      } catch (error) {
        console.error('Error saving backup:', error);
        showStatus('primaryStatus', 'Error saving backup', false);
      }
    }

    // Load data on page load with retry logic
    async function loadData(retries = 3, delay = 500) {
      try {
        // If in local mode, don't reload from R2
        if (localMode) {
          console.log('Local mode enabled, skipping R2 load');
          updateUI();
          return;
        }

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

    function parseCardList(content) {
      const cards = {};
      const lines = content.split('\\n');
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        
        const match = trimmed.match(/^(\\d+)\\s+(.+)$/);
        if (match) {
          const count = parseInt(match[1]);
          const name = match[2].trim();
          cards[name] = (cards[name] || 0) + count;
        } else {
          const name = trimmed;
          cards[name] = (cards[name] || 0) + 1;
        }
      }
      
      return Object.entries(cards).map(([name, count]) => ({ name, count }));
    }

    async function uploadPrimaryList() {
      const files = document.getElementById('primaryFile').files;
      if (files.length === 0) {
        showStatus('primaryStatus', 'Please select a file', false);
        return;
      }

      let totalCards = 0;
      let successCount = 0;
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (localMode) {
          // Local mode: parse file directly
          try {
            const content = await file.text();
            const cards = parseCardList(content);
            appData.primaryLists.push({
              name: file.name,
              cards: cards,
              uploadedAt: new Date().toISOString()
            });
            totalCards += cards.length;
            successCount++;
          } catch (error) {
            showStatus('primaryStatus', \`Error reading \${file.name}: \${error.message}\`, false);
          }
        } else {
          // Backup mode: upload to server
          const formData = new FormData();
          formData.append('file', file);

          try {
            const response = await fetch('/api/upload-primary', {
              method: 'POST',
              body: formData
            });
            const result = await response.json();
            if (response.ok) {
              totalCards += result.count;
              successCount++;
            } else {
              showStatus('primaryStatus', \`Error uploading \${file.name}: \${result.error}\`, false);
            }
          } catch (error) {
            showStatus('primaryStatus', \`Error uploading \${file.name}: \${error.message}\`, false);
          }
        }
      }

      if (successCount > 0) {
        showStatus('primaryStatus', \`Successfully uploaded \${successCount} file(s) with \${totalCards} cards\`, true);
        document.getElementById('primaryFile').value = '';
        markLocalChanges();
        if (localMode) {
          updateUI();
        } else {
          await loadData();
        }
      }
    }

    async function uploadOwnedList() {
      const files = document.getElementById('ownedFile').files;
      const uploaderName = document.getElementById('uploaderName').value.trim();

      if (files.length === 0) {
        showStatus('ownedStatus', 'Please select a file', false);
        return;
      }

      let totalCards = 0;
      let successCount = 0;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Extract filename without extension
        const fileName = file.name.replace(/\.[^/.]+$/, '');
        // If uploaderName provided, append filename; otherwise use filename only
        const finalName = uploaderName ? \`\${uploaderName} - \${fileName}\` : fileName;
        
        if (localMode) {
          // Local mode: parse file directly
          try {
            const content = await file.text();
            const cards = parseCardList(content);
            
            // Remove existing list with same name if it exists
            appData.uploadedLists = appData.uploadedLists.filter(list => list.uploaderName !== finalName);
            
            // Add new list
            appData.uploadedLists.push({
              uploaderName: finalName,
              cards: cards,
              uploadedAt: new Date().toISOString()
            });
            
            totalCards += cards.length;
            successCount++;
          } catch (error) {
            showStatus('ownedStatus', \`Error reading \${file.name}: \${error.message}\`, false);
          }
        } else {
          // Backup mode: upload to server
          const formData = new FormData();
          formData.append('file', file);
          formData.append('uploaderName', finalName);

          try {
            const response = await fetch('/api/upload-owned', {
              method: 'POST',
              body: formData
            });
            const result = await response.json();
            if (response.ok) {
              totalCards += result.count;
              successCount++;
            } else {
              showStatus('ownedStatus', \`Error uploading \${file.name}: \${result.error}\`, false);
            }
          } catch (error) {
            showStatus('ownedStatus', \`Error uploading \${file.name}: \${error.message}\`, false);
          }
        }
      }

      if (successCount > 0) {
        showStatus('ownedStatus', \`Successfully uploaded \${successCount} file(s) with \${totalCards} cards\`, true);
        document.getElementById('ownedFile').value = '';
        document.getElementById('uploaderName').value = '';
        markLocalChanges();
        if (localMode) {
          updateUI();
        } else {
          await loadData();
        }
      }
    }

    async function deleteList(uploaderName) {
      if (!confirm(\`Delete \${uploaderName}'s card list?\`)) return;

      if (localMode) {
        appData.uploadedLists = appData.uploadedLists.filter(list => list.uploaderName !== uploaderName);
        markLocalChanges();
        updateUI();
      } else {
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
    }

    async function deletePrimaryList(primaryName) {
      if (!confirm(\`Delete '\${primaryName}'?\`)) return;

      if (localMode) {
        appData.primaryLists = appData.primaryLists.filter(list => list.name !== primaryName);
        markLocalChanges();
        clearCardCache();
        updateUI();
      } else {
        try {
          const response = await fetch(\`/api/primary/\${encodeURIComponent(primaryName)}\`, {
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
    }

    function initViewOnlyMode() {
      const params = new URLSearchParams(window.location.search);
      viewOnlyMode = params.get('view') === 'only';
      
      // Hide controls in view-only mode
      if (viewOnlyMode) {
        // Hide upload controls but keep info sections visible
        document.getElementById('primaryDropZone').style.display = 'none';
        document.getElementById('primaryStatus').style.display = 'none';
        document.querySelectorAll('button[onclick*="deletePrimaryList"]').forEach(el => el.style.display = 'none');
        
        document.getElementById('uploaderName').style.display = 'none';
        document.querySelector('label[for="uploaderName"]').style.display = 'none';
        document.getElementById('ownedDropZone').style.display = 'none';
        document.getElementById('ownedStatus').style.display = 'none';
        document.querySelectorAll('button[onclick*="uploadOwnedList"]').forEach(el => el.style.display = 'none');
        
        document.getElementById('shareViewOnlyBtn').style.display = 'none';
        document.querySelector('.image-toggle').style.display = 'none';
      }
    }

    function copyViewOnlyLink() {
      const viewOnlyUrl = window.location.origin + window.location.pathname + '?view=only';
      navigator.clipboard.writeText(viewOnlyUrl).then(() => {
        alert('View-only link copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy link. Please try again.');
      });
    }

    function updateUI() {
      initImageToggle();
      initLocalMode();
      initViewOnlyMode();
      updatePrimaryListInfo();
      updateFilterPrimaryLists();
      updateListsList();
      updateFilterOwners();
      updateComparison();
    }

    function updatePrimaryListInfo() {
      const container = document.getElementById('primaryInfo');
      if (appData.primaryLists.length === 0) {
        container.innerHTML = '';
        return;
      }

      container.innerHTML = appData.primaryLists.map(list => \`
        <div class="list-item">
          <div>
            <div class="list-item-name">\${list.name}</div>
            <div class="list-item-count">\${list.cards.length} cards</div>
          </div>
          \${viewOnlyMode ? '' : \`<button class="btn-secondary btn-small" onclick="deletePrimaryList('\${list.name}')">Remove</button>\`}
        </div>
      \`).join('');
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
          \${viewOnlyMode ? '' : \`<button class="btn-secondary btn-small" onclick="deleteList('\${list.uploaderName}')">Remove</button>\`}
        </div>
      \`).join('');
    }

    function updateFilterPrimaryLists() {
      const primaryListFilters = document.getElementById('primaryListFilters');
      const primaryListNames = appData.primaryLists.map(list => list.name);
      
      // Keep "All Lists" button
      let html = '<div class="filter-label active" data-filter-type="primaryList" data-filter-value="" onclick="toggleFilter(this)">All Lists</div>';
      
      // Add primary list buttons
      html += primaryListNames.map(name => 
        \`<div class="filter-label" data-filter-type="primaryList" data-filter-value="\${name}" onclick="toggleFilter(this)">\${name}</div>\`
      ).join('');
      
      primaryListFilters.innerHTML = html;
    }

    function updateFilterOwners() {
      const ownerFilters = document.getElementById('ownerFilters');
      const owners = appData.uploadedLists.map(list => list.uploaderName);
      
      // Keep "All Owners" button
      let html = '<div class="filter-label active" data-filter-type="owner" data-filter-value="" onclick="toggleFilter(this)">All Owners</div>';
      
      // Add owner buttons
      html += owners.map(owner => 
        \`<div class="filter-label" data-filter-type="owner" data-filter-value="\${owner}" onclick="toggleFilter(this)">\${owner}</div>\`
      ).join('');
      
      ownerFilters.innerHTML = html;
    }

    function toggleFilter(element) {
      const filterType = element.getAttribute('data-filter-type');
      const filterValue = element.getAttribute('data-filter-value');
      
      if (filterType === 'status') {
        // Status filters are multi-select
        if (filterValue === 'all') {
          // "All Cards" deselects all others
          document.querySelectorAll('[data-filter-type="status"]').forEach(el => el.classList.remove('active'));
          element.classList.add('active');
        } else {
          // Clicking a status deselects "All Cards"
          const allCardsBtn = document.querySelector('[data-filter-type="status"][data-filter-value="all"]');
          allCardsBtn.classList.remove('active');
          element.classList.toggle('active');
          
          // If no statuses selected, select "All Cards"
          const activeStatuses = document.querySelectorAll('[data-filter-type="status"].active:not([data-filter-value="all"])');
          if (activeStatuses.length === 0) {
            allCardsBtn.classList.add('active');
          }
        }
      } else if (filterType === 'primaryList') {
        // Primary list filters are multi-select
        if (filterValue === '') {
          // "All Lists" deselects all others
          document.querySelectorAll('[data-filter-type="primaryList"]').forEach(el => el.classList.remove('active'));
          element.classList.add('active');
        } else {
          // Clicking a list deselects "All Lists"
          const allListsBtn = document.querySelector('[data-filter-type="primaryList"][data-filter-value=""]');
          allListsBtn.classList.remove('active');
          element.classList.toggle('active');
          
          // If no lists selected, select "All Lists"
          const activeLists = document.querySelectorAll('[data-filter-type="primaryList"].active:not([data-filter-value=""])');
          if (activeLists.length === 0) {
            allListsBtn.classList.add('active');
          }
        }
      } else if (filterType === 'owner') {
        // Owner filters are multi-select
        if (filterValue === '') {
          // "All Owners" deselects all others
          document.querySelectorAll('[data-filter-type="owner"]').forEach(el => el.classList.remove('active'));
          element.classList.add('active');
        } else {
          // Clicking an owner deselects "All Owners"
          const allOwnersBtn = document.querySelector('[data-filter-type="owner"][data-filter-value=""]');
          allOwnersBtn.classList.remove('active');
          element.classList.toggle('active');
          
          // If no owners selected, select "All Owners"
          const activeOwners = document.querySelectorAll('[data-filter-type="owner"].active:not([data-filter-value=""])');
          if (activeOwners.length === 0) {
            allOwnersBtn.classList.add('active');
          }
        }
      }
      
      updateComparison();
    }

    function getActiveFilters() {
      const activeStatuses = Array.from(document.querySelectorAll('[data-filter-type="status"].active'))
        .map(el => el.getAttribute('data-filter-value'))
        .filter(val => val !== 'all');
      
      const activePrimaryLists = Array.from(document.querySelectorAll('[data-filter-type="primaryList"].active'))
        .map(el => el.getAttribute('data-filter-value'))
        .filter(val => val !== '');
      
      const activeOwners = Array.from(document.querySelectorAll('[data-filter-type="owner"].active'))
        .map(el => el.getAttribute('data-filter-value'))
        .filter(val => val !== '');
      
      return { statuses: activeStatuses.length === 0 ? ['all'] : activeStatuses, primaryLists: activePrimaryLists, owners: activeOwners };
    }

    async function updateComparison() {
      if (appData.primaryLists.length === 0) {
        document.getElementById('cardsContainer').innerHTML = 
          '<div class="empty-state"><div>Upload a primary card list to get started</div></div>';
        updateStats([], 0, 0, 0);
        return;
      }

      // Show loading message
      document.getElementById('cardsContainer').innerHTML = 
        '<div class="empty-state"><div>Loading card images (rate-limited for Scryfall API)...</div></div>';

      const filters = getActiveFilters();
      const filterStatuses = filters.statuses;
      const filterPrimaryLists = filters.primaryLists;
      const filterOwners = filters.owners;

      const cardMap = new Map();

      // Build card ownership map from filtered primary lists
      for (const primaryList of appData.primaryLists) {
        // Skip if filtering by primary list and this list is not selected
        if (filterPrimaryLists.length > 0 && !filterPrimaryLists.includes(primaryList.name)) {
          continue;
        }
        
        for (const card of primaryList.cards) {
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

      // Calculate stats IMMEDIATELY (before filtering)
      const allCards = Array.from(cardMap.values());
      let fullyOwned = 0, partiallyOwned = 0, notOwned = 0;
      for (const card of allCards) {
        const totalOwned = Object.values(card.owners).reduce((a, b) => a + b, 0);
        if (totalOwned >= card.needed) fullyOwned++;
        else if (totalOwned > 0) partiallyOwned++;
        else notOwned++;
      }
      updateStats(allCards, filterStatuses, filterOwners, appData.uploadedLists.length);

      // Filter cards
      let cards = Array.from(cardMap.values());
      
      cards = cards.filter(card => {
        const totalOwned = Object.values(card.owners).reduce((a, b) => a + b, 0);
        let status;
        
        if (totalOwned >= card.needed) status = 'owned';
        else if (totalOwned > 0) status = 'partial';
        else status = 'missing';

        // Multi-select status filter
        if (!filterStatuses.includes(status) && !filterStatuses.includes('all')) return false;
        
        // Multi-select owner filter
        if (filterOwners.length > 0) {
          const hasAnyOwner = filterOwners.some(owner => card.owners[owner]);
          if (!hasAnyOwner) return false;
        }

        return true;
      });

      // Display cards immediately
      displayCards(cards);
      
      // Only fetch images if enabled
      if (imagesEnabled) {
        // Create new abort controller for this fetch session
        imageAbortController = new AbortController();
        
        // Fetch card images from Scryfall with caching and progressive loading
        const cache = getCardCache();
        
        // Fetch images in background
        for (let i = 0; i < cards.length; i++) {
          // Check if fetch was aborted
          if (imageAbortController.signal.aborted) {
            console.log('Image fetching cancelled');
            break;
          }

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
              const response = await fetch(\`https://api.scryfall.com/cards/search?q=!\${encodeURIComponent(formattedName)}&unique=prints\`, {
                signal: imageAbortController.signal
              });
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
              if (error.name !== 'AbortError') {
                console.error('Error fetching card image:', error);
              }
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
      }
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

    async function displayCards(cards) {
      const container = document.getElementById('cardsContainer');
      
      if (cards.length === 0) {
        container.innerHTML = '<div class="empty-state"><div>No cards match your filters</div></div>';
        return;
      }

      if (imagesEnabled) {
        // Grid view with images
        container.className = 'cards-grid';
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
      } else {
        // Table view without images
        container.className = '';
        const headerRow = \`
          <table class="cards-table">
            <thead>
              <tr>
                <th>Card Name</th>
                <th>Need</th>
                <th>Owned</th>
                <th>Status</th>
                <th>Owners</th>
              </tr>
            </thead>
            <tbody>
        \`;
        
        const rows = cards.map(card => {
          const totalOwned = Object.values(card.owners).reduce((a, b) => a + b, 0);
          let status;
          if (totalOwned >= card.needed) status = 'Fully Owned';
          else if (totalOwned > 0) status = 'Partially Owned';
          else status = 'Not Owned';
          
          const ownersList = Object.entries(card.owners)
            .map(([owner, count]) => {
              let badgeClass = 'owner-badge';
              if (count >= card.needed) badgeClass += ' owned';
              else if (count > 0) badgeClass += ' partial';
              else badgeClass += ' missing';
              return \`<span class="\${badgeClass}">\${owner}: \${count}</span>\`;
            })
            .join(' ');

          return \`
            <tr>
              <td class="card-name">\${card.name}</td>
              <td>\${card.needed}</td>
              <td>\${totalOwned}</td>
              <td>\${status}</td>
              <td>\${ownersList || 'Not owned'}</td>
            </tr>
          \`;
        }).join('');
        
        const footerRow = '</tbody></table>';
        container.innerHTML = headerRow + rows + footerRow;
      }
    }

    function updateStats(allCards, filterStatus, filterOwners, totalOwners) {
      // Calculate stats for ALL cards (not filtered)
      let fullyOwned = 0;
      let partiallyOwned = 0;
      let notOwned = 0;
      let cardsToBuy = 0;

      for (const card of allCards) {
        const totalOwned = Object.values(card.owners).reduce((a, b) => a + b, 0);
        if (totalOwned >= card.needed) {
          fullyOwned++;
        } else if (totalOwned > 0) {
          partiallyOwned++;
          // Add remaining needed cards to "Cards to Buy"
          cardsToBuy += (card.needed - totalOwned);
        } else {
          notOwned++;
          // Add all needed cards to "Cards to Buy"
          cardsToBuy += card.needed;
        }
      }

      // Update stats immediately
      const totalPrimaryCards = appData.primaryLists.reduce((sum, list) => sum + list.cards.length, 0);
      document.getElementById('totalCards').textContent = totalPrimaryCards;
      document.getElementById('fullyOwned').textContent = fullyOwned;
      document.getElementById('partiallyOwned').textContent = partiallyOwned;
      document.getElementById('notOwned').textContent = notOwned;
      document.getElementById('cardsToBuy').textContent = cardsToBuy;
    }

    function exportToCSV() {
      const filterStatus = document.getElementById('filterStatus').value;
      const filterOwner = document.getElementById('filterOwner').value;

      const cardMap = new Map();

      // Build from all primary lists
      for (const primaryList of appData.primaryLists) {
        for (const card of primaryList.cards) {
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

    function exportToCardKingdom() {
      // Build card map
      const cardMap = new Map();

      // Build from all primary lists
      for (const primaryList of appData.primaryLists) {
        for (const card of primaryList.cards) {
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

      // Get active filters
      const filters = getActiveFilters();
      const filterStatuses = filters.statuses;
      const filterOwners = filters.owners;

      // Filter and format cards for Card Kingdom
      let cards = Array.from(cardMap.values());
      
      cards = cards.filter(card => {
        const totalOwned = Object.values(card.owners).reduce((a, b) => a + b, 0);
        let status;
        
        if (totalOwned >= card.needed) status = 'owned';
        else if (totalOwned > 0) status = 'partial';
        else status = 'missing';

        // Multi-select status filter
        if (!filterStatuses.includes(status) && !filterStatuses.includes('all')) return false;
        
        // Multi-select owner filter
        if (filterOwners.length > 0) {
          const hasAnyOwner = filterOwners.some(owner => card.owners[owner]);
          if (!hasAnyOwner) return false;
        }

        return true;
      });

      // Format for Card Kingdom bulk deck builder
      // Format: <quantity> <card name>
      const deckList = cards.map(card => {
        const totalOwned = Object.values(card.owners).reduce((a, b) => a + b, 0);
        
        if (totalOwned >= card.needed) {
          // Fully owned - don't include
          return null;
        } else if (totalOwned > 0) {
          // Partially owned - include remaining needed
          const remaining = card.needed - totalOwned;
          return \`\${remaining} \${card.name}\`;
        } else {
          // Not owned - include all needed
          return \`\${card.needed} \${card.name}\`;
        }
      })
      .filter(line => line !== null)
      .join('\\n');

      // Copy to clipboard
      navigator.clipboard.writeText(deckList).then(() => {
        alert('Card Kingdom deck list copied to clipboard!\\n\\nYou can now paste it into the Card Kingdom bulk deck builder.');
      }).catch(err => {
        console.error('Failed to copy to clipboard:', err);
        alert('Failed to copy to clipboard. Please try again.');
      });
    }

    // Set up drag-drop for primary list
    const primaryDropZone = document.getElementById('primaryDropZone');
    primaryDropZone.addEventListener('click', () => document.getElementById('primaryFile').click());
    primaryDropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      primaryDropZone.style.background = 'rgba(212, 175, 55, 0.2)';
      primaryDropZone.style.borderColor = '#ffd700';
    });
    primaryDropZone.addEventListener('dragleave', () => {
      primaryDropZone.style.background = 'rgba(212, 175, 55, 0.05)';
      primaryDropZone.style.borderColor = '#d4af37';
    });
    primaryDropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      primaryDropZone.style.background = 'rgba(212, 175, 55, 0.05)';
      primaryDropZone.style.borderColor = '#d4af37';
      document.getElementById('primaryFile').files = e.dataTransfer.files;
      uploadPrimaryList();
    });

    // Set up drag-drop for owned list
    const ownedDropZone = document.getElementById('ownedDropZone');
    ownedDropZone.addEventListener('click', () => document.getElementById('ownedFile').click());
    ownedDropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      ownedDropZone.style.background = 'rgba(212, 175, 55, 0.2)';
      ownedDropZone.style.borderColor = '#ffd700';
    });
    ownedDropZone.addEventListener('dragleave', () => {
      ownedDropZone.style.background = 'rgba(212, 175, 55, 0.05)';
      ownedDropZone.style.borderColor = '#d4af37';
    });
    ownedDropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      ownedDropZone.style.background = 'rgba(212, 175, 55, 0.05)';
      ownedDropZone.style.borderColor = '#d4af37';
      document.getElementById('ownedFile').files = e.dataTransfer.files;
      uploadOwnedList();
    });

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
