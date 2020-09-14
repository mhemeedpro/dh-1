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
/*    this.fill('form[action="/search]',{
        q:'casperjs'
    },true); */

    this.fillSelectors("form[id=sb_form]", {
     //   'input[name=userID]' : username,
     //   'input[name=password]' : password
     q:'casperjs'
    }, true);
});

casper.then(function(){
    links = links.concat(this.evaluate(getLinks));

});

casper.run(function(){
    this.echo(links.length + 'liks found:');
    this.echo('-'+links.join('\n-')).exit();
});


