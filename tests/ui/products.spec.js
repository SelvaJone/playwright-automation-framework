import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
/*
Login
  ↓
Products page
  ↓
Add Backpack
  ↓
Verify cart count = 1
*/

test("Add backpack to cart", async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate("https://www.saucedemo.com/");

    const productsPage = await loginPage.login(
        "standard_user",
        "secret_sauce"
    );

    await productsPage.addBackpackToCart();

    await expect(
        page.locator(".shopping_cart_badge")
    ).toHaveText("1");
});