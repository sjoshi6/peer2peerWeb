var express = require('express');
var needle = require('needle');

var router = express.Router();


router.get('/signup',function(req, res, next) {

    res.render('signup')
})

module.exports = router;
