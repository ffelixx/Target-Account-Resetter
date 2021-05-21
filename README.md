Target Account Resetter - felix#5678 - [@eeeefelix](https://twitter.com/eeeefelix)

![image](https://user-images.githubusercontent.com/76449086/119068233-c5929500-b9b1-11eb-81a7-ad7dfd180904.png)

Download and Setup
------------
Download and install [Node](https://nodejs.org/dist/v15.14.0/node-v15.14.0-x64.msi).

Click on the green "Code" button on this page and click "Download Zip".

Extract the zip file into a new folder.

Open up command prompt and type `cd `(with the space at the end) then drag and drop the folder into the command prompt and press enter.

Run the command `npm install` to grab all dependencies.

Enable [less secure apps](https://myaccount.google.com/lesssecureapps) and [IMAP](https://mail.google.com/mail/u/0/#settings/fwdandpop) in your gmail account.

Open `config.json` and put in your gmail as well as password, as of right now this will only work on forwarded gmails as well as catchalls.

Go into the sub-folder `txt`, put the accounts you want to reset in `accounts.txt`, and proxies in `proxies.txt`.

Once the accounts are reset they will populate `reset.txt` you MUST input the same amount or more proxies than accounts. Keep in mind that any time you run the script, the contents of `reset.txt` will be deleted, store them somewhere before resetting more.

If you have tons of unnecessary emails in your inbox I recommend deleting them, it should work fine regardless although.

To run the script, double click `start.bat`.
