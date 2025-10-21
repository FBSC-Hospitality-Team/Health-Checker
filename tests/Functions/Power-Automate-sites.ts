import { Page, test, expect, mergeTests } from '@playwright/test';
import { bcconstants } from '../Constants/Constants';

export class PAHealthCheck {

    //Declaration of variable
    private page: Page;
    private urlPowerAutomate;
    private txtbox_usernameDigitization;
    private txtbox_passwordDigitization;
    private txtbox_usernameDemoReviewer;
    private txtbox_passwordDemoReviewer;
    readonly errorMessage;

    constructor(page: Page) {

        //Assign value to the variable
        this.page = page;
        this.txtbox_usernameDigitization = page.getByRole('textbox', { name: 'Enter your email, phone, or'});
        this.txtbox_passwordDigitization = page.getByRole('textbox', { name: 'Enter the password for' });
        this.txtbox_usernameDemoReviewer = page.getByRole('textbox', { name: 'Enter your email, phone, or'});
        this.txtbox_passwordDemoReviewer = page.getByRole('textbox', { name: 'Enter the password for' });
        this.urlPowerAutomate = bcconstants.url_Power_Automate;
        this.errorMessage = page.getByRole('heading', { name: 'Invalid Credentials.' });
    }

    async navigatePowerAutomate(){
        // Navigate to the site
        await this.page.goto(this.urlPowerAutomate, { timeout: 90000 });

        // Validate the Login URL
        await expect(this.page.locator('#lightbox')).toBeVisible();

        
    }

    async digitizationLoginMicrosoft(){
            
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

        console.log(`Digitization Account:`)

    }

    async demoRevieverLoginMicrosoft(){
        await this.page.waitForTimeout(3000);
         const textboxLocator = this.page.getByRole('button', { name: 'Use another account' });
            if (await textboxLocator.isVisible({ timeout: 10000 })) {
                await this.page.getByRole('button', { name: 'Use another account' }).click();
                await expect(this.page.getByRole('textbox', { name: 'Enter your email, phone, or' })).toBeVisible();
                await this.txtbox_usernameDemoReviewer.fill(bcconstants.demo_reviewer_username);
            }
            else {
                // Fill Email Credentials
                await this.txtbox_usernameDemoReviewer.fill(bcconstants.demo_reviewer_username);
            }
        await this.page.getByRole('button', { name: 'Next' }).click();
        
        // Fill Email Password

        await expect(this.page.getByRole('heading', { name: 'Enter password' })).toBeVisible();
        await this.txtbox_passwordDemoReviewer.fill(bcconstants.demo_reviewer_password);
        await this.page.getByRole('button', { name: 'Sign in' }).click();
        const formLocatior = this.page.getByRole('heading', { name: 'Stay signed in?' });
            if (await formLocatior.isVisible({ timeout: 5000 })) {
                await this.page.getByRole('button', { name: 'No' }).click();
            }
            else {
                await this.page.waitForLoadState();
            }
        console.log(`\nDemo Reviewer Account:`)
    }

    async PAValidation(){
        const modal = this.page.locator('xpath=/html/body/div[3]/div/div/div/div/div[2]');

        try {
        // Wait for the modal to appear within 5 seconds
        await modal.waitFor({ state: 'visible', timeout: 20000 });

        const listItems = modal.locator('li');
        const count = await listItems.count();

        if (count > 0) {
            const items = await listItems.allTextContents();
            const filtered = items.filter(item => item.includes('FHC'));

            if (filtered.length > 0) {
            console.log('Power Automate connection needs to re-authenticate. \nList of MS Forms affected":');
            filtered.forEach((item) => {
                console.log(`- ${item}`);
            });
            await this.page.getByRole('button', { name: 'Close' }).click();
            } else {
            console.log('No reauthentication needed. All flows are running and operational');
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('button', { name: 'Close' }).click();
            
            }
        } else {
            console.log('⚠️ Modal is visible, but no list items found.');
            await this.page.getByRole('button', { name: 'Close' }).click();
        }
        } catch (e) {
        console.log('No reauthentication needed. All flows are running and operational');
        }
    }

    async logoutDigitization(){
        await expect(this.page.getByRole('button', { name: 'Account manager for CTI' })).toBeVisible({timeout: 5000});
        await this.page.getByRole('button', { name: 'Account manager for CTI' }).click();
        await this.page.getByRole('button', { name: 'Sign out of this account' }).click();
        await this.page.locator('[data-test-id="digitization@corptech.it"]').click();
        await expect(this.page.getByRole('heading', { name: 'Pick an account' })).toBeVisible();
    }


}
