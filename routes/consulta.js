var express = require('express');
var url = require('url');
var math = require('mathjs')


var router = express.Router();

router.get('/salud', function(req, res, next) {
	
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	var idPeso=Number(query.idPeso)
	var idAltura=Number(query.idAltura)
	var result=math.divide(idPeso,(idAltura*idAltura))

	idPeso=idPeso>0?idPeso:0;
	idAltura=idAltura>0?idAltura:0;
	result=result>0?result:0;

  	res.render('consulta', { title: 'Nutri-Tec',masa:result, peso:idPeso, altura:idAltura});
});

router.get('/registro', function(req, res, next) {
  res.render('registro', { title: 'Nutri-Tec' });
});

router.get('/sesion', function(req, res, next) {
  res.render('inicio-sesion', { title: 'Nutri-Tec' });
});

// router.get('/consultar', function(req, res, next) {
// 	var url_parts = url.parse(req.url, true);
// 	var query = url_parts.query;
// 	var idPeso=Number(query.idPeso)
// 	var idAltura=Number(query.idAltura)
// 	var result=math.divide(idPeso,(idAltura*idAltura))
// 	// console.log(idAltura)
// 	// console.log(idPeso)
// 	console.log(result)
// 	res.render('consulta', { title: 'Nutri-Tec',masa:result, peso:idPeso, altura:idAltura});
// });

module.exports = router;
