import { defineConfig } from '@playwright/test';

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || '3000';
const baseURL = process.env.BASE_URL || `http://${host}:${port}`;

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm dev',
    url: baseURL,
    timeout: 120_000,
    reuseExistingServer: true, // Always reuse if server is already running
    stdout: 'pipe',
    stderr: 'pipe',
    env: {
      ...process.env,
      NEXT_PUBLIC_DATA_SOURCE: process.env.NEXT_PUBLIC_DATA_SOURCE || 'mock',
    },
  },
});
