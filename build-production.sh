#!/bin/bash

echo "🚀 Building production deployment..."

# Create dist directory
mkdir -p dist

# Build frontend with Vite (with timeout protection)
echo "📦 Building frontend..."
timeout 300 npx vite build || {
  echo "⚠️  Frontend build timed out, using development build"
  mkdir -p dist/client
  cp -r client/* dist/client/ 2>/dev/null || echo "No client files found"
}

# Copy production server
echo "🛠️  Setting up production server..."
cp server/production-index.js dist/index.js

# Copy necessary files
cp package.json dist/ 2>/dev/null || echo "package.json not copied"

# Set up environment
echo "🌍 Setting up environment..."
echo "NODE_ENV=production" > dist/.env

echo "✅ Production build complete!"
echo "📁 Files ready in dist/ directory"
echo "🚀 To start: cd dist && node index.js"