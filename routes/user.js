/*
Dependences
 */
var express = require('express');
var url = require('url');
var db=require('../database/db')

var router = express.Router();

/*
Constants
 */
var TITLE='Nutri-Tec'
var OPTIONS_COOKIE={ maxAge: 900000, httpOnly: true }

/*
Get methods
 */
router.get('/registro', function(req, res, next) {

	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	if(query.idName && query.idMail && query.idPassword){
		var personaResult={
			name:query.idName,
			mail:query.idMail,
			password:query.idPassword
		}
		db.registerPersona(personaResult, function(err, persona) {
			if (typeof err !== "undefined" && err !== null) {
				res.status(500).send({
					error: err
				});
				return;
			}
			if(persona===undefined){
		  		res.render('registro', 
		  			{ 
		  				title: TITLE,
				        toggleSesionLabel:req.cookies.toggleSesionLabel,
				        toggleSesionLink:req.cookies.toggleSesionLink 
				    });
			}else{

				res.cookie('persona',persona, OPTIONS_COOKIE);
				res.cookie('toggleSesionLabel','Cerrar Sesion', OPTIONS_COOKIE);
		    	res.cookie('toggleSesionLink','/user/cerrar-sesion', OPTIONS_COOKIE);
				res.redirect('/consulta/salud');
			}
		});
	}else{
  		res.render('registro', 
  			{ 
  				title: TITLE,
		        toggleSesionLabel:req.cookies.toggleSesionLabel,
		        toggleSesionLink:req.cookies.toggleSesionLink 
		    });
  	}
});

router.get('/inicio-sesion', function(req, res, next) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	if(query.idMail && query.idPassword){
		console.dir(query)
		var credencial={
			mail:query.idMail,
			password:query.idPassword
		}

		db.loginPersona(credencial, function(err, persona) {
			if (typeof err !== "undefined" && err !== null) {
				res.status(500).send({
					error: err
				});
				return;
			}
			console.dir(persona)
			if(persona===undefined){
				res.render('inicio-sesion', 
				{ 
					title: TITLE,
			        toggleSesionLabel:req.cookies.toggleSesionLabel,
			        toggleSesionLink:req.cookies.toggleSesionLink 
			    });
			}else{
			  	res.cookie('persona',persona, OPTIONS_COOKIE);
			  	res.cookie('toggleSesionLabel','Cerrar Sesion', OPTIONS_COOKIE);
			    res.cookie('toggleSesionLink','/user/cerrar-sesion',OPTIONS_COOKIE)
			    res.redirect('/consulta/salud')
			}
		});  	
	}else{
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

    res.cookie('toggleSesionLabel','Iniciar Sesion', OPTIONS_COOKIE);
    res.cookie('toggleSesionLink','/user/inicio-sesion', OPTIONS_COOKIE);
	res.redirect('/');
});

module.exports = router;