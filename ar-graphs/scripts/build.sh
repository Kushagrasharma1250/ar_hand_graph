#!/bin/bash
# Build script for Netlify deployment
set -e

echo "=== Build Environment ==="
echo "Node: $(node --version)"
echo "npm: $(npm --version)"
echo "CWD: $(pwd)"
echo ""

echo "=== Installing dependencies ==="
npm ci

echo ""
echo "=== Running build ==="
npm run build

echo ""
echo "=== Build successful! ==="
echo "Output directory: dist"
ls -lh dist/
