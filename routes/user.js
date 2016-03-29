var express = require('express');

var router = express.Router();

/*Constantes*/
var TITLE='Nutri-Tec'

router.get('/registro', function(req, res, next) {
  res.render('registro', { title: TITLE });
});

router.get('/sesion', function(req, res, next) {
  res.render('inicio-sesion', { title: TITLE });
});

module.exports = router;