var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sto', {
    title: 'Exps',
    tit: '$B2;3Z(B',
  });
});

module.exports = router;
