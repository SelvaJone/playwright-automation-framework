import { BasePage } from "./BasePage.js";

export class ProductPage extends BasePage {

    constructor(page) {
        super(page);

        this.backpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.cartLink = page.locator(".shopping_cart_link");
    }

    async addBackpackToCart() {
        await this.backpack.click();
    }

    async openCart() {
        await this.cartLink.click();
          return new CartPage(this.page);
    }
}