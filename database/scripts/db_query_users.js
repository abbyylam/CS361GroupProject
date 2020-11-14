var mysql = require('mysql');
var dbConfig = require('../db_config.js')
var OnSqlError = require('../db_utils.js').OnSQLError;

var con = mysql.createConnection(dbConfig);

process.stdout.write('Connecting to database... ');
con.connect(function(err) {
    if (err) OnSqlError(con, err);
    process.stdout.write('Success\n');

    process.stdout.write('Selecting all rows from the \'users\' table... ');
    var sql = 'SELECT * from user;';

    con.query(sql, function(err, result) {
        if (err) OnSqlError(con, err);
        process.stdout.write('\n');
        console.log(result);

        process.stdout.write('Disconnecting... ');
        con.end(function(err) {
            if (err) OnSqlError(con, err);
            process.stdout.write('Success\n');
        });
    });
});