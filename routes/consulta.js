var express = require('express');
var url = require('url');
var math = require('mathjs')


var router = express.Router();

/*Constantes*/
var TITLE='Nutri-Tec'

router.get('/salud', function(req, res, next) {
	
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	var idPeso=Number(query.idPeso)
	var idAltura=Number(query.idAltura)
	var result=math.divide(idPeso,(idAltura*idAltura))

	idPeso=idPeso>0?idPeso:0;
	idAltura=idAltura>0?idAltura:0;
	result=result>0?result:0;

  	res.render('consulta', { title: TITLE,masa:result, peso:idPeso, altura:idAltura});
});

module.exports = router;
