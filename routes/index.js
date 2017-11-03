var express = require('express');
var app = express();

app.get('/', function(req, res){
  // render ro views/index.ejs template file
  res.render('index', {title : 'Integrate node js using EJS + bootstrap'});
});

/**
 * We assign app object to module.exports
 *
 * module.exports exposes the app object as a module
 *
 * module.exports should be used to return the object
 * when this file is required in another module like app.js
 */
module.exports = app