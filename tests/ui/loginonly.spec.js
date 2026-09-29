import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
/*
Open application
      ↓
Enter username
      ↓
Enter password
      ↓
Click Login
      ↓
Verify Products page
*/
test("Valid login", async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate("https://www.saucedemo.com/");

    await loginPage.login(
        "standard_user",
        "secret_sauce"
    );

    await expect(page).toHaveURL(/inventory/);
});