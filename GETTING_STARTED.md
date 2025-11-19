# Getting Started with MTG Card Comparison

## 5-Minute Quick Start

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Locally
```bash
npm run dev
```

Open http://localhost:8787 in your browser

### Step 3: Test It Out
1. Download or create a CSV file with card names:
   ```
   Black Lotus,1
   Mox Jet,1
   Ancestral Recall,1
   ```

2. Upload it as the primary list
3. Upload your owned cards with your name
4. See the comparison!

### Step 4: Deploy (When Ready)
```bash
wrangler login
wrangler r2 bucket create mtg-owner-comparison
npm run deploy
```

Share the URL with your friends!

---

## Detailed Setup

### Prerequisites

- **Node.js 18+**: Download from https://nodejs.org
- **npm**: Comes with Node.js
- **Cloudflare Account**: Free at https://dash.cloudflare.com
- **Wrangler CLI**: `npm install -g wrangler`

### Installation

1. **Clone/Navigate to Project**
   ```bash
   cd mtg-owner-comparison
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Verify Installation**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   [wrangler:inf] Ready on http://localhost:8787
   ```

### Local Development

The development server includes hot reload - changes to files automatically refresh the page.

```bash
npm run dev
```

**Available at**: http://localhost:8787

**Features**:
- Automatic page reload on file changes
- Full API functionality
- In-memory data storage (data lost on restart)

### Testing Locally

Use the included test files:

```bash
# Upload primary list
curl -X POST http://localhost:8787/api/upload-primary \
  -F "file=@test-primary.csv"

# Upload owned list
curl -X POST http://localhost:8787/api/upload-owned \
  -F "file=@test-alice.csv" \
  -F "uploaderName=Alice"

# View data
curl http://localhost:8787/api/data | jq .
```

Or use the provided test script:
```bash
chmod +x test-api.sh
./test-api.sh
```

---

## Deployment to Cloudflare

### Step 1: Authenticate

```bash
wrangler login
```

This opens a browser window to authorize Wrangler with your Cloudflare account.

### Step 2: Create R2 Bucket

```bash
wrangler r2 bucket create mtg-owner-comparison
```

This creates persistent storage for your data.

### Step 3: Deploy

```bash
npm run deploy
```

You'll see output like:
```
✨ Successfully published your Worker to
https://mtg-owner-comparison.your-subdomain.workers.dev
```

### Step 4: Share

Copy the URL and share with your friends! They can:
- Upload their card lists
- See the comparison
- Filter and export results

---

## Usage Guide

### Uploading Files

**Format 1: CSV with Quantities**
```
Card Name,Quantity
Black Lotus,1
Mox Jet,2
Ancestral Recall,1
```

**Format 2: Line-Separated**
```
Black Lotus
Mox Jet
Mox Jet
Ancestral Recall
```

Both formats work! The system automatically counts duplicates.

### Understanding the Comparison

- **Fully Owned** (Green): Total owned >= needed
- **Partially Owned** (Orange): Some owned but not enough
- **Not Owned** (Red): None owned

Example:
- Need 2 Black Lotus
- Alice owns 1
- Bob owns 1
- Status: Fully Owned (1+1=2)

### Filtering

1. **By Status**: Show only fully owned, partially owned, or not owned cards
2. **By Person**: Show only cards owned by a specific person
3. **Export**: Download filtered results as CSV

---

## File Structure

```
mtg-owner-comparison/
├── src/
│   ├── index.ts          # Backend API
│   └── html.ts           # Frontend UI
├── wrangler.toml         # Cloudflare config
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── README.md             # Full documentation
├── QUICKSTART.md         # Quick reference
├── DEPLOYMENT.md         # Deployment guide
├── PROJECT_SUMMARY.md    # Project overview
└── test-*.csv            # Sample files
```

---

## Troubleshooting

### "npm: command not found"
Install Node.js from https://nodejs.org

### "wrangler: command not found"
```bash
npm install -g wrangler
```

### "Cannot find module './html'"
This is a TypeScript warning. Run `npm install` to resolve.

### Data not persisting locally
This is normal. Local development uses in-memory storage. Deploy to Cloudflare for persistence.

### Card images not loading
- Check that card names match Scryfall exactly
- Try searching on https://scryfall.com to verify the name
- Some special characters might need adjustment

### "Error: self-signed certificate"
This is a warning in local development and doesn't affect functionality.

### Upload fails
- Check file format (CSV or TXT)
- Ensure file size < 10MB
- Verify card names are spelled correctly

---

## Common Tasks

### Update Your Card List
Upload a new file with the same name to replace the old one.

### Remove a Person's List
Click the "Remove" button next to their name in the "Uploaded Lists" section.

### Clear Primary List
Click "Clear Primary List" button.

### Export Results
1. Apply any filters you want
2. Click "Export Filtered List"
3. CSV file downloads to your computer

### Share with Friends
1. Deploy to Cloudflare: `npm run deploy`
2. Copy the URL
3. Send to friends
4. They upload their lists and see the comparison

---

## Performance Tips

- **Faster uploads**: Use CSV format with quantities instead of line-separated
- **Faster comparisons**: Keep card lists under 1000 cards
- **Better images**: Use exact card names from Scryfall
- **Smoother UI**: Use modern browsers (Chrome, Firefox, Safari)

---

## Security Notes

- No authentication required (public sharing model)
- Data stored in Cloudflare R2 (encrypted)
- HTTPS only (Cloudflare Workers)
- No sensitive information stored
- Safe to share URL with friends

---

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Run locally: `npm run dev`
3. ✅ Test with sample files
4. ✅ Deploy: `npm run deploy`
5. ✅ Share URL with friends
6. ✅ Start comparing!

---

## Need Help?

- **README.md** - Full documentation
- **DEPLOYMENT.md** - Detailed deployment steps
- **QUICKSTART.md** - Quick reference guide
- **PROJECT_SUMMARY.md** - Project overview

---

**Ready to get started?**

```bash
npm install && npm run dev
```

Then open http://localhost:8787 in your browser!
