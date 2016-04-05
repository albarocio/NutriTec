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
			res.render('articulo',{title:TITLE,articulo:articulo})
		}
	})
	// res.render('articulo',{ title: TITLE})
})
router.get('/template',function (req,res,next) {
	res.render('template')
})


module.exports = router;