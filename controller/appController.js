'use strict';

var bemo = require('../bots/bemo.js');
var User = require('../model/user.js');
var Bill = require('../model/bill.js');
var Company = require('../model/company.js');
var Notification = require('../model/notification.js');
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.login = function(req, res) {
 
  var user = new User(req.body);

  //handles null error 
   if(!user.email || !user.password){

            res.status(400).send({ error:true, message: 'Please provide email and password' });
            console.log(user);

        }
else{
  console.log("start login prosses");
  User.login(user.email,user.password , function (err, result){
    if (err)
    res.send(err);
  res.json(result);

  }) ; 
}
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.get_bill_by_point_sale = function(req, res) {
  var new_task = new Task(req.body);

  var user = new User(req.body);

  //handles null error 
   if(!user.email || !user.password){

            res.status(400).send({ error:true, message: 'Please provide email and password' });
            console.log(new_task);

        }
else{
  
  Task.createTask(new_task, function(err, task) {
    
    if (err)
      res.send(err);
    res.json(task);
  });
}
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.create_bill= function(req, res){

  console.log(req.body);
  var new_bill = new Bill(req.body);

  //handles null error 
   if(!new_bill.id_point_sale || !new_bill.point_sale || !new_bill.amount || !new_bill.commission || !new_bill.phone || !new_bill.id_company ){

            res.status(400).send({ success:true, message: 'The bill was not created , Please provide bill items' });
            //console.log(new_bill);

        }
else{
  Bill.create_bill(new_bill, function(err, bill) {
    
    if (err)
      res.send(err);
      else
      {
    res.json(bill);
    ////bot start 
    bemo.bot(new_bill)
  }
  });

}

};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.get_all_companies = function(req, res) {
  Company.getAllCompanies(function(err, companies) {

    console.log('controller get all task')
    if (err)
      res.send(err);
     // console.log('res', companies);
    res.send(companies);
  });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.update_company= function(req, res) {
  Company.updateById( new Company(req.body), function(err, company) {
    if (err)
      res.send(err);
    res.json(company);
  });
};


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.get_notification_by_id_comapany = function(req, res) {
  Notification.getNotificationByIdComapany(req.params.id_company, function(err, notifications) {
    if (err)
      res.send(err);
    res.json(notifications);
  });
};




