const puppeteer = require('puppeteer');
var Notification = require('../model/notification.js');
var Company = require('../model/company.js');
//link login to web site
var bemo =  function(){};

bemo.payment=function(bill){

const url = "https://www.bbsfonline.com/BbsfOnline/Public/User/Login"

Company.getCompanyById(1,function(error,res){
    if(error)
    console.log(error);
    else console.log(res);
  });
//const verables user data 

 global.pass="Idhm-99-hga";
//global.pass=;
global.phone=bill.phone
global.id_point=bill.id_point_sale
global.id_company=bill.id_company
const countBill=0
var message
if (!url) {
    throw "Please provide URL as a first argument";
}
async function run () {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    global.user="0436787";
    await page.evaluate((user) => {
     
            console.log(user)
                var  t =document.getElementById('UserName')
                    t.value=user
                 var  p=document.getElementById('password-input')
                    p.value=userData.pass
                var submit =document.getElementById('submit_btn')
                    submit.click();
   

})
await page.waitForNavigation(); 

 //   await page.screenshot({path: 'screenshot1.png'});


await page.goto("https://www.bbsfonline.com/BbsfOnline/User/SEPServices/Index").then((res)=>
{
    console.log(res) 
})
.catch((error)=>{
    console.log(error)
})
 


await  page.select('#CategoryCode','8')
  await  page.evaluate((phone)=>{
    var number = document.getElementById('billingNumber_1')

    number.value=phone
   var check =document.getElementById('startInquiry')
   check.click();
 
})

//page.click('#startInquiry')
// await page.on('request', (request) => {
//     console.log(request)
   
// });
await page.evaluate((phone,id_company,id_point) => 
{
    setTimeout(function(){
        console.log("start  to check bill")

    var state= document.getElementsByClassName("alert alert-danger")
    if(state.length>0)
    {
        console.log("hasent bill")
        console.log(state[0].innerText)
        Notification.createNewNotification(new Notification({id:null,id_company:id_company,id_point_sale:id_point,id_user:2,phone:phone,msg:state[0].innerText})
        ,function(error,rss){
        
            if(error)
            console.log(error)
            else
            console.log(res)

        });
//        / message=state[0].div.childNodes.data 
//  console.log(message)
         
    }
    else
    {

      var y = document.getElementsByClassName('billCheckbox');
      countBill=y
        var aNode = y[0];
        aNode.click();
        console.log(countBill)
        //document.getElementById('startPayment').click()
        //await page.$('#messages').innerHTML
        setTimeout(function(){
               state= document.getElementsByClassName("alert alert-danger")
        console.log(state[0].innerText)
        },10000)
     
    }},15000)

}
)
console.log(countBill)
console.log(message[0].innerText);

await page.evaluate(() => console.log(`url is ${location.href}`));
//await page.screenshot({path: 'screenshot3.png'});


//await page.pdf({path: 'hn.pdf', format: 'A4'});

   // browser.close();
}
run().then(console.log).catch(console.error);
}
bemo.query=function(query,res){

    res.status(200).send({success:true})
}
module.exports=bemo;