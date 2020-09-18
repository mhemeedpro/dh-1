'use strict';


var User = require('../model/user.js');


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

exports.create_bill =function(req, res) {
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
