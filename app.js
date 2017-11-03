var express = require('express');
var app = express();
var http = require('http');

var mysql = require('mysql');

// middleware for handle Mysql Connections
// module for Mysql connections during request/reponse lifecycle
var myConnection = require('express-myconnection');

// store database credential from config.js
var config =  require('./config');
var dbOptions = {
  host : config.database.host,
  user : config.database.user,
  password : config.database.password,
  port : config.database.port,
  database : config.database.db
}

// app.use([path],callback,[callback]
app.use(myConnection(mysql, dbOptions, 'pool'));

app.use(express.static(__dirname + '/public'));

// Setting up the templating engine using view enginjs
// app.set('view enginge', name_template_engine);
app.set('view engine', 'ejs');

// iport routes/index.js and users.js
var index = require('./routes/index');
var users = require('./routes/users');

// Express validator middleware for form validation
var expressValidator = require('express-validator');
app.use(expressValidator());

// bodyParser is module for reade POST input
var bodyParser = require('body-parser');

// bodyParser encoded the data
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

/**
 * This module let us use HTTP verbs such as PUT or DELETE
 * in places where they are not supported
 */

var methodOverride = require('method-override');

/**
* using custom logic to override method
*
* there are other ways of overriding as well
* like using header & using query value
*/
app.use(methodOverride(function (req, res) {
 if (req.body && typeof req.body === 'object' && '_method' in req.body) {
   // look in urlencoded POST bodies and delete it
   var method = req.body._method
   delete req.body._method
   return method
 }
}))

/**
 * This module shows flash messages
 * generally used to show success or error messages
 *
 * Flash messages are stored in session
 * So, we also have to install and use
 * cookie-parser & session modules
 */
var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser('keyboard cat'))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(flash())

app.use('/', index);
app.use('/users', users);

app.listen(5000, function(){
  console.log('Server running on port 5000, http://localhost:5000')
});

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.write('Hello World!');
//   res.end();
// }).listen(8080);
