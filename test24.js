const puppeteer = require('puppeteer');
const url = "https://www.bbsfonline.com/BbsfOnline/Public/User/Login"
const UserName ="mosaabmosaab"
const password="123456789"
if (!url) {
    throw "Please provide URL as a first argument";
}
async function run () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.evaluate(() => {
      //  document.getElementById("UserName").innerHTML="ddddddddddddd";
   //document.document.querySelectorAll("#UserName").value="mossabbbb"
   var  t =document.getElementById('UserName').value=UserName
    var  t =document.getElementById('password-input').value=password
})
await page.getElementById("submit_btn").click;
//await page.waitForNavigation(); 

    await page.screenshot({path: 'screenshot.png'});
    browser.close();
}
run();