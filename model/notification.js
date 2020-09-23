'use strict';
var sql = require('./db.js');
const Responce = require('./responce.js');

var Notification =  function(notification){

    this.id= notification.id;
    this.id_company = notification.id_company;
    this.id_user = notification.id_user;
    this.msg = notification.msg;
};

Notification.getNotificationByIdComapany = function (id_company , result) {

    sql.query("Select * from notification WHERE id_company =? ", [id_company], function (err, res) {
       
            if(err) {
                console.log("notifications sql error: ", err);
                result(err, null);
            }
            else{
                console.log(id_company); 
              console.log('notifications : ', res);  

              var responce=new Responce({success:true,result:res});
              result(null, responce);
             //result(null, res);
            }
        });   
};

/**
 * 
 * @param {*} company 
 * @param {*} result 
 */
Notification.createNewNotification = function (notifi , result) {
    notifi.id=null;
    sql.query("INSERT INTO notification set ?", notifi, function (err, res) {
       
            if(err) {
                console.log("notifications sql error: ", err);
                result(err, null);
            }
            else{
                console.log(id_company); 
              console.log('notifications : ', res);  

             result(null, res);
            }
        });   
};

Notification.create_bill = function (new_bill, result) { 
    new_bill.success=false;   
    sql.query("INSERT INTO bills set ?", new_bill, function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });           
};

module.exports= Notification;

/*

http://localhost:3000/notifications/1

*/