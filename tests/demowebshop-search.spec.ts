import { expect, test } from '@playwright/test';
import { DemoWebShopPage } from '../pages/demo-web-shop.page';

test('search for Custom T-Shirt and verify it appears in the results', async ({ page }) => {
  const demoWebShopPage = new DemoWebShopPage(page);

  await demoWebShopPage.open();
  await demoWebShopPage.searchFor('Custom T-Shirt');

  await expect(demoWebShopPage.productLink('Custom T-Shirt')).toBeVisible();
});
