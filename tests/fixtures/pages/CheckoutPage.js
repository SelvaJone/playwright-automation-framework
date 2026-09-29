import { BasePage } from "./BasePage.js";

export class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);

        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');

        this.continueButton = page.locator(
            '[data-test="continue"]'
        );

        this.finishButton = page.locator(
            '[data-test="finish"]'
        );

        this.completeMessage = page.locator(
            ".complete-header"
        );
    }

    async enterCustomerDetails(firstName, lastName, postalCode) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async clickFinish() {
        await this.finishButton.click();
    }

    async getCompleteMessage() {
        return await this.completeMessage.textContent();
    }
}