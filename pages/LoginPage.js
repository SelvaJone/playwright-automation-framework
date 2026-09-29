
import { BasePage } from "./BasePage";
import { ProductPage } from "./ProductPage";
export class LoginPage extends BasePage{
    constructor(page){
        //this.page=page;
        super(page);
        this.username=page.locator('#user-name');
        this.password = page.locator("#password");
        this.loginButton = page.locator("#login-button");
    }

    async login(username, password) {

        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        //After login succeeds, give me a ProductsPage object.
        return new ProductPage(this.page);
    }
    }
