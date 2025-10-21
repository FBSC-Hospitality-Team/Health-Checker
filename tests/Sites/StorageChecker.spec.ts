import { test, expect, Page, Browser, BrowserContext } from '@playwright/test';
import { bcconstants } from '../Constants/Constants.ts';
import { StorageChecker } from '../Functions/Storage-Checker.ts';

test.use({
  ignoreHTTPSErrors: true
});

let PowerAutomate: StorageChecker;

test('Storage Checker', async ({page}) => {
  
  const storageChecker = new StorageChecker(page);
    // Digitization
    await storageChecker.navigateSharepoint();
    await storageChecker.digitizationLoginMicrosoft();
    await storageChecker.navigateSharepointSite();
    await storageChecker.navigateOutlook();
    await storageChecker.FHCstoragecheck();

});





