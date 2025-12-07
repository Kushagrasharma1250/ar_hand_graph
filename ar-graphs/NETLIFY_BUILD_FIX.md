# 🚨 CRITICAL: Fix Netlify Build Failure

## The Problem

Your Netlify build is failing because Netlify is using **UI settings** instead of the `netlify.toml` file.

**Evidence:** In the error logs you see:
```
build:
  command: npm run build
  commandOrigin: ui  ← This means UI settings are being used, not netlify.toml
```

## The Solution (Do This Now!)

### Step 1: Go to Netlify Dashboard
https://app.netlify.com

### Step 2: Find Your Site
- Click on your site name
- Go to: **Site settings**

### Step 3: Update Build Command
1. Click: **Build & deploy** (in sidebar)
2. Under "Build settings", find **Build command**
3. **Delete** the current command (or ensure it matches below)
4. **Set it to exactly:**
   ```
   npm ci && npm run build
   ```
5. Click **Save**

### Step 4: Rebuild
1. Go to **Deploys** tab
2. Click **Trigger deploy** button
3. Choose **Deploy site**
4. Watch the build logs

## Why This Works

- `npm ci` = Clean install (removes cache, uses package-lock.json)
- `npm run build` = Builds your TypeScript and Vite project
- This ensures all dependencies are fresh and build is clean

## If It Still Fails

1. **Clear Cache** 
   - In Deploys tab, find a previous deploy
   - Click its menu (⋯) 
   - Select "Clear cache and redeploy"

2. **Check .nvmrc is in Root**
   - Your project root should have `.nvmrc` file with: `18.20.0`
   - This tells Netlify to use Node 18 (not the default Node 16)

3. **Read Full Guide**
   - See `NETLIFY_TROUBLESHOOTING.md` for complete diagnosis

## Verify Locally First

```bash
# Test exactly what Netlify will run:
npm ci
npm run build

# Should output: ✓ built in X.XXs
```

---

**This is the most common Netlify issue. Fix the build command in the UI and your site will deploy! 🚀**
