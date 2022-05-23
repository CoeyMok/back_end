var express = require('express');
const { verifyJWT } = require('../middleware/jwt');
var router = express.Router();
const dog = require('../services/dog');

/* GET users listing. */
router.get('/', function(req, res, next) {
  return dog.get(req,res);
});

router.get('/:id',  function(req, res, next) {
    return dog.getById(req,res);
  });

router.post('/', verifyJWT, function(req,res,next){
  return dog.create(req,res);
});

router.put('/:id', verifyJWT, function(req,res,next){
  return dog.update(req,res);
});

module.exports = router;