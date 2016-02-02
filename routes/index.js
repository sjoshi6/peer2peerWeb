var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'peer2peer', tag: 'Graduate Mentoring'});
});

module.exports = router;
