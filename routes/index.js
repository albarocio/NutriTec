var express = require('express');
var router = express.Router();
var sql=require('../db')

/* GET home page. */
router.get('/', function(req, res, next) {
  
  sql.getPersonas();

  res.render('index', { title: 'Nutri-Tec',letrero: 'Nutri-Tec' });
});

router.get('/inicio', function(req, res, next) {
  res.render('index', { title: 'Nutri-Tec',letrero: 'Somos una compañía independiente  que  inicia en esta rama de la salud como motivación propia para combatir los problemas nutricionales que existen no solo en nuestro entorno sino a nivel mundial.' });
});

router.get('/mision', function(req, res, next) {
  res.render('index', { title: 'Nutri-Tec',letrero: 'Implementar nuestro sistema inteligente que otorga información de la salud nutricional a cada persona y lanzar resultados personales y estadísticos.' });
});

router.get('/vision', function(req, res, next) {
  res.render('index', 
  	{ 
  		title: 'Nutri-Tec',
  		letrero: 'Ser la mejor empresa de nutrición convirtiéndonos en el número 1 en el sector de salud nutricional y en el físico constructivismo' });
});


module.exports = router;
