import {test,expect} from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
test('Valid login',async({page})=>{
    const loginPage=new LoginPage(page);
    //await page.goto('https://www.saucedemo.com/');
    await loginPage.navigate('https://www.saucedemo.com/');
    const productPage=await loginPage.login(
         "standard_user",
        "secret_sauce"
    );
    await expect(page).toHaveURL(/inventory/);
   await productPage.addBackpackToCart();
   // await productPage.openCart();
    const cartPage = await productPage.openCart();
     const productName = await cartPage.getProductName();

    console.log("Product in cart:", productName);

    await expect(productName).toBe("Sauce Labs Backpack");


});