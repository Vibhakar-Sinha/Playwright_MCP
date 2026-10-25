import { expect, test } from '@playwright/test';
import { OrangeHRMEmployeePage } from '../pages/orangehrm-employee.page';
import { OrangeHRMLoginPage } from '../pages/orangehrm-login.page';

test('add an employee in OrangeHRM and verify the profile', async ({ page }) => {
  const loginPage = new OrangeHRMLoginPage(page);
  const employeePage = new OrangeHRMEmployeePage(page);

  await loginPage.open();
  await loginPage.login('Admin', 'admin123');

  await expect(page).toHaveURL(/\/web\/index\.php\/dashboard\/index$/);
  await employeePage.openAddEmployeeForm();

  await employeePage.addEmployee('John123', 'Doe456');

  await expect(page).toHaveURL(/\/web\/index\.php\/pim\/viewPersonalDetails\/empNumber\/\d+$/);
  await expect(employeePage.profileHeading()).toBeVisible();
  await expect(employeePage.employeeName('John123 Doe456')).toBeVisible();
});
