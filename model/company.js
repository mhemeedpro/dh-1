'use strict';
var sql = require('./db.js');

var Company =  function(company){

    this.id_company=company.id_company;
    this.name = company.name;
    this.user_name = company.user_name;
    this.password = company.password;
    this.link = company.link ;
};


Company.getAllCompanies = function (result) {
    console.log(" start get all companies ");
    sql.query("Select * from companies ", function (err, res) {

            if(err) {
                console.log(" get all companies error: ", err);
                result(null, err);
            }
            else{
              console.log('companies : ', res);  

             result(null, res);
            }
        });   
};


Company.getCompanyById = function (id_company,result) {
  console.log(" start get all companies ");
  sql.query("Select * from companies WHERE id_company =?  ",[id_company], function (err, res) {

          if(err) {
              console.log(" get all companies error: ", err);
              result( err,null);
          }
          else{
            console.log('companies : ', res)
           result(err, new Company(res[0]));
          }
      });   
};


Company.updateById = function(company, result){

    sql.query("UPDATE companies SET  name =? ,user_name =?,password =?,link =?  WHERE id_company =?", [company.name,company.user_name,company.password,company.link,company.id_company], function (err, res) {

            if(err) {
                console.log("/////",company.id_company);
                console.log(" update company sql error: ", err);
                  result(err,null);
               }
             else{   
               result(null, res);
                  }
              }); 
  };

module.exports= Company;


/*
{
    "id_company":5,
    "name":"zoualfkar u",
    "user_name":"test u ",
    "password":"test u",
    "link":"pos.ispcare.mts.sy/"
  }

  */

/*
  Company.getCompanyById(2,function(err,res){
    if(err)
    console.log(err);
    else console.log(res);
  });
  */
 