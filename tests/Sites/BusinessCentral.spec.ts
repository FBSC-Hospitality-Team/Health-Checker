import { test, expect, Page, Browser, BrowserContext } from '@playwright/test';
import { bcconstants } from '../Constants/Constants.ts';
import { BCHealthCheck } from '../Functions/BC-sites.ts';

test.use({
  ignoreHTTPSErrors: true
});

let businessCentral: BCHealthCheck;

test('BC Health Checker', async ({page}) => {
  
  const businessCentralChecker = new BCHealthCheck(page);

  await businessCentralChecker.headerDisplay1();

// TEST ENVIRONMENT
  await businessCentralChecker.headerDisplayTEST();
// DEVHO
  await businessCentralChecker.DEVHO_requestor_valid_login();
// QAHO
  await businessCentralChecker.QAHO_requestor_valid_login();
// BC UAT
  await businessCentralChecker.BC_UAT_requestor_valid_login();

// PROD
  await businessCentralChecker.headerDisplayPROD();
  await businessCentralChecker.HO_requestor_valid_login();

});





