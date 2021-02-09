const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];
var Notification = require('../model/notification.js');
var Company = require('../model/company.js');
const http = require('http')
//link login to web site
var bemo =  function(){};

bemo.payment=function(bill,res){

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
 
    //console.log(res);
  });
 
//const verables user data 

 
//global.pass=;
const phone=bill.phone
const id=bill.id
const id_point=bill.id_point_sale
const id_company=bill.id_company
const countBill=0

var balance=null;
var message
// if (!url) {
//     throw "Please provide URL as a first argument";
// }
function notifiction(text){
    Notification.createNewNotification(new Notification({id:null,id_company:id_company,id_point_sale:id_point,id_user:2,phone:phone,msg:text})
        ,function(error,res){
        
            if(error)
            console.log(error)
            else
            console.log(res)

        });
}

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
if(page.url()==url)
{
  notifiction("خطأ في تسجيل الدخول");
  response(false,
    0,
    "خطأ في تسجيل الدخول"
    ,200)
}

balance = await page.evaluate(()=> 
 {
   var y  =document.getElementsByClassName("value animated fadeIn");
y=y[0].innerText


//y = y.substring(0, 9);
// parseInt
// console.log(y.trim());
// balance=y.trim();
// console.log(balance)
return y.trim()
 });

balance=parseInt(balance)
console.log("BBBB")
console.log(balance)

await page.goto("https://www.bbsfonline.com/BbsfOnline/User/SEPServices/Index").then((res)=>
{
 // console.log(res) 
})
.catch((error)=>{
  //  console.log(error)
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

await page.exposeFunction("response", response);
await page.exposeFunction("notifiction", notifiction);
await page.evaluate((phone,id_company,id_point,finsish,balance)=> 
{
   console.log(balance)
    setTimeout(function(){
        console.log("start  to check bill")

    var state= document.getElementsByClassName("alert alert-danger")
    if(state.length>0)
    {
        console.log("hasent bill")
       // console.log(state[0].innerText)
        notifiction(state[0].innerText);
        response(false,state[0].innerText,200)

///res.status(400).send({success:false})
    }
    else
    {
        console.log("you have bill")
      var y = document.getElementsByClassName('billCheckbox');
     
      if(y.length>0)
      {
           countBill=y
             var aNode = y[0];
        aNode.click();
        document.getElementById('startPayment').click()
      }

        console.log(countBill)
//////class="alert alert-success"
        
        setTimeout(function(){
        document.getElementById('ConfirmTransfer').click()
        state= document.getElementsByClassName("alert alert-danger")
        notifiction(state[0].innerText);
        response(true,state[0].innerText,200)
       // console.log(state[0].innerText)

       // res.status(200).send({success:true})
        },10000)
     
    }},10000)

},phone,id_company,id_point ,balance)
console.log(countBill)

function response(state,message,code)
{
console.log('start api ')

res.status(code).send({ id:id,success:state,code:code, message:message});
browser.close();
}

await page.evaluate(() => console.log(`url is ${location.href}`));
//await page.screenshot({path: 'screenshot3.png'});


//await page.pdf({path: 'hn.pdf', format: 'A4'});

//    
  // page.close();
}
run().then(console.log).catch(console.error);
}




bemo.query=function(query,res){

  const url = "https://www.bbsfonline.com/BbsfOnline/Public/User/Login"

 var login;

Company.getCompanyById(query.id_company,function(error,res){
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
const phone=query.phone
 
const id_point=query.id_point_sale
const id_company=query.id_company
const countBill=0
var balance=null;
var message
// if (!url) {
//     throw "Please provide URL as a first argument";
// }
function notifiction(text){
    Notification.createNewNotification(new Notification({id:null,id_company:id_company,id_point_sale:id_point,id_user:2,phone:phone,msg:text})
        ,function(error,res){
        
            if(error)
            console.log(error)
            else
            console.log(res)

        });
}

async function run ( ) {
    const browser = await puppeteer.launch({ headless:true});
   // console.info(browser);
    const page = await browser.newPage();
 
    await page.goto(url);

    await page.evaluate((login) => {
     
           // console.log(login)
                var  t =document.getElementById('UserName')
                    t.value=login.user
                 var  p=document.getElementById('password-input')
                    p.value=login.pass
                var submit =document.getElementById('submit_btn')
                    submit.click();
   

},login)
await page.waitForNavigation(); 
if(page.url()==url)
{
  //notifiction("خطأ في تسجيل الدخول");
  response(false,
    0,
    "خطأ في تسجيل الدخول"
    ,200)
}

//await page.screenshot({path: 'plance_'+phone+'.png'});


await page.goto("https://www.bbsfonline.com/BbsfOnline/User/SEPServices/Index").then((res)=>
{
   /// console.log(res) 
})
.catch((error)=>{
  //  console.log(error)
})
 
await page.setViewport({ width: 800, height: 1000});

await  page.select('#CategoryCode','8');
  await  page.evaluate((phone)=>{
    var number = document.getElementById('billingNumber_1');

    number.value=phone;
    var submit =document.getElementById('Inquiry')
    submit.click();
//  var btn= document.getElementById('startInquiry')
//  btn.click(); btn.click();
// document.getElementById('startInquiry').click();
 
},phone)
// await page.$eval('#billingNumber_1', el => el.value = '0411234567');
// await page.click('#Inquiry');

//syc function with web site
await page.exposeFunction("report", report);
await page.exposeFunction("print", print);
await page.exposeFunction("response", response);
await page.exposeFunction("notifiction", notifiction);
 
await page.waitFor(7000);
var  have
await page.screenshot({path: 'bill_'+phone+'.png'});


have=await page.evaluate(()=>{
  var  tmp= document.getElementsByClassName("alert alert-danger")
  if(tmp.length>0)
  return tmp[0].innerHTML;
  else
  return false
})
 
 if(have!=false)
 response(false,0,have,200,[]);
 else
 {
  await page.evaluate(()=> {
    var     tr, td,td2, i ,billTmP=0 ;
    var data=new Array();
    tr = document.getElementsByTagName("tr");
    for (i =0; i < tr.length; i++) {
  
        td = tr[i].getElementsByTagName("td")[1];
        
        td2 = tr[i].getElementsByTagName("td")[4];
      if (td) { 
        billTmP =billTmP+parseFloat(td2.textContent.replace(/[^\d\.\-]/g, "") || td2.innerText.replace(/[^\d\.\-]/g, "")  ) +100
        data.push({
            order: parseInt(td.textContent || td.innerText),
            price: parseFloat(td2.textContent.replace(/[^\d\.\-]/g, "") || td2.innerText.replace(/[^\d\.\-]/g, "")  ) +100
        });
        }} 
        response(true,billTmP,"",200,data);
 }) 

 }

function response(state,maxBill,message,code,data)
{

  print("response")
  res.status(code).send({
    success:state,
    data:data,
    maxBill:maxBill,
  message:message})
 // page.close();
  browser.close();
}
function print(msg)
{
  console.log(msg);
}
function report(state){
   page.screenshot({path: './report/'+state +'_'+ phone+'.png'});
}
//console.log(countBill)

//await page.evaluate(() => console.log(`url is ${location.href}`));

}
run();//.then(console.log).catch(console.error);
   // res.status(200).send({success:true})
}
module.exports=bemo;


//await new Promise(resolve => setTimeout(resolve, 5000));