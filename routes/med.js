var express = require('express');
var router = express.Router();

/* get */
router.get('/media', function(req, res, next) {

res.render('media', { 
title:"media",
usr:usr
});

});

module.exports = router;
