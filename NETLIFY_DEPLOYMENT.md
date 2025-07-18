# LinkVault - Netlify Deployment Guide

## Migration from Vercel to Netlify Complete! ✅

This project has been successfully migrated from Vercel to Netlify. All API functions have been converted to Netlify Functions.

### What Changed in Migration

1. **API Functions**: Converted from Vercel Edge Functions to Netlify Functions
   - `api/parse.ts` → `netlify/functions/parse.ts`
   - `api/summarize.ts` → `netlify/functions/summarize.ts`

2. **API Endpoints**: Updated frontend calls
   - `/api/parse` → `/.netlify/functions/parse`
   - `/api/summarize` → `/.netlify/functions/summarize`

3. **Configuration**: 
   - Removed `vercel.json`
   - Added `netlify.toml` and `public/_redirects`
   - Removed `@vercel/node` dependency
   - Added `@netlify/functions` dependency

### Deployment Steps

#### Option 1: Automatic Deployment (Recommended)

1. **Push to Git Repository**
   ```bash
   git add .
   git commit -m "Migrate from Vercel to Netlify"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider (GitHub, GitLab, Bitbucket)
   - Select your repository

3. **Build Settings** (Auto-detected from `netlify.toml`)
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`
   - Node version: `18`

4. **Environment Variables**
   Set these in Netlify dashboard → Site settings → Environment variables:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `GOOGLE_API_KEY`: Your Google Gemini API key (for AI summaries)

#### Option 2: Manual Deployment

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and Deploy**
   ```bash
   npm install
   npm run build
   netlify login
   netlify deploy --prod --dir=dist
   ```

### Important Post-Migration Steps

1. **Update Supabase Settings**
   - Add your new Netlify domain to Supabase Auth allowed origins
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Add: `https://your-site-name.netlify.app`

2. **Test All Functions**
   - Test URL parsing: Add a new link
   - Test AI summaries: View an article and click "Generate Summary"
   - Test authentication: Login/logout

3. **Update DNS** (if using custom domain)
   - Remove old Vercel DNS settings
   - Point domain to Netlify (see Netlify dashboard for instructions)

### Configuration Files

- `netlify.toml`: Main Netlify configuration
- `public/_redirects`: SPA routing fallback
- `netlify/functions/`: Serverless functions directory

### Performance Optimizations Included

- Cache headers for static assets (CSS, JS, fonts)
- SPA routing redirects
- Build optimization settings
- Function bundling optimization

### Troubleshooting

**Build Issues:**
- Ensure Node.js 18+ is being used
- Check that all dependencies are installed
- Verify environment variables are set

**Function Issues:**
- Functions are deployed to `/.netlify/functions/[function-name]`
- Check function logs in Netlify dashboard
- Ensure CORS headers are properly set

**Authentication Issues:**
- Verify Supabase allowed origins include new domain
- Check environment variables are correctly set
- Ensure callback URLs are updated in auth providers

**Route Issues:**
- SPA routes should work via `_redirects` file
- All routes fallback to `/index.html` with 200 status

### Migration Verification Checklist

- [ ] Build completes successfully
- [ ] Site deploys without errors
- [ ] Authentication works (login/logout)
- [ ] Link parsing works (add new link)
- [ ] AI summarization works (if using Gemini API)
- [ ] All app routes work correctly
- [ ] Dark/light mode toggles work
- [ ] Responsive design works on mobile
- [ ] Environment variables are set
- [ ] Supabase allowed origins updated
