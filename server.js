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
const searchEngine = require('./routes/searchEngine');
const recipeListing = require('./routes/recipeListing');
const account = require('./routes/account')(pool);

const app = express();

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());
app.use(cookieParser())

app.post('/api/account', account.create);
app.post('/api/account/login', account.login)

app.get('/api/search', searchEngine.search);
app.get('/api/recipe', recipeListing.recipe);
app.get('*', site.index);

const port = process.env.PORT || 5000;

app.listen(port);

console.log('App is listening on port ' + port);