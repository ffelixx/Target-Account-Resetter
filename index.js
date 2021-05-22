const fs = require('fs');
const puppeteer = require('puppeteer-extra');
let counter = 0;
const yaml = require('js-yaml');
const { user, password } = require('./config.json')
const colors = require('colors')
const faker = require('faker');
const eee = fs.createWriteStream('./txt/reset.txt', { flags: 'a' })
require('events').EventEmitter.defaultMaxListeners = 100;
const newpass = faker.internet.password()

fs.readFile('./txt/proxies.txt', 'utf8', async function(err, data) {
    if (err) throw err;
    fs.writeFile('./txt/reset.txt', '', function(){})
    let proxies = data.split("\r\n")
    fs.readFile('./txt/accounts.txt', 'utf8', async function(err, data) {
        if (err) throw err;
        emails = data.split("\r\n")
        process.title = `${counter}/${emails.length} Successfully Unlocked`
    const loopd = async function(){
        emails.forEach(async function(emaiel, index){
            setTimeout(async function(){
            let proxy = proxies[Math.floor(Math.random() * proxies.length)];
            let subProxy = proxy.split(":")
            let index = proxies.indexOf(proxy)
            proxies.splice(index, 1)
            let email = emaiel.split(":")[0]

            const StealthPlugin = require('puppeteer-extra-plugin-stealth')
            puppeteer.use(StealthPlugin())
    
            const browser = await puppeteer.launch({             
                args: [
                `--proxy-server=http://${subProxy[0]}:${subProxy[1]}`,
                ],
                headless: true,
            });
            const page = await browser.newPage();
            await page.setUserAgent(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
              );
            await page.authenticate({
                username: subProxy[2],
                password: subProxy[3],
            });
            await page.goto('https://target.com', { waitUntil: 'networkidle0' })
 
            let breaks = []
            try{
                await page.waitForSelector('#account')
                await page.focus('#account')
                await page.keyboard.press('Enter')
                await sleep(1000)
                await page.keyboard.press('Enter')
                await page.waitForSelector('#recoveryPassword')
                await page.focus('#recoveryPassword')
                await sleep(2000)
                await page.keyboard.press('Enter')
                await page.waitForSelector('#username');
                await page.focus("#username")
                await page.keyboard.type(email, { delay: 50 })
                await page.waitForSelector('#continue')
                await page.focus('#continue')
                await page.keyboard.press('Enter')
                await sleep(1000)
                await page.waitForSelector('#continue')
                await sleep(3000)
                await page.click('#continue')
    
                await page.waitForSelector('#verify')
            }catch{
                console.log(`Error Resetting Password - ${email}`.red)
                breaks.push(true)
            }

            i=1
            let doBreak = []
            while(i=1){
            if(doBreak[0] == true || breaks[0] == true){
                break;
            }
            const Imap = require('imap'), inspect = require('util').inspect;
            const imap = new Imap({
                user: user,
                password: password,
                host: 'imap.gmail.com',
                port: 993,
                tls: true,
                tlsOptions: { rejectUnauthorized: false }
            });

            imap.connect();
            async function openInbox(cb) { imap.openBox('INBOX', false, cb); }
            imap.once('ready', async function() {
                await openInbox(async function(err, box) {
                    if (err) throw err;
                    const f = imap.seq.fetch(`1:5000`, {
                        bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
                        struct: true
                    });
                    f.on('message', async function(msg, seqno) {
                        msg.on('body', async function(stream, info) {
                            let buffer = '';
                            stream.on('data', async function(chunk) {
                                buffer += chunk.toString('utf8');
                            });
                            stream.once('end', async function reg() {
                                const header = inspect(Imap.parseHeader(buffer))
                                if(header.toString().includes('Target')){
                                const obj = yaml.load(header);
                                const rec = obj.to;
                                const recip = rec.toString()
                                const eg = recip.replace(/<|>/g, '')
                                if (eg == email) {
                                    const sub = obj.subject;
                                    const subj = sub.toString()
                                    const isCode = subj.startsWith("Your Target.com password reset code is")
                                    if (isCode == true) {
                                        const codee = subj.split("Your Target.com password reset code is ")[1]
                                        const code = codee.split(".")[0]
                                        if (code) {
                                            console.log(`Code found - ${eg} - ${code}`.yellow)
                                            doBreak.push(true)
                                            let pass = await page.$x('//*[@id="root"]/div/div[1]/div/div[2]/div/div/form/input')
                                            await pass[0].focus()
                                            await page.keyboard.type(code, {
                                                delay: 50
                                            })
                                            let verif = await page.$x('//*[@id="verify"]')
                                            await verif[0].focus()
                                            await page.keyboard.press('Enter')
                                            try{
                                                await page.waitForSelector('#password')
                                                await sleep(1000)
                                                await page.focus('#password')
                                                await page.keyboard.type(newpass, {
                                                    delay: 50
                                                })
                                                await page.focus('#submit')
                                                await page.keyboard.press('Enter')
                                                const loggedin = await page.waitForSelector('#account', {
                                                    timeout: 30000
                                                })
                                            if (loggedin) {
                                                console.log(`Successfully Unlocked - ${email}`.green)
                                                eee.write(`${email}:${newpass}\n`) 
                                                counter++;
                                                process.title = `${counter}/${emails.length} Successfully Unlocked`
                                                await browser.close()
                                            }
                                        } catch {
                                            doBreak.push(true)
                                            console.log(`Error Resetting Password - ${email}`.red)
                                            await browser.close()
                                            return;
                                        }
                                        }
                                    }
                                }
                            }
                            });
                        });
                    });

                    f.on('error', async function(err) {
                        console.error(error)
                    });
    
                    f.once('end', function() {
                        imap.end();
                    });
                      
    
                });
            });

        await sleep(10000)
        }
            },
            5000 * index);
            })
    }
        loopd()

    });
})

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}