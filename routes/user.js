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
			name:query.idName,
			mail:query.idMail,
			password:query.idPassword
		}
	  	var id=db.createPersona(persona)

	  	// Validacion que si se agrega el usuario a la base de datos 
	  	// se pueda crear la cookie, si no no
	  	res.cookie('persona',persona, { maxAge: 900000, httpOnly: true });

	  	res.cookie('toggleSesionLabel','Cerrar Sesion', { maxAge: 900000, httpOnly: true });
    	res.cookie('toggleSesionLink','/user/cerrar-sesion', { maxAge: 900000, httpOnly: true });
	  }
	if(!req.cookies.persona){
  		res.render('registro', 
  			{ 
  				title: TITLE,
		        toggleSesionLabel:req.cookies.toggleSesionLabel,
		        toggleSesionLink:req.cookies.toggleSesionLink 
		    });
  	}else{
  		res.redirect('/consulta/salud');
  	}
});

router.get('/inicio-sesion', function(req, res, next) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	if(query.idMail && query.idPassword){
		console.dir(query)
		var persona={
			mail:query.idMail,
			password:query.idPassword
		}
	  	var persona=db.loginValido(persona)
	  	res.cookie('persona',persona, { maxAge: 900000, httpOnly: true });

	  	res.cookie('toggleSesionLabel','Cerrar Sesion', { maxAge: 900000, httpOnly: true });
	    res.cookie('toggleSesionLink','/user/cerrar-sesion', { maxAge: 900000, httpOnly: true })

		res.redirect('/consulta/salud')
	}

    if(!req.cookies.persona){
		res.render('inicio-sesion', 
			{ 
				title: TITLE,
		        toggleSesionLabel:req.cookies.toggleSesionLabel,
		        toggleSesionLink:req.cookies.toggleSesionLink 
		    });
	 }
});
router.get('/cerrar-sesion', function(req, res, next) {
	res.clearCookie('persona');
	res.clearCookie('toggleSesionLabel');
	res.clearCookie('toggleSesionLink');

    res.cookie('toggleSesionLabel','Iniciar Sesion', { maxAge: 900000, httpOnly: true });
    res.cookie('toggleSesionLink','/user/inicio-sesion', { maxAge: 900000, httpOnly: true });

	res.redirect('/');
});

module.exports = router;