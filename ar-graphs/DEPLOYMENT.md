# Deployment Guide

This project is ready to deploy on multiple platforms. Choose the one that works best for you.

## Netlify (Recommended)

### Option 1: Git Integration (Best for CI/CD)

1. Push your code to GitHub, GitLab, or Bitbucket
2. Go to [netlify.com](https://app.netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Netlify will automatically:
   - Detect `netlify.toml` configuration
   - Set build command: `npm run build`
   - Set publish directory: `dist`
6. Deploy automatically on every push to your branch

### Step 2: Manual Deployment with Netlify CLI

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Step 3: Drag & Drop Deployment

1. Build locally: `npm run build`
2. Visit [netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist` folder to upload

**Configuration Note:** The `netlify.toml` file in the root directory contains all the configuration needed.

**Build Failed?** If your Netlify build is failing, see [NETLIFY_TROUBLESHOOTING.md](./NETLIFY_TROUBLESHOOTING.md) for detailed diagnosis and fixes.

---

## Vercel

### Git Integration

1. Push your code to GitHub, GitLab, or Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your repository
4. Vercel will automatically detect the build settings
5. Deploy automatically on every push

### Manual Deployment

```bash
npm install -g vercel
vercel --prod
```

**Note:** The `vercel.json` file contains the configuration.

---

## GitHub Pages

1. Update `package.json` with your repo name as the `homepage` field:
   ```json
   "homepage": "https://yourusername.github.io/ar_hand_graph"
   ```

2. Install the deployment package:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add deployment scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

---

## Environment Variables

The application currently doesn't require any environment variables. If you need to add them in the future:

1. Create a `.env.local` file (git-ignored)
2. Add your variables: `VITE_API_URL=https://api.example.com`
3. Access them in code: `import.meta.env.VITE_API_URL`

---

## Build Output

The production build outputs to the `dist/` directory:
- `dist/index.html` - Main HTML file
- `dist/assets/` - CSS, JS, and other assets

The build is optimized for:
- Minification with Terser
- Tree-shaking unused code
- Asset compression
- Production mode

---

## Performance Considerations

The built application is ~750KB (gzipped ~210KB). This includes:
- MediaPipe hand detection model
- Three.js 3D library
- React and dependencies

To further optimize:
1. Lazy load MediaPipe: Only initialize hand detection when needed
2. Code splitting: MediaPipe is large, consider loading it dynamically
3. WebWorkers: Offload gesture detection to background threads

---

## Troubleshooting

### Build Fails on Netlify (Exit Code 1 or 2)

**Common causes and solutions:**

1. **Node version mismatch**
   - Netlify uses Node 16 by default (too old)
   - Solution: `.nvmrc` file is included to specify Node 18.20.0
   - Verify in Netlify settings: Site settings → Build & deploy → Environment

2. **npm cache issues**
   - Clean Netlify cache: Site settings → Build & deploy → Clear cache and redeploy
   - The netlify.toml uses `npm ci` instead of `npm install` (more reliable)

3. **TypeScript compilation errors on Netlify**
   - Works locally but fails on Netlify
   - Try: Rebuild without cache in Netlify dashboard
   - Check the build logs for specific TypeScript errors

4. **Memory issues**
   - The project includes large dependencies (MediaPipe, Three.js)
   - Usually not an issue, but clear cache if you see memory-related errors

**If build still fails:**

1. Check the Netlify build logs (Site settings → Build & deploy → Deploys)
2. Look for the specific error message
3. Try deploying with GitHub branch instead of drag-and-drop
4. Verify package-lock.json is committed to git

### Build Fails on Deployment Platform

- Ensure Node.js version matches (v18+)
- Check that `npm install` completes successfully
- Verify all environment variables are set if required
- Try `npm ci` instead of `npm install` for CI/CD environments


### Large Bundle Size Warning

The warning about chunk sizes > 500KB is expected due to MediaPipe. The bundle is still functional but if you need to reduce it:
- Use dynamic imports for MediaPipe
- Implement code splitting strategies

### Webcam/Camera Access Issues

- Deployment must be HTTPS (Netlify/Vercel handle this)
- Local development on HTTP will work for testing
- User must grant camera permissions

---

## Next Steps

After deployment:
1. Test the webcam functionality
2. Monitor performance in production
3. Gather user feedback
4. Consider implementing analytics
