var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/registerUser",require('./registerUser').post);
router.get('/verify',require('./registerUser').verify);

module.exports = router;
