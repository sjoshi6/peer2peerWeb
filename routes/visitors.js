var express = require('express');
var needle = require('needle');

var router = express.Router();

/* GET users listing. */
router.get('/visitor', function(req, res, next) {

    res.render('visitor', {visitor_message: 'Welcome Visitor !'})
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

    needle.post('http://localhost:8000/v1/visitor', visitor_str,
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
