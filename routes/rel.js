var express = require('express');
var router = express.Router();
/* GET home page. */
var myusr;


//usr="fog";
if(typeof usr!=="undefined"){
title=usr;

}else{// ses
title="no usr";
}

//console.dir(arr);

//== get =================================
router.get('/', function(req, res, next) {

// rend
res.render('release', { 
title: 'release',
usr:usr,
arr:arr
});//rend
});//get

module.exports = router;
