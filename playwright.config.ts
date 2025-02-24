import {defineConfig, devices} from "@playwright/test";
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    testDir: "./tests",
    timeout: 180000,
    forbidOnly: !!process.env.CI,
    retries: 2,
    reporter: process.env.CI
    ? [["junit", {outputFile: "test-results/e2e-junit-results.xml"}]]
    :"html",
    use: {
        baseURL: "https://opendata.aemet.es/",
        storageState: "playwright/.auth/user.json",
        trace: "on-first-retry",
        ...devices["Desktop Chrome"]
    },
    globalSetup: "./setup"
})