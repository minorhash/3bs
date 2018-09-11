var express = require('express');
var router = express.Router();

/* get */
router.get('/profile', function(req, res, next) {

res.render('profile', { 
title:"profile",
});

});

module.exports = router;
