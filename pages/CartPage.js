import { BasePage } from "./BasePage";
export class CartPage extends BasePage{
    constructor(page){
        super(page);
        this.cartItem = page.locator(".inventory_item_name").first();
        this.checkoutButton = page.locator('[data-test="checkout"]');
//         this.cartItem = page.locator(
//     '[data-test="inventory-item-name"]'
// ).filter({ hasText: "Sauce Labs Backpack" });
    }
 async getProductName() {
        return await this.cartItem.textContent();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
        return new CheckoutPage(this.page);
    }
}