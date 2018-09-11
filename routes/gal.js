var express = require('express');
var router = express.Router();
//var session = require('express-session');
var url=["gallery","gallery1","gallery2","gallery3"]

//for(var i=0;i<url.length;i++){
//console.log(typeof url[i])

router.get('/gallery', function(req, res, next) {
res.render("gallery", {
title:"top"
});
});
router.get('/gallery1', function(req, res, next) {
res.render("gallery1", {
title:"top"
});
});
//}
router.get('/gallery2', function(req, res, next) {
res.render("gallery2", {
title:"top"
});
});

router.get('/gallery3', function(req, res, next) {
res.render("gallery3", {
title:"top"
});
});

module.exports = router;
