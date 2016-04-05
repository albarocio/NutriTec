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
	res.render('articulo',{ title: TITLE})
})
router.get('/template',function (req,res,next) {
	res.render('template')
})


module.exports = router;