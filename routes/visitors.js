var express = require('express');
var needle = require('needle');

var config = require('../config/session.js')
var router = express.Router();

var table_cols = ['ID', 'First Name', 'Last Name', 'Age', 'Gender',
    'Email', 'Phone Number', 'University', 'Registered At']

/* GET users listing. */
router.get('/visitor', function(req, res, next) {

    res.render('visitor')
});

router.post('/visitor', function(req, res, next) {

    visitor_obj = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        university: req.body.university
    }

    visitor_str = JSON.stringify(visitor_obj)

    server_addr = config.AuthServerAddress

    needle.post(server_addr + '/v1/visitor', visitor_str,
        function(err, resp, body) {

            console.log(body);

            if (!err && resp.statusCode == 200) {
                res.render('visitorcomplete')

            } else {

                res.render('error')
            }

        });

})

router.get('/allvisitors', function(req, res, next) {

    // flash an error message if some issue with previous signup request
    if (req.session.auth) {

        // Set the current token to make post for backend
        token = req.session.token
        server_addr = config.APIServerAddress

        var options = {
            headers: {
                'Authorization': token
            }
        }

        needle.get(server_addr + '/v1/visitors', options, function(err, resp, body) {

            if (!err && resp.statusCode == 200) {
                console.log(body)
                console.log("Rendering visitors data page")
                res.render('visitors_data', {
                    data: body["visitors"],
                    table_cols: table_cols,
                })

            } else {

                console.log("Could not get Visitors data");
                req.flash('error', 'Could not get visitors data')
                res.redirect('/v1/profile')

            }

        });

    } else {

        console.log('Profile Page accessed without session login')
        req.flash('error', 'Please login to use the application')
        res.redirect('/v1/login')
    }
});

module.exports = router;
