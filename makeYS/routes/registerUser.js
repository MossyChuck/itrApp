var mysql = require('../database/sqlServer');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

exports.post = function(req,res,next){
  var user = req.body;
  var salt = Math.random()+'';
  var hashedPassword = crypto.createHmac('sha1',salt).update(user.password).digest('hex');
  console.log('SELECT * FROM users WHERE username="'+user.username+'";');
  mysql.query('SELECT * FROM users WHERE username="'+user.username+'";',function(error,results,fields){
    if(error) throw error;
    if (results.length !== 0){
      res.send("This username is already used!");
      res.end();
    }else{
      mysql.query('SELECT * FROM users WHERE email="'+user.email.replace('@','%40')+'";',function(error,results,fields){
        if(error) throw error;
        if (results.length !== 0){
          res.send("This email is already used!");
          res.end();
        }else{
          mysql.query('INSERT INTO users(username,first_name,last_name,email,hashed_password,salt,created) VALUES('+'\"'+user.username+'","'+user.firstName+'","'+user.lastName+'","'+user.email.replace('@','%40')+'","'+hashedPassword+'","'+salt+'","'+new Date().toISOString().substring(0,10)+'");', function (error, results, fields) {
            if (error) throw error;
              console.log('success');
              res.send("send");
              send(user.email);
              res.end();
            });
        }
      });
    }
  });
}

var transport = nodemailer.createTransport({
    service: "Outlook",
    auth: {
        user: "myappitra@hotmail.com",
        pass: "12345itra"
    }
});
var rand;
send = function(email) {
    rand=Math.floor((Math.random() * 100) + 54);
    link="http://127.0.0.1/verify/?id="+rand+"&email="+email;
    mailOptions={
        to : email,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
    }
    console.log(link);
    transport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
        //res.end("error");
    }else{
        //res.redirect("/emailIsSend");
        console.log(link);
    }
    });
}

exports.verify = function(req,res){
        if(req.query.id==rand)
        {
            console.log("email is verified");
            //console.log(req.query.to);
            mysql.query("UPDATE users SET verifyed = true WHERE email='"+req.query.email.replace('@','%40')+"';",function(error){
                if(error) throw error;
                res.render('index');
            });

        }
        else
        {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    
}