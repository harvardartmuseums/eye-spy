var express = require('express');
var router = express.Router();
var data = require('../public/data.json');
var HAM = require('../libs/ham');
var _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: `${data.project.title} | Harvard Art Museums`, data: data });
});

/* GET screens page. */
router.get('/game/grid', function(req, res, next) {
  res.render('game-grid', { title: `Game Grid | ${data.project.title} | Harvard Art Museums`, data: data });
});



module.exports = router;
