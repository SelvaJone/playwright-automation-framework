import { test, expect } from "./fixtures/testFixtures.js";
/*
loginPage
    ↓
login()

productsPage
    ↓
addBackpackToCart()
    ↓
openCart()

cartPage
    ↓
clickCheckout()

checkoutPage
    ↓
enterCustomerDetails()
    ↓
clickContinue()
*/

test("Checkout customer information", async ({
    loginPage,
    productsPage,
    cartPage,
    checkoutPage,
    page
}) => {

    await loginPage.navigate("https://www.saucedemo.com/");

    await loginPage.login(
        "standard_user",
        "secret_sauce"
    );

    await productsPage.addBackpackToCart();

    await productsPage.openCart();

    await cartPage.clickCheckout();

    await checkoutPage.enterCustomerDetails(
        "Selva",
        "QA",
        "75001"
    );

    await checkoutPage.clickContinue();

    await expect(page).toHaveURL(/checkout-step-two/);
});