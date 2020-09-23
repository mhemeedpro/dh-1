'use strict';
var sql = require('./db.js');

var ErrorMessage = function(message){

    this.id_msg= message.id_msg;
    this.msg = message.msg;
    this.id_bot =message.id_bot;

};


ErrorMessage.create_msg = function (new_message, result) { 
    new_message.id_msg=null;
    sql.query("INSERT INTO message set ?", new_message, function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });   
    }


    ErrorMessage.getAllMsgByIDBot = function (id_bot,result) {
        console.log(" start get all companies ");
        sql.query("Select * from message WHERE id_bot =? ",[id_bot], function (err, res) {
    
                if(err) {
                    console.log(" get all msg error: ", err);
                    result(null, err);
                }
                else{
                  console.log('msg : ', res);  
    
                 result(null, res);
                }
            });   
    };
    

