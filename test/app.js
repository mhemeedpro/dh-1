// const open = require('open');
// console.log("hi")
// // Opens the image in the default image viewer
// async () => {
//     // await open('unicorn.png', {wait: true});
//     // console.log('The image viewer app closed');

//     // Opens the url in the default browser
//     await open('https://sindresorhus.com');

//     // Specify the app to open in
//     await open('https://sindresorhus.com', {app: 'firefox'});

//     // Specify app arguments
//     await open('https://sindresorhus.com', {app: ['google chrome', '--incognito']});
// };

/**
 * Yet Another Forum Object
 *
 *
 */


var yaf = function() {}; //

//module.exports = new yaf();


var phantom = require('http');

//var sleep = require('sleep');

console.log("hi start bot ")//remove later this commit 


var configTestForum = {
  loginUrl: "http://testforum.yetanotherforum.net/login",
  loginFormDetail: {
    usernameBox: 'forum_ctl03_Login1_UserName', // dom element ID
    passwordBox: 'forum_ctl03_Login1_Password',
    submitButton: 'forum_ctl03_Login1_LoginButton'
  },
  loginInfo: {
    username: 'testbot',
    password: 'testbot123'
  }
};

var config = configTestForum;


// program logic
yaf.prototype.login = function(username, password, cb) {

  var steps = [];
  var testindex = 0;
  var loadInProgress = false; //This is set to true when a page is still loading

  /*********SETTINGS*********************/


  phantom.create(function(error, ph) {
    ph.createPage(function(err, page) {


      page.set('settings', {
        userAgent: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:40.0) Gecko/20100101 Firefox/40.0",
        javascriptEnabled: true,
        loadImages: false,
      });

      phantom.cookiesEnabled = true;
      phantom.javascriptEnabled = true;
      /*********SETTINGS END*****************/

      console.log('All settings loaded, start with execution');

      /**********DEFINE STEPS THAT FANTOM SHOULD DO***********************/
      steps = [

        //Step 1 - Open Amazon home page
        function() {
          console.log('Step 1 - Open Login Page');

          page.open(config.loginUrl, function(status) {

          });
        },
        function() {
          console.log('Step 2 - Populate and submit the login form');


          var submitForm = function(config) {

            console.log('Form Submit 1 ( putting login )');
            document.getElementById(config.loginFormDetail.usernameBox).value = config.loginInfo.username;
            console.log('Form Submit 2 ( putting pass )');

            //jQuery('#' + config.loginFormDetail.passwordBox).val(config.loginInfo.password);
            //jQuery('#' + config.loginFormDetail.usernameBox).val(config.loginInfo.password);

            document.getElementById(config.loginFormDetail.passwordBox).value = config.loginInfo.password;
            console.log('Form Submit 3 ( clicking button ) ');
            document.getElementById(config.loginFormDetail.submitButton).click();

            //var clickElement = function (el) {
            //    var ev = document.createEvent("MouseEvent");
            //    ev.initMouseEvent(
            //        "click",
            //        true /* bubble */, true /* cancelable */,
            //        window, null,
            //        0, 0, 0, 0, /* coordinates */
            //        false, false, false, false, /* modifier keys */
            //        0 /*left*/, null
            //    );
            //    el.dispatchEvent(ev);
            //    console.log('dispatched!');
            //};

            //document.getElementById(config.loginFormDetail.submitButton).click();
            //clickElement(jQuery("#forum_ctl03_Login1_LoginButton")[0]);

            //
            //var form = document.getElementById('form1');
            ////var list = function(object) {
            ////    for(var key in object) {
            ////        console.log(key);
            ////    }
            ////};
            ////list(form);
            //
            //
            //// jQuery('#form1').submit();
            //
            //form.submit();
            //
            //document.forms[0].submit();

            //HTMLFormElement.prototype.submit.call(jQuery('form')[0]);

            console.log('Form Has Been Submitted <-----------------');
          };

          var subittedForm = function(err, retVal) {
            console.log('Form Submit error : ' + err);
            console.log('Form Submit returned : ' + retVal);
          };


          //page.evaluateJavaScript(jsCode);
          page.evaluate(submitForm, subittedForm, config);


        },
        //Step 3 - wait for submit form to finish loading..
        function() {
          //sleep.sleep(5);
          console.log("Step 3 - wait for submit form to finish loading..");
          //sleep.sleep(3);
          page.render('loginComplete.png');
          page.get('cookies', function(err, cookies) {
            //   console.log(cookies);
          });

          page.evaluate(function() {
            console.log(document.URL);
          });


        },
        function() {
          console.log('Exiting');
        }
      ];
      /**********END STEPS THAT FANTOM SHOULD DO***********************/

      //Execute steps one by one
      interval = setInterval(executeRequestsStepByStep, 500);

      function executeRequestsStepByStep() {
        if (loadInProgress == false && typeof steps[testindex] == "function") {
          //console.log("step " + (testindex + 1));
          steps[testindex]();
          testindex++;
        }
        if (typeof steps[testindex] != "function") {
          console.log("test complete!");
          ph.exit();
          // cb(ph);
          cb('done');
        }
      }


      page.onLoadStarted = function() {
        loadInProgress = true;
        console.log('Loading started');
      };
      page.onLoadFinished = function() {
        loadInProgress = false;
        console.log('Loading finished');
      };
      page.onConsoleMessage = function(msg) {
        console.log(msg);
      };
      page.onError = function(msg, trace) {
        var msgStack = ['ERROR:-> ' + msg];

        if (trace && trace.length) {
          msgStack.push('TRACE:');
          trace.forEach(function(t) {
            msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function+'")' : ''));
          });
        }

        console.error('\n' + msgStack.join('\n'));
      };
      page.onResourceError = function(resourceError) {
        console.error('Unable to load resource (#' + resourceError.id + ' URL:' + resourceError.url + ')');
        console.error('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
      };
      page.onResourceTimeout = function(msg) {
        console.error('onResourceTimeout!!>' + msg);
      };
      page.onAlert = function(msg) {
        console.error('onAlert!!> ' + msg);
      };


    });
  });

console.log("finish code")
  //  var page = webPage.create();

};