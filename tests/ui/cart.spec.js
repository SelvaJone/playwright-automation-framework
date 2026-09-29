import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
/*
Login
  ↓
Add product
  ↓
Open cart
  ↓
Verify product
*/

test("Verify product in cart", async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate("https://www.saucedemo.com/");

    const productsPage = await loginPage.login(
        "standard_user",
        "secret_sauce"
    );

    await productsPage.addBackpackToCart();

    const cartPage = await productsPage.openCart();

    const productName = await cartPage.getProductName();

    await expect(productName).toBe(
        "Sauce Labs Backpack"
    );
});