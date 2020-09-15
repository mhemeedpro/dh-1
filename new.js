
var casper = require('casper').create({
      verbose : true,  // log messages will be printed out to the console
      	logLevel : 'debug', // only "debug" level messages will be logged
      	viewportSize: { // override default browser windows size
      		width: 1024,
      		height: 768
      	},
    	pageSettings: { 
      //The WebPage instance used by Casper will use these settings
     		"loadImages" : true,
     		"loadPlugins" : true,
     		"webSecurityEnabled" : false,
     		"ignoreSslErrors" : true
     	}
    });

  //var casper = require('casper').create();
  var links;
  function serch(){
    var s = document.getElementsByName("q");
    s.value="mosaab mhemeed";
  }
  function getLinks() {
            var links = document.querySelectorAll('a');
      return Array.prototype.map.call(links, function (e) {
        return e.getAttribute('href')
      });
  }
  casper.start('http://google.com/');
 casper.then(function () {
  serch();
     links = this.evaluate(getLinks);
 });
 casper.run(function () {
     for(var i in links) {
         console.log(links[i]);
    }
   casper.done();
 });