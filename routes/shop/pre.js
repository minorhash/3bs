var express = require('express');
var cookie = require('cookie');
var router = express.Router();
// == sess =============================
var db = require('cardb'),
adb = require('usrdb')
var email,pss, usr,coo;
var allmer, mailusr,premer;

allmer = db.allMer()
premer = db.preMer("pre")

// === login ============================
var cred = require('./js/cred');

// === get ============================

var getEma = function(req, res, next) {
email = cred.ema(req);
mailusr=  adb.mailUsr(email)
next()}

var getUsr = function(req, res, next) {
if(mailusr){usr=mailusr.name}
else{usr=null;console.log("no usr")}
next()}

var chk = function(req, res, next) {
  console.log('=== get shop ===');
  console.log(email);
  console.log(usr);
  console.log(mailusr)
  console.log(premer)
  next();
}; //chkEma

var rcb = function(req, res) {
  res.render('shop/pre', {
    title: 'shop',
    mer: allmer,
    premer: premer,
    usr: usr,
    err: myerr,
  });
};
router.get('/shop/pre', [getEma, getUsr, chk, rcb]);

// == post ==================================

var usr, email, pss, allmer, myerr;
var getCok = function(req, res, next) {
if (req.body) {

email = req.body.email;
console.log(email)
pss = req.body.pss;
console.log(pss)
    if(email){
mailusr=adb.mailUsr(email)
    }else{console.log("no email")}

    if(mailusr){
if(mailusr.email==req.body.email && mailusr.pss==req.body.pss){
req.session.email = req.body.email;
req.session.pss = req.body.pss;
} else {console.log('wrong');  }
} else {console.log('no mailusr');  }

} else {console.log('no req.body');  }

next()}; //getCok

var getUsr = function(req, res, next) {
if (req.session) {

    if(mailusr){
if(mailusr.email==req.body.email && mailusr.pss==req.body.pss){
    usr = mailusr.name;
} else {console.log('wrong cred');  }
} else {console.log('no mailusr');  }

}else {usr=null;console.log('no usr');    }
next()}; //getUsr

var chk = function(req, res, next) {
console.log('=== post shop ===');
console.log(email);
console.log(req.body);
console.log(req.session);
next()};

var rcb = function(req, res) {
  var rob = { usr: usr, mer: allmer, err: myerr };
  res.render('shop/pre', rob);
};

var fun=[getCok, getUsr, chk, rcb]
router.post('/shop/pre', fun);

module.exports = router;
