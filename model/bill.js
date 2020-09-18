'use strict';
var sql = require('./db.js');

var Bill = function(bill){

    this.id_bill= bill.id_bill;
    this.id_point_sale = bill.id_point_sale;
    this.point_sale =bill.point_sale;
    this.amount= bill.amount;
    this.commission = bill.commission;
    this.id_company=bill.id_company;
    this.phone = bill.phone;
    this.date = new Date();
    this.success = bill.success;
    this.note = bill.note;
    this.id_user =bill.id_user;

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


module.exports= Bill;

/*

 // create bill . 
 
{
   
  "id_point_sale":"1",
  "point_sale":"مركز الزراعة",
  "amount":"12312",
  "commission":"3243",
  "phone":"34242",
  "id_company":"2"

}
*/