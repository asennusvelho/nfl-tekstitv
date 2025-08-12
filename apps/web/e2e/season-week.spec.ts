import { test, expect } from '@playwright/test';

test('renders teletext grid on week page', async ({ page }) => {
  await page.goto('/2025/week/1');

  // Check navigation header
  await expect(page.getByText('█ SEASON 2025 • WEEK 01 █')).toBeVisible();

  // Check games header
  await expect(page.getByText('█ NFL SCORES & RESULTS █')).toBeVisible();

  // Check that games are displayed
  await expect(page.getByText('NYJ')).toBeVisible();
  await expect(page.getByText('NE')).toBeVisible();
});

test('navigation buttons work correctly', async ({ page }) => {
  await page.goto('/2025/week/2');

  // Check current week is displayed
  await expect(page.getByText('█ SEASON 2025 • WEEK 02 █')).toBeVisible();

  // Check previous week button exists and works
  const prevButton = page.getByText('◄ WEEK 01');
  await expect(prevButton).toBeVisible();
  await prevButton.click();
  await expect(page.getByText('█ SEASON 2025 • WEEK 01 █')).toBeVisible();

  // Check next week button exists and works
  const nextButton = page.getByText('WEEK 02 ►');
  await expect(nextButton).toBeVisible();
  await nextButton.click();
  await expect(page.getByText('█ SEASON 2025 • WEEK 02 █')).toBeVisible();
});

test('navigation boundaries work correctly', async ({ page }) => {
  // Test week 1 (minimum)
  await page.goto('/2025/week/1');
  await expect(page.getByText('◄ WEEK --')).toBeVisible(); // Previous disabled
  await expect(page.getByText('WEEK 02 ►')).toBeVisible(); // Next enabled

  // Test week 18 (maximum)
  await page.goto('/2025/week/18');
  await expect(page.getByText('◄ WEEK 17')).toBeVisible(); // Previous enabled
  await expect(page.getByText('WEEK -- ►')).toBeVisible(); // Next disabled
});

test('keyboard navigation works', async ({ page }) => {
  await page.goto('/2025/week/2');
  await expect(page.getByText('█ SEASON 2025 • WEEK 02 █')).toBeVisible();

  // Focus on the page to ensure keyboard events are captured
  await page.focus('body');

  // Test left arrow (previous week)
  await page.keyboard.press('ArrowLeft');
  await page.waitForURL('/2025/week/1');
  await expect(page.getByText('█ SEASON 2025 • WEEK 01 █')).toBeVisible();

  // Test right arrow (next week)
  await page.keyboard.press('ArrowRight');
  await page.waitForURL('/2025/week/2');
  await expect(page.getByText('█ SEASON 2025 • WEEK 02 █')).toBeVisible();

  // Test 'h' key (previous week)
  await page.keyboard.press('h');
  await page.waitForURL('/2025/week/1');
  await expect(page.getByText('█ SEASON 2025 • WEEK 01 █')).toBeVisible();

  // Test 'l' key (next week)
  await page.keyboard.press('l');
  await page.waitForURL('/2025/week/2');
  await expect(page.getByText('█ SEASON 2025 • WEEK 02 █')).toBeVisible();
});
