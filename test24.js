const puppeteer = require('puppeteer');
const url = "https://www.bbsfonline.com/BbsfOnline/Public/User/Login"
if (!url) {
    throw "Please provide URL as a first argument";
}
async function run () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.evaluate(() => {
        document.getElementById("UserName").innerHTML="ddddddddddddd";
   //document.document.querySelectorAll("#UserName").value="mossabbbb"
})

    await page.screenshot({path: 'screenshot.png'});
    browser.close();
}
run();