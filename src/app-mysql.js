var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '',
  database : 'dogenews'
});


connection.connect();
 
connection.query('SELECT * FROM groupcategory', (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    connection.end();
});
console.log('after');
