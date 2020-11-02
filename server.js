const express = require('express');
const path = require('path');

/* Route Paths */
const site = require('./routes/site');
const searchEngine = require('./routes/searchEngine')

/* Create pool for MySQL DB */
const mysql = require('mysql');
const dbconfig = require('./config/db_config.js');
const pool = mysql.createPool(dbconfig);

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/search', searchEngine.search);
app.get('*', site.index);

const port = process.env.PORT || 5000;

app.listen(port);

console.log('App is listening on port ' + port);