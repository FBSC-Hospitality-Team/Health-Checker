import { test, expect, Page, Browser, BrowserContext } from '@playwright/test';
import { bcconstants } from '../Constants/Constants.ts';
import { PAHealthCheck } from '../Functions/Power-Automate-sites.ts';

test.use({
  ignoreHTTPSErrors: true
});

let PowerAutomate: PAHealthCheck;

test('Power Automate Health Checker', async ({page}) => {
  
  const powerAutomateChecker = new PAHealthCheck(page);
    // Digitization
    await powerAutomateChecker.navigatePowerAutomate();
    await powerAutomateChecker.digitizationLoginMicrosoft();
    await powerAutomateChecker.PAValidation();
    await powerAutomateChecker.logoutDigitization();

    // Demo Reviewer
    await powerAutomateChecker.navigatePowerAutomate();
    await powerAutomateChecker.demoRevieverLoginMicrosoft();
    await powerAutomateChecker.PAValidation();

});





