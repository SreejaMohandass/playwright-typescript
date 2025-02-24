import { Page, Locator } from '@playwright/test';
export class GeneralAccessPage {
    readonly page: Page;

    constructor(Page: Page) {
        this.page = Page;
    }

    getAPIKeyInput(): Locator {
        return this.page.locator('#apikey');
    }

    
    
}