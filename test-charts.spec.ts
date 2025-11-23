import { test, expect } from '@playwright/test';

test('verify chart fixes', async ({ page }) => {
  // Navigate to the application
  await page.goto('http://localhost:3001');

  // Wait for the page to load
  await page.waitForLoadState('networkidle');

  // Click on the Traction tab
  await page.click('button:has-text("Traction")');

  // Wait for charts to render
  await page.waitForTimeout(2000);

  // Scroll to Revenue Trajectory chart
  await page.locator('text=Revenue Trajectory').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  // Take screenshot of Revenue Trajectory chart (should show all months including Jul-Sep 28)
  const revenueChart = page.locator('text=Revenue Trajectory').locator('..').locator('..');
  await revenueChart.screenshot({ path: 'revenue-trajectory-chart.png' });

  console.log('✓ Revenue Trajectory chart screenshot saved');

  // Scroll to Revenue Mix Evolution chart
  await page.locator('text=Revenue Mix Evolution').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  // Take screenshot of Revenue Mix chart (should show the new note)
  const revenueMixChart = page.locator('text=Revenue Mix Evolution').locator('..').locator('..');
  await revenueMixChart.screenshot({ path: 'revenue-mix-chart.png' });

  console.log('✓ Revenue Mix Evolution chart screenshot saved');

  // Verify the note exists
  const note = await page.locator('text=Note: New customer revenue (blue) is prorated').isVisible();
  expect(note).toBeTruthy();

  console.log('✓ Revenue note is visible');
});
