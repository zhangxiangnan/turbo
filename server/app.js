require('pmx').init({
    http : true
});

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var compress = require('compression');
var hbs = require('hbs');
// Register HBS's helpers
var hbsHelpers = require('./helpers/hbs');
var routes = require('./routes');
var middleware = require('./middleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// handle static resource
app.use(express.static(path.resolve(__dirname + '/client')));
app.use(express.static(path.resolve(__dirname + '/server/upload')));
app.use(express.static(path.resolve(__dirname + '/server/files')));

// @NOTE: compression
app.use(compress());

// Custom Error
// app.use('/error', middleware.errors.customError);

// Routes
routes(app);

// Custom middlewares
middleware(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// 
// // error handlers
// 
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
// 
// // production error handler
// // no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
