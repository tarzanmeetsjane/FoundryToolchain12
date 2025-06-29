#!/usr/bin/env node

// Simple build script to create production server with proper CORS bundling
import { build } from 'esbuild';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function buildServer() {
  try {
    console.log('Building production server...');
    
    await build({
      entryPoints: [join(__dirname, 'server/index.ts')],
      bundle: true,
      platform: 'node',
      format: 'esm',
      outdir: 'dist',
      minify: true,
      sourcemap: false,
      target: 'node18',
      // Only externalize the most essential Node.js modules and database drivers
      external: [
        '@neondatabase/serverless',
        'drizzle-orm',
        'drizzle-kit',
        'lightningcss',
        '@tailwindcss/vite'
      ],
      define: {
        'process.env.NODE_ENV': '"production"'
      },
      banner: {
        js: `
// ESM compatibility shims
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
        `.trim()
      }
    });
    
    console.log('✅ Server build completed successfully!');
    console.log('Generated files in dist/ directory');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildServer();