# Deployment Checklist

Use this checklist to ensure everything is ready before deploying to production.

## Pre-Deployment

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Cloudflare account created (https://dash.cloudflare.com)
- [ ] Wrangler CLI installed (`wrangler --version`)
- [ ] Project dependencies installed (`npm install`)

## Local Testing

- [ ] Development server runs (`npm run dev`)
- [ ] Application loads at http://localhost:8787
- [ ] Can upload primary card list
- [ ] Can upload owned card lists
- [ ] Card comparison displays correctly
- [ ] Filtering works (by status and by person)
- [ ] CSV export works
- [ ] Card images load from Scryfall
- [ ] No console errors in browser DevTools

## Cloudflare Setup

- [ ] Logged in to Cloudflare (`wrangler login`)
- [ ] Cloudflare account verified
- [ ] R2 bucket created (`wrangler r2 bucket create mtg-owner-comparison`)
- [ ] Bucket name matches `wrangler.toml`
- [ ] wrangler.toml has correct configuration

## Deployment

- [ ] Run `npm run deploy`
- [ ] Deployment completes successfully
- [ ] URL provided in output
- [ ] No deployment errors in console

## Post-Deployment Testing

- [ ] Access deployed URL in browser
- [ ] Application loads correctly
- [ ] Upload primary list works
- [ ] Upload owned list works
- [ ] Data persists (refresh page, data still there)
- [ ] Comparison displays correctly
- [ ] Filtering works
- [ ] Export works
- [ ] Card images load
- [ ] No console errors

## Production Verification

- [ ] Share URL with test user
- [ ] Test user can access application
- [ ] Test user can upload list
- [ ] Data appears correctly for test user
- [ ] Multiple users can upload simultaneously
- [ ] Data persists across sessions

## Documentation

- [ ] README.md reviewed
- [ ] QUICKSTART.md reviewed
- [ ] DEPLOYMENT.md reviewed
- [ ] Test files included (test-*.csv)
- [ ] setup.sh script works

## Optional Enhancements

- [ ] Custom domain configured (if desired)
- [ ] Monitoring set up (`wrangler tail`)
- [ ] Backup procedure documented
- [ ] Update procedure documented

## Troubleshooting

If deployment fails:
1. [ ] Check `wrangler.toml` syntax
2. [ ] Verify R2 bucket exists
3. [ ] Check Cloudflare account has R2 access
4. [ ] Review deployment error messages
5. [ ] Try `npm run deploy` again
6. [ ] Check Cloudflare dashboard for issues

## Go Live

- [ ] All checks passed
- [ ] URL ready to share
- [ ] Documentation complete
- [ ] Users can access and use application

## Post-Launch

- [ ] Monitor application performance
- [ ] Check error logs (`wrangler tail`)
- [ ] Gather user feedback
- [ ] Plan future enhancements

---

## Quick Deployment Command

```bash
# One-time setup
wrangler login
wrangler r2 bucket create mtg-owner-comparison

# Deploy
npm run deploy

# Monitor
wrangler tail
```

## Rollback Plan

If issues occur after deployment:

```bash
# View previous deployments
wrangler deployments list

# Rollback to previous version (if needed)
# Contact Cloudflare support or redeploy from git history
```

## Support

- Cloudflare Docs: https://developers.cloudflare.com/workers/
- Wrangler Docs: https://developers.cloudflare.com/workers/wrangler/
- Scryfall API: https://scryfall.com/docs/api

---

**Status**: Ready for deployment ✅

**Next Step**: Run `npm run deploy`
