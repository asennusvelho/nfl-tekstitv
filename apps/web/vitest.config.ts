import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    include: ['test/**/*.{test,spec}.tsx'],
    css: true,
    poolOptions: {
      threads: { singleThread: true },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['components/**/*.{ts,tsx}', 'lib/**/*.{ts,tsx}'],
      exclude: [
        '**/*.d.ts',
        '**/*.{test,spec}.*',
        'node_modules/**',
        '.next/**',
        'e2e/**',
        'app/**',
        'public/**',
        'vitest.config.ts',
      ],
    },
    deps: {
      inline: ['@nfl-tekstitv/core'],
    },
  },
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, '../../packages/core/src'),
      '@core/*': path.resolve(__dirname, '../../packages/core/src/*'),
    },
  },
});
