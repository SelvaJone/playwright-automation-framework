import { test, expect } from "./fixtures/testFixtures.js";

test("Add backpack to cart", async ({
    loginPage,
    productsPage,
    page
}) => {

    await loginPage.navigate("https://www.saucedemo.com/");

    await loginPage.login(
        "standard_user",
        "secret_sauce"
    );

    await productsPage.addBackpackToCart();

    await expect(
        page.locator(".shopping_cart_badge")
    ).toHaveText("1");
});