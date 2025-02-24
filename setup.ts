
import { chromium, BrowserContext } from '@playwright/test';

const authFile = "playwright/.auth/user.json";

async function globalSetup() {
    const browser = await chromium.launch(); 
    const context: BrowserContext = await browser.newContext(); 
    const page = await context.newPage(); 

    await page.goto('https://opendata.aemet.es/'); 
    await page.context().storageState({ path: authFile }); 

    await browser.close(); 
}

export default globalSetup;
