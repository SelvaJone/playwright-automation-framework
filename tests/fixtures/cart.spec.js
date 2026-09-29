import { test, expect } from "./fixtures/testFixtures.js";
/*
loginPage
    │
    │ login()
    ↓
productsPage
    │
    ├── addBackpackToCart()
    │
    └── openCart()
          ↓
       cartPage
          │
          └── getProductName()
*/
//The test controls the business flow, while each Page Object controls its own page actions.

test("Verify product in cart", async ({
    loginPage,
    productsPage,
    cartPage
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
});