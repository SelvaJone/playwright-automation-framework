import { test, expect } from "./fixtures/testFixtures.js";

test("Complete purchase end-to-end", async ({
    loginPage,
    productsPage,
    cartPage,
    checkoutPage
}) => {

    await loginPage.navigate("https://www.saucedemo.com/");

    await loginPage.login(
        "standard_user",
        "secret_sauce"
    );

    await productsPage.addBackpackToCart();

    await productsPage.openCart();

    const productName = await cartPage.getProductName();

    await expect(productName).toBe(
        "Sauce Labs Backpack"
    );

    await cartPage.clickCheckout();

    await checkoutPage.enterCustomerDetails(
        "Selva",
        "QA",
        "75001"
    );

    await checkoutPage.clickContinue();

    await checkoutPage.clickFinish();

    const message = await checkoutPage.getCompleteMessage();

    await expect(message).toBe(
        "Thank you for your order!"
    );
});
/*
tests/fixtures/
│
├── pages/
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
├── fixtures/
│   └── testFixtures.js
│
├── login.spec.js
├── products.spec.js
├── cart.spec.js
├── checkout.spec.js
└── checkout-e2e.spec.js
*/