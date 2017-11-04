var mysql = require('../database/sqlServer');
var crypto = require('crypto');

exports.post = function(req,res) {
    var user = req.body;
    mysql.query('SELECT * FROM users WHERE email="'+user.email.replace('@','%40')+'";',function(error,results,fields) {
        if(error) throw error;
        if (results.length == 0) {
          res.send("Wrong email!");
          res.end();
        }else{
            findUser = results[0];
            if(!findUser.verifyed) {
                res.send("Email is not verifyed");
            }else if(findUser.blocked) {
                res.send('You have been baned!');
            }else{
                if(crypto.createHmac('sha1',findUser.salt).update(user.password).digest('hex') == findUser.hashed_password) {
                    req.session.userId = findUser.id;
                    var role = findUser.admin?'admin':'user';
                    res.send({status:'success', userId : findUser.id, username:findUser.username,role:role});
                    res.end();
                }else{
                    res.send('Wrong password!');
                    res.end();
                }
            }
        }
      });
}