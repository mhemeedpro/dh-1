 /*
 var casper = require ('casper').create({
    verbos:true ,
    logLevel : 'error'
  //  clientScripts:[] 
});

var links = [];
function getLinks(){
    var links = document.querySelectorAll('.b_algo a');
    return Array.prototype.map.call(links,function(e){
        return e.getAttribute('href'); 
    });
};

casper.on('error', function(msg,backtrace) {
    this.capture('./out/error.png');
    throw new ErrorFunc("fatal","error","filename",backtrace,msg);
  });

casper.start ('http://bing.com/',function(){
    this.capture('./out/test.png');
    this.fill('form[action="/search]',{
        q:'casperjs'
    },true); 

  
});

casper.then(function(){
    links = links.concat(this.evaluate(getLinks));

});

casper.run(function(){
    this.echo(links.length + 'liks found:');
    this.echo('-'+links.join('\n-')).exit();
});

*/
var links = [];
var casper = require('casper').create();

function getLinks() {
    var links = document.querySelectorAll('h3.r a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}

casper.start('http://google.fr/', function() {
   // Wait for the page to be loaded
   this.waitForSelector('form[action="/search"]');
});

casper.then(function() {
   // search for 'casperjs' from google form
   this.fill('form[action="/search"]', { q: 'casperjs' }, true);
});

casper.then(function() {
    // aggregate results for the 'casperjs' search
    links = this.evaluate(getLinks);
    // now search for 'phantomjs' by filling the form again
    this.fill('form[action="/search"]', { q: 'phantomjs' }, true);
});

casper.then(function() {
    // aggregate results for the 'phantomjs' search
    links = links.concat(this.evaluate(getLinks));
});

casper.run(function() {
    // echo results in some pretty fashion
    this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - ')).exit();
});