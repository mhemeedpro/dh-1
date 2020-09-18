'use strict';
var sql = require('./db.js');


var User = function(user){

    this.name = user.name;
    this.email= user.email;
    this.password = user.password;

};

User.login = function (email, password , result) {
    console.log("start login prosses email :" , email , "password :",password);
    sql.query("Select * from users WHERE email like ? and password like ?", [email,password], function (err, res) {
       
            if(err) {
                console.log("login error// error: ", err);
                result(err, null);
            }
            else{
              console.log('user : ', res);  

             result(null, res);
            }
        });   
};


module.exports= User;

/*
// login
  {
    "email":"zoualfkarhaydar@hotmailcom",
    "password": "12345"
}
 */