var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('ret', {
    title: 'Exps',
    tit: '$B2;3Z(B',
  });
});

module.exports = router;
