import { test, expect } from '@playwright/test';

test('Ask System Time via Browser Use Goal', async ({ page }) => {
  await page.goto('http://localhost:5199/');
  const input = page.locator('input[type="text"]');
  await input.fill('What is the current system time?');
  await input.press('Enter');
  const response = page.locator('.bg-gray-700').last();
  await expect(response).toBeVisible({ timeout: 10000 });
  const result = await response.innerText();
  console.log('--- TASK RESULT ---');
  console.log(result);
  console.log('-------------------');
});
