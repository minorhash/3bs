var express = require('express');
var router = express.Router();

/* get */
router.get('/news', function(req, res, next) {
var acc=req.acceptsLanguages("en","ja");
var lan=req.headers["accept-language"];
var sli=lan.slice(0,2);
//var sli=(typeof lan);

res.render('news', { 
title:"news",
lan:lan,
acc:acc

});

});

module.exports = router;
