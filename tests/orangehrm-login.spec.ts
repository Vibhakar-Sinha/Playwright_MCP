import { expect, test } from '@playwright/test';

test('log in to OrangeHRM and display the dashboard', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
    waitUntil: 'commit',
  });

  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/\/web\/index\.php\/dashboard\/index$/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
