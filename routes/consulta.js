var express = require('express');
var url = require('url');
var math = require('mathjs')


var router = express.Router();

var TITLE='Nutri-Tec'

router.get('/salud', function(req, res, next) {
	
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	if(isNumeric(query.idPeso) &&
		isNumeric(query.idAltura)){

		var idPeso=Number(query.idPeso)
		var idAltura=Number(query.idAltura)
		var result=math.divide(idPeso,(idAltura*idAltura))

		if(res.cookies.persona){
			// Insertar el registro a la persona indicada
		}else{
			// Insertar el registro a persona_detalle sin una relacion de persona
		}
  	
  		res.render('consulta', 
  			{ 
  				title: TITLE,
  				masa:result, 
  				peso:idPeso, 
  				altura:idAltura
  			});
	}
  	res.render('consulta', { title: TITLE });
});
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = router;
