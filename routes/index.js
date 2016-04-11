/*
Dependences
 */
var express = require('express');
var db=require('../database/db')

var router = express.Router();

/*
Constants
 */
var TITLE='Nutri-Tec'
var INICIO='Somos una compañía independiente  que  inicia en esta rama de la salud como motivación propia para combatir los problemas nutricionales que existen no solo en nuestro entorno sino a nivel mundial.' 
var MISION='Implementar nuestro sistema inteligente que otorga información de la salud nutricional a cada persona y lanzar resultados personales y estadísticos.' 
var VISION='Ser la mejor empresa de nutrición convirtiéndonos en el número 1 en el sector de salud nutricional y en el físico constructivismo' 

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', 
  	{ 
  		title: TITLE,
  		letrero: TITLE,
      toggleSesionLabel:req.cookies.toggleSesionLabel,
      toggleSesionLink:req.cookies.toggleSesionLink
  	});
});

/*
Get methods
 */
router.get('/inicio', function(req, res, next) {
  res.render('index', 
  	{ 
  		title: TITLE,
  		letrero: INICIO,
      toggleSesionLabel:req.cookies.toggleSesionLabel,
      toggleSesionLink:req.cookies.toggleSesionLink
  	});
});

router.get('/mision', function(req, res, next) {
  res.render('index', 
  	{ 
  		title: TITLE,
  		letrero: MISION,
      toggleSesionLabel:req.cookies.toggleSesionLabel,
      toggleSesionLink:req.cookies.toggleSesionLink
  	});
});

router.get('/vision', function(req, res, next) {
  res.render('index', 
  	{ 
  		title: TITLE,
  		letrero: VISION,
      toggleSesionLabel:req.cookies.toggleSesionLabel,
      toggleSesionLink:req.cookies.toggleSesionLink
  	});
});

module.exports = router;
