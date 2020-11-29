var mysql = require('mysql');
var dbConfig = require('../db_config.js');
var OnSqlError = require('../db_utils.js').OnSQLError;
var ingredients = require('./ingredientData.js');
var issues = require('./issueData.js');
var recipes = require('./recipeData.js');
var recipeIngredients = require('./recipeIngredientData.js');
var ingredientIssues = require('./ingredientIssueData.js');
var ingredientAlternatives = require('./ingredientAlternativeData');

connect()
    .then(fillIngredientTable)
    .then(fillIssueTable)
    .then(fillRecipeTable)
    .then(fillRecipeIngredientTable)
    .then(fillIngredientIssueTable)
    .then(fillIngredientAlternativeTable)
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

function fillRecipeIngredientTable(con) {
    return new Promise(function (resolve, reject) {
        process.stdout.write('Filling \'recipeIngredient\' table... ');
        sql = `INSERT INTO recipeIngredient(RecipeId,IngredientId) VALUES ? `;

        con.query(sql, [recipeIngredients.recipeIngredients], function (err, result)
        {
            if (err) OnSqlError(con, err);
            process.stdout.write('Success\n');
            resolve(con);
        });
    });
}

function fillIngredientIssueTable(con) {
    return new Promise(function (resolve, reject) {
        process.stdout.write('Filling \'ingredientIssue\' table... ');
        sql = `INSERT INTO ingredientIssue(IngredientId,IssueId) VALUES ? `;

        con.query(sql, [ingredientIssues.ingredientIssues], function (err, result)
        {
            if (err) OnSqlError(con, err);
            process.stdout.write('Success\n');
            resolve(con);
        });
    });
}

function fillIngredientAlternativeTable(con) {
    return new Promise(function (resolve, reject) {
        process.stdout.write('Filling \'ingredientAlternative\' table... ');
        sql = `INSERT INTO ingredientAlternative(IngredientId,AltIngredientId) VALUES ? `;

        con.query(sql, [ingredientAlternatives.ingredientAlternatives], function (err, result)
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