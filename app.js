var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sass = require('node-sass-middleware');

var markdown = require('marked');
var fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// setup sass
app.use(sass({
  src: __dirname + '/public',
  dest: __dirname + '/public',
  debug: true,
  outputStyle: 'compressed',
  indentedSyntax: true,
  sourceMap: true
}));

// set up locales
var locale = require('./locales/en/all');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Flux Financial', locale: locale, markdown: markdown });
});

// pages available
let pages = [
  { link: "/cities", view: "cities", title: locale.cities.title },
  { link: "/vendors", view: "vendors", title: locale.vendors.title },
  { link: "/taxpayers", view: "taxpayers", title: locale.taxpayers.title },
  { link: "/savers", view: "savers", title: locale.savers.title }
];

pages.forEach(page => {
  app.get(page.link, function(req, res, next) {
    res.render(page.view, { title: page.title, locale: locale, markdown: markdown, fs: fs, path: path });
  });
});

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
