import { type Locator, type Page } from '@playwright/test';

export class DemoWebShopPage {
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;

  constructor(private readonly page: Page) {
    this.searchInput = page.locator('#small-searchterms');
    this.searchButton = page.getByRole('button', { name: 'Search' });
  }

  async open(): Promise<void> {
    await this.page.goto('https://demowebshop.tricentis.com/');
  }

  async searchFor(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  productLink(productName: string): Locator {
    return this.page.getByRole('link', { name: productName, exact: true });
  }
}
