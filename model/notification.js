'use strict';
var sql = require('./db.js');

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

             result(null, res);
            }
        });   
};

/**
 * 
 * @param {*} company 
 * @param {*} result 
 */
Notification.createNewNotification = function (company , result) {

    sql.query("INSERT INTO notification set ?", company, function (err, res) {
       
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

Bill.create_bill = function (new_bill, result) { 
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