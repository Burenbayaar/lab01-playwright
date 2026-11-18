import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright-ийн тохиргоо.
 * - baseURL: тестэд page.goto('/') гэхэд saucedemo.com нээгдэнэ.
 * - trace/video: тест бүрийн алхам алхмын бичлэг (trace viewer) ба видео хадгална.
 * - reporter: консолд жагсаалт + HTML тайлан (playwright-report/).
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on',
    video: 'on',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
