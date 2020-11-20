var mysql = require('mysql');
var dbConfig = require('../db_config.js')
var OnSqlError = require('../db_utils.js').OnSQLError;

connect()
    .then(createUserTable)
    .then(createIngredientTable)
    .then(createIssueTable)
    .then(createIngredientIssueTable)
    .then(createIngredientAlternativeTable)
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

function createUserTable(con) {
    return new Promise(function(resolve, reject) {
        process.stdout.write('Creating \'user\' table... ');
        var sql = 'CREATE TABLE IF NOT EXISTS user (' +
            'Id int PRIMARY KEY NOT NULL AUTO_INCREMENT, ' +
            'Email varchar(255) NOT NULL, ' +
            'Password char(64) NOT NULL, ' + 
            'SessionId char(64));';
    
        con.query(sql, function(err, result) {
            if (err) OnSqlError(con, err);
            process.stdout.write('Success\n');
            resolve(con);
        });
    });
}

function createIngredientTable(con) {
    return new Promise(function(resolve, reject) {
        process.stdout.write('Creating \'ingredient\' table... ');
        var sql = 'CREATE TABLE IF NOT EXISTS ingredient (' +
            'Id int PRIMARY KEY NOT NULL AUTO_INCREMENT, ' +
            'Name varchar(255) NOT NULL, ' +
            'HasIssue boolean NOT NULL);';
        
        con.query(sql, function(err, result) {
            if (err) OnSqlError(con, err);
            process.stdout.write('Success\n');
            resolve(con);
        });
    });
}

function createIssueTable(con) {
    return new Promise(function(resolve, reject) {
        process.stdout.write('Creating \'issue\' table... ');
        var sql = 'CREATE TABLE IF NOT EXISTS issue (' +
            'Id int PRIMARY KEY NOT NULL AUTO_INCREMENT, ' +
            'Name varchar(255) NOT NULL, ' +
            'Description varchar(255) NOT NULL, ' +
            'EvidenceUrl varchar(255) NOT NULL);';
    
        con.query(sql, function(err, result) {
            if (err) OnSqlError(con, err);
            process.stdout.write('Success\n');
            resolve(con);
        });
    });
}

function createIngredientIssueTable(con) {
    return new Promise(function(resolve, reject) {
        process.stdout.write('Creating \'ingredientissue\' table... ');
        var sql = 'CREATE TABLE IF NOT EXISTS ingredientIssue (' +
            'Id int PRIMARY KEY NOT NULL AUTO_INCREMENT, ' +
            'IngredientId int NOT NULL, ' +
            'IssueId int NOT NULL,' +
            'CONSTRAINT `fk_ingredient_id`' +
                'FOREIGN KEY (IngredientId) REFERENCES ingredient (id)' +
                'ON DELETE CASCADE,' +
            'CONSTRAINT `fk_issue_id`' + 
                'FOREIGN KEY (IssueId) REFERENCES issue (id)' + 
                'ON DELETE CASCADE);';
    
        con.query(sql, function(err, result) {
            if (err) OnSqlError(con, err);
            process.stdout.write('Success\n');
            resolve(con);
        });
    });
}

function createIngredientAlternativeTable(con) {
    return new Promise(function(resolve, reject) {
        process.stdout.write('Creating \'ingredientAlternative\' table... ');
        var sql = 'CREATE TABLE IF NOT EXISTS ingredientAlternative (' +
            'Id int PRIMARY KEY NOT NULL AUTO_INCREMENT, ' +
            'IngredientId int NOT NULL, ' +
            'AltIngredientId int NOT NULL,' +
            'CONSTRAINT `fk__issue_ingredient_id`' +
                'FOREIGN KEY (IngredientId) REFERENCES ingredient (id)' +
                'ON DELETE CASCADE,' +
            'CONSTRAINT `fk_alt_ingredient_id`' + 
                'FOREIGN KEY (AltIngredientId) REFERENCES ingredient (id)' + 
                'ON DELETE CASCADE);';
    
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
