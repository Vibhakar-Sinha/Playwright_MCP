import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'csv-parse/sync';
import { expect, test } from '@playwright/test';
import { OrangeHRMLoginPage } from '../pages/orangehrm-login.page';

type ExpectedResult = 'Dashboard' | 'Invalid credentials';

interface LoginCase {
  Username: string;
  Password: string;
  Expected: ExpectedResult;
}

function loadLoginData(): LoginCase[] {
  const csvPath = resolve(__dirname, '..', 'test_data', 'loginData.csv');
  const rows = parse<Record<string, string>>(readFileSync(csvPath), {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  if (rows.length === 0) {
    throw new Error(`No login data found in ${csvPath}`);
  }

  return rows.map((row, index) => {
    const { Username, Password, Expected } = row;
    if (!Username || !Password || (Expected !== 'Dashboard' && Expected !== 'Invalid credentials')) {
      throw new Error(`Invalid login data on CSV row ${index + 2}`);
    }

    return { Username, Password, Expected };
  });
}

const loginCases = loadLoginData();

test.describe('OrangeHRM login validation from CSV', () => {
  for (const loginCase of loginCases) {
    test(`${loginCase.Username} expects ${loginCase.Expected}`, async ({ page }) => {
      const loginPage = new OrangeHRMLoginPage(page);

      await loginPage.open();
      await loginPage.login(loginCase.Username, loginCase.Password);

      try {
        if (loginCase.Expected === 'Dashboard') {
          await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
        } else {
          await expect(page.getByText('Invalid credentials', { exact: true })).toBeVisible();
        }
      } catch (error) {
        console.error(`[FAIL] ${loginCase.Username} => ${loginCase.Expected}`);
        throw error;
      }

      console.log(`[PASS] ${loginCase.Username} => ${loginCase.Expected}`);
    });
  }
});
