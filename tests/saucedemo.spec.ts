import { test, expect, type Page } from '@playwright/test';

/*
 * saucedemo.com — нэвтрэх ба сагсны UI тестүүд.
 * Playwright тест бүрийг ШИНЭ browser context-д ажиллуулдаг тул cookie, session,
 * localStorage хуваалцахгүй — тестүүд хоорондоо хамааралгүй (test isolation).
 * baseURL (https://www.saucedemo.com) playwright.config.ts-д тохируулагдсан.
 */

const PASSWORD = 'secret_sauce';

// Нэвтрэх хуудсыг нээж, нэр, нууц үгийг оруулаад Login товч дарна.
async function login(page: Page, username: string, password: string) {
  await page.goto('/');
  // getByPlaceholder: input-ийг хэрэглэгчийн харж буй placeholder текстээр нь олно.
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  // getByRole: товчийг ARIA үүрэг (button) ба нэрээр нь олно — XPath/CSS-ээс тогтвортой.
  await page.getByRole('button', { name: 'Login' }).click();
}

// Хажуугийн цэсийг нээж Logout дарна, нэвтрэх хуудас руу буцсаныг шалгана.
async function logout(page: Page) {
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
}

test.describe('Login', () => {
  test('successful login shows the Products page', async ({ page }) => {
    await login(page, 'standard_user', PASSWORD);
    // Нэвтэрсний дараа бүтээгдэхүүний жагсаалтын хуудас руу шилжсэн байх ёстой.
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
    await logout(page);
  });

  test('wrong password shows an error message', async ({ page }) => {
    await login(page, 'standard_user', 'wrong_password');
    // Алдааны мессежийг хэрэглэгчийн харж буй текстээр нь (getByText) шалгана.
    await expect(
      page.getByText(/Username and password do not match/),
    ).toBeVisible();
    // Нэвтрэх хуудсан дээрээ үлдсэн байх ёстой.
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('locked out user cannot log in', async ({ page }) => {
    await login(page, 'locked_out_user', PASSWORD);
    await expect(
      page.getByText(/this user has been locked out/),
    ).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});

test.describe('Cart', () => {
  test('logged-in user can add the backpack to the cart', async ({ page }) => {
    await login(page, 'standard_user', PASSWORD);

    // Анхдагч эрэмбэ "Name (A to Z)" тул Sauce Labs Backpack жагсаалтын хамгийн эхэнд байна.
    // Бүх "Add to cart" товч ижил нэртэй тул эхнийхийг нь (first) сонгоно.
    await expect(
      page.getByRole('button', { name: 'View details for Sauce Labs Backpack' }).first(),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Add to cart' }).first().click();

    // Товч "Remove" болж, сагсны товчны нэр "Cart, 1 items" болно.
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();

    // Сагсны хуудас руу орж, яг Backpack сагсанд орсныг шалгана.
    await page.getByRole('button', { name: 'Cart, 1 items' }).click();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(page.getByText('Your Cart')).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'View details for Sauce Labs Backpack' }),
    ).toBeVisible();

    // Төгсгөл: сагсыг хоослоод (Cart, empty) системээс гарна.
    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();
    await logout(page);
  });
});
