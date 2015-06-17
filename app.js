// Modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var app = express();

// View setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// Modules usage
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat' }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Static file server for /public
app.use(express.static(path.join(__dirname, 'public')));

// Routes declaration and usage
app.use('/test/', require('./routes/issues-test'));
app.use('/vote/', require('./routes/vote'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/index'));
app.use('/', require('./routes/issues'));

// Error handling
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
