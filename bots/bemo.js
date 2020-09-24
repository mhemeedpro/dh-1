const puppeteer = require('puppeteer');
var Notification = require('../model/notification.js');
var Company = require('../model/company.js');
//link login to web site
var bemo =  function(){};

bemo.payment=function(bill){

const url = "https://www.bbsfonline.com/BbsfOnline/Public/User/Login"

 var login;

Company.getCompanyById(bill.id_company,function(error,res){
    if(error)
    {
        console.log("erorr")
    }
   // console.log(error);
    else 
    login={user:res.user_name,pass:res.password};
    console.log("success")
 
    console.log(res);
  });
 
//const verables user data 

 
//global.pass=;
const phone=bill.phone
 
const id_point=bill.id_point_sale
const id_company=bill.id_company
const countBill=0
var message
// if (!url) {
//     throw "Please provide URL as a first argument";
// }
async function run ( ) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);

    await page.evaluate((login) => {
     
            console.log(login)
                var  t =document.getElementById('UserName')
                    t.value=login.user
                 var  p=document.getElementById('password-input')
                    p.value=login.pass
                var submit =document.getElementById('submit_btn')
                    submit.click();
   

},login)
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
 
},phone)

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
        ,function(error,res){
        
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
        console.log("hasent bill")
        console.log(state[0].innerText)
        Notification.createNewNotification(new Notification({id:null,id_company:id_company,id_point_sale:id_point,id_user:2,phone:phone,msg:state[0].innerText})
        ,function(error,res){
        
            if(error)
            console.log(error)
            else
            console.log(res)

        });
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

},phone,id_company,id_point )
console.log(countBill)


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