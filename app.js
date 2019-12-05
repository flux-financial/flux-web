var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sass = require('node-sass-middleware');
var compression = require('compression');

var markdown = require('marked');
var fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.set('env', 'development');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

// setup sass
app.use(sass({
  src: __dirname + '/public',
  dest: __dirname + '/public',
  debug: true,
  outputStyle: 'compressed',
  indentedSyntax: true
}));

// set up locales
var locale = require('./locales/en/all');

app.use(express.static(path.join(__dirname, 'public')));

for (const key in locale.pages) {
  if (locale.pages.hasOwnProperty(key)) {
    const page = locale.pages[key];
    
    app.get(page.url, function(req,res,next) {
      res.render(page.layout, { title: page.title, local: page, global: locale.global, markdown: markdown });
    });
  }
}

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
  console.log(err);
  res.status(err.status || 500);
  res.render('error', { error: err });
});

module.exports = app;
