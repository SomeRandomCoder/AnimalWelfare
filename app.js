var fs = require('fs');
var handlebars = require('express-handlebars');
var express = require('express');
var mysql = require('mysql');
var myConnection = require("express-myconnection");
var bodyParser = require('body-parser');
var session = require("express-session");
var bcrypt=require("bcryptjs");
var multer = require('multer');
var flash=require('express-flash');
// var co = require("co");
var app = express();


var adoptions = require('./functions/adoptions');
var mailer = require('./functions/mailer');
var eventCRUD = require('./functions/eventCRUD');

var login = require("./functions/login");

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
app.use(flash());
app.use(express.static("public"));

var dbOptions = {
  host: "127.0.0.1",
  user: 'root',
  password: "mxmaolqk",
  // password: '5550121a',
  port: 3306,
  database: 'animalWelfare'
};

app.use(myConnection(mysql, dbOptions, "single"));

// var connection = mysql.createConnection(dbOptions);




app.engine("handlebars", handlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false
}));

app.use(function(req,res,next){



  var admin = req.session.admin && req.session.username,
      user =  req.session.username,
      userInSession = req.session.username;

  var generalPath = req.path.split("/")[1] === "news"
              ||req.path.split("/")[1] === "aboutUs"
              || req.path.split("/")[1] === "adoptions"
              || req.path.split("/")[1] === "donations"
              || req.path.split("/")[1] === "lostAndFound"
              || req.path.split("/")[1] === "GivenGain"
              ||req.path.split("/")[1] === "contactUs"
              ||req.path.split("/")[1] === "adoptCat"
              ||req.path.split("/")[1] === "adoptDog"
              ||req.path.split("/")[1] === "inspectors"
              ||req.path.split("/")[1] === "login"
              ||req.path.split("/")[1] === "logout"
              ||req.path.split("/")[1] === "allAnimals"
              ||req.path.split("/")[1] === "directions"
              ||req.path.split("/")[1] === "Comments"
              || req.path.split("/")[1] === "addComment"
              || req.path.split("/")[1] === "adoptCatSearch"
              || req.path === "/";



  var adminPath = req.path.split("/")[2] === "add"
                // ||req.path.split("/")[1] === "Comments"


                || req.path.split("/")[1] === "allAnimals";

// console.log("hello " + req.session.username);
  if(!admin && adminPath){
    res.redirect('/');
  }
  else
  if (!user && generalPath) {

    next();
}
else
if (user && generalPath) {

  next();
}

});



app.post('/login', login);
app.get('/login', function(req, res){
  res.render('login',{admin: req.session.admin, user: req.session.username});
});
app.get('/logout', function(req, res) {
    delete req.session.username;
    delete req.session.admin;
    res.redirect('/');
});


app.get("/", function(req, res) {
  res.render("index",{admin: req.session.admin, user: req.session.username});
});

app.get("/aboutus", function(req, res) {
  res.render("AboutUs",{admin: req.session.admin, user: req.session.username});
});

app.get("/aboutusindividuals", function(req, res) {
  res.render("AboutUsIndividuals",{admin: req.session.admin, user: req.session.username});
});

app.get("/adoptions", function(req, res) {
  res.render("adoptions",{admin: req.session.admin, user: req.session.username});
});

app.get("/adoptions/add", function(req, res) {
  res.render("addAnimal",{admin: req.session.admin, user: req.session.username});
});

app.post('/adoptions/add',multer({ dest: './public/uploads/'}).single('img') ,adoptions.add);
app.get("/adoptCat", adoptions.showCat);
app.get("/adoptCat/search/:searchVal", adoptions.search);
app.post("/adoptCat/search/", adoptions.search);
app.get("/adoptDog", adoptions.showDog);
app.get("/allAnimals", adoptions.showAll);
app.post('/allAnimals/remove/:id', adoptions.remove);

app.get("/allAnimals", function(req, res) {
  res.render("allAnimals",{admin: req.session.admin, user: req.session.username});
});
app.get("/allAnimals", adoptions.showAll);

app.get("/inspectors", function(req, res) {
  res.render("inspectors",{admin: req.session.admin, user: req.session.username});
});
app.post("/inspectors", mailer.contactInspectors)

app.get("/news", function(req, res) {
  res.render("news",{admin: req.session.admin, user: req.session.username});
});

app.get("/lostandfound", function(req, res) {
  res.render("lostAndFound",{admin: req.session.admin, user: req.session.username});
});

app.get("/GivenGain", function(req, res) {
  res.render("GivenGain",{admin: req.session.admin, user: req.session.username});
});

app.get("/directions", function(req,res){
  res.render("directions",{admin: req.session.admin, user: req.session.username});
})

app.get("/addComment", function(req,res){
  res.render("addEvent",{admin: req.session.admin, user: req.session.username});
})

app.get("/adoptCat/search/", function(req,res){
  res.render("adoptCatSearch",{admin: req.session.admin, user: req.session.username});
})
app.get("/adoptCat/search/:searchVal", adoptions.search);
app.post("/adoptCat/search/", adoptions.search);


app.get('/Comments', function(req, res, next) {
    req.getConnection(function(err, connection) {
      connection = mysql.createConnection(dbOptions);
        // connection = mysql.createConnection(dbOptions);
        if (err) return next(err);
        connection.query("SELECT events.title, events.description, DATE_FORMAT(events.date,'%W %m-%d-%Y at %l:%i:%p') as date, events.name FROM events ORDER BY `events`.`date` DESC", [],function(err, data) {
            if (err) return next(err);
            if(req.session.admin){
              res.render("Comments", {
                data: data,
                admin: req.session.admin ,
                  user: req.session.username
            });
          }
          else{
            res.render("comments",{
              data: data
            });
          }
            // timestamp format:    '%W %m %d %Y at %l:%i:%p'     Date:'%d %b %y'
        });
    });
});
app.get('/Comments', eventCRUD.showAll);
app.post('/Comments/addComment', eventCRUD.add);
app.post('/Comments/remove/:id', eventCRUD.remove);



app.get("/contactUs", function(req, res) {
  res.render("contactUs",{admin: req.session.admin, user: req.session.username});
});
app.post('/contactus', mailer.contactUs);





var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("app listening at http://%s:%s", host, port);
});
