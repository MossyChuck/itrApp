var mysql = require('../database/sqlServer');

exports.create = function(req,res) {
    var instruction = req.body;
    mysql.query('SELECT * FROM instructions WHERE title='+instruction.title+';',function(error,results,fields){
        if(results && results.length !== 0) {
            res.send('Instruction with this title already exist!');
            res.end();
        }else{
            mysql.query('INSERT INTO instructions(title,created,authorId,steps,comments,rating) VALUES('+instruction.title+','+new Date().toISOString().substring(0,10)+','+instruction.authorId+',"'+JSON.stringify(instruction.steps).replace('"','\"')+'","[]","[]");',function(error){
                if(error) console.log(error);
                res.send('gooood');
                res.end();
            })
        }
    });
}