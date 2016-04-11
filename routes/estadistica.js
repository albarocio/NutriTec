/*
Dependencias
*/
var express = require('express');
var db=require('../db')
var router = express.Router();

/*Constantes*/
var TITLE='Nutri-Tec'

router.get('/', function(req, res, next) {
	db.getEstadistica('null', function(err, cla) {
		if (typeof err !== "undefined" && err !== null) {
			res.status(500).send({
				error: err
			});
			return;
		}

		var clasificacion = 
		{
			bajo:cla[0].total,
			normal:cla[1].total,
			sobrepeso:cla[2].total,
			grado1:cla[3].total,
			grado2:cla[4].total,
			grado3:cla[5].total
		}
		res.render('estadistica', 
		{ 
			title: TITLE,
			clasificacion:clasificacion,
	        toggleSesionLabel:req.cookies.toggleSesionLabel,
	        toggleSesionLink:req.cookies.toggleSesionLink
		});
	});
});

module.exports = router;

