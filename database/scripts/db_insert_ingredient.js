var mysql = require('mysql');
var dbConfig = require('../db_config.js')
var OnSqlError = require('../db_utils.js').OnSQLError;
var data = require('./ingredientData.js')

var con = mysql.createConnection(dbConfig);

let stmt = `INSERT INTO ingredient(Name,HasIssue)
            VALUES ? `;

// execute the insert statment
con.query(stmt, [data.ingredients], (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  else {
    process.stdout.write('Success!');
  }
});
con.end();