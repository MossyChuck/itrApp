var mysql = require('../database/sqlServer');

exports.create = function(req,res) {
    var instruction = req.body;
    mysql.query('SELECT * FROM instructions WHERE title='+instruction.title+';',function(error,results,fields) {
        if(results && results.length !== 0) {
            res.send('Instruction with this title already exist!');
            res.end();
        }else{
            var sql = 'INSERT INTO instructions(title,created,authorId,steps,comments,rating,category,tags) VALUES(?,?,?,?,?,?,?,?);';
            var insert = [instruction.title,new Date().toISOString().substring(0,10),instruction.authorId,JSON.stringify(instruction.steps),JSON.stringify(instruction.comments),JSON.stringify(instruction.rating),JSON.stringify(instruction.category),JSON.stringify(instruction.tags)];
            var query = mysql.format(sql,insert);
            mysql.query(query,function(error) {
                if(error) throw error;
                res.send('gooood');
                res.end();
            })
        }
    });
}
exports.getAll = function(req,res) {
    mysql.query('SELECT * FROM instructions;',function(error,results,fields) {
        if(error) throw error;
        res.send(results);
        res.end();
    });
}
exports.delete = function(req,res){
    mysql.query('DELETE FROM instructions WHERE id='+req.body.id+';',function(error,results,fields){
        if(error) throw error;
        res.end();
    });
}