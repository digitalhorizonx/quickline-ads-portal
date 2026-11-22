# Quick Line | Google Ads Launch Center

An English client-facing Google Ads onboarding and delivery tracker for Quick Line. Read-only shared public view, private password-controlled admin updates, persisted through Netlify Blobs.

## Deployment

1. Connect this repository to the existing Netlify site **quicklineads** (do not create a second site).
2. In Netlify, configure secret environment variable `QUICKLINE_ADMIN_PASSWORD` with scope **Functions**. Use a strong unique password; never commit it.
3. Deploy production branch `main` and verify `GET /api/quickline-status` returns JSON.
4. Open the portal in an ordinary browser and another device. From admin mode toggle a milestone and verify the second device receives the update.

**Security:** repository should be Private. Do not store customer documentation, identity records, ad-account credentials, or passwords in source code. Avoid public write access.

**Budget:** about $5,000 per 30 days, planning $500 every three days, proposed $1,500 initial prepaid ad balance. Account review period is not guaranteed.
