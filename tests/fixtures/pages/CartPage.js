import { BasePage } from "./BasePage.js";

export class CartPage extends BasePage {
    constructor(page) {
        super(page);

        this.cartItem = page.locator(".inventory_item_name").filter({hasText: "Sauce Labs Backpack"});

        this.checkoutButton = page.locator(
            '[data-test="checkout"]'
        );
    }

    async getProductName() {
        return await this.cartItem.textContent();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }
}