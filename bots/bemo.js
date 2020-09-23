const puppeteer = require('puppeteer');
//link login to web site
const url = "https://www.bbsfonline.com/BbsfOnline/Public/User/Login"
//const verables user data 
const user ="0436787"
const pass="Idhm-99-hga";
const phoneNumber=""
const countBill=0
var message
var typebill=1 // is mean phone number
if (!url) {
    throw "Please provide URL as a first argument";
}
async function run () {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    await page.evaluate(() => {
        try{
                var  t =document.getElementById('UserName')
                    t.value="0436787";
                 var  p=document.getElementById('password-input')
                    p.value="Idhm-99-hga";
                var submit =document.getElementById('submit_btn')
                    submit.click();
    }
   catch{
       console.log("can not login to bb")
   }
})
await page.waitForNavigation(); 

///Array.from(document.querySelectorAll('div.title a'))
// message = await page.querySelectorAll('#messages > dev'); //await page.$('#messages').innerHTML


    await page.screenshot({path: 'screenshot1.png'});


await page.goto("https://www.bbsfonline.com/BbsfOnline/User/SEPServices/Index").then((res)=>
{
    console.log(res) 
    //page.select('#CategoryCode','8')
})
.catch((error)=>{
    console.log(error)
})
 


await  page.select('#CategoryCode','8')
  await  page.evaluate(()=>{
    var number = document.getElementById('billingNumber_1')

    number.value="0412771429"
   var check =document.getElementById('startInquiry')
   check.click();
 
})

//page.click('#startInquiry')
// await page.on('request', (request) => {
//     console.log(request)
   
// });
await page.evaluate(() => 
{
    setTimeout(function(){
        console.log("start  to check bill")
    //   $('#billsTable > input.billCheckbox').click(function(){
    //     alert("The paragraph was clicked.");
    //   });
    var state= document.getElementsByClassName("alert alert-danger")
    if(state.length>0)
    {
        console.log("hasent bill")
        console.log(state[0].innerText)
//        / message=state[0].div.childNodes.data 
//  console.log(message)
         
    }
    else
    {

      var y = document.getElementsByClassName('billCheckbox');
      countBill=y
        var aNode = y[0];
       // aNode.click();
        console.log(countBill)
        document.getElementById('startPayment').click()
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
//await page.waitFor(() => !!document.querySelector('.billCheckbox:checkbox').click());
//await page.waitForSelector('.billCheckbox:checkbox');

// await  page.$(".billCheckbox:checkbox").check();
// const searchForm = await page.$('.billCheckbox');
// await searchForm.evaluate(searchForm => console.log(searchForm));

// //await page.select("select#", 'الاتصالات')
await page.evaluate(() => console.log(`url is ${location.href}`));
await page.screenshot({path: 'screenshot3.png'});



// var result=await page.evaluate(()=>{
    
//     return document.getElementById("messages").innerHTML
// })
// console.log(result)

//await page.pdf({path: 'hn.pdf', format: 'A4'});

   // browser.close();
}
run().then(console.log).catch(console.error);