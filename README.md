# MTG Card Comparison Tool

A Cloudflare Workers application for comparing Magic: The Gathering card ownership across friends.

## Features

### Core Features
- **Multiple Primary Lists**: Upload multiple primary card lists for flexibility
- **Bulk File Upload**: Drag-and-drop or select multiple files at once
- **Visual Card Display**: Integrates with Scryfall API to show card images
- **Ownership Tracking**: See which cards are owned and by whom
- **Multi-Select Filtering**: Filter by ownership status, owner, and primary list simultaneously
- **Persistent Storage**: Uses Cloudflare R2 for data persistence

### Advanced Features
- **Local Mode**: Work locally without immediately backing up to R2
  - Make changes freely without affecting the shared backup
  - "Reset to Backup" button to discard local changes
  - Smart prompts only when you have unsaved changes
- **View-Only Sharing**: Generate shareable links that allow viewing and filtering but prevent edits
  - Perfect for sharing with collaborators who shouldn't modify data
  - Uploaded files and lists remain visible
- **Smart Image Loading**: 
  - Toggle card images on/off for performance
  - Cancels pending image requests when toggled off
  - Resumes fetching only missing images when toggled back on
- **Export Options**:
  - CSV export for spreadsheet analysis
  - Card Kingdom bulk deck builder format for easy purchasing
- **Responsive UI**: Dark Magic: The Gathering-themed design with sharp borders
- **Hot Reload**: Automatic page reload during development

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Wrangler CLI (`npm install -g wrangler`)
- Cloudflare account

### Installation

1. Clone or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a Cloudflare R2 bucket named `mtg-owner-comparison`:
   ```bash
   wrangler r2 bucket create mtg-owner-comparison
   ```

4. Update `wrangler.toml` with your Cloudflare account details if needed

## Development

Start the development server with hot reload:

```bash
npm run dev
```

The application will be available at `http://localhost:8787`

Changes to files in `src/` will automatically reload the page.

## Deployment

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

## Usage

### Basic Workflow

1. **Upload Primary List(s)**: 
   - Drag files into the drop zone or click to select
   - Supports multiple files at once
   - Format: One card per line, or CSV with `cardname,quantity`
   - Example:
     ```
     Black Lotus,1
     Mox Jet,1
     Ancestral Recall,1
     ```

2. **Upload Owned Cards**:
   - Enter your name (or leave blank to use filename)
   - Drag files into the drop zone or click to select
   - Supports multiple files - each gets appended with filename (e.g., "Alice - deck1")
   - Click "Upload My Cards"

3. **View Comparison**:
   - See all cards from the primary list(s) with card images
   - Each card shows who owns it and how many copies
   - Cards are color-coded by ownership status
   - Toggle card images on/off for performance

4. **Filter & Export**:
   - Filter by ownership status (Fully Owned, Partially Owned, Not Owned)
   - Filter by specific owner
   - Filter by primary list
   - Export filtered results to CSV or Card Kingdom format

### Advanced Features

**Local Mode**:
- Toggle "Local Mode" to work without affecting the shared backup
- Make changes freely - they stay local until you commit
- Click "Reset to Backup" to discard local changes
- When disabling local mode with changes, you'll be prompted to save or discard

**View-Only Sharing**:
- Click "Share View Only" to copy a link
- Share the link with others - they can view and filter but cannot edit
- Perfect for sharing with collaborators who shouldn't modify data

## File Format

### CSV Format
```
Card Name,Quantity
Black Lotus,1
Mox Jet,2
Ancestral Recall,1
```

### Line-Separated Format
```
Black Lotus
Mox Jet
Mox Jet
Ancestral Recall
```

## Architecture

- **Backend**: Cloudflare Workers (TypeScript)
- **Storage**: Cloudflare R2
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Card Data**: Scryfall API

## API Endpoints

- `GET /` - Serve the HTML interface
- `POST /api/upload-primary` - Upload primary card list(s)
- `POST /api/upload-owned` - Upload owned cards list(s)
- `GET /api/data` - Get all stored data
- `POST /api/backup` - Save current data to R2 (used by local mode)
- `DELETE /api/primary/:name` - Delete a specific primary list by name
- `DELETE /api/list/:uploaderName` - Remove a person's card list

## Data Storage

Data is stored in Cloudflare R2 as JSON with the following structure:

```json
{
  "primaryLists": [
    {
      "name": "filename.csv",
      "cards": [
        { "name": "Card Name", "count": 1 },
        ...
      ],
      "uploadedAt": "2024-01-01T00:00:00Z"
    },
    ...
  ],
  "uploadedLists": [
    {
      "uploaderName": "Alice",
      "cards": [
        { "name": "Card Name", "count": 1 },
        ...
      ],
      "uploadedAt": "2024-01-01T00:00:00Z"
    },
    ...
  ]
}
```

## Notes

- Card images are fetched from Scryfall API (may take a moment to load)
- Duplicate cards are automatically deduplicated and counted
- Ownership is tracked by count, so if you need 2 copies and someone owns 1, it shows as partially owned
- All data is persistent and shared via the URL
- Multiple primary lists are combined for comparison
- File names are automatically appended to owner names when uploading multiple files
- Local mode allows offline changes without affecting the shared backup
- View-only links are perfect for sharing with read-only access
- Image requests are intelligently cancelled and resumed to save API calls

## License

MIT
