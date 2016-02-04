var express = require('express');
var needle = require('needle');

var router = express.Router();


router.get('/signup',function(req, res, next) {

    // flash an error message if some issue with previous signup request
    err = req.flash('error')
    console.log(err)

    res.render('signup',{flash_msg: err})
})

router.post('/signup', function(req, res, next){

    sign_up_obj = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cpassword: req.body.cpassword,
    }

    if (sign_up_obj.password != sign_up_obj.cpassword) {
        // If the passwords dont match
        req.flash('error', 'Password mismatch')
        res.redirect('/v1/signup')
    }

    signup_str = JSON.stringify(sign_up_obj)
})

module.exports = router;
