var express = require('express');
var router = express.Router();
const auth = require('../services/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  return auth.login(req,res);
});

module.exports = router;
