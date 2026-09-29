import { test as base } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage.js";
import { ProductsPage } from "../pages/ProductsPage.js";
import { CartPage } from "../pages/CartPage.js";
import { CheckoutPage } from "../pages/CheckoutPage.js";

export const test = base.extend({

    loginPage: async ({ page }, use) => {
        const loginPageObject = new LoginPage(page);

        await use(loginPageObject);
    },

    productsPage: async ({ page }, use) => {
        const productsPageObject = new ProductsPage(page);

        await use(productsPageObject);
    },

    cartPage: async ({ page }, use) => {
        const cartPageObject = new CartPage(page);

        await use(cartPageObject);
    },

    checkoutPage: async ({ page }, use) => {
        const checkoutPageObject = new CheckoutPage(page);

        await use(checkoutPageObject);
    }
});

export { expect } from "@playwright/test";