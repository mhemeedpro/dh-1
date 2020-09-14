
var page = require('webpage').create();
page.open('https://www.bbsfonline.com/BbsfOnline/Public/User/Login', function(status) {
  // page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
     //console.log(status)
    //  if(status==="success")
    //  {
      console.log(status)
       console.log("start write data")
       page.evaluate(function()
       {
        
         //document.write("mosaab")
         document.getElementById('UserName').value ='mhemeed mosaab';
         document.getElementById('password-input').value ='mhemeed mosaab';
         document.getElementById('submit_btn').submit;
         document.write(document.getElementById("messages"))
       });
      // console.log(page.plainText)
      setTimeout(function()  {
        page.render('test.png'); 
          phantom.exit();
     }, 1010);
     //}
   // setTimeout(function() {
     
     // console.log("start timeout function")

       //  document.write("mosaaab")
      // document.getElementById('pass').value='jonadamaroof@hotmail.com';
 
        
        
    //}, 1000);
    console.log('access done');
   
//  })
});


/*
var page = require('webpage').create();
//console.log('The default user agent is ' + page.settings.userAgent);
page.settings.userAgent = 'SpecialAgent';
page.open('https://www.facebook.com/', function(status) {
  if (status !== 'success') {
    console.log('Unable to access network');
  } else {
    var ua = page.evaluate(function() {
      // document.getElementById('email').value='jonadamaroof@hotmail.com';
      // document.getElementById('pass').value='jonadamaroof@hotmail.com';
       page.render('google.png');
       console.log(done);
   //    document.getElementById('u_0_h').submit();
    });
    //console.log(ua);
  }
  phantom.exit();
});
*/
