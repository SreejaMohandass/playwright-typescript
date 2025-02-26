import { Page, Locator } from '@playwright/test';
export class LoginPage {
    readonly page: Page;

    constructor(Page: Page) {
        this.page = Page;
    }

    getEmailInputButton(): Locator {
        return this.page.locator('#email');
    }

    getCaptcha(): Locator {
        const iframe = this.page.locator('iframe[title="reCAPTCHA"]');
        const frame = iframe.contentFrame();
        return frame.locator('[role="checkbox"]#recaptcha-anchor');
    }

    getSubmitButton(): Locator {
        return  this.page.getByRole('button', { name: 'Enviar' });
    }

    getErrorMessage(): Locator {
        return this.page.locator('#loginForm span').first();

    }

    
    
}