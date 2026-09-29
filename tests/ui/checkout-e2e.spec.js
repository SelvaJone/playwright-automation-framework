import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";

test("Complete purchase end-to-end", async ({ page }) => {

    // 1. Create Login Page object
    const loginPage = new LoginPage(page);

    // 2. Open application
    await loginPage.navigate("https://www.saucedemo.com/");

    // 3. Login
    const productsPage = await loginPage.login(
        "standard_user",
        "secret_sauce"
    );

    // 4. Add product
    await productsPage.addBackpackToCart();

    // 5. Open cart
    const cartPage = await productsPage.openCart();

    // 6. Verify product
    const productName = await cartPage.getProductName();

    await expect(productName).toBe("Sauce Labs Backpack");

    // 7. Go to checkout
    const checkoutPage = await cartPage.clickCheckout();

    // 8. Enter customer information
    await checkoutPage.enterCustomerDetails(
        "Selva",
        "QA",
        "75001"
    );

    // 9. Continue
    await checkoutPage.clickContinue();

    // 10. Complete order
    await checkoutPage.clickFinish();

    // 11. Verify successful order
    const message = await checkoutPage.getCompleteMessage();

    await expect(message).toBe("Thank you for your order!");
});