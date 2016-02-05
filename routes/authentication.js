var express = require('express');
var needle = require('needle');

var config = require('../config/session.js')

var router = express.Router();

// Get SignUp page
router.get('/signup', function(req, res, next) {

    // flash an error message if some issue with previous signup request
    err = req.flash('error')
    console.log(err)

    res.render('signup', {
        flash_msg: err
    })
})


// Get Login Page
router.get('/login', function(req, res, next) {

    // flash an error message if some issue with previous signup request
    err = req.flash('error')
    console.log(err)

    res.render('login', {
        flash_msg: err
    })
})

// logout of the application & clear session
router.get("/logout", function(req, res) {

	delete req.session.token;
    delete req.session.auth;
	res.redirect("/");

});

// POST A signup request to backend API
router.post('/signup', function(req, res, next) {

    sign_up_obj = {
        email: req.body.email,
        password: req.body.password,
        cpassword: req.body.cpassword,
        admintoken: req.body.admintoken,
    }

    if (sign_up_obj.password != sign_up_obj.cpassword) {
        // If the passwords dont match
        req.flash('error', 'Password mismatch')
        res.redirect('/v1/signup')
    }

    signup_str = JSON.stringify(sign_up_obj)

    server_addr = config.AuthServerAddress

    needle.post(server_addr + '/v1/signup', signup_str,
        function(err, resp, body) {

            console.log(body);

            if (!err && resp.statusCode == 200) {

                // Assign the token to the current user session & set auth to true
                req.session.token = body
                req.session.auth = true

                res.redirect('/v1/profile')

            } else if(!err && resp.statusCode == 403) {

                req.flash('error', 'The admintoken you provided is Incorrect')
                res.redirect('/v1/signup')

            } else if (!err && resp.statusCode == 500) {

                req.flash('error', 'The email is already registered')
                res.redirect('/v1/signup')

            }else {

                res.render('error')
            }

        });
})


// POST a login request to backend API
router.post('/login', function(req, res, next) {

    login_obj = {
        email: req.body.email,
        password: req.body.password,
    }

    login_str = JSON.stringify(login_obj)

    server_addr = config.AuthServerAddress

    needle.post(server_addr + '/v1/login', login_str,
        function(err, resp, body) {

            console.log(body);
            console.log(resp.statusCode)

            if (!err && resp.statusCode == 200) {

                // Assign the token to the current user session & set auth to true
                req.session.token = body
                req.session.auth = true

                res.redirect('/v1/profile')

            } else if (!err && (resp.statusCode == 400 || resp.statusCode == 500)) {

                req.flash('error', 'Incorrect Email and Password combination')
                res.redirect('/v1/login')

            } else {

                res.render('error')
            }

        });
})


module.exports = router;
