var express = require('express');
var router = express.Router();

/* get */
router.get('/schedule', function(req, res, next) {

res.render('schedule', { 
title:"schedule",
});

});

module.exports = router;
