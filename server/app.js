/* express - app */
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./api');
const db = require('./db');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../dist')));

app.use(api);

app.get('*', (req, res) => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
  res.send(html)
});

db.connect((err, db) => {
  if (err) { console.error(err); } else {
    global.db = db;
    app.listen(2017);
  }
});

module.exports = app;
