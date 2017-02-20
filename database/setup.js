var fs = require('fs');
var bcrypt = require('bcryptjs');
var mysql = require('mysql');
var myConnection = require('express-myconnection');


var createDB = require('./createDB');
var users = String(fs.readFileSync('./sql/users.sql'));
var admin = String(fs.readFileSync('./sql/admin.sql'));
var events = String(fs.readFileSync('./sql/events.sql'));
var adoptions = String(fs.readFileSync('./sql/adoptions.sql'));

createDB.create();
var dbOptions = {
  host: "127.0.0.1",
  user: 'root',
  password: "mxmaolqk",
  // password: '5550121a',
  port: 3306,
  database: 'animalWelfare'
};

var connection = mysql.createConnection(dbOptions);
bcrypt.hash("123", 10 , function(err, hash){
var data = {username: 'admin',
            password: hash,
            admin: 1};

connection.query(users, [], function(err, rows){
if(err) console.log(err);
connection.query(events, [], function(err, rows){
if(err) console.log(err);
connection.query(adoptions,[], function(err, rows){
if(err) console.log(err);
connection.query(admin, [data], function(err, rows ){     //COMMENT THESE THREE LINES OUT IF YOU INTEND TO USE IT IN APP.JS
  if(err) console.log(err);                               //OTHERWISE IF YOU RUN THE FILE FROM HERE IT CAN STAY :)
});                                                       //ITS JUST INSERTING THE ADMIN USER TO THE TABLE.
});
});
});
});
