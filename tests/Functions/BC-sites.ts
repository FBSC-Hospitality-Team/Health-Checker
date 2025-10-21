import { Page, test, expect, mergeTests } from '@playwright/test';
import { bcconstants } from '../Constants/Constants';

export class BCHealthCheck {

    //Declaration of variable
    private page: Page;
    private urlDEVHO;
    private urlQAHO;
    private urlHO;
    private urlBCUAT;
    private urlPowerAutomate;
    private txtbox_username;
    private txtbox_password;
    private btnLogin;
    readonly errorMessage;

    constructor(page: Page) {

        //Assign value to the variable
        this.page = page;
        this.txtbox_username = page.getByRole('textbox', { name: 'User name:' });
        this.txtbox_password = page.getByRole('textbox', { name: 'Password:' });
        this.btnLogin = page.getByRole('button', { name: 'Sign In' });
        this.urlDEVHO = bcconstants.url_DEVHO;
        this.urlQAHO = bcconstants.url_QAHO;
        this.urlHO = bcconstants.url_HO;
        this.urlBCUAT = bcconstants.url_BC_UAT;
        this.urlPowerAutomate = bcconstants.url_Power_Automate;
        this.errorMessage = page.getByRole('heading', { name: 'Invalid Credentials.' });
    }
    async headerDisplay1(){

        const now = new Date();

        const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        };

        const formattedDate = now.toLocaleDateString('en-US', options);

