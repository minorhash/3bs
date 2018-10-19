var express = require('express');
var router = express.Router();

var db=require('cardb');
var allmer=db.allMer();

/* get */
router.get('/disc', function(req, res, next) {

res.render('disc', { 
title:"disc",
mer:allmer
});

});

module.exports = router;
