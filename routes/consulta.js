var express = require('express');
var url = require('url');
var math = require('mathjs')
var db=require('../db')


var router = express.Router();

var TITLE='Nutri-Tec'


router.get('/salud', function(req, res, next) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	if(req.cookies.persona!==undefined){
		 console.log('persona cookie exist')
		var persona=req.cookies.persona[0];

		if(isNumeric(query.idPeso) &&
			isNumeric(query.idAltura)&&
			isNumeric(query.idEdad)){

			var idPeso=Number(query.idPeso)
			var idAltura=Number(query.idAltura)
			var result=math.divide(idPeso,(idAltura*idAltura))
			var idEdad=query.idEdad;

			/*
			Update persona_detalle
			 */
			var detalle={
				id_persona_detalle:persona.id_persona_detalle,
				peso:idPeso,
				altura:idAltura,
				IMC:result,
				edad:idEdad
			}

			db.updatePersona_detalle(detalle, function(err, persona_detalle) {
				console.log('Update')
				if (typeof err !== "undefined" && err !== null) {
					res.status(500).send({
						error: err
					});
					return;
				}
				console.dir(persona_detalle)
				var detalle=persona_detalle[0]
				/*
				Llamando a los articulos para sugerir
				 */
				db.getRecomendaciones(detalle, function(err, articulos) {
					if (typeof err !== "undefined" && err !== null) {
						res.status(500).send({
							error: err
						});
						return;
					}

					res.render('consulta', 
		  			{ 
		  				title: TITLE,
		  				detalle:detalle,
		  				articulos:articulos,
				        toggleSesionLabel:req.cookies.toggleSesionLabel,
				        toggleSesionLink:req.cookies.toggleSesionLink
		  			});
	  			});
			});
		}else{
			/*
			Select persona_detalle y setear los inputs
			 */
			db.getPersona_detalle(persona.id_persona_detalle, function(err, persona_detalle) {
				console.log('obtener persona detalle')
				if (typeof err !== "undefined" && err !== null) {
					res.status(500).send({
						error: err
					});
					return;
				}
				var detalle=persona_detalle[0]

				/*
				Llamando a los articulos para sugerir
				 */
				db.getRecomendaciones(detalle, function(err, articulos) {
					if (typeof err !== "undefined" && err !== null) {
						res.status(500).send({
							error: err
						});
						return;
					}
					res.render('consulta', 
		  			{ 
		  				title: TITLE,
		  				detalle:detalle,
		  				articulos:articulos,
				        toggleSesionLabel:req.cookies.toggleSesionLabel,
				        toggleSesionLink:req.cookies.toggleSesionLink
		  			});
				})
			});
		}
	}else{
		if( isNumeric(query.idPeso) &&
			isNumeric(query.idAltura)&&
			isNumeric(query.idEdad)){

			var idPeso=Number(query.idPeso)
			var idAltura=Number(query.idAltura)
			var result=math.divide(idPeso,(idAltura*idAltura))
			var idEdad=query.idEdad

			/*
				Llamando a los articulos para sugerir
				 */
				
			var detalle={
				peso:idPeso,
				altura:idAltura,
				IMC:result,
				edad:idEdad
			}
			db.createPersonaDetalle(detalle, function(err, insertAux) {
				if (typeof err !== "undefined" && err !== null) {
						res.status(500).send({
							error: err
						});
						return;
					}

				console.log(insertAux)

				db.getRecomendaciones(detalle, function(err, articulos) {
					if (typeof err !== "undefined" && err !== null) {
						res.status(500).send({
							error: err
						});
						return;
					}

		  			res.render('consulta', 
		  			{ 
		  				title: TITLE,
		  				detalle:detalle,
			  			articulos:articulos,
				        toggleSesionLabel:req.cookies.toggleSesionLabel,
				        toggleSesionLink:req.cookies.toggleSesionLink
		  			});
			  	})

			})
		}else{
			res.render('consulta', 
			{ 
	  			title: TITLE ,
		        toggleSesionLabel:req.cookies.toggleSesionLabel,
		        toggleSesionLink:req.cookies.toggleSesionLink
			});
		}
	}
});
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
module.exports = router;
