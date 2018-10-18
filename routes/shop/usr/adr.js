var express = require('express');
var router = express.Router();
var adb = require('usrdb');

var usr;
var getEma = function(req, res, next) {
var cred = require('../js/cred');
email = cred.ema(req);
mailusr=  adb.mailUsr(email)
next()};

var getUsr = function(req, res, next) {
if(req.session.pss){
if(req.session.pss==mailusr.pss){usr=mailusr.name}
else{usr=null;console.log("no usr")}
}else{console.log("no pss")}
next()};


var red = function(req, res, next) {
  if (usr) {
    res.redirect('/shop');
  }
  next();
};

var chk = function(req, res, next) {
  console.log('=== adr ===');
  next();
};

var rcb = function(req, res) {
  res.render('shop/usr/adr', {
    title: 'address',
    email: email,
    usr: usr,
  }); //rend
};

router.get('/shop/usr/adr', [getEma, getUsr,  chk, rcb]);

// === post
var pcb = function(req, res) {
  res.render('shop/usr/adr', {
    title: 'address',
    email: email,
    usr: usr,
  }); //rend
};

module.exports = router;
