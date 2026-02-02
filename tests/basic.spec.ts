import { test, expect } from '@playwright/test';

test.describe('Basic Site Functionality', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the base URL (which is configured in playwright.config.ts)
    await page.goto('/');
  });

  test('should have a correct title', async ({ page }) => {
    // Check title (replace with your actual site title)
    await expect(page).toHaveTitle(/惠尼網站/);
  });

  test('should navigate to demos page via Navbar and verify heading', async ({ page }) => {
    // Click the Demos dropdown trigger
    await page.getByRole('button', { name: '演示' }).click(); 
    // Click the link to all demos (using the text from _index.tsx)
    await page.getByRole('link', { name: '所有 Demo 列表' }).click(); 

    // Expect to be on the demos index page
    await expect(page).toHaveURL(/demos/);
    await expect(page.getByRole('heading', { name: '所有 Demo 列表' })).toBeVisible();
  });

  test('should toggle theme between light and dark', async ({ page }) => {
    const htmlElement = page.locator('html');

    // Initial check: expect light theme by default (as per current app.css and tailwind config)
    await expect(htmlElement).toHaveClass(/light/);

    // Toggle to dark theme
    await page.getByLabel('Toggle theme').click();
    await expect(htmlElement).toHaveClass(/dark/);

    // Toggle back to light theme
    await page.getByLabel('Toggle theme').click();
    await expect(htmlElement).toHaveClass(/light/);
  });

  test('should toggle language between Chinese and English', async ({ page }) => {
    const htmlElement = page.locator('html');

    // Initial check: expect Chinese language by default (as per useLanguageStore initial state)
    await expect(htmlElement).toHaveAttribute('lang', 'zh');

    // Toggle to English
    // The button has text '語言' (Chinese for language) or 'LANGUAGE' in English.
    // However, the `Languages` icon is more reliable to target as per previous observation.
    // The button also displays the current language in uppercase.
    // I will use a more robust selector. Let's inspect the HTML of the button for better targeting.
    // For now, I'll assume `getByRole('button', { name: /zh|en/i })` will work, clicking the button that displays the current language.
    // Or target the one with the Languages icon.
    // Let's refine the selector based on the previous Navbar content: `Button variant="ghost" onClick={handleLanguageToggle} className="flex items-center"> <Languages size={20} className="text-foreground" /> <span className="ml-1 uppercase text-foreground">{language}</span> </Button>`
    // The best way to target it is by its content which changes, or by role and content which is the language abbr.
    // Given the `uppercase text-foreground` for `{language}` part, it's robust.
    // So, `page.getByRole('button', { name: 'ZH' })` or `page.getByRole('button', { name: 'EN' })` might work.
    // Let's rely on the `Languages` icon text or a more generic `Button`.
    // I will use `page.getByRole('button', {name: /languages/i})` based on the previous response and the fact that `Languages` is text in lucide-react. Or the `uppercase` language label.
    // The previous test logic used `getByRole('button', { name: /languages/i })`, but it's an icon, so `name` might not work.
    // Let's try `page.getByText('ZH')` or `page.getByText('EN')` and click the parent button.

    // A more robust selector for the language toggle button would be to use the 'Languages' icon or the button that contains it.
    // Given `handleLanguageToggle` is on the button, `page.getByLabel('Toggle language')` or a specific testId would be ideal.
    // Since there's no `aria-label` for language, I'll rely on the text 'ZH' or 'EN'.

    // Let's use the current language display as the target to click, assuming the button itself has this text or the parent is clickable.
    // The initial `lang` attribute is `zh`, so `htmlElement` has `lang="zh"`.
    // The button text is `ZH` or `EN`.

    await page.getByText('ZH').click(); // Click the button that displays 'ZH'
    await expect(htmlElement).toHaveAttribute('lang', 'en');

    await page.getByText('EN').click(); // Click the button that displays 'EN'
    await expect(htmlElement).toHaveAttribute('lang', 'zh');
  });

  test('should display the Dark Mode switch on the dashboard page', async ({ page }) => {
    await page.goto('/demos/dashboard');
    const switchLabel = page.locator('label').filter({ hasText: '深色模式' });
    await expect(switchLabel).toBeVisible();
    await expect(page.locator('input[type="checkbox"][id="dark-mode"]')).toBeVisible();
  });
});