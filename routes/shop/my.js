var express = require('express');
var router = express.Router();
// == db =============================

var db = require('cardb');
var adb = require('usrdb');

// === glob ===
var email, usr, sku, sum;
var mailtmp, mailusr, mailadr;
var mer = [],  suma = [],  sku_a = [];

// === cred ===
var getEma = function(req, res, next) {
var cred = require('./js/cred');
email = cred.ema(req);
mailusr=  adb.mailUsr(email)
next()};

var getUsr = function(req, res, next) {
if(req.session.pss){
if(req.session.pss==mailusr.pss){usr=mailusr.name}
else{usr=null;console.log("no usr")}
}else{console.log("no pss")}
next()}

var getAdr = function(req, res, next) {
    mailadr = adb.mailAdr(email);
  next()};

var chk = function(req, res, next) {
  console.log(email);
if (mailadr) {    console.log(mailadr)
  }else{    console.log("no adr")}
  console.log(mailusr);
  next()};

var rcb = function(req, res, next) {
res.render('shop/my', {    email: email,    usr: usr,    mailusr: mailusr,
mailadr: mailadr
}); //rend
};
router.get('/shop/my', [getEma, getUsr, getAdr, chk, rcb]); //

module.exports = router;
