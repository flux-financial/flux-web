var express = require('express');
var router = express.Router();

// English locale
var global = require('../locales/en/global');
var index = require('../locales/en/index');
var locale = { global: global, index: index }

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Flux Financial', locale: locale });
});

module.exports = router;
