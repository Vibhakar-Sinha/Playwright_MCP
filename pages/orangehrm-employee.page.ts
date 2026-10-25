import { type Locator, type Page } from '@playwright/test';

export class OrangeHRMEmployeePage {
  private readonly pimLink: Locator;
  private readonly addEmployeeLink: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly saveButton: Locator;

  constructor(private readonly page: Page) {
    this.pimLink = page.getByRole('link', { name: 'PIM' });
    this.addEmployeeLink = page.getByRole('link', { name: 'Add Employee' });
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async openAddEmployeeForm(): Promise<void> {
    await this.pimLink.click();
    await this.addEmployeeLink.click();
  }

  async addEmployee(firstName: string, lastName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.saveButton.click();
  }

  profileHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Personal Details' });
  }

  employeeName(fullName: string): Locator {
    return this.page.getByText(fullName, { exact: true });
  }
}
