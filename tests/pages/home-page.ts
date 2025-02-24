import { Page, Locator } from '@playwright/test';
export class HomePage {
    readonly page: Page;

    constructor(Page: Page) {
        this.page = Page;
    }

    getLoginButton(): Locator {
        return  this.page.getByRole('button', { name: 'Solicitar' });
    }

    getEntrarButton(): Locator {
        return  this.page.getByRole('button', { name: 'Entrar' }).first();
    }
    
}