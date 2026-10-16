import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 3,
  timeout: 45000,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:3100', browserName: 'chromium', channel: 'chrome', reducedMotion: 'reduce', trace: 'retain-on-failure' },
  webServer: { command: 'npm run dev -- --port 3100 --host 127.0.0.1', url: 'http://127.0.0.1:3100', reuseExistingServer: !process.env.CI, env: { GEMINI_API_KEY: '' } },
});
