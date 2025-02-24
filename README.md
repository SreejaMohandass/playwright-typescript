# Playwright Test Automation

This project uses **Playwright** for end-to-end testing. The tests include scenarios that require manual intervention to solve CAPTCHAs.

## 📌 Prerequisites
- Install **Node.js** (v16 or later recommended)
- Install dependencies:
  ```sh
  npm install
  ```
- Create a `.env` file and update the required credentials.

## 🚀 Running Tests

### **Run Tests with Playwright UI**
```sh
npm run test:ui
```
This opens the **Playwright Test Runner UI**, allowing you to interactively debug tests.

### **Run Tests in Headless Mode**
```sh
npm run test
```
Runs tests **without opening a browser** (faster execution).

### **Run Tests in Headed Mode (For CAPTCHA Solving)**
```sh
npm run test:headed
```
Runs tests **with a visible browser window**, allowing you to manually solve CAPTCHA.

⚠️ **IMPORTANT:** Since CAPTCHA cannot be bypassed, the tests **must** be launched in headed mode. The execution will **pause** when CAPTCHA appears, allowing manual solving. Once solved, the remaining steps will continue automatically.

## 🔑 Environment Variables
Update your `.env` file with the necessary credentials:
```env
EMAIL=test@example.com
PASSWORD=yourpassword
HOST=host
PORT=port
```

## 🛠 Debugging
- Use **Playwright Inspector** for debugging:
  ```sh
  PWDEBUG=1 npm run test:headed
  ```
- To capture network logs:
  ```sh
  DEBUG=pw:api npm run test:headed
  ```

