'use strict';
module.exports = function(app) {
 // var todoList = require('../controllers/todoListController');

  var todoList = require('../controller/appController');

    
    app.route('/login')
    .post(todoList.login);

    app.route('/bills')
    .get(todoList.get_bill_by_point_sale)
    .post(todoList.create_bill);

    };

   



   
  


