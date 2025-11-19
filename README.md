# MTG Card Comparison Tool

A Cloudflare Workers application for comparing Magic: The Gathering card ownership across friends.

## Features

- **Upload Primary Card List**: Define the cards your group needs
- **Upload Owned Cards**: Each person uploads their owned cards
- **Visual Card Display**: Integrates with Scryfall API to show card images
- **Ownership Tracking**: See which cards are owned and by whom
- **Filtering**: Filter by ownership status and by person
- **CSV Export**: Export filtered results to CSV for easy sharing
- **Persistent Storage**: Uses Cloudflare R2 for data persistence
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

1. **Upload Primary List**: 
   - Click "Upload Primary List" and select a CSV or text file
   - Format: One card per line, or CSV with `cardname,quantity`
   - Example:
     ```
     Black Lotus,1
     Mox Jet,1
     Ancestral Recall,1
     ```

2. **Upload Owned Cards**:
   - Enter your name
   - Upload your card list in the same format
   - Click "Upload My Cards"

3. **View Comparison**:
   - See all cards from the primary list with card images
   - Each card shows who owns it and how many copies
   - Cards are color-coded by ownership status

4. **Filter & Export**:
   - Filter by ownership status (Fully Owned, Partially Owned, Not Owned)
   - Filter by specific person
   - Export filtered results to CSV

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
- `POST /api/upload-primary` - Upload primary card list
- `POST /api/upload-owned` - Upload owned cards list
- `GET /api/data` - Get all stored data
- `DELETE /api/primary` - Clear primary list
- `DELETE /api/list/:uploaderName` - Remove a person's card list

## Data Storage

Data is stored in Cloudflare R2 as JSON with the following structure:

```json
{
  "primaryList": [
    { "name": "Card Name", "count": 1 },
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
- Duplicate cards in the primary list are counted separately
- Ownership is tracked by count, so if you need 2 copies and someone owns 1, it shows as partially owned
- All data is persistent and shared via the URL

## License

MIT
