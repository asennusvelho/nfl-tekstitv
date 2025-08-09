import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  // tsconfigPaths plugin reads the (extended) tsconfig path mappings so we avoid duplicating
  // the @core/* alias here (source of truth: tsconfig.base.json)
  plugins: [tsconfigPaths({ projects: ['../../tsconfig.base.json'] }), react()],
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
      reporter: ['text', 'html', 'lcov'],
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
      optimizer: {
        web: {
          include: ['@nfl-tekstitv/core'],
        },
      },
    },
  },
  // Manual resolve.alias removed to prevent duplication with tsconfig paths.
});
