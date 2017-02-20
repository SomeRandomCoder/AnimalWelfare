var bcrypt = require('bcryptjs');
var mysql = require('mysql');
var dbOptions = {
  host: "127.0.0.1",
  user: 'root',
  password: "mxmaolqk",
  // password: '5550121a',
  port: 3306,
  database: 'animalWelfare'
};

var connection = mysql.createConnection(dbOptions);
module.exports = function(req, res) {

    var username = req.body.username;
    var password = req.body.password;



        connection.query('SELECT * FROM users where username = ?', username, function(err, users) {
          var user = users[0];
          var id = user.id;
          if(users[0] === undefined){
            req.flash('warning', 'Invalid username or password');
          return res.redirect("/login");
          }


                bcrypt.compare(password, user.password, function(err, match) {
                    if (match) {
                      if(user.username.match(username)){
                        if(user.admin === 1){
                          req.session.admin = {
                            admin: req.session.username
                          };
                        }
                       req.session.username = user.username;
                     }
                     else {
                       req.flash('warning', 'Invalid username or password');
                       return res.redirect("/login");
                     }

                        return res.redirect("/");
                    }
                    else {
                      req.flash('warning', 'Invalid username or password');
                            return res.redirect("/login");
                        }
                    });





        });

};
