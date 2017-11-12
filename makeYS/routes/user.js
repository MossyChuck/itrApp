var mysql = require('../database/sqlServer');
var crypto = require('crypto');

exports.getUsers = function(req,res) {
    var property = req.body.property;
    var value = req.body.value;
    var s;
    if (!property || !value) {
        s = ';';
    }else{
        s = 'WHERE ' + property + ' = ' + value + ';'; 
    }
    mysql.query('SELECT * FROM users '+s,function(error,results,fields) {
        if(error) throw error;
        res.send(results);
        res.end();
    });
}
exports.deleteUser = function(req,res) {
    var id = req.body.id;
    mysql.query('DELETE FROM users WHERE id='+id+';',function(error,results,fields) {
        if(error) throw error;
        res.end();
    });
}

exports.changeProperty = function(req,res) {
    var property = req.body.property;
    var value = req.body.value;
    var id = req.body.id;
    if(property == 'password'){
        var salt = Math.random()+'';
        var hashedPassword = crypto.createHmac('sha1',salt).update(value).digest('hex');
        mysql.query('UPDATE users SET salt='+salt+', hashed_password="'+hashedPassword+'" WHERE id='+id+';',function(error){
            if(error) throw error;
            res.end();
        });
    }else{
        var sql = 'UPDATE users SET '+property+'=? WHERE id=?;';
        var insert = [value,id];
        var query = mysql.format(sql,insert);
        mysql.query(query,function(error,results,fields) {
            if(error) throw error;
            res.end();
        });
    }
}