# Quick Start Guide

## For Users (Sharing the Link)

Once your friend shares the MTG Card Comparison link with you:

1. **Open the link** in your browser
2. **Upload your cards**:
   - Enter your name (e.g., "Alice", "Bob")
   - Select your card list file (CSV or text file)
   - Click "Upload My Cards"
3. **View the comparison**:
   - See all cards from the primary list with images
   - Cards show who owns them and how many copies
   - Green badge = fully owned, Orange = partially owned, Red = not owned

## For the Host (Setting Up)

### 1. Install and Run Locally First

```bash
# Clone or navigate to the project
cd mtg-owner-comparison

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:8787 in your browser

### 2. Test Locally

- Upload a primary card list (CSV or text file)
- Upload your owned cards
- Verify the comparison works

### 3. Deploy to Cloudflare

```bash
# Login to Cloudflare
wrangler login

# Create R2 bucket for storage
wrangler r2 bucket create mtg-owner-comparison

# Deploy
npm run deploy
```

You'll get a URL like: `https://mtg-owner-comparison.your-subdomain.workers.dev`

### 4. Share the URL

Send the URL to your friends! They can now:
- Upload their card lists
- See the comparison
- Filter by ownership status
- Export to CSV

## File Format

Your card list can be in two formats:

### Format 1: CSV (with quantities)
```
Black Lotus,1
Mox Jet,2
Ancestral Recall,1
```

### Format 2: Line-separated (one card per line)
```
Black Lotus
Mox Jet
Mox Jet
Ancestral Recall
```

Both formats work! The system automatically counts duplicates.

## Features

- **Upload Primary List**: Define what cards you need
- **Upload Owned Cards**: Each person uploads their collection
- **Visual Cards**: Automatic card images from Scryfall
- **Ownership Tracking**: See who owns what
- **Filtering**: Filter by status or by person
- **CSV Export**: Export filtered results
- **Persistent Data**: All data is saved and shared

## Troubleshooting

### "Data not persisting" in local development
This is normal. Local mode uses in-memory storage. Deploy to Cloudflare for persistent storage.

### Card images not loading
The app fetches images from Scryfall API. If a card name doesn't match exactly, images won't load. The card will still work for comparison.

### Upload fails
- Make sure the file is in CSV or TXT format
- Check that card names are spelled correctly
- Ensure the file isn't too large (>10MB)

## Tips

1. **Exact card names matter** for images. Use the official card name from Scryfall.
2. **Duplicates are counted**: If you need 2 copies and someone owns 1, it shows as "Partially Owned"
3. **Export for sharing**: Use the CSV export to share results with your group
4. **Update lists**: Upload a new list with the same name to replace the old one

## Example Workflow

1. Host uploads primary list: "Our Deck Needs"
2. Alice uploads: "Alice's Collection"
3. Bob uploads: "Bob's Collection"
4. Charlie uploads: "Charlie's Collection"
5. Everyone can now see:
   - Which cards are fully owned
   - Which cards are partially owned
   - Who owns each card
   - Export the results to CSV

## Support

For issues or questions, check the README.md and DEPLOYMENT.md files for more detailed information.
