import { test, expect } from "./fixtures/testFixtures.js";

test("Valid login", async ({ loginPage, page }) => {

    await loginPage.navigate("https://www.saucedemo.com/");

    await loginPage.login(
        "standard_user",
        "secret_sauce"
    );

    await expect(page).toHaveURL(/inventory/);
});