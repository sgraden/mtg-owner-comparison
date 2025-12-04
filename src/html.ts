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

    @media (max-width: 768px) {
      header {
        padding: 20px;
      }

      header > div {
        flex-direction: column !important;
        align-items: flex-start !important;
      }

      header > div > div:last-child {
        flex-direction: column !important;
        width: 100%;
        margin-right: 0 !important;
        margin-top: 15px;
      }

      header > div > div:last-child > div {
        width: 100%;
        flex-direction: column !important;
      }

      h1 {
        font-size: 1.8em;
      }

      .subtitle {
        font-size: 0.95em;
      }
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

    @media (max-width: 768px) {
      .main-grid {
        grid-template-columns: 1fr;
      }
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
      margin-bottom: 16px;
    }

    .list-item-name {
      font-weight: 600;
      color: #d4af37;
    }

    .list-item-count {
      color: #a8b8e6;
      font-size: 0.9em;
    }

    .status-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.85em;
      font-weight: 600;
      margin-right: 6px;
      margin-top: 4px;
    }

    .status-badge.purchased {
      background: #28a745;
      color: white;
    }

    .status-badge.giving {
      background: #007bff;
      color: white;
    }

    .status-badge.flagged {
      background: #ffc107;
      color: #333;
    }

    .card-actions {
      display: flex;
      gap: 6px;
      margin-top: 8px;
      flex-wrap: wrap;
    }

    .card-actions button {
      padding: 6px 12px;
      font-size: 0.8em;
      border: 1px solid #d4af37;
      border-radius: 4px;
      cursor: pointer;
      background: transparent;
      color: #d4af37;
      font-weight: 600;
      transition: all 0.2s;
    }

    .card-actions button:hover {
      background: #d4af37;
      color: #0f1428;
    }

    .card-actions button.clear {
      border-color: #dc3545;
      color: #dc3545;
    }

    .card-actions button.clear:hover {
      background: #dc3545;
      color: white;
    }

    /* Themed checkbox */
    input[type="checkbox"] {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      width: 20px;
      height: 20px;
      border: 2px solid #d4af37;
      border-radius: 3px;
      background: #0f1428;
      cursor: pointer;
      transition: all 0.2s;
    }

    input[type="checkbox"]:hover {
      border-color: #ffd700;
      box-shadow: 0 0 8px rgba(212, 175, 55, 0.3);
    }

    input[type="checkbox"]:checked {
      background: #d4af37;
      border-color: #d4af37;
    }

    input[type="checkbox"]:checked::after {
      content: '✓';
      display: flex;
      align-items: center;
      justify-content: center;
      color: #0f1428;
      font-weight: bold;
      font-size: 14px;
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
      border: 1px solid #333;
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

    .table-wrapper {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      margin-bottom: 20px;
    }

    @media (max-width: 768px) {
      .table-wrapper {
        border: 2px solid #d4af37;
        border-radius: 0;
      }

      .cards-table {
        min-width: 600px;
      }
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
          <h1>🃏 Build a deck together</h1>
          <p class="subtitle">Upload your card lists and compare ownership across friends to try and build something together.</p>
        </div>
        <div style="display: flex; align-items: baseline; gap: 12px; margin-right: 20px;">
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
      <!-- Needed Cards Upload -->
      <div class="card">
        <h2>Needed Cards</h2>
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
          <button class="btn-secondary btn-small" onclick="deletePrimaryList()" style="margin-top: 10px;">Clear Needed Cards</button>
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
            <label style="display: block; margin-bottom: 10px;">Filter by Needed Cards List:</label>
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
            <button class="btn-primary" onclick="exportToCSV()">Export List to CSV</button>
            <button class="btn-primary" onclick="exportToCardKingdom()">Copy Unowned Cards</button>
          </div>
        </div>
      </div>

      <div id="bulkToolbar" style="display: none; background: #1a1f3a; border: 2px solid #d4af37; padding: 15px; margin-bottom: 20px; border-radius: 4px; gap: 10px; align-items: center; flex-wrap: wrap;">
        <span style="color: #d4af37; font-weight: 600;"><span id="bulkToolbarCount">0</span> cards selected</span>
        <button class="btn-primary" onclick="openBulkAcquiredModal()" style="padding: 8px 15px;">Bulk: Card Acquired</button>
        <button class="btn-primary" onclick="openBulkGivingModal()" style="padding: 8px 15px;">Bulk: Giving</button>
        <button class="btn-secondary" onclick="selectAllVisibleCards()" style="padding: 8px 15px;">Select All</button>
        <button class="btn-secondary" onclick="selectedCards.clear(); updateBulkToolbar(); updateUI();" style="padding: 8px 15px; margin-left: auto;">Clear Selection</button>
      </div>

      <div id="cardsContainer" class="cards-grid"></div>

      <!-- Orphaned Cards Section -->
      <div id="orphanedSection" style="display: none; margin-top: 40px; background: linear-gradient(135deg, #2d1b4e 0%, #1a1f3a 100%); border: 2px solid #ffc107; padding: 25px; box-shadow: 0 0 20px rgba(255, 193, 7, 0.2);">
        <h3 style="color: #ffc107; margin-top: 0; display: flex; align-items: center; gap: 10px;">
          ⚠️ Orphaned Cards
          <span style="font-size: 0.8em; color: #a8b8e6;">(<span id="orphanedCount">0</span> cards)</span>
        </h3>
        <p style="color: #a8b8e6; margin-bottom: 15px;">These cards have purchase/giving status but are no longer in any needed list. You can clear them individually or all at once.</p>
        <div id="orphanedList" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px; max-height: 300px; overflow-y: auto;"></div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button class="btn-primary" onclick="clearAllOrphaned()" style="background: #ffc107; color: #333;">Clear All Orphaned Cards</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Card Acquired Modal -->
  <div id="cardAcquiredModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 1000; justify-content: center; align-items: center;">
    <div style="background: #1a1f3a; border: 2px solid #d4af37; padding: 25px; border-radius: 8px; max-width: 400px; width: 90%;">
      <h3 style="color: #d4af37; margin-top: 0;">Card Acquired</h3>
      <div style="margin-bottom: 15px;">
        <label style="color: #d4af37; display: block; margin-bottom: 5px;">Quantity Purchased:</label>
        <input type="number" id="acquiredQuantity" min="1" style="width: 100%; padding: 8px; background: #0f1428; color: #fff; border: 1px solid #d4af37; border-radius: 4px;">
      </div>
      <div style="margin-bottom: 15px;">
        <label style="color: #d4af37; display: block; margin-bottom: 5px;">Who Purchased? (optional):</label>
        <input type="text" id="acquiredBy" placeholder="Leave blank for 'Unknown'" style="width: 100%; padding: 8px; background: #0f1428; color: #fff; border: 1px solid #d4af37; border-radius: 4px;">
      </div>
      <div style="display: flex; gap: 10px;">
        <button class="btn-primary" onclick="confirmCardAcquired()" style="flex: 1;">Confirm</button>
        <button class="btn-secondary" onclick="closeModal('cardAcquiredModal')" style="flex: 1;">Cancel</button>
      </div>
    </div>
  </div>

  <!-- Giving Modal -->
  <div id="givingModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 1000; justify-content: center; align-items: center;">
    <div style="background: #1a1f3a; border: 2px solid #d4af37; padding: 25px; border-radius: 8px; max-width: 400px; width: 90%;">
      <h3 style="color: #d4af37; margin-top: 0;">Mark as Giving</h3>
      <div style="margin-bottom: 15px;">
        <label style="color: #d4af37; display: block; margin-bottom: 5px;">Quantity Giving:</label>
        <input type="number" id="givingQuantity" min="1" style="width: 100%; padding: 8px; background: #0f1428; color: #fff; border: 1px solid #d4af37; border-radius: 4px;">
      </div>
      <div style="margin-bottom: 15px;">
        <label style="color: #d4af37; display: block; margin-bottom: 5px;">Select Owned List:</label>
        <select id="givingList" style="width: 100%; padding: 8px; background: #0f1428; color: #fff; border: 1px solid #d4af37; border-radius: 4px;">
          <option value="">-- Select List --</option>
        </select>
      </div>
      <div style="display: flex; gap: 10px;">
        <button class="btn-primary" onclick="confirmGiving()" style="flex: 1;">Confirm</button>
        <button class="btn-secondary" onclick="closeModal('givingModal')" style="flex: 1;">Cancel</button>
      </div>
    </div>
  </div>

  <!-- Bulk Card Acquired Modal -->
  <div id="bulkAcquiredModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 1000; justify-content: center; align-items: center;">
    <div style="background: #1a1f3a; border: 2px solid #d4af37; padding: 25px; border-radius: 8px; max-width: 400px; width: 90%;">
      <h3 style="color: #d4af37; margin-top: 0;">Bulk: Card Acquired</h3>
      <p style="color: #a8b8e6; margin-bottom: 15px;">Mark <span id="bulkSelectedCount">0</span> cards as fully acquired?</p>
      <div style="margin-bottom: 15px;">
        <label style="color: #d4af37; display: block; margin-bottom: 5px;">Who Purchased? (optional):</label>
        <input type="text" id="bulkAcquiredBy" placeholder="Name" style="width: 100%; padding: 8px; background: #0f1428; color: #fff; border: 1px solid #d4af37; border-radius: 4px;">
      </div>
      <div style="display: flex; gap: 10px;">
        <button class="btn-primary" onclick="confirmBulkAcquired()" style="flex: 1;">Confirm</button>
        <button class="btn-secondary" onclick="closeModal('bulkAcquiredModal')" style="flex: 1;">Cancel</button>
      </div>
    </div>
  </div>

  <!-- Bulk Giving Modal -->
  <div id="bulkGivingModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 1000; justify-content: center; align-items: center;">
    <div style="background: #1a1f3a; border: 2px solid #d4af37; padding: 25px; border-radius: 8px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;">
      <h3 style="color: #d4af37; margin-top: 0;">Bulk: Mark as Giving</h3>
      <div style="margin-bottom: 15px;">
        <label style="color: #d4af37; display: block; margin-bottom: 5px;">Select Owned List:</label>
        <select id="bulkGivingList" style="width: 100%; padding: 8px; background: #0f1428; color: #fff; border: 1px solid #d4af37; border-radius: 4px;" onchange="updateBulkGivingValidation()">
          <option value="">-- Select List --</option>
        </select>
      </div>
      <div id="bulkGivingValidation" style="margin-bottom: 15px; padding: 12px; background: #0f1428; border-left: 4px solid #ffc107; border-radius: 4px; display: none;">
        <p style="color: #ffc107; margin: 0; font-weight: 600;">Validation</p>
        <p id="bulkGivingValidationText" style="color: #a8b8e6; margin: 5px 0 0 0; font-size: 0.9em;"></p>
      </div>
      <div style="display: flex; gap: 10px;">
        <button class="btn-primary" onclick="confirmBulkGiving()" style="flex: 1;">Confirm</button>
        <button class="btn-secondary" onclick="closeModal('bulkGivingModal')" style="flex: 1;">Cancel</button>
      </div>
    </div>
  </div>

  <script>
    let appData = { primaryLists: [], uploadedLists: [], ownershipStatuses: [] };
    let ownershipStatuses = [];
    let orphanedStatuses = [];
    let selectedCards = new Set();
    let cardSortOrder = 'original'; // 'original', 'asc', 'desc'
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
        await loadOwnershipStatuses();
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

    // Load ownership statuses
    async function loadOwnershipStatuses() {
      try {
        const response = await fetch('/api/ownership-status/statuses');
        if (!response.ok) {
          console.error('Failed to load ownership statuses');
          return;
        }
        const result = await response.json();
        ownershipStatuses = result.statuses || [];
        orphanedStatuses = result.orphaned || [];
      } catch (error) {
        console.error('Error loading ownership statuses:', error);
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
      const neededCardsListNames = appData.primaryLists.map(list => list.name);
      
      // Keep "All Lists" button
      let html = '<div class="filter-label active" data-filter-type="primaryList" data-filter-value="" onclick="toggleFilter(this)">All Lists</div>';
      
      // Add needed cards list buttons
      html += neededCardsListNames.map(name => 
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

      // Apply sorting if not in original order
      if (cardSortOrder === 'asc') {
        cards.sort((a, b) => a.name.localeCompare(b.name));
      } else if (cardSortOrder === 'desc') {
        cards.sort((a, b) => b.name.localeCompare(a.name));
      }

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

      // Display orphaned cards section
      displayOrphanedCards();
    }

    // Get ownership status for a card
    function getOwnershipStatus(cardName) {
      return ownershipStatuses.find(s => s.cardName === cardName);
    }

    // Get status badge HTML
    function getStatusBadgeHTML(cardName) {
      const status = getOwnershipStatus(cardName);
      if (!status) return '';
      
      let badges = '';
      if (status.purchasedCount > 0) {
        badges += \`<span class="status-badge purchased" title="Purchased by \${status.purchasedBy || 'Unknown'}">Purchased: \${status.purchasedCount}\${status.purchasedBy ? ' by ' + status.purchasedBy : ''}</span>\`;
      }
      if (status.givingEntries && status.givingEntries.length > 0) {
        const totalGiving = status.givingEntries.reduce((sum, e) => sum + e.quantity, 0);
        const giversList = status.givingEntries.map(e => \`\${e.quantity} from \${e.givenBy}\`).join(', ');
        badges += \`<span class="status-badge giving" title="\${giversList}">Giving: \${totalGiving}</span>\`;
      }
      if (status.flagged) {
        badges += \`<span class="status-badge flagged" title="Needed count changed">⚠️ Changed</span>\`;
      }
      
      return badges;
    }

    // Update ownership status via API
    async function updateOwnershipStatus(cardName, update) {
      try {
        const response = await fetch('/api/ownership-status/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cardName, ...update })
        });
        if (response.ok) {
          // Parse response
          await response.json();
          
          // Reload ownership statuses from server
          await loadOwnershipStatuses();
          
          // Wait to ensure state is fully updated
          await new Promise(resolve => setTimeout(resolve, 200));
          
          // Update comparison to re-render cards while preserving filters
          updateComparison();
        } else {
          console.error('Failed to update ownership status');
        }
      } catch (error) {
        console.error('Error updating ownership status:', error);
      }
    }

    // Delete ownership status via API
    async function deleteOwnershipStatus(cardName) {
      try {
        const url = '/api/ownership-status/' + encodeURIComponent(cardName);
        const response = await fetch(url, {
          method: 'DELETE'
        });
        if (response.ok) {
          await loadOwnershipStatuses();
          updateComparison();
        } else {
          console.error('Failed to delete ownership status');
        }
      } catch (error) {
        console.error('Error deleting ownership status:', error);
      }
    }

    // Modal control functions
    let currentCardName = '';

    function closeModal(modalId) {
      document.getElementById(modalId).style.display = 'none';
    }

    function openCardAcquiredModal(cardName, remainingNeeded) {
      currentCardName = cardName;
      document.getElementById('acquiredQuantity').value = remainingNeeded;
      document.getElementById('acquiredBy').value = '';
      document.getElementById('cardAcquiredModal').style.display = 'flex';
    }

    function openGivingModal(cardName, remainingNeeded) {
      currentCardName = cardName;
      document.getElementById('givingQuantity').value = 1; // Default to 1
      document.getElementById('givingList').innerHTML = '<option value="">-- Select List --</option>';
      
      // Populate with uploaded lists that contain this card
      const validLists = [];
      for (const list of appData.uploadedLists) {
        const hasCard = list.cards.some(c => c.name === cardName);
        if (hasCard) {
          validLists.push(list);
          const option = document.createElement('option');
          option.value = list.uploaderName;
          option.textContent = list.uploaderName;
          document.getElementById('givingList').appendChild(option);
        }
      }
      
      // Auto-select if only one list
      if (validLists.length === 1) {
        document.getElementById('givingList').value = validLists[0].uploaderName;
      }
      
      document.getElementById('givingModal').style.display = 'flex';
    }

    async function confirmCardAcquired() {
      const quantity = parseInt(document.getElementById('acquiredQuantity').value);
      const purchasedBy = document.getElementById('acquiredBy').value.trim() || 'Unknown';
      
      if (!quantity || quantity < 1) {
        alert('Please enter a valid quantity');
        return;
      }
      
      await updateOwnershipStatus(currentCardName, {
        purchasedCount: quantity,
        purchasedBy: purchasedBy,
        neededCount: quantity
      });
      
      closeModal('cardAcquiredModal');
    }

    async function confirmGiving() {
      const quantity = parseInt(document.getElementById('givingQuantity').value);
      const listName = document.getElementById('givingList').value;
      
      if (!quantity || quantity < 1) {
        alert('Please enter a valid quantity');
        return;
      }
      
      if (!listName) {
        alert('Please select an owned list');
        return;
      }
      
      // Get the uploader name from the selected list
      const selectedList = appData.uploadedLists.find(l => l.uploaderName === listName);
      if (!selectedList) {
        alert('Selected list not found');
        return;
      }
      
      // Get current status to preserve other fields
      const currentStatus = getOwnershipStatus(currentCardName);
      const currentNeededCount = currentStatus?.neededCount || quantity;
      const currentGivingEntries = currentStatus?.givingEntries || [];
      
      // Add new giving entry (or update if from same list)
      const existingIndex = currentGivingEntries.findIndex(e => e.givenFromList === listName);
      if (existingIndex >= 0) {
        currentGivingEntries[existingIndex].quantity = quantity;
      } else {
        currentGivingEntries.push({
          quantity: quantity,
          givenBy: selectedList.uploaderName,
          givenFromList: listName
        });
      }
      
      await updateOwnershipStatus(currentCardName, {
        givingEntries: currentGivingEntries,
        neededCount: currentNeededCount
      });
      
      closeModal('givingModal');
    }

    // Bulk action functions
    function toggleCardSelection(cardName) {
      if (selectedCards.has(cardName)) {
        selectedCards.delete(cardName);
      } else {
        selectedCards.add(cardName);
      }
      updateBulkToolbar();
    }

    function selectAllVisibleCards() {
      // Get all visible card checkboxes and select them
      const checkboxes = document.querySelectorAll('input[type="checkbox"][onchange*="toggleCardSelection"]');
      checkboxes.forEach(checkbox => {
        const cardName = checkbox.getAttribute('onchange').match(/'([^']+)'/)[1];
        selectedCards.add(cardName);
        checkbox.checked = true;
      });
      updateBulkToolbar();
    }

    function toggleSelectAll(checked, totalCards) {
      if (checked) {
        // Select all visible cards
        const checkboxes = document.querySelectorAll('input[type="checkbox"][onchange*="toggleCardSelection"]');
        checkboxes.forEach(checkbox => {
          const cardName = checkbox.getAttribute('onchange').match(/'([^']+)'/)[1];
          selectedCards.add(cardName);
          checkbox.checked = true;
        });
      } else {
        // Deselect all
        selectedCards.clear();
        const checkboxes = document.querySelectorAll('input[type="checkbox"][onchange*="toggleCardSelection"]');
        checkboxes.forEach(checkbox => {
          checkbox.checked = false;
        });
      }
      updateBulkToolbar();
    }

    function updateBulkToolbar() {
      const toolbar = document.getElementById('bulkToolbar');
      const selectAllCheckbox = document.getElementById('selectAllCheckbox');
      if (selectedCards.size > 0) {
        toolbar.style.display = 'flex';
        // Update select all checkbox state
        if (selectAllCheckbox) {
          const allCheckboxes = document.querySelectorAll('input[type="checkbox"][onchange*="toggleCardSelection"]');
          selectAllCheckbox.checked = selectedCards.size === allCheckboxes.length;
        }
      } else {
        toolbar.style.display = 'none';
        if (selectAllCheckbox) selectAllCheckbox.checked = false;
      }
      document.getElementById('bulkToolbarCount').textContent = selectedCards.size;
    }

    function toggleCardSort() {
      // Cycle through: original -> asc -> desc -> original
      if (cardSortOrder === 'original') {
        cardSortOrder = 'asc';
      } else if (cardSortOrder === 'asc') {
        cardSortOrder = 'desc';
      } else {
        cardSortOrder = 'original';
      }
      updateComparison();
    }

    function openBulkAcquiredModal() {
      document.getElementById('bulkSelectedCount').textContent = selectedCards.size;
      document.getElementById('bulkAcquiredBy').value = '';
      document.getElementById('bulkAcquiredModal').style.display = 'flex';
    }

    function openBulkGivingModal() {
      document.getElementById('bulkGivingList').innerHTML = '<option value="">-- Select List --</option>';
      
      // Populate with uploaded lists that contain at least one selected card
      for (const list of appData.uploadedLists) {
        const hasAnyCard = Array.from(selectedCards).some(cardName => 
          list.cards.some(c => c.name === cardName)
        );
        if (hasAnyCard) {
          const option = document.createElement('option');
          option.value = list.uploaderName;
          option.textContent = list.uploaderName;
          document.getElementById('bulkGivingList').appendChild(option);
        }
      }
      
      document.getElementById('bulkGivingValidation').style.display = 'none';
      document.getElementById('bulkGivingModal').style.display = 'flex';
    }

    function updateBulkGivingValidation() {
      const listName = document.getElementById('bulkGivingList').value;
      if (!listName) {
        document.getElementById('bulkGivingValidation').style.display = 'none';
        return;
      }

      const selectedList = appData.uploadedLists.find(l => l.uploaderName === listName);
      if (!selectedList) return;

      const cardsInList = new Set(selectedList.cards.map(c => c.name));
      const cardsNotInList = Array.from(selectedCards).filter(name => !cardsInList.has(name));

      if (cardsNotInList.length > 0) {
        document.getElementById('bulkGivingValidation').style.display = 'block';
        document.getElementById('bulkGivingValidationText').textContent = 
          \`⚠️ \${cardsNotInList.length} of \${selectedCards.size} cards are NOT in "\${listName}". Only \${selectedCards.size - cardsNotInList.length} will be marked as giving.\`;
      } else {
        document.getElementById('bulkGivingValidation').style.display = 'block';
        document.getElementById('bulkGivingValidationText').textContent = 
          \`✓ All \${selectedCards.size} selected cards found in "\${listName}".\`;
      }
    }

    async function confirmBulkAcquired() {
      const purchasedBy = document.getElementById('bulkAcquiredBy').value.trim() || 'Unknown';

      const cardNames = Array.from(selectedCards);
      try {
        const response = await fetch('/api/ownership-status/bulk-update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cardNames: cardNames,
            update: {
              purchasedCount: 1,
              purchasedBy: purchasedBy
            }
          })
        });

        if (response.ok) {
          await loadOwnershipStatuses();
          selectedCards.clear();
          updateBulkToolbar();
          updateUI();
          closeModal('bulkAcquiredModal');
        }
      } catch (error) {
        console.error('Error bulk updating:', error);
        alert('Error updating cards');
      }
    }

    async function confirmBulkGiving() {
      const listName = document.getElementById('bulkGivingList').value;
      
      if (!listName) {
        alert('Please select an owned list');
        return;
      }

      const selectedList = appData.uploadedLists.find(l => l.uploaderName === listName);
      if (!selectedList) {
        alert('Selected list not found');
        return;
      }

      const cardsInList = new Set(selectedList.cards.map(c => c.name));
      const cardNames = Array.from(selectedCards).filter(name => cardsInList.has(name));

      if (cardNames.length === 0) {
        alert('No selected cards found in this list');
        return;
      }

      try {
        const response = await fetch('/api/ownership-status/bulk-update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cardNames: cardNames,
            update: {
              givingEntries: [{
                quantity: 1,
                givenBy: selectedList.uploaderName,
                givenFromList: listName
              }]
            }
          })
        });

        if (response.ok) {
          await loadOwnershipStatuses();
          selectedCards.clear();
          updateBulkToolbar();
          updateUI();
          closeModal('bulkGivingModal');
        }
      } catch (error) {
        console.error('Error bulk updating:', error);
        alert('Error updating cards');
      }
    }

    // Orphaned cards functions
    function displayOrphanedCards() {
      const orphanedSection = document.getElementById('orphanedSection');
      const orphanedList = document.getElementById('orphanedList');
      const orphanedCount = document.getElementById('orphanedCount');

      if (orphanedStatuses.length === 0) {
        orphanedSection.style.display = 'none';
        return;
      }

      orphanedSection.style.display = 'block';
      orphanedCount.textContent = orphanedStatuses.length;

      orphanedList.innerHTML = orphanedStatuses.map(status => {
        let statusInfo = '';
        if (status.purchasedCount > 0) {
          statusInfo += \`Purchased: \${status.purchasedCount}\${status.purchasedBy ? ' by ' + status.purchasedBy : ''}\`;
        }
        if (status.givingEntries && status.givingEntries.length > 0) {
          if (statusInfo) statusInfo += ' | ';
          const totalGiving = status.givingEntries.reduce((sum, e) => sum + e.quantity, 0);
          const giversList = status.givingEntries.map(e => \`\${e.quantity} from \${e.givenBy}\`).join(', ');
          statusInfo += \`Giving: \${totalGiving} (\${giversList})\`;
        }

        return \`
          <div style="background: #0f1428; padding: 12px; border-left: 4px solid #ffc107; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="color: #d4af37; font-weight: 600;">\${status.cardName}</div>
              <div style="color: #a8b8e6; font-size: 0.9em;">\${statusInfo || 'No status'}</div>
            </div>
            <button class="btn-secondary" onclick="deleteOwnershipStatus('\${status.cardName.replace(/'/g, "\\\\'")}'); displayOrphanedCards();" style="padding: 6px 12px; font-size: 0.85em;">Remove</button>
          </div>
        \`;
      }).join('');
    }

    async function clearAllOrphaned() {
      if (!confirm('Clear all orphaned cards? This cannot be undone.')) {
        return;
      }

      try {
        const response = await fetch('/api/ownership-status/orphaned/all', {
          method: 'DELETE'
        });

        if (response.ok) {
          await loadOwnershipStatuses();
          displayOrphanedCards();
          updateUI();
        }
      } catch (error) {
        console.error('Error clearing orphaned cards:', error);
        alert('Error clearing orphaned cards');
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

          const remainingNeeded = Math.max(0, card.needed - totalOwned);
          const statusBadges = getStatusBadgeHTML(card.name);
          const ownershipStatus = getOwnershipStatus(card.name);
          const totalGiving = ownershipStatus?.givingEntries?.reduce((sum, e) => sum + e.quantity, 0) || 0;
          const totalPurchased = ownershipStatus?.purchasedCount || 0;
          const totalTracked = totalGiving + totalPurchased;
          const isCompleted = totalTracked >= card.needed && totalTracked > 0;
          const hasStatus = ownershipStatus && (ownershipStatus.purchasedCount > 0 || (ownershipStatus.givingEntries && ownershipStatus.givingEntries.length > 0));
          const canAcquire = remainingNeeded > 0;
          const canGive = totalOwned > 0 && !isCompleted;
          
          const cardNameStyle = isCompleted ? 'style="background: #2d5f3f; color: #4ade80; font-weight: 600; padding: 4px 8px; border-radius: 4px;"' : '';
          
          const actionButtons = viewOnlyMode ? '' : \`
            <div class="card-actions">
              \${canAcquire ? \`<button class="action-btn" onclick="openCardAcquiredModal('\${card.name.replace(/'/g, "\\\\'")}', \${remainingNeeded})">Acquire</button>\` : ''}
              \${canGive ? \`<button class="action-btn" onclick="openGivingModal('\${card.name.replace(/'/g, "\\\\'")}', \${remainingNeeded})">Give</button>\` : ''}
              \${hasStatus ? \`<button class="action-btn clear" onclick="deleteOwnershipStatus('\${card.name.replace(/'/g, "\\\\'")}')">Clear</button>\` : ''}
            </div>
          \`;

          const checkbox = viewOnlyMode ? '' : \`<input type="checkbox" style="width: 18px; height: 18px; cursor: pointer;" onchange="toggleCardSelection('\${card.name.replace(/'/g, "\\\\'")}'); document.getElementById('bulkToolbarCount').textContent = selectedCards.size;" \${selectedCards.has(card.name) ? 'checked' : ''}>\`;

          return \`
            <div class="card-item" style="position: relative;">
              \${checkbox ? \`<div style="position: absolute; top: 10px; right: 10px; z-index: 10;">\${checkbox}</div>\` : ''}
              <div class="card-image">
                \${card.imageUrl ? \`<img src="\${card.imageUrl}" alt="\${card.name}" onerror="this.style.display='none'">\` : 'No image available'}
              </div>
              <div class="card-info">
                <div class="card-name" \${cardNameStyle}>\${card.name}</div>
                <div class="card-needed">Need: \${card.needed} | Owned: \${totalOwned}</div>
                <div class="card-owners">\${ownersList || 'Not owned'}</div>
                \${statusBadges ? \`<div>\${statusBadges}</div>\` : ''}
                \${actionButtons}
              </div>
            </div>
          \`;
        }).join('');
      } else {
        // Table view without images
        container.className = '';
        const headerRow = \`
          <div class="table-wrapper">
            <table class="cards-table">
              <thead>
                <tr>
                  \${viewOnlyMode ? '' : '<th style="width: 30px;"><input type="checkbox" id="selectAllCheckbox" onchange="toggleSelectAll(this.checked, ' + cards.length + ')"></th>'}
                  <th style="cursor: pointer; user-select: none;" onclick="toggleCardSort()" title="Click to sort">Card Name \${cardSortOrder === 'asc' ? '▲' : cardSortOrder === 'desc' ? '▼' : ''}</th>
                  <th>Need</th>
                  <th>Owned</th>
                  <th>Status</th>
                  <th>Owners</th>
                  \${viewOnlyMode ? '' : '<th style="width: 150px;">Actions</th>'}
                </tr>
              </thead>
              <tbody>
        \`;
        
        const rows = cards.map(card => {
          const totalOwned = Object.values(card.owners).reduce((a, b) => a + b, 0);
          const remainingNeeded = Math.max(0, card.needed - totalOwned);
          let status;
          if (totalOwned >= card.needed) status = 'Fully Owned';
          else if (totalOwned > 0) status = 'Partially Owned';
          else status = 'Not Owned';
          
          const ownershipStatus = getOwnershipStatus(card.name);
          const totalGiving = ownershipStatus?.givingEntries?.reduce((sum, e) => sum + e.quantity, 0) || 0;
          const totalPurchased = ownershipStatus?.purchasedCount || 0;
          const totalTracked = totalGiving + totalPurchased;
          const isCompleted = totalTracked >= card.needed && totalTracked > 0;
          const hasStatus = ownershipStatus && (ownershipStatus.purchasedCount > 0 || (ownershipStatus.givingEntries && ownershipStatus.givingEntries.length > 0));
          const canAcquire = remainingNeeded > 0;
          const canGive = totalOwned > 0 && !isCompleted;
          const statusBadges = getStatusBadgeHTML(card.name);
          const cardNameStyle = isCompleted ? 'style="background: #2d5f3f; color: #4ade80; font-weight: 600;"' : '';
          
          const ownersList = Object.entries(card.owners)
            .map(([owner, count]) => {
              let badgeClass = 'owner-badge';
              if (count >= card.needed) badgeClass += ' owned';
              else if (count > 0) badgeClass += ' partial';
              else badgeClass += ' missing';
              return \`<span class="\${badgeClass}">\${owner}: \${count}</span>\`;
            })
            .join(' ');

          const checkbox = viewOnlyMode ? '' : \`<td><input type="checkbox" onchange="toggleCardSelection('\${card.name.replace(/'/g, "\\\\'")}'); document.getElementById('bulkToolbarCount').textContent = selectedCards.size;" \${selectedCards.has(card.name) ? 'checked' : ''}></td>\`;
          
          const actionButtons = viewOnlyMode ? '' : \`
            <td style="white-space: nowrap; vertical-align: middle; padding: 8px 4px;">
              <div style="display: flex; gap: 4px; align-items: center; height: 32px;">
                \${canAcquire ? \`<button class="action-btn" style="padding: 6px 10px; font-size: 0.8em;" onclick="openCardAcquiredModal('\${card.name.replace(/'/g, "\\\\'")}', \${remainingNeeded})">Acquire</button>\` : ''}
                \${canGive ? \`<button class="action-btn" style="padding: 6px 10px; font-size: 0.8em;" onclick="openGivingModal('\${card.name.replace(/'/g, "\\\\'")}', \${remainingNeeded})">Give</button>\` : ''}
                \${hasStatus ? \`<button class="action-btn clear" style="padding: 6px 10px; font-size: 0.8em;" onclick="deleteOwnershipStatus('\${card.name.replace(/'/g, "\\\\'")}')">Clear</button>\` : ''}
              </div>
            </td>
          \`;

          return \`
            <tr>
              \${checkbox}
              <td class="card-name" \${cardNameStyle}>\${card.name}</td>
              <td>\${card.needed}</td>
              <td>\${totalOwned}</td>
              <td>\${status}\${statusBadges ? \`<br/><small>\${statusBadges}</small>\` : ''}</td>
              <td>\${ownersList || 'Not owned'}</td>
              \${actionButtons}
            </tr>
          \`;
        }).join('');
        
        const footerRow = '</tbody></table></div>';
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
      // Get currently active filters
      const filterStatuses = Array.from(document.querySelectorAll('.filter-label[data-filter-type="status"].active')).map(el => el.dataset.filterValue);
      const filterOwners = Array.from(document.querySelectorAll('.filter-label[data-filter-type="owner"].active')).map(el => el.dataset.filterValue).filter(v => v);

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

        if (!filterStatuses.includes(status) && !filterStatuses.includes('all')) return false;
        if (filterOwners.length > 0) {
          const hasAnyOwner = filterOwners.some(owner => card.owners[owner]);
          if (!hasAnyOwner) return false;
        }

        return true;
      });

      if (cards.length === 0) {
        alert('No cards to export. Try adjusting your filters.');
        return;
      }

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

      // Get currently active filters
      const filterStatuses = Array.from(document.querySelectorAll('.filter-label[data-filter-type="status"].active')).map(el => el.dataset.filterValue);
      const filterOwners = Array.from(document.querySelectorAll('.filter-label[data-filter-type="owner"].active')).map(el => el.dataset.filterValue).filter(v => v);

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

      if (!deckList) {
        alert('No cards need to be purchased based on current filters.');
        return;
      }

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
