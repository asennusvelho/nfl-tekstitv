import { test, expect } from '@playwright/test';

test('renders teletext grid on week page', async ({ page }) => {
  await page.goto('/2025/week/1');
  await expect(page.getByText('Season 2025 — Week 1')).toBeVisible();
});
