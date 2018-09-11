var express = require('express');
var router = express.Router();

/* get */
router.get('/video', function(req, res, next) {

res.render('video', { 
title:"video",
});

});

module.exports = router;
