var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '12345',
  database : 'test_db'
});

connection.connect(function(err){
    if (err){
        console.log("connection error");
        throw err;
    }else{
        console.log("connection sucsessfull");
    }
    
});

module.exports = connection;
