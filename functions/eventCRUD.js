var mysql = require('mysql');
var fs = require('fs');
var dbOptions = {
    host: "127.0.0.1",
    user: 'root',
    password: "mxmaolqk",
    // password: '5550121a',
    port: 3306,
    database: 'animalWelfare'
};

var connection = mysql.createConnection(dbOptions);
exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var data = {
      		Title : req.body.Title,
					Description: req.body.Description,
          Name: req.body.Name

  		};
		connection.query('insert into events set ?', data, function(err, results) {
  			if (err) return next(err);
				res.redirect('/Comments');
		});
	});
};


exports.showAll = function(req, res) {
    connection.query("SELECT * FROM events", [], function(err, result) {
          res.render('Comments', {
            data: result,
            admin: req.session.admin,
            user: req.session.username
        });
    });
};


exports.remove = function(req, res) {
    var id = req.params.id;
          connection.query('DELETE FROM events WHERE id= ?', id, function(err, rows) {
            if (err) console.log(err);
            res.redirect('/Comments');
        });
    };
