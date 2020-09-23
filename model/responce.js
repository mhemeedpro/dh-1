'use strict';
var Responce =  function(responce){

    this.state= responce.state;
    this.success = responce.success;
    this.result = responce.result;
};

module.exports= Responce;