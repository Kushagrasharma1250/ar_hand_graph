#!/bin/bash
# Build troubleshooting script for Netlify

set -e

echo "=== Netlify Build Troubleshooting ==="
echo ""

echo "Node version:"
node --version

echo "npm version:"
npm --version

echo ""
echo "Installing dependencies..."
npm ci --verbose

echo ""
echo "Running TypeScript check..."
npx tsc --noEmit

echo ""
echo "Running Vite build..."
npm run build

echo ""
echo "=== Build successful! ==="
