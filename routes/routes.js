'use strict';
module.exports = function(app) {
 // var todoList = require('../controllers/todoListController');

  var todoList = require('../controller/appController');

    
    app.route('/bot/auth/login')
    .post(todoList.login);

    app.route('bot/bills')
    .get(todoList.get_bill_by_point_sale)
    .post(todoList.create_bill);
   
    app.route('/bot/companies')
    .get(todoList.get_all_companies)  
   
   // .put(todoList.update_company)
    .post(todoList.update_company);

    app.route('/bot/notifications/:id_company')
    .get(todoList.get_notification_by_id_comapany);
    
    };

    

   



   
  


