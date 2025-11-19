# Deployment Guide

## Prerequisites

1. **Cloudflare Account**: Sign up at https://dash.cloudflare.com
2. **Node.js 18+**: Install from https://nodejs.org
3. **Wrangler CLI**: Install with `npm install -g wrangler`

## Step 1: Authenticate with Cloudflare

```bash
wrangler login
```

This will open a browser window to authenticate. Follow the prompts to authorize Wrangler.

## Step 2: Create R2 Bucket

Create an R2 bucket to store your data:

```bash
wrangler r2 bucket create mtg-owner-comparison
```

## Step 3: Update wrangler.toml

Make sure your `wrangler.toml` has the correct bucket name:

```toml
[[r2_buckets]]
binding = "STORAGE"
bucket_name = "mtg-owner-comparison"
```

## Step 4: Deploy to Cloudflare Workers

```bash
npm run deploy
```

This will:
1. Compile your TypeScript code
2. Bundle the application
3. Deploy to Cloudflare Workers
4. Output your live URL

## Step 5: Share Your URL

Once deployed, you'll get a URL like `https://mtg-owner-comparison.your-subdomain.workers.dev`

Share this URL with your friends! All data is persistent and shared across all users accessing the same URL.

## Local Development

For local development with hot reload:

```bash
npm run dev
```

The app will be available at `http://localhost:8787`

**Note**: Local development uses an in-memory store, so data won't persist between restarts.

## Troubleshooting

### "Cannot find module './html'"
This is a TypeScript linting warning and won't affect the application. It resolves once dependencies are installed.

### Data not persisting locally
This is expected. Local development mode uses an in-memory store. Deploy to Cloudflare Workers to use persistent R2 storage.

### CORS errors when fetching from Scryfall
The Scryfall API allows CORS requests from Workers. If you see errors, check your network tab in DevTools.

## Monitoring

View your deployment logs:

```bash
wrangler tail
```

## Updating the Application

To update the application after making changes:

```bash
npm run deploy
```

## Costs

- **Cloudflare Workers**: Free tier includes 100,000 requests/day
- **R2 Storage**: Free tier includes 10GB storage and 1M read/write operations/month

For most personal use cases, you'll stay within the free tier.

## Custom Domain

To use a custom domain:

1. Add your domain to Cloudflare
2. Update `wrangler.toml`:
   ```toml
   routes = [
     { pattern = "cards.yourdomain.com", zone_name = "yourdomain.com" }
   ]
   ```
3. Deploy again

## Backup Your Data

To backup your data:

```bash
wrangler r2 object get mtg-owner-comparison mtg-data > backup.json
```

To restore:

```bash
wrangler r2 object put mtg-owner-comparison mtg-data < backup.json
```
