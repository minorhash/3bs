var express = require('express');
var router = express.Router();
// === db
var db = require('usrdb');
// == mail
var snde = require('snd-ema');

var usr,name, pss, email, chk;
var  reg,suc;
var shop=require("../../../i18n/shop/ja.json");
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

reg="ご登録ありがとうございます。メールをご確認ください。";
suc=shop.reg1+shop.reg2+
shop.name+name+shop.pss+pss+shop.mail+email+
shop.reg3+shop.reg4+shop.reg5+
shop.shop+shop.adr1+shop.adr2+shop.adr3;
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
  next();
}; //chkUsr

var senEma = function(req, res, next) {
var mes=name+"さま<br>"+suc;
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
