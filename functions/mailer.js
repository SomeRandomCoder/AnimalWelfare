var nodemailer = require('nodemailer');
exports.contactUs = function(req, res){

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://animalwelfarewebsite%40gmail.com:123pass123@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    // to: 'admin@awscape.org.za', // list of receivers
    // to: 'robertsonpsd@gmail.com', // list of receivers
    to: 'tyron.burkhardt.za@gmail.com', // list of receivers

    subject: 'Contact from website', // Subject line
    text: 'Sent from: ' + req.body.InputEmail + '\n' + 'Name: ' + req.body.InputName + '\n'+ '\n' + 'Message:\n ' + req.body.InputMessage, // plaintext body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(err, info){
    if(err){
      console.log(err);
      res.redirect('/contactUs');
    }
    console.log('Message sent: ' + info.response);
    res.redirect('/');
});
};

// EMAIL SENDING TO INSPECTORS EMAIL

exports.contactInspectors = function(req, res){

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://animalwelfarewebsite%40gmail.com:123pass123@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    // to: 'admin@awscape.org.za', // list of receivers
    // to: 'robertsonpsd@gmail.com', // list of receivers
    to: 'tyron.burkhardt.za@gmail.com', // list of receivers

    subject: 'Contact from website', // Subject line
    text: 'Sent from: ' + req.body.InputEmail + '\n' + 'Name: ' + req.body.InputName + '\n'+ '\n' + 'Message:\n ' + req.body.InputMessage, // plaintext body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(err, info){
    if(err){
      console.log(err);
      res.redirect('/contactUs');
    }
    console.log('Message sent: ' + info.response);
    res.redirect('/');
});
};
