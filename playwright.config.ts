import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  //fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout:100000000,

  use: {
    headless:true,
    viewport: { width: 1280, height: 720},
    actionTimeout: 15000,
    ignoreHTTPSErrors: true,
    video: 'off',
    screenshot:'off',
    trace: 'on-first-retry',
  },


  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
