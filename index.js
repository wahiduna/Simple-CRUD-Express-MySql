var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();

// set pug as template engine
app.get('/', function(req, res){
  res.render('form');
});

app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/www
app.use(bodyParser.urlencoded({ extended : true }));

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.satic('public'));

app.post('/', function(req, res){
  console.log(req.body);
  res.send("received your request");
});

app.get('/first_template', function(req, res){
  res.render('first_view');
});
app.listen(3000);
