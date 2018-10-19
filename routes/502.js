var express = require('express');
var router = express.Router();

// === get

router.get("/502",function(req,res,next) {
res.render("502", {
title:title
});
});


module.exports = router;
