# 🃏 MTG Card Comparison Tool - START HERE

Welcome! This is your complete MTG card ownership comparison tool built on Cloudflare Workers.

## ⚡ Quick Start (5 Minutes)

```bash
# 1. Install dependencies
npm install

# 2. Start local development
npm run dev

# 3. Open in browser
# http://localhost:8787
```

That's it! You now have a working application locally.

## 📋 What You Have

A production-ready application that lets you and your friends:
- Upload lists of Magic: The Gathering cards you own
- Compare ownership across multiple people
- See which cards are fully owned, partially owned, or missing
- Filter and export results to CSV
- Share a single URL with everyone

## 🚀 Next Steps

### Option 1: Test Locally First
1. Run `npm run dev` (already running)
2. Open http://localhost:8787
3. Upload test files from the project:
   - `test-primary.csv` - What you need
   - `test-alice.csv` - Alice's cards
   - `test-bob.csv` - Bob's cards
4. See the comparison in action

### Option 2: Deploy Immediately
1. Read `DEPLOYMENT.md` (5 minutes)
2. Run the deployment commands
3. Share the URL with your friends
4. Everyone uploads their lists

## 📚 Documentation

### Quick References
- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Detailed setup guide
- **[QUICKSTART.md](QUICKSTART.md)** - Quick reference for users
- **[DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)** - Find any documentation

### Main Guides
- **[README.md](README.md)** - Complete documentation
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - How to deploy
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - API reference

### Reference
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Project overview
- **[FILE_MANIFEST.md](FILE_MANIFEST.md)** - File listing
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Pre-deployment checklist

## 🎯 What This Does

### Upload Your Cards
- You upload a list of cards you need (primary list)
- Each friend uploads their owned cards
- System automatically counts duplicates

### See the Comparison
- Beautiful card grid with images from Scryfall
- Each card shows:
  - Who owns it
  - How many copies they own
  - Whether it's fully/partially/not owned
- Color-coded status badges

### Filter & Export
- Filter by ownership status
- Filter by specific person
- Export filtered results to CSV
- Share results with your group

## 💾 How It Works

1. **Backend**: Cloudflare Workers (TypeScript)
2. **Storage**: Cloudflare R2 (persistent data)
3. **Frontend**: HTML/CSS/JavaScript (beautiful UI)
4. **Card Data**: Scryfall API (card images)

## 🔧 Commands

```bash
npm install          # Install dependencies
npm run dev          # Start local development
npm run deploy       # Deploy to Cloudflare
npm run type-check   # Check TypeScript types
```

## 📁 Project Structure

```
mtg-owner-comparison/
├── src/
│   ├── index.ts      # Backend API
│   └── html.ts       # Frontend UI
├── Documentation/    # 9 documentation files
├── Test Files/       # Sample CSV files
└── Configuration/    # wrangler.toml, package.json, etc.
```

## 🚢 Deployment (3 Steps)

1. **Authenticate**
   ```bash
   wrangler login
   ```

2. **Create Storage**
   ```bash
   wrangler r2 bucket create mtg-owner-comparison
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

You'll get a URL to share with your friends!

## ❓ Common Questions

### How do I share with friends?
Deploy to Cloudflare, then send them the URL. They can upload their lists immediately.

### What file format do I use?
CSV with quantities or line-separated. Both work!

### Is my data safe?
Yes! Data is stored in Cloudflare R2 (encrypted). No sensitive information is stored.

### How much does it cost?
Free! Cloudflare Workers free tier includes 100,000 requests/day.

### Can I use a custom domain?
Yes! See DEPLOYMENT.md for instructions.

## 🆘 Troubleshooting

### Dev server won't start
- Make sure Node.js 18+ is installed
- Run `npm install` again
- Check port 8787 is available

### Deployment fails
- Make sure you're logged in: `wrangler login`
- Make sure R2 bucket exists
- Check your Cloudflare account has R2 access

### Data not persisting locally
- This is normal! Local development uses in-memory storage
- Deploy to Cloudflare for persistent storage

### Card images not loading
- Check card names match Scryfall exactly
- Try searching on https://scryfall.com

## 📖 Learning Path

**5 minutes**: Read this file
**10 minutes**: Run `npm run dev` and test locally
**5 minutes**: Read DEPLOYMENT.md
**5 minutes**: Deploy with `npm run deploy`
**Total**: 25 minutes to production!

## 🎮 Try It Now

```bash
# Start development
npm run dev

# In another terminal, test the API
curl -X POST http://localhost:8787/api/upload-primary \
  -F "file=@test-primary.csv"

# View the data
curl http://localhost:8787/api/data | jq .
```

## 📞 Need Help?

1. Check [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) for all docs
2. Search for your issue in the relevant documentation
3. Check [GETTING_STARTED.md](GETTING_STARTED.md) for detailed setup
4. Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API issues

## ✨ Features

- ✅ Upload CSV or line-separated card lists
- ✅ Automatic duplicate counting
- ✅ Beautiful card display with Scryfall images
- ✅ Ownership tracking by person
- ✅ Filter by status and person
- ✅ CSV export
- ✅ Persistent storage
- ✅ Responsive design
- ✅ Hot reload in development
- ✅ Production-ready

## 🎯 Your Next Action

Choose one:

**Option A: Test Locally** (Recommended first)
```bash
npm run dev
# Open http://localhost:8787
```

**Option B: Deploy Now**
```bash
# Read DEPLOYMENT.md first, then:
wrangler login
wrangler r2 bucket create mtg-owner-comparison
npm run deploy
```

**Option C: Learn More**
- Read [GETTING_STARTED.md](GETTING_STARTED.md)
- Read [README.md](README.md)
- Read [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)

## 🎉 You're All Set!

Everything is ready to go. The application is:
- ✅ Fully functional
- ✅ Production-ready
- ✅ Well-documented
- ✅ Easy to deploy

Start with `npm run dev` and enjoy!

---

**Questions?** Check the documentation files.
**Ready to deploy?** Follow DEPLOYMENT.md.
**Want to customize?** Check README.md for options.

**Happy comparing! 🃏**
