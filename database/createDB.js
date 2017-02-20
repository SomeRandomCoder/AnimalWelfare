var fs = require('fs');
var bcrypt = require('bcryptjs');
var mysql = require('mysql');
var myConnection = require('express-myconnection');
var sql = String(fs.readFileSync('./sql/createDB.sql'));

var dbOptions = {
  host: "127.0.0.1",
  user: 'root',
  password: "mxmaolqk",
  // password: '5550121a',
  port: 3306,
};

var connection = mysql.createConnection(dbOptions);


exports.create = function(){



connection.query(sql, [], function(err, rows){
if(err) console.log(err);
});
};
