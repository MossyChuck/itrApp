var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('none');
  res.render('index');
});

router.post("/registerUser",require('./registerUser').post);
router.get('/verify',require('./registerUser').verify);
router.post('/login',require('./login').post);
module.exports = router;
