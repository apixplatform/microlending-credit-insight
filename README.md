# Micro-Lending Credit Insight Use Case

This use case is an extension of [Account Opening Use Case](https://github.com/apixplatform/account-opening)

Microlending involves granting small loans to people in need. These loans are generally used by entrepreneurs with a business idea or those who need extra cash to expand. In that sense, they aren't much different from small business loans. However, microlending is actually much different. What makes these loans unique are the motivations behind it, the sizes of loans, and the people involved.

Evaluating the creditworthiness of the borrowers would reduce the risk of the loan not getting repaid. This use case would evaluate the credit score of the borrower.

## Additional APIs used to implement the use case

1. Trusting Social - Credit Insight ([Link](https://apixplatform.com/profile/api-detail?api-id=259))

    * Staging API access Keys
        * username: apix_user
        * password: apixuser@123
        * clientCode: apix_client
        * host: https://staging-api.trustingsocial.com
        * basePath: /

## Setting up the development server

**Note:** If previous use case is running in the IDE Terminal, Press `Ctrl` + `C` to stop. 

Execute following commands in Terminal window.

1.  Let's change the terminal directory to root `projects` folder

        cd ~/project/

2.  Download the code into IDE instance

        git clone https://github.com/apixplatform/microlending-credit-insight.git

3.  Use case code is downloaded to IDE instance to the folder `microlending-credit-insight`. Let's change the terminal directory to `microlending-credit-insight` folder.

        cd microlending-credit-insight/

4.  Download Angular dependancies with below commands.

        npm install

5.  Start the Angular application server.

        npm start

To configure the use case,

1. Open `microlending-credit-insight` > `api-config.json` from the `Project Explorer` left pane.
2. Provide your APIX credentials.

        "userName": "Replace this with your APIX username",
        "password": "Replace this with your APIX password"

3. From the main menu, click `File` > `Save`.

Now the development server is up and running with correct configurations. To open the use case website follow the below instructions.

1. Copy the IDE instance URL from the browser tab. (ex: `https://ide-xxxxxx.services.apixplatform.com/`)
2. Open a new browser tab and paste the copied IDE url. Change the `ide` text to `app` in the URL and open. New URL would look like (ex: `https://app-xxxxxx.services.apixplatform.com/`)

## Testing the use case

1. Click on `Create an Account` button from `Home` page.

    i. In the GitHub project go to `test-images` and download `id.jpg` and `selfie.jpg`. Provide these two images in the 1st step of application window and click `Verify` button. 

    * HyperVerge Face Match API will get executed to validate the provided identity document and selfie. 
    * Match confidence level will be provided as the output. 
    * Click on `Go to Account Creation` button to proceed. 

    ii. Provide account creation inputs and click `Create Account` Button.

    * Bank customer will get created with the provided `Account Holder's Name` using `Smart Bank - Party` API.
    * New Account gets created using `Smart Bank - Account` API.
    * Newly created customer will be assigned to the Account as the Account Owner using `Smart Bank - Account` API.

    iii. Created Account Details will be shown in the Step 3.

    iv. Click `Home` button.

2. Click on `Apply for a Loan` button from `Home` Page

    i. Enter the name and phone number (`917025976692`) and `Submit`.

    ii. OTP needs to be provided now. 
    
    * Go to [Trusting Social Staging SMS Service](https://staging-api.trustingsocial.com/smsc_chat)
    * Enter `917025976692` in the `Input Phone Number` field and Submit.
    * Copy the correct OTP for the request and provide it in Use case frontend and `Submit`.

    iii. If Credit Score is healthy, `You are eligible for a loan!` message will appear in the screen.
