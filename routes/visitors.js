var express = require('express');
var needle = require('needle');

var config = require('../config/session.js')
var router = express.Router();

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

    server_addr = config.APIServerAddress

    needle.post(server_addr+'/v1/visitor', visitor_str,
        function(err, resp, body){

            console.log(body);

            if(!err && resp.statusCode == 200) {
                res.render('visitorcomplete')

            } else {

                res.render('error')
            }

    });

})

module.exports = router;
