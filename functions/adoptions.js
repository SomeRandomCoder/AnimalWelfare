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
exports.add = function(req, res) {

    // var file = req.body.img;
    var path = (req.file.path).replace("public/", '');
    // var path = (req.file.path).replace("public\\" , '');
    var data = {
        animal: req.body.animal,
        name: req.body.name,
        age: req.body.age,
        size: req.body.size,
        gender: req.body.gender,
        bio: req.body.bio,
        image: path
    };
    connection.query('INSERT INTO `adoptions` SET ?', [data], function(err, rows) {
        if (err) console.log(err);
        res.redirect('/adoptions');
    });

};

exports.showCat = function(req, res) {
    connection.query('SELECT * FROM `adoptions` WHERE animal = "cat"', [], function(err, results) {
        // console.log(results);
        return res.render('adoptCat', {
            data: results,
            admin: req.session.admin,
            user: req.session.username
        });
    });
};

exports.search = function(req, res, next){
  req.getConnection(function(err, connection) {
     var searchVal =  req.params.searchVal;
    console.log("Radio button value: " +searchVal + " from searchQuery Function");
    console.log("---------------------------------------------------");
    connection.query('SELECT * FROM adoptions WHERE animal="cat" and adoptions.size LIKE ?', [searchVal], function(err, result){
      if(err) return console.log(err);
		  res.render('adoptCatSearch',{
            data : result,
        		admin: req.session.admin,
						user: req.session.username,
						layout:false
      });
    });
  });
};
//--------------------BACKUP-----------------------------

// exports.showCat = function(req, res) {
//   var data =
//     {
//       size: req.body.size
//     }
//     console.log(data);
//     connection.query('SELECT * FROM `adoptions` WHERE animal = "cat" and size LIKE ?', [data], function(err, results) {
//         // console.log(results);
//         return res.render('adoptCat', {
//             data: results,
//             admin: req.session.admin,
//             user: req.session.username
//         });
//     });
// };

// exports.showCat = function(req, res) {
//
//     connection.query('SELECT * FROM `adoptions` WHERE animal = "cat" ', [], function(err, results) {
//         // console.log(results);
//         return res.render('adoptCat', {
//             data: results,
//             admin: req.session.admin,
//             user: req.session.username
//         });
//     });
// };
//
//
//


// exports.search = function(req, res, next){
//   req.getConnection(function(err, connection) {
//     var searchVal = '%'+ req.params.searchVal +'%';
//     connection.query('SELECT * FROM adoptions WHERE animal="cat" and adoptions.size LIKE ?', [searchVal], function(err, result){
//       if(err) return console.log(err);
// 			console.log(searchVal);
//       res.render('adoptCatSearch',{
//             search : result,
//         		admin: req.session.admin,
// 						user: req.session.username,
// 						layout:false
//
//       });
//     });
//   });
// };
//-----------------------------------END----------------------------------

exports.showDog = function(req, res) {
    connection.query('SELECT * FROM `adoptions` WHERE animal = "dog"', [], function(err, results) {
        return res.render('adoptDog', {
            data: results,
            admin: req.session.admin,
            user: req.session.username
        });
    });
};


exports.showAll = function(req, res) {
    connection.query("SELECT * FROM `adoptions`", [], function(err, result) {
        res.render('allAnimals', {
            data: result,
            admin: req.session.admin,
            user: req.session.username
        });
    });
};
exports.remove = function(req, res) {
    var id = req.params.id;

    connection.query('SELECT image FROM adoptions where id = ?', id, function(err, image) {
        fs.unlink('./public/' + image[0].image);
        connection.query('DELETE FROM adoptions WHERE id= ?', id, function(err, rows) {
            if (err) console.log(err);
            res.redirect('/allAnimals');
        });
    });
};
