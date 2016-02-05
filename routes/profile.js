var express = require('express');
var needle = require('needle');

var config = require('../config/session.js')

var router = express.Router();

// Get get profile page
router.get('/profile', function(req, res, next) {

    // flash an error message if some issue with previous signup request
    if (req.session.auth) {

        // Set the current token to display
        token = req.session.token

        // Set flash message to the input value if any
        flash_msg = req.flash('error')

        res.render('profile', {
            token: token,
            flash_msg: flash_msg,

        })

    } else {

        console.log('Profile Page accessed without session login')
        req.flash('error', 'Please login to use the application')
        res.redirect('/v1/login')
    }
})

module.exports =router;
