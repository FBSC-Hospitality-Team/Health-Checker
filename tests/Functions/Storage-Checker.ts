import { Page, test, expect, mergeTests } from '@playwright/test';
import { bcconstants } from '../Constants/Constants';

export class StorageChecker {

    //Declaration of variable
    private page: Page;
    private urlSharepoint;
    private urlOutlook;
    private txtbox_usernameDigitization;
    private txtbox_passwordDigitization;
    readonly errorMessage;

    constructor(page: Page) {

        //Assign value to the variable
        this.page = page;
        this.txtbox_usernameDigitization = page.getByRole('textbox', { name: 'Enter your email, phone, or' });
        this.txtbox_passwordDigitization = page.getByRole('textbox', { name: 'Enter the password for' });
        this.urlSharepoint = bcconstants.url_Sharepoint;
        this.urlOutlook = bcconstants.url_Outlook;
        this.errorMessage = page.getByRole('heading', { name: 'Invalid Credentials.' });
    }

    async navigateSharepoint() {
        // Navigate to the site
        await this.page.goto(this.urlSharepoint, { timeout: 90000 });

        // Validate the Login URL
        await expect(this.page.locator('#lightbox')).toBeVisible();
    }

    async digitizationLoginMicrosoft() {

        await expect(this.page.getByRole('textbox', { name: 'Enter your email, phone, or' })).toBeVisible();
        // Fill Email Credentials
        await this.txtbox_usernameDigitization.fill(bcconstants.digitization_username);
        await this.page.getByRole('button', { name: 'Next' }).click();

        // Fill Email Password
        await expect(this.page.getByRole('heading', { name: 'Enter password' })).toBeVisible();
        await this.txtbox_passwordDigitization.fill(bcconstants.digitization_password);
        await this.page.getByRole('button', { name: 'Sign in' }).click();
        await this.page.waitForTimeout(2000);

        const formLocatior = this.page.getByRole('heading', { name: 'Stay signed in?' });
        if (await formLocatior.isVisible({ timeout: 5000 })) {
            await this.page.getByRole('button', { name: 'No' }).click();
        }
        else {
            await this.page.waitForLoadState();
        }


    }

    async navigateSharepointSite() {
        await expect(this.page.locator('#leftPane div').filter({ hasText: 'FollowingCTI Portal Test Site' }).first()).toBeVisible();

        console.log(`Storage Status: \n`)

        await expect(this.page.getByRole('link', { name: 'FHC Integration with Business Central', exact: true })).toBeVisible();
        await this.page.getByRole('link', { name: 'FHC Integration with Business Central', exact: true }).click();
        await this.page.getByRole('button', { name: 'Settings' }).click();
        await expect(this.page.getByRole('heading', { name: 'Settings' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Site information' }).click();
        await expect(this.page.getByRole('link', { name: 'View all site settings' })).toBeVisible();
        await this.page.getByRole('link', { name: 'View all site settings' }).click();
        await expect(this.page.locator('#s4-titlerow')).toBeVisible();

        await this.page.getByRole('link', { name: 'Storage Metrics' }).click();
        await expect(this.page.getByText('Storage Metrics')).toBeVisible();

        await expect(this.page.locator('#ctl00_PlaceHolderMain_tdSiteQuotaInfoSection').getByRole('cell', { name: 'GB free of 110.00 GB' })).toBeVisible();
        // Define the locator
        const quotaLocator = this.page
            .locator('#ctl00_PlaceHolderMain_tdSiteQuotaInfoSection')
            .getByRole('cell').nth(0);

        // Wait until it is visible
        await expect(quotaLocator).toBeVisible({ timeout: 10000 });

        // Get the actual text value
        const quotaText = await quotaLocator.innerText();

        // Print it to console
        console.log('FHC Integration with Business Central -', quotaText);

        // const allCells = await this.page
        //     .locator('#ctl00_PlaceHolderMain_tdSiteQuotaInfoSection td')
        //     .allInnerTexts();

        // console.log('All quota cells:', allCells);


    }

    async navigateOutlook() {
        // Navigate to the site
        await this.page.goto(this.urlOutlook, { timeout: 90000 });
        await expect(this.page.getByRole('button', { name: 'Account manager for FHC' })).toBeVisible();
    }

    async FHCstoragecheck() {
        await this.page.getByRole('button', { name: 'Settings' }).click();
        await this.page.getByRole('tab', { name: 'Account' }).click();
        await this.page.getByRole('tab', { name: 'Storage' }).click();

        const usedLocator = this.page.getByText(/GB used of/); // regex in case value changes
        await expect(usedLocator).toBeVisible({ timeout: 10000 });

        const usedText = await usedLocator.innerText();
        console.log('FHC Ourhub Email -', usedText);

    }

}