        console.log(`BC, MS Forms, and Storage Metrics | Daily Health Check - ` + formattedDate + `\n`);
    }

     async headerDisplayTEST(){

        console.log(`Test Environment:`);
    }

    async headerDisplayPROD(){

        console.log(`\nProd Environment:`);
    }


    async DEVHO_requestor_valid_login() {

        //Get Current Time
        const now = new Date();

            const hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';

            const formattedHours = String(hours % 12 || 12).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');

            const currentTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

        // Navigate to the site
        try {
            const response = await this.page.goto(this.urlDEVHO, { timeout: 90000, waitUntil: 'domcontentloaded' });

            if (!response || !response.ok())// If site is not loaded  
            {
            console.log(`❌ Failed to load page. Status: ${response ? response.status() : 'No response'}`);
            return; // stop test or go to fallback
        }
        // If site loaded
        await this.txtbox_username.fill(bcconstants.requestor_username);
        await this.txtbox_password.fill(bcconstants.requestor_password);

        //Click the Login button
        await this.btnLogin.click();

        const invalidLogin = this.page.getByText('The specified user name or')
        const errorLocator = this.page.getByText('You cannot sign in due to a');
        // Check visibility
        if (await invalidLogin.isVisible()) {
            console.log('❌ Login failed – invalid username or password. Stopping the flow');
            await this.page.close();
        } 
        else if(await errorLocator.isVisible()){
            console.log(`DEVHO - Inaccessible as of ` +currentTime+ `.`);
        }
        else {
            const gridLocator = this.page.locator('iframe[title="Main Content"]').contentFrame().locator('.ms-nav-layout-flex-grid');

        if(await gridLocator.isVisible){
            console.log(`DEVHO - Accessible as of ` +currentTime+ `.`);
            await this.logout();
        }
        else {
            console.log(`DEVHO - Inaccessible as of ` +currentTime+ `.`);
        }
        }
        }   catch (error) {
        console.error(`🚨 Could not reach the site: ${error}`);
        }
        
    }

    async QAHO_requestor_valid_login() {

        //Get Current Time
        const now = new Date();

            const hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';

            const formattedHours = String(hours % 12 || 12).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');

            const currentTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

        // Navigate to the site
        try {
            const response = await this.page.goto(this.urlQAHO, { timeout: 90000, waitUntil: 'domcontentloaded' });

            if (!response || !response.ok())// If site is not loaded  
            {
            console.log(`❌ Failed to load page. Status: ${response ? response.status() : 'No response'}`);
            return; // stop test or go to fallback
        }
        // If site loaded
        await this.txtbox_username.fill(bcconstants.requestor_username);
        await this.txtbox_password.fill(bcconstants.requestor_password);

        //Click the Login button
        await this.btnLogin.click();

        const invalidLogin = this.page.getByText('The specified user name or')
        const errorLocator = this.page.getByText('You cannot sign in due to a');
        // Check visibility
        if (await invalidLogin.isVisible()) {
            console.log('❌ Login failed – invalid username or password. Stopping the flow');
            await this.page.close();
        } 
        else if(await errorLocator.isVisible()){
            console.log(`QAHO - Inaccessible as of ` +currentTime+ `.`);
        }
        else {
            const gridLocator = this.page.locator('iframe[title="Main Content"]').contentFrame().locator('.ms-nav-layout-flex-grid');

        if(await gridLocator.isVisible){
            console.log(`QAHO - Accessible as of ` +currentTime+ `.`);
            await this.logout();
        }
        else {
            console.log(`QAHO - Inaccessible as of ` +currentTime+ `.`);
        }
        }
        }   catch (error) {
        console.error(`🚨 Could not reach the site: ${error}`);
        }
    }

    async HO_requestor_valid_login() {

       //Get Current Time
        const now = new Date();

            const hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';

            const formattedHours = String(hours % 12 || 12).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');

            const currentTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

        // Navigate to the site
        try {
            const response = await this.page.goto(this.urlHO, { timeout: 90000, waitUntil: 'domcontentloaded' });

            if (!response || !response.ok())// If site is not loaded  
            {
            console.log(`❌ Failed to load page. Status: ${response ? response.status() : 'No response'}`);
            return; // stop test or go to fallback
        }
        // If site loaded
        await this.txtbox_username.fill(bcconstants.requestor_username);
        await this.txtbox_password.fill(bcconstants.requestor_password);

        //Click the Login button
        await this.btnLogin.click();

        const invalidLogin = this.page.getByText('The specified user name or')
        const errorLocator = this.page.getByText('You cannot sign in due to a');
        // Check visibility
        if (await invalidLogin.isVisible()) {
            console.log('❌ Login failed – invalid username or password. Stopping the flow');
            await this.page.close();
        } 
        else if(await errorLocator.isVisible()){
            console.log(`HO - Inaccessible as of ` +currentTime+ `.`);
        }
        else {
            const gridLocator = this.page.locator('iframe[title="Main Content"]').contentFrame().locator('.ms-nav-layout-flex-grid');

        if(await gridLocator.isVisible){
            console.log(`HO - Accessible as of ` +currentTime+ `. \n`);
            await this.logout();
        }
        else {
            console.log(`HO - Inaccessible as of ` +currentTime+ `. \n`);
        }
        }
        }   catch (error) {
        console.error(`🚨 Could not reach the site: ${error}`);
        }
    }

    async BC_UAT_requestor_valid_login() {
        //Get Current Time
        const now = new Date();

            const hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';

            const formattedHours = String(hours % 12 || 12).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');

            const currentTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

        // Navigate to the site
        try {
            const response = await this.page.goto(this.urlBCUAT, { timeout: 90000, waitUntil: 'domcontentloaded' });

            if (!response || !response.ok())// If site is not loaded  
            {
            console.log(`❌ Failed to load page. Status: ${response ? response.status() : 'No response'}`);
            return; // stop test or go to fallback
        }
        // If site loaded
        await this.txtbox_username.fill(bcconstants.requestor_username);
        await this.txtbox_password.fill(bcconstants.requestor_password);

        //Click the Login button
        await this.btnLogin.click();

        const invalidLogin = this.page.getByText('The specified user name or')
        const errorLocator = this.page.getByText('You cannot sign in due to a');
        // Check visibility
        if (await invalidLogin.isVisible()) {
            console.log('❌ Login failed – invalid username or password. Stopping the flow');
            await this.page.close();
        } 
        else if(await errorLocator.isVisible()){
            console.log(`BC-UAT - Inaccessible as of ` +currentTime+ `.`);
        }
        else {
            const gridLocator = this.page.locator('iframe[title="Main Content"]').contentFrame().locator('.ms-nav-layout-flex-grid');

        if(await gridLocator.isVisible){
            console.log(`BC-UAT - Accessible as of ` +currentTime+ `.`);
            await this.logout();
        }
        else {
            console.log(`BC-UAT - Inaccessible as of ` +currentTime+ `.`);
        }
        }
        }   catch (error) {
        console.error(`🚨 Could not reach the site: ${error}`);
        }
       
    }

    async logout() {
        await this.page.getByRole('button', { name: 'User Account' }).click();
        await this.page.getByText('Sign out').click();

    }

}
