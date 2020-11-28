const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

/* Create pool for MySQL DB */
const mysql = require('mysql');
const dbconfig = require('./database/db_config.js');
const pool = mysql.createPool(dbconfig);

/* Route Paths */
const site = require('./routes/site');
const searchEngine = require('./routes/searchEngine')(pool);
const recipeListing = require('./routes/recipe')(pool);
const ingredients = require('./routes/ingredients')(pool)
const account = require('./routes/account')(pool);

const app = express();

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());
app.use(cookieParser())

/* API Paths */
app.post('/api/account', account.create);
app.post('/api/account/login', account.login)
app.get('/api/account/logout', account.logout)
app.get('/api/search', searchEngine.search);
app.get('/api/recipe', recipeListing.recipe);
app.get('/api/ingredient', ingredients.ingredient);
app.get('/api/ingredients', ingredients.ingredients);
app.get('/api/ingredientIssue', ingredients.ingredientIssue);
app.get('/api/ingredientAlternatives', ingredients.ingredientAlternatives);
app.get('*', site.index);

const port = process.env.PORT || 5000;

app.listen(port);

console.log('App is listening on port ' + port);