const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config');
const app = express();
let port = 8000;

app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(db.link, {useUnifiedTopology: true}, (err, client) => {
  if (err) 
    throw err;

  require ('./app/routes')(app, client.db(db.name));
  app.listen(port, () => {
    console.log('The server is running on ' + port + ' port');
  });
});