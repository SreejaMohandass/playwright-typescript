import test, {expect} from "@playwright/test";
import { HomePage } from '~/tests/pages/home-page';
import { LoginPage } from "~/tests/pages/login-page";
import { fetchEmailBodyBySubject } from "~/utils";
import { GeneralAccessPage } from '~/tests/pages/geneeral-access-page';
import { EMAIL_SUBJECT_FOR_API_KEY, IMAP_CONFIG } from '~/utils';

test.describe("Login Page", () => {
    
      
    test("Valid email : Parse the email and retrieve the API Key", async ({page}) => {
        const homePage = new HomePage(page); 
        const loginPage = new LoginPage(page); 
        const generalAccessPage = new GeneralAccessPage(page); 

        await page.goto("/");
        await homePage.getLoginButton().click();
        await loginPage.getEmailInputButton().fill('testaxpo6@gmail.com');
        
        await page.pause();
        await loginPage.getSubmitButton().click();

        await page.waitForTimeout(60000);

        const emailBody = await fetchEmailBodyBySubject(IMAP_CONFIG, EMAIL_SUBJECT_FOR_API_KEY);
      
        console.log('Email body:', emailBody);
        await page.goto("/");
        await homePage.getEntrarButton().click();
        await generalAccessPage.getAPIKeyInput().fill(emailBody);
      
         
    });

    test("Invalid email", async ({page}) => {
        const homePage = new HomePage(page); 
        const loginPage = new LoginPage(page); 
        await page.goto("/");
        await homePage.getLoginButton().click();
        await loginPage.getEmailInputButton().fill('testaxpo6');

        let errorMsg: string  = null;
        page.on('dialog', async (dialog) => {
            if (dialog.type() === 'alert') {
              errorMsg = dialog.message();
              await dialog.accept();
            }
        });
        await loginPage.getSubmitButton().click();
        expect(errorMsg).not.toBeNull(); 
         
    });
})