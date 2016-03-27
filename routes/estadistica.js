var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var json={alta:660,media:1000,baja:1170}
	res.render('estadistica', { title: 'Nutri-Tec',value:json});
});

module.exports = router;

