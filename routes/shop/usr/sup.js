var express = require('express');
var router = express.Router();
// === db
var db = require('usrdb');
// == mail
var snde = require('snd-ema');

var usr,name, pss, email, chk;
var mes,reg;
// === post ===

var getEma = function(req, res, next) {
  var cred = require('../js/cred');
  email = cred.ema(req);
  next();
}; //getEma

var getUsr = function(req, res, next) {
  var cred = require('../js/cred');
  usr = cred.usr(email);
  next();
};

var defIn = function(req, res, next) {
  console.log('=== defin ===');
  name = req.body.name;
  pss = req.body.pss;
  email = req.body.email;
  chk = req.body.chk;
  next();
};

// === insert
var chkIn = function(req, res, next) {
  console.log('=== chkIn ===');
  if (name && pss && email && chk == 'yes') {
    try {
      db.insUsr(name, pss, email);
      console.log('=== ins!!! ===');
      reg = 'ご登録ありがとうございます。';
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('no input');
  }
  next();
};

var chkUsr = function(req, res, next) {
  if (email) {
    try {
mailusr = db.mailUsr(email);
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('no req.body.email');
  }
  next()}; //chkUsr

var senEma = function(req, res, next) {
var i18=require("../../../i18n/usr/ja.json")

console.log(i18.reg)

reg=i18.reg
mes=i18.lin1+i18.auto1+i18.auto2+i18.lin1
+name+"さま<br>"
+i18.reg2+"<br>"
+i18.cont
+i18.name+fun.name+"<br>"
+i18.pss+fun.pss+"<br>"
+"email:"+email

console.log('=== senEma =======================================');

snde.trEma(email,reg,mes);
next()};

var chk= function(req, res, next) {
console.log('=== email ===');
console.log(email)

next()};

var rcb = function(req, res) {
  res.render('shop/usr/sup', {
    title: 'sign up',
    name: name,
    email: email,
    chk: req.body.chk,
    reg: reg,
  }); //rend
};

router.post('/shop/usr/sup', [defIn, chkIn, chkUsr,senEma,chk,rcb]);

module.exports = router;
