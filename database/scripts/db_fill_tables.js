var mysql = require('mysql');
var dbConfig = require('../db_config.js')
var OnSqlError = require('../db_utils.js').OnSQLError;
var ingredients = require('./ingredientData.js')
var issues = require('./issueData.js');

var con = mysql.createConnection(dbConfig);

con.connect(function(err) {
  if(err) OnSqlError(con, err);
  process.stdout.write('Success\n');
    
  process.stdout.write('Filling \'ingredient\' table... \n');
  let sql = `INSERT INTO ingredient(Name,HasIssue) VALUES ? `;

  con.query(sql, [ingredients.ingredients], function (err, result) {
    if (err) OnSqlError(con, err);
    process.stdout.write('Success\n');
  });
  
  process.stdout.write('Filling \'issue\' table... \n');
  sql = `INSERT INTO issue(Name,Description, EvidenceUrl) VALUES ? `;

  con.query(sql, [issues.issues], function (err, result) {
    if (err) OnSqlError(con, err);
    process.stdout.write('Success\n');
  });

  process.stdout.write('Disconnecting... ');
  con.end(function(err) {
      if (err) OnSqlError(con, err);
      process.stdout.write('Success\n');
  });
});