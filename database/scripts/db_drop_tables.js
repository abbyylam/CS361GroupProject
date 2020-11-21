var mysql = require('mysql');
var dbConfig = require('../db_config.js')
var OnSqlError = require('../db_utils.js').OnSQLError;

connect()
    .then(dropUserTable)
    .then(dropIngredientIssueTable)
    .then(dropIngredientAlternativeTable)
    .then(dropRecipeIngredientTable)
    .then(dropRecipeTable)
    .then(dropIngredientTable)
    .then(dropIssueTable)
    .then(disconnect);

function connect() {
    return new Promise(function(resolve, reject) {
        process.stdout.write('Connecting to database... ');

        var con = mysql.createConnection(dbConfig);
        con.connect(function(err) {
            if (err) OnSqlError(con, err);
            process.stdout.write('Success\n');
            resolve(con);
        });
    });
}

function dropUserTable(con) {
    return new Promise(function(resolve, reject) {
        process.stdout.write('Dropping \'user\' table... ');
        var sql = 'DROP TABLE user;';

        var result = con.query(sql, function(err, result) {
            if (err) OnSqlError(con, err);
            process.stdout.write('Success\n');
            resolve(con);
        });
    });
}

function dropIngredientIssueTable(con) {
    return new Promise(function(resolve, reject) {
        process.stdout.write('Dropping \'ingredientIssue\' table... ');
        var sql = 'DROP TABLE ingredientIssue;';

        con.query(sql, function(err, result) {
            if (err) OnSqlError(con, err);
            process.stdout.write('Success\n');
            resolve(con);
        });
    });
}

function dropIngredientAlternativeTable(con) {
    return new Promise(function(resolve, reject) {
        process.stdout.write('Dropping \'ingredientAlternative\' table... ');
        var sql = 'DROP TABLE ingredientAlternative;';

        con.query(sql, function(err, result) {
            if (err) OnSqlError(con, err);
            process.stdout.write('Success\n');
            resolve(con);
        });
    });
}

function dropIngredientTable(con) {
    return new Promise(function(resolve, reject) {
        process.stdout.write('Dropping \'ingredient\' table... ');
        var sql = 'DROP TABLE ingredient;';

        con.query(sql, function(err, result) {
            if (err) OnSqlError(con, err);
            process.stdout.write('Success\n');
            resolve(con);
        });
    });
}

function dropIssueTable(con) {
    return new Promise(function(resolve, reject) {
        process.stdout.write('Dropping \'issue\' table... ');
        var sql = 'DROP TABLE issue;';

        con.query(sql, function(err, result) {
            if (err) OnSqlError(con, err);
            process.stdout.write('Success\n');
            resolve(con);
        });
    });
}

function dropRecipeTable(con) {
    return new Promise(function(resolve, reject) {
        process.stdout.write('Dropping \'recipe\' table... ');
        var sql = 'DROP TABLE recipe;';

        con.query(sql, function(err, result) {
            if (err) OnSqlError(con, err);
            process.stdout.write('Success\n');
            resolve(con);
        });
    });
}

function dropRecipeIngredientTable(con) {
    return new Promise(function(resolve, reject) {
        process.stdout.write('Dropping \'recipeIngredient\' table... ');
        var sql = 'DROP TABLE recipeIngredient;';

        con.query(sql, function(err, result) {
            if (err) OnSqlError(con, err);
            process.stdout.write('Success\n');
            resolve(con);
        });
    });
}

function disconnect(con) {
    return new Promise(function(resolve, reject) {
        process.stdout.write('Disconnecting... ');

        con.end(function(err) {
            if (err) OnSqlError(con, err);
            process.stdout.write('Success\n');
            resolve();
        });
    });
}
