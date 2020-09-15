var fs = require('fs');
 var utils = require('utils');
 var webserver = require('webserver');
 var testclientURL = 'https://www.bbsfonline.com/BbsfOnline/Public/User/Login';
 // Create CasperJS instance
 var casper = require('casper').create({
 	verbose : true,
 	logLevel : 'debug',
 	viewportSize: {
 		width: 1024,
 		height: 768
 	},
 	pageSettings: {
 		"loadImages" : false,
 		"loadPlugins" : true,
 		"webSecurityEnabled" : false,
 		"ignoreSslErrors" : true
     }
 });
 var myname="mosaaaaaaab";
 var mypassword="1234567890";
 // Read file path
 var filePath = casper.cli.get(0);
 // Read request data
 var requestHeader = fs.read('request-header.txt');
 var requestFooter = fs.read('request-footer.txt');
 // Define global variables
 var request;
 var productNumber = 0; // -1 means no product selection, 
  //  otherwise it's the position in the list counting from 0
 // Register error handler
 casper.on('complete.error', function(err) {
     this.die("Complete callback has failed: " + err);
 });
 casper.on('error', function(msg, err) {
 	this.die(msg + " -> " + err);
 });
 /*
37.  * Initializes the test procedure by login a "login" page, altering the 
38.  * request form and sending the data to the server to perform the login
39.  * @param casper The casper instance to add steps to
40.  * @param url The URL to load the login page fromCharCode
41.  * @param request The complete request to send to MARZIPAN
42.  */
 function startTestcase(casper, url, request) {
 	// Create directory to log screenshots to
 	fs.makeDirectory('log');
 	// Loading first form
 	casper.thenOpen(url);
 	casper.then(function _saveScreen01() {
		this.capture('log/screen01_Test-Client-Form.png');
 	});
 	// Updating form input with loaded request
 	// casper.waitForSelector('#sign_in',
 	// 	function success() {
 	// 		console.log('[INFO] Filling out login form ...');
 	// 		this.fill('#sign_in', {
 	// 			'CALLINTERFACE' : request
 	// 		}, true);
 	// 	},
 	// 	function fail() {
 	// 		console.log('[ERROR] Login Form not found');
 	// 	}
 	// );
 }
 /*
65.  * Method selects a product form the list of available products.
66.  * @param casper The CasperJS instance to add steps to
67.  * @param productNumber The number of the product list to select
68.  */
 function selectProduct(casper, productNumber) {
 	var productSelection = '#SUBMIT__produktListe_' + productNumber + '_formName_' 
		+ productNumber + '__common_ladeProduktFuerImport';
	casper.wait(4000);
 	// Select product
 	casper.waitForSelector(productSelection,
 			function success() {
 				console.log('[INFO] Selecting product...');
 				this.capture('log/screen02_Produktauswahl.png');
 				this.click(productSelection);
 			},
 			function fail() {
 				this.capture('log/screen02_Produktauswahl_err.png');
 				console.log('[ERROR] Product not found');
 			}
 	);
 }
 
 /*
87.  * This method fills a form of data to manually enter data
88.  * @param casper The CasperJS instance to add steps to
89.  */
 function fillForm(casper) {
     // Fill the form
    
    // casper.thenClick();
    // this.capture('log/screen03_Eingabemaske.png');
 	casper.waitForSelector('#sign_in',
 		function success() {
 			console.log('[INFO] Filling out form...');
 			//this.capture('log/screen03_Eingabe5maske.png');
 			this.sendKeys('#UserName',myname);
 			this.sendKeys('input[name="Password"]', mypassword);
 			//this.sendKeys(document.getElementById("UserName").value = "mosssssssssssa");
 			// this.sendKeys('input[name="effektivzins"]', '2');
 			this.capture('log/screen04_EingabemaskeAusgefuellt.png');
 		},
 		function fail() {
 			this.capture('log/screen03_Eingabemaske_err.png');
 			console.log('[ERROR] Form not found');
 		}
 	);
 }
 /*
109.  * Presses the "berechen Nominalzins" Button
110.  * @param casper The CasperJS instance to add test steps to
111.  */
 function pressBerechneNominalzinsAnnuitaetendarlehen(casper) {
 	// Compute nominal interest rate
 	//casper.thenClick('#submit_btn');
 	casper.waitForSelector('#submit_btn', 
 		function success() {
             casper.thenClick('#submit_btn');
			this.wait(11000, function() {
				this.capture('log/screen05_NominalzinsBerechnet.png');
 			});
 		},
 		function fail() {
 				this.capture('log/screen05_NominalzinsBerechnet_err.png');
 			console.log('[ERROR] Failed to calculate nominal interest rate');
 		}
 	);
 }
 /*
128.  * Presses the "Ruecksenden" Button
129.  * @param casper The CasperJS instance to add test steps to
130.  */
 function pressSubmitRuecksendenGeschaeft(casper) {
 	// Select R�cksprung
 	// casper.thenClick('#submit_btn', function _saveScreen06() {
 	// 	this.capture('log/screen06_Ruecksprung.png');
 	// 	this.wait(7000, function() {
    //      	this.capture('log/screen07_Ergebnis-HTML.png');
    //  	});
     // });
     casper.waitForSelector('#messages',
     function success() {
         console.log('[INFO] grting message ...');
         var m = document.querySelector('dev')
         console.log(m.innerText)
         //this.capture('log/screen03_Eingabe5maske.png');
        //  this.sendKeys('#UserName',myname);
        //  this.sendKeys('input[name="Password"]', mypassword);
         //this.sendKeys(document.getElementById("UserName").value = "mosssssssssssa");
         // this.sendKeys('input[name="effektivzins"]', '2');
         this.capture('log/getmessage.png');
     },
     function fail() {
         this.capture('log/errorrmessage.png');
         console.log('[ERROR] Form not found');
     }
 );
    //  console.log(casper.getElementInfo("#messages").textContent)
    //  casper.then(
    //     console.log(document.querySelector("#messages").textContent)
    //  )
    //  console.log("start get erorr message")
    //  var m =document.getElementById("#messages") 
    //  console.log(m.innerHTML);
    //  casper.waitForSelector("#messages",
    //  console.log(document.getElementById("#messages").innerText))
     
     
 }
 // Start CasperJS engine
 casper.start();
 try {
 	// console.log('[INFO] Considering >> ' + filePath);
 	// // Check whether it's a regular file
 	// if(fs.isFile(filePath)) {
 		// console.log('[INFO] Processing ' +  filePath);
 		// console.log('[INFO] Loading request file >> ' + filePath);
 		// request = fs.read(filePath);
 		// The complete request to send is header + content + footer
 		var completeRequest = requestHeader + request + requestFooter;
 		startTestcase(casper, testclientURL, completeRequest);
 		// if(productNumber >= 0 ) {
 		// 	selectProduct(casper, productNumber);
 		// } else {
 		// 	console.log('[INFO] Skipping product selection');
 		// }
 		fillForm(casper);
 		pressBerechneNominalzinsAnnuitaetendarlehen(casper);
 		pressSubmitRuecksendenGeschaeft(casper);
 		console.info('[INFO] Testcase finished');
 	// } else {
 	// 	console.log('[INFO] Ignoring ' + filePath + ' as it is no regular file');
 	// }
 } catch(err) {
 	console.log('[ERROR] ' + err);
 }
 // Execute the chain of steps and exit on success
 casper.run(function () {
 	this.exit();
 });