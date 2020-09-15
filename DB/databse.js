
var mysql = require('mysql');

var conn = require('./conn.js');

var con = mysql.createConnection({
  host: conn.host,
  user: conn.user,
  password: conn.password,
  database: conn.database
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

 
 
   // users
    var sqlUsers = "INSERT INTO `users` (`id_user`, `name`, `email`, `password`, `phone`) VALUES (NULL, 'zoualfkar', 'zoualfkarhaydar@hotmail.com', '12345', '0934890910')";

    // company 
    var sqlCompanies = "INSERT INTO `companies` (`id_company`, `name`, `user_name`, `password`, `link`) VALUES (NULL, 'zoualfkar', 'test', 'test', 'pos.ispcare.mts.sy/');";

    // bills 
    var sqlBills = "INSERT INTO `bills` (`id_bill`, `point_sale`, `amount`, `commission`, `phone`, `id_company`, `date`, `success`, `note`, `id_user`) VALUES (NULL, 'مركز الزراعة', '1000', '50', '041242322', '1', '2020-09-23 00:00:00', '1', NULL, '2');" ;

    // 

    con.query(sqlCompanies, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });


    con.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        console.log(result);   // print all result

      // print Specific field 
     Object.keys(result).forEach(function(key) {
     var row = result[key];
      console.log(row.id_user);
     });



 });


  con.end(); // desconnect

});
   

