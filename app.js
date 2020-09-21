var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var validator = require('express-validator');


// Heroku Settigns
app.listen(process.env.PORT || 3000);


// Document Object
var jsdom = require('jsdom');
var { JSDOM } = jsdom;
var myurl = 'http://localhost:3000/';
global.document = new JSDOM(myurl).window.document;


// Windwo Object
const domino = require('domino');
const fs = require('fs');
// import { readFileSync } from 'fs';
// const DIST_FOLDER = join(process.cwd(), 'dist');
const template = fs.readFileSync('./views/index2.ejs', 'utf-8');
const winObj = domino.createWindow(template);
global['window'] = winObj;
global['document'] = winObj.document;



var ejsLint = require('ejs-lint');
var lintindex = ejsLint('index');
console.log(lintindex);


var index = require('./routes/index');
var login = require('./routes/login');

// Defaults
var createError = require('http-errors');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(validator());


// Defaults
// app.use(express.urlencoded({ extended: false }));


var session_opt = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
};
app.use(session(session_opt));

app.use('/', index);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
