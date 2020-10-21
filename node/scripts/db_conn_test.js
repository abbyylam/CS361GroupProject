var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'foo',
    user: 'foo',
    password: 'foo'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
});

con.end(function(err) {
    if (err) throw err;
    console.log("Disconnected");
});