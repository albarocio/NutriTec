/*
Dependences
 */
var express = require('express');
var url = require('url');
var db=require('../db')

var router = express.Router();

var TITLE='Nutri-Tec'
/*
Methods get and post
 */

router.get('/:id', function(req, res, next) {
	var id = req.params.id
	console.log(id)

	db.getArticulo(id, function(err, articulo) {
		if (typeof err !== "undefined" && err !== null) {
			res.status(500).send({
				error: err
			});
			return;
		}
		console.dir(articulo)
		if(articulo===undefined){
			res.send('No se encontro ningun articulo')
		}else{
			res.render('articulo',{title:TITLE,articulo:articulo[0]})
		}
	})
})
router.get('/template/:id',function (req,res,next) {
	var id = req.params.id
	console.log(id)

	db.getArticulo(id, function(err, articulo) {
		if (typeof err !== "undefined" && err !== null) {
			res.status(500).send({
				error: err
			});
			return;
		}
		console.dir(articulo)
		if(articulo===undefined){
			res.send('No se encontro ningun articulo')
		}else{
			res.render('template',{title:TITLE,articulo:articulo[0]})
		}
	})
})
module.exports = router;