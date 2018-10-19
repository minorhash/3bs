var express = require('express');
var router = express.Router();

/* get */
router.get('/info', function(req, res, next) {

res.render('info', { 
title:"info",
});
});

router.get('/notation', function(req, res, next) {

res.render('notation', { 
title:"notation",
});
});

router.get('/disclaimer', function(req, res, next) {

res.render('disclaimer', { 
title:"disclaimer"
});
});

module.exports = router;
