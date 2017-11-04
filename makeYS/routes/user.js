var mysql = require('../database/sqlServer');

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
    console.log('UPDATE users SET ' + property + '=' + value + ' WHERE id='+id+';');
    mysql.query('UPDATE users SET ' + property + '="'+value+'" WHERE id='+id+';',function(error,results,fields) {
        if(error) throw error;
        res.end();
    });
}