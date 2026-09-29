import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
/*
Login
  ↓
Add product
  ↓
Cart
  ↓
Checkout
  ↓
Enter customer information
  ↓
Continue
  ↓
Verify checkout overview
*/
test("Checkout customer information", async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate("https://www.saucedemo.com/");

    const productsPage = await loginPage.login(
        "standard_user",
        "secret_sauce"
    );

    await productsPage.addBackpackToCart();

    const cartPage = await productsPage.openCart();

    const checkoutPage = await cartPage.clickCheckout();

    await checkoutPage.enterCustomerDetails(
        "Selva",
        "QA",
        "75001"
    );

    await checkoutPage.clickContinue();

    await expect(
        page
    ).toHaveURL(/checkout-step-two/);
});