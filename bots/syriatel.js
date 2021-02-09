const puppeteer = require('puppeteer');
var Notification = require('../model/notification.js');
var Company = require('../model/company.js');

var readysy=false
var await_login
const url = "https://abili.syriatel.com.sy/Login.aspx"

let browser 
const initialization=async ()=>{
    await_login=true;
    browser = await puppeteer.launch({headless: false, ignoreHTTPSErrors: true});

let br= await login(browser)
console.log(br)

console.log('readysyriatel : ',br)
readysy=br
await_login=false
if(br==false)
//browser.close();
return br
}

const payment= async (bill,res)=>{
if(!readysy)
{
    response(false,"try agin later 3 min ,syriatel not ready yeat! ",400)
    if(!await_login)
    initialization();
    return
}


 async function response(state,message,code)
{
    res.status(code).send({ id:bill.id,success:state,code:code, message:message});
}
async function notifiction(text){
    Notification.createNewNotification(new Notification({id:null,id_company:id_company,id_point_sale:id_point,id_user:1,phone:phone,msg:text})
        ,function(error,res){
        
            if(error)
            console.log(error)
            else
            console.log(res)

        });
}



}
//------------------------login----------------------------------
const login= async (browser)=>{
 const page=await browser.newPage()
 try{
    await page.goto(url); 
 }catch{
     console.log("no internet")
     page.close()
     return false
 }

 var login;
Company.getCompanyById(3,function(error,res){
    if(error)
    {  console.log("ERROR GET DATA MTN")}
    else 
    login={user:res.user_name,pass:res.password};
  });

  await page.waitFor(20);
  try{
    await page.type('#UsernameTextBox','', {delay: 5});
 
}
catch
{ 
    console.log('erorrrrr')
    //page.close();
    return true
}



  //  await page.waitFor(20);
 
    await checkLogin()



    // await page.exposeFunction("toBase64", toBase64);
    // await page.exposeFunction("load_capatch", load_capatch);

async function checkLogin(){

 try{
await page.type('#UsernameTextBox', login.user, {delay: 5});
await page.type('#PasswordTextBox', login.pass, {delay: 5});

await page.evaluate(() => {
     
             var msg =document.getElementById('resultlabel');
             console.log(msg)
         var submit =document.getElementById('SubmitButton')
             submit.click();

})

 }
 catch{
   //  page.close();
     return false;
 }

}

//page.close();
return false
 

}


module.exports={payment,initialization};