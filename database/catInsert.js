var mysql = require('mysql');
var fs = require("fs");
// var myConnection = require('express-myconnection');


var data = {
  animal: "Cat",
  name: "Sparky",
  age: 12,
  gender: "male",
  bio: "Test to see that insert works",
  image: "1"
};

var catInsert = String(fs.readFileSync('./sql/cat.sql'));

  var dbOptions = {
    host: '127.0.0.1',
    user: 'root',
    // password: 'password1!',
    password: 'mxmaolqk',

    port: 3306,
    database: "animalWelfare"
  };
var connection = mysql.createConnection(dbOptions);



connection.query(catInsert, [data], function(err, result) {
  if (err) throw err;
});
