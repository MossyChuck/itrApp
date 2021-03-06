var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post("/registerUser",require('./registerUser').post);
router.get('/verify',require('./registerUser').verify);
router.post('/login',require('./login').post);
router.post('/users/getUsers',require('./user').getUsers);
router.post('/users/deleteUser',require('./user').deleteUser);
router.post('/users/changeProperty',require('./user').changeProperty);
router.post('/createInstruction',require('./instructions').create);
router.get('/instruction/getAll',require('./instructions').getAll);
router.post('/instruction/delete',require('./instructions').delete);
router.post('/instruction/change',require('./instructions').change);
router.post('/instruction/changeProperty',require('./instructions').changeProperty);

module.exports = router;
