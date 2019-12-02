var express = require('express');
var router = express.Router();

// English locale
var global = require('../locales/en/global');
var cities = require('../locales/en/cities');
var locale = { global: global, cities: cities }

/* GET home page. */
router.get('/cities', function(req, res, next) {
  res.render('cities', { title: 'Flux - For Cities & Counties', locale: locale });
});

module.exports = router;
