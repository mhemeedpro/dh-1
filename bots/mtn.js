const puppeteer = require('puppeteer');
var Notification = require('../model/notification.js');
var Company = require('../model/company.js');
const imageToBase64 = require('image-to-base64');
var rp = require('request-promise');
var Jimp = require('jimp');
var readyMtn=false
var await_login
const url = "https://services.mtn.com.sy:8443/agentportal/agentportal/Application.html#SUBSCRIBERS/1"

let browser 
const initialization=async ()=>{
    await_login=true;
    browser = await puppeteer.launch({headless: false, ignoreHTTPSErrors: true});

let br= await login(browser)
console.log(br)
if(!br)
br= await login(browser)
console.log(br)
if(!br)
br= await login(browser)
console.log(br)
if(!br)
br= await login(browser)
if(!br)
br= await login(browser)
console.log(br)
if(!br)
br= await login(browser)
console.log(br)
if(!br)
br= await login(browser)
console.log(br)
console.log('readyMtn : ',br)
readyMtn=br
await_login=false
if(br==false)
browser.close();
return br
}

const payment= async (bill,res)=>{
if(!readyMtn)
{
    response(false,"try agin later 3 min ,mtn not ready yeat! ",400)
    if(!await_login)
    initialization();
    return
}

    const page=await browser.newPage()
    try{
         await page.goto(url);
    }catch
    {
        response(false,"try agin MTN not response ",400)
        page.close();
        return
    }
    
    await page.waitFor(200);
    await page.evaluate((bill)=> 
    {
        // var select = document.getElementsByClassName("gwt-ListBox")
        // console.log(select)
        // select[6].selectedIndex ='1';

      var input  =document.getElementsByClassName("gwt-TextBox");
console.log(input)
     input[37].value=bill.phone
     input[38].value=bill.amount
     

    var submit  =document.getElementsByClassName("gwt-Button");
    console.log(submit)
    //btn 9  to add other payment
submit[10].click();

    },bill)
    await page.waitFor(50);
    await page.screenshot({path: bill.phone+'_log.png'});

    // catch{
    //     response(false,"try agin MTN not response 404",400)
    //     page.close();
    //     return
    // }
 

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

//const payment=async(browser)=>{}

const login= async (browser)=>{
    //const browser =await  puppeteer.launch({headless: false, ignoreHTTPSErrors: true});
 const page=await browser.newPage()
 try{
    await page.goto(url); 
 }catch{
     console.log("no internet")
     page.close()
     return false
 }

// console.log(page)


 var login;
let jcaptcha
Company.getCompanyById(2,function(error,res){
    if(error)
    {  console.log("ERROR GET DATA MTN")}
    else 
    login={user:res.user_name,pass:res.password,link:res.link,jcaptcha:''};
  });

  await page.waitFor(150);
  try{
    await page.type('#gwt-debug-بطاقة_تاجر_التجزئة','', {delay: 5});
 
}
catch
{ 
    console.log('erorrrrr')
    page.close();
    return true
}



    await loadNewCapatcha();//load image capatch
   // await greyscale(); // to grey image
    await page.waitFor(200);
    if(await readcapatcha()==false)
        {
            page.close()
            return false
        }
  
    
    await checkLogin()



    // await page.exposeFunction("toBase64", toBase64);
    // await page.exposeFunction("load_capatch", load_capatch);

async function checkLogin(){

 try{
    login.jcaptcha=jcaptcha
await page.type('#gwt-debug-بطاقة_تاجر_التجزئة', login.link, {delay: 5});
await page.type('#gwt-debug-رقم_المستخدم', login.user, {delay: 5});
await page.evaluate(login => {  var pass=document.getElementsByClassName("gwt-PasswordTextBox") 
pass[1].value=login.pass;
}, login);
await page.type('#gwt-debug-captcha', login.jcaptcha, {delay: 5})
 }
 catch{
     page.close();
     return true;
 }

}
// await page.waitFor(100);
// //if true lgin return true else return false 
// try{
//     await page.type('#gwt-debug-بطاقة_تاجر_التجزئة', login.link, {delay: 5});
//     page.close();
//     return false
// }
// catch
// {
//     return true
// }

page.close();
return false
 


async function toBase64(file){
    return imageToBase64(file) // Path to the image
    .then(
        (response) => {
           // console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
            return 'data:image/png;base64,'+response
            //return response
        }
    )
    .catch(
        (error) => {
            console.log(error);
            return 'erorr'
        }
    )
 }

async function load_capatch() {
var tt= await toBase64('jcaptcha.png') 
// console.log(tt)
  var options = {
    method: 'POST',
    uri: 'http://api8.ocr.space/parse/image',
    formData: {
      base64image:tt,
      language:'eng'
    },
    headers: {
      'apikey':"bc4b724e6488957"
    }
};

return rp(options)
    .then(function (htmlString) {
        // Process html...
        return JSON.parse(htmlString)
        console.log(htmlString)
    })
    .catch(function (err) {
        // Crawling failed...
        console.log(err)
    });


    

  }
  async function loadNewCapatcha (){
    const page2 = await browser.newPage();
 await page2.goto("https://services.mtn.com.sy:8443/agentportal/agentportal/jcaptcha.jpg?1604335584093");

//     fs.writeFile("jcaptcha.jpg", await viewSource.buffer(), function (err) {
//     if (err) {
//         return console.log(err);
//     }
// })
await page2.screenshot({path: 'jcaptcha.png'});
page2.close();
} 
async function greyscale (){
    Jimp.read('jcaptcha.png', (err, lenna) => {
        if (err) throw err;
        lenna
          .normalize() // resize
          .dither565()
          .quality(100) // set JPEG quality
          //.opaque()
          .greyscale() // set greyscale
          // .invert()
         // .background(0xFFFFFFFF)
         
          .write('jcaptcha.png'); // save
      }).catch(err => {
        console.error(err);
      });
}
async function readcapatcha (){
    

    jcaptcha= await load_capatch()
    console.log(jcaptcha)
    try{
    jcaptcha= jcaptcha.ParsedResults[0].ParsedText

    jcaptcha=jcaptcha.toUpperCase();
    jcaptcha.trim()
    jcaptcha=jcaptcha.replace(/(^\s+|\s+$)|\s+/g, '$1');
    //jcaptcha.replace(/\,/g,"");
  
    if(jcaptcha.length<7)
    {
        
    return false 
    }

    console.log(jcaptcha)
    }
    catch
    {
       
        return false
    }

}

}


module.exports={payment,initialization};