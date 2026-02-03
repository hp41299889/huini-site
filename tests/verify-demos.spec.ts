import { test, expect } from '@playwright/test';

const demos = [
  {
    name: 'booking-system',
    url: '/demos/booking-system',
    imageSelector: 'img[alt="Modern Salon Interior"]',
  },
];

for (const demo of demos) {
  test(`Verify ${demo.name} layout and image`, async ({ page }) => {
    const response = await page.goto(demo.url);
    expect(response?.status()).toBe(200);

    // Check for console errors
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    // Check image visibility and loading
    const image = page.locator(demo.imageSelector);
    await expect(image).toBeVisible();
    
    // Check if image is actually loaded (naturalWidth > 0)
    const isLoaded = await image.evaluate((img: HTMLImageElement) => img.naturalWidth > 0);
    expect(isLoaded, 'Image should be loaded').toBeTruthy();

    // Check for layout stability (basic)
    const box = await image.boundingBox();
    expect(box?.width).toBeGreaterThan(100); // Expect reasonable size
    expect(box?.height).toBeGreaterThan(100);

    expect(consoleErrors, 'Should have no console errors').toHaveLength(0);
  });
}
