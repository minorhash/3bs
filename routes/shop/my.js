var express = require('express');
var router = express.Router();
// == db =============================

var db = require('cardb');
var adb = require('usrdb');

// === glob ===
var email, usr, sku, sum;
var mailtmp, mailusr, mailadr;
var mer = [],
  suma = [],
  sku_a = [];

// === cred ===
var getEma = function(req, res, next) {
  var cred = require('./js/cred');
  email = cred.ema(req);
  next();
}; //getEma

var getUsr = function(req, res, next) {
  var cred = require('./js/cred');
  usr = cred.usr(email);
  mailusr = adb.mailUsr(email);
  next();
};

var getAdr = function(req, res, next) {
  try {
    mailadr = adb.mailAdr(email);
  } catch (err) {
    console.log(err);
  }
  if (!mailadr) {
    //res.redirect("dre")
    console.log('no adr');
  }
  next();
};

var chk = function(req, res, next) {
  console.log(email);
  console.log(mailadr);
  console.log(mailusr);
  next();
};

var rcb = function(req, res, next) {
  res.render('shop/my', {
    email: email,
    usr: usr,
    mailusr: mailusr,
    mailadr: mailadr,
  }); //rend
};
router.get('/shop/my', [getEma, getUsr, getAdr, chk, rcb]); //

module.exports = router;
