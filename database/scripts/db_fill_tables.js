var mysql = require('mysql');
var dbConfig = require('../db_config.js')
var OnSqlError = require('../db_utils.js').OnSQLError;
var ingredients = require('./ingredientData.js')
var issues = require('./issueData.js');
var recipes = require('./recipeData.js');

connect()
    .then(fillIngredientTable)
    .then(fillIssueTable)
    .then(fillRecipeTable)
    .then(disconnect);

function connect()
{
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

function fillIngredientTable(con) {
    return new Promise(function (resolve, reject) {
        process.stdout.write('Filling \'ingredient\' table... ');
        let sql = `INSERT INTO ingredient(Name,HasIssue) VALUES ? `;

        con.query(sql, [ingredients.ingredients], function (err, result)
        {
            if (err) OnSqlError(con, err);
            process.stdout.write('Success\n');
            resolve(con);
        });
    });
}

function fillIssueTable(con) {
    return new Promise(function (resolve, reject) {
        process.stdout.write('Filling \'issue\' table... ');
        sql = `INSERT INTO issue(Name,Description, EvidenceUrl) VALUES ? `;

        con.query(sql, [issues.issues], function (err, result)
        {
            if (err) OnSqlError(con, err);
            process.stdout.write('Success\n');
            resolve(con);
        });
    });
}

function fillRecipeTable(con) {
    return new Promise(function (resolve, reject) {
        process.stdout.write('Filling \'recipe\' table... ');
        sql = `INSERT INTO recipe(Name) VALUES ? `;

        con.query(sql, [recipes.recipes], function (err, result)
        {
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