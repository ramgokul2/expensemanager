const express = require('express'),
	  router = express.Router();

const User = require('../models/user');

router.get('/(*)', (req, res, next) => {
	res.render('index');
});

router.get('/users', (req, res, next) => {
	res.send('Gokul');
});

router.post('/users', (req, res) => {
	User.create(req.body).then((user) => {
		res.send(user);
	})
});

module.exports = router;