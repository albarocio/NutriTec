var express = require('express');
var router = express.Router();

router.get('/salud', function(req, res, next) {
  res.render('consulta', { title: 'Nutri-Tec' });
});

router.get('/registro', function(req, res, next) {
  res.render('registro', { title: 'Nutri-Tec' });
});

router.get('/sesion', function(req, res, next) {
  res.render('inicio-sesion', { title: 'Nutri-Tec' });
});

module.exports = router;
