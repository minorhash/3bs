var express = require('express');
var router = express.Router();
// == sess =============================

var db=require('cardb');
var adb=require('aidb');
var allmer=db.allMer();

// === get ============================
router.get('/shop', function(req, res, next) {

var email=req.cookies.cmail;
if(email){
console.log(email);

try{var mailusr=adb.mailUsr(email);
if(mailusr){
var musr=adb.mailUsr(email);
var usr=mailusr.name;
}else{var err="no such usr";}
}catch(err){console.log(err);}

}


res.render('shop', { 
title:"shop",
mer:allmer,
usr:usr,
err:err
});
});
// == post =============================
router.post('/shop', function(req, res, next) {

if(req.body.email){
var email=req.body.email;
res.cookie("cmail",email,{maxAge:1000*60*5});
console.log(email);

try{var mailusr=adb.mailUsr(email);
console.log(mailusr);}
catch(err){console.log(err);}

if(mailusr){
var usr=mailusr.name;
}else{var err="no such usr";}
}else{console.log("no email")};

res.render('shop', { 
title:"shop",
usr:usr,
mer:allmer,
err:err
});
});
module.exports = router;
