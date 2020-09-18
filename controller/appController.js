'use strict';


var User = require('../model/user.js');
var Bill = require('../model/bill.js');


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


exports.create_bill= function(req, res){

  console.log(req.body);
  var new_bill = new Bill(req.body);

  //handles null error 
   if(!new_bill.id_point_sale || !new_bill.amount || !new_bill.commission || !new_bill.phone || !new_bill.id_company ){

            res.status(400).send({ error:true, message: 'The bill was not created , Please provide bill items' });
            console.log(new_bill);

        }
else{
  
  Bill.create_bill(new_bill, function(err, bill) {
    
    if (err)
      res.send(err);
    res.json(bill);
  });
}

};


