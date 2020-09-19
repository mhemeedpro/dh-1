const puppeteer = require('puppeteer');
//link login to web site
const url = "https://www.bbsfonline.com/BbsfOnline/Public/User/Login"
//const verables user data 
const user ="mosaabmosaab"
const pass="1234567890"
const phoneNumber=""
var typebill=1 // is mean phone number
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
   var  t =document.getElementById('UserName')
   t.value="0436787";
    var  p=document.getElementById('password-input')
     p.value="Idhm-99-hga";
   var submit =document.getElementById('submit_btn')
   submit.click();
})
await page.waitForNavigation(); 

try{
var message = await page.evaluate(() => {
    return  document.getElementById('messages').innerHTML
})
console.log(message);
    await page.screenshot({path: 'screenshot1.png'});
}
catch{
    console.log("true login ")
}

if(typebill){
await page.goto("https://www.bbsfonline.com/BbsfOnline/User/SEPServices/Index").then(()=>
{
   page.evaluate(()=>{
    var select = document.getElementById('CategoryCode')
    select.selectedIndex = 0
})
})



//await page.select("select#", 'الاتصالات')

await page.screenshot({path: 'screenshot2.png'});







}
else
{
    //electic bills
}



    browser.close();
}
run();