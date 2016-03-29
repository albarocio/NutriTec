/*
Dependencias
*/
var express = require('express');
var router = express.Router();

/*Constantes*/
var TITLE='Nutri-Tec'

router.get('/', function(req, res, next) {
	var json = 
	{
		alta:660,media:1000,
		baja:1170
	}
	res.render('estadistica', 
		{ 
			title: TITLE,
			value:json
		});
});

module.exports = router;

