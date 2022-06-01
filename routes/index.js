var express = require('express');
var router = express.Router();
var data = require('../public/data.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: `${data.project.title} | Lightbox`, data: data });
});

/* GET screens page. */
router.get('/screens', function(req, res, next) {
  res.render('screens', { title: `Screens | ${data.project.title} | Lightbox`, data: data });
});

/* GET shades page. */
router.get('/shades', function(req, res, next) {
  res.render('shades', { title: `Shades | ${data.project.title} | Lightbox`, data: data });
});

/* GET controller page. */
router.get('/controller', function(req, res, next) {
  res.render('controller', { title: `Controller | ${data.project.title} | Lightbox`, layout: 'layout-controller', data: data });
});

module.exports = router;
