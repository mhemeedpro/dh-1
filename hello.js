
var page = require('webpage').create();
page.open('https://www.facebook.com/', function() {
    page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
    setTimeout(function() {
         document.getElementById('email').value='jonadamaroof@hotmail.com';
      // document.getElementById('pass').value='jonadamaroof@hotmail.com';
        page.render('google.png');
        phantom.exit();
    }, 200);
    console.log('access done');
})});


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
