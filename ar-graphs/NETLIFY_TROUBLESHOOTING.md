# Netlify Build Troubleshooting Guide

## Build Failed with Exit Code 1 or 2

If your Netlify build is failing, follow these steps to diagnose and fix the issue.

### Step 1: Check Node Version

**In Netlify Dashboard:**
1. Go to Site settings → Build & deploy → Environment
2. Look for `NODE_VERSION` 
3. It should show 18.20.0 (set by `.nvmrc` file)

If not set:
- Netlify defaults to Node 16 (which is too old)
- Create/update the `.nvmrc` file with: `18.20.0`

### Step 2: Clear Netlify Cache

1. Go to your Netlify site dashboard
2. Click on "Deploys"
3. Find a previous successful deploy, click its menu (⋯)
4. Select "Clear cache and redeploy"
5. Wait for the rebuild

### Step 3: Check Build Logs

1. In Netlify dashboard, go to Deploys
2. Click on the failed deploy
3. Scroll down to "Build log"
4. Look for specific error messages:
   - "npm ERR!" = npm installation issue
   - "error TS" = TypeScript compilation error
   - "Cannot find module" = Missing dependency

### Step 4: Verify Git Commit

Ensure these files are committed to git:
```bash
git add package-lock.json
git add .nvmrc
git add netlify.toml
git add vite.config.ts
git add tsconfig.app.json
git add tsconfig.json
git commit -m "Add Netlify deployment configuration"
git push
```

### Step 5: Test Build Locally

Run exactly what Netlify runs:
```bash
npm ci  # (clean install, same as Netlify)
npm run build
```

If this fails locally, fix the issue before pushing to git.

### Step 6: Rebuild on Netlify

1. Go to Deploys
2. Click "Trigger deploy" → "Deploy site"
3. Watch the build logs in real-time

## Common Error Messages and Fixes

### "Command failed with exit code 1: npm run build"

**Check for:**
- TypeScript errors: Run `npx tsc --noEmit` locally
- Missing node_modules: Netlify should auto-install, but check logs for install errors
- Node version mismatch: Verify .nvmrc is set to 18.20.0

### "Cannot find module '@mediapipe/hands'"

**Fix:**
- Check that `package-lock.json` is committed
- The lock file ensures exact versions are installed
- Commit it with: `git add package-lock.json && git commit -m "Add lock file"`

### "ENOSPC: no space left on device"

**This is rare but means Netlify ran out of disk space:**
- Clear cache and redeploy
- Contact Netlify support if it persists

## What the Configuration Does

### `.nvmrc`
Tells Netlify to use Node.js 18.20.0 specifically.

### `netlify.toml`
Tells Netlify:
- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Environment variables
- SPA redirects for React routing

### `package-lock.json`
Locks all dependency versions for reproducible builds.

## Advanced: Manual Deploy for Testing

If git integration keeps failing, try manual deployment:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build locally
npm ci
npm run build

# Deploy the dist folder
netlify deploy --prod --dir=dist
```

## Critical: Netlify UI Override Issue (Most Common Cause!)

**If you see in build logs: "build: commandOrigin: ui"**

This is the problem! Netlify is using UI settings instead of `netlify.toml`. 

**Fix:**
1. Go to your Netlify site dashboard
2. Click: Site settings → Build & deploy → Build command
3. Set it to: `npm ci && npm run build`
4. Click Save
5. Go to Deploys → Click "Trigger deploy" → "Deploy site"
6. Wait for build to complete

**Why this happens:**
- Netlify stores UI settings that override netlify.toml
- When you see `commandOrigin: ui`, it means the UI settings are being used
- Solution: Update the UI settings to match netlify.toml

## If Still Stuck

1. **Check Netlify Status**: https://www.netlify-status.com/
2. **Netlify Support**: https://support.netlify.com/
3. **Stack Overflow Tag**: `netlify`
4. **GitHub Issues**: Search existing issues in this repo

## Verification Checklist

Before redeploying:
- [ ] `.nvmrc` file exists with `18.20.0`
- [ ] `netlify.toml` file exists in root
- [ ] `package-lock.json` is committed
- [ ] `npm ci && npm run build` works locally
- [ ] No errors in `npm run lint`
- [ ] All source files have proper TypeScript types
- [ ] No unused variables or imports warnings
