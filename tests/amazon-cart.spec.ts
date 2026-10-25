import { expect, test } from '@playwright/test';

test('search for and add the iPhone 17 Pro Max with Protect+ to the cart', async ({ page }) => {
  await page.goto('https://www.amazon.in/');

  await page.locator('#twotabsearchtextbox').fill('iphone 17 pro');
  await page.locator('#twotabsearchtextbox').press('Enter');

  const productPagePromise = page.waitForEvent('popup');
  await page
    .getByRole('link', {
      name: 'iPhone 17 Pro Max 256 GB with Protect+ with AppleCare Services',
      exact: true,
    })
    .click();
  const productPage = await productPagePromise;

  await productPage.getByRole('button', { name: 'Add to cart', exact: true }).click();

  const goToCartLink = productPage.locator('#sw-gtc').getByRole('link', {
    name: 'Go to Cart',
  });
  await expect(goToCartLink).toBeVisible();
  const browserContext = productPage.context();
  await goToCartLink.click();

  await expect
    .poll(() => browserContext.pages().some((candidate) => /\/cart(?:\?|$)/.test(candidate.url())))
    .toBe(true);
  const cartPage = browserContext.pages().find((candidate) => /\/cart(?:\?|$)/.test(candidate.url()));
  if (!cartPage) {
    throw new Error('The Amazon cart page did not open.');
  }

  await expect(cartPage).toHaveURL(/\/cart(?:\?|$)/);
  await expect(
    cartPage.getByRole('link', {
      name: 'Apple iPhone 17 Pro Max 256 GB with Protect+ with AppleCare Services',
      exact: true,
    }),
  ).toBeVisible();
});
