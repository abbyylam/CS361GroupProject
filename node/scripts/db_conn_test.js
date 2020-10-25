var mysql = require('mysql');
var dbConfig = require('../db_config.js')

var con = mysql.createConnection(dbConfig);

process.stdout.write('Connecting to database...');
con.connect(function(err) {
    if (err) throw err;
    process.stdout.write(' Success\n');

    process.stdout.write('Disconnecting...');
    con.end(function(err) {
        if (err) throw err;
        process.stdout.write(' Success\n');
    });
});