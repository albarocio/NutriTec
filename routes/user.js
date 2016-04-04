var express = require('express');
var url = require('url');
var db=require('../db')

var router = express.Router();

/*Constantes*/
var TITLE='Nutri-Tec'

router.get('/registro', function(req, res, next) {

	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	if(query.idNombre!='' && query.idCorreo!='' && query.idPassword!=''){
		
		var persona={
			nombre:query.idNombre,
			correo:query.idCorreo,
			password:query.idPassword
		}
	  	var id=db.createPersona(persona)
	  	res.cookie('persona',persona, { maxAge: 900000, httpOnly: true });
	  }
	if(!req.cookies.persona){
  		res.render('registro', { title: TITLE });
  	}else{
  		 res.redirect('/consulta/salud');
  	}
});

router.get('/sesion', function(req, res, next) {
  res.render('inicio-sesion', { title: TITLE });
});

module.exports = router;