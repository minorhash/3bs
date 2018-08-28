var express = require('express');
var router = express.Router();
// === db
var db = require('usrdb');
var ema= require('../son/ema.json');
var cnf= require('../son/aid.json');

// === glob
var name, pss, email, reg, mailadr;
var phn, zip, pref, sta, city, ln1, ln2, chk;
// === post ===

var getEma = function(req, res, next) {
var cred = require('../js/cred');
email = cred.ema(req);
mailusr=  db.mailUsr(email)
next()};

var getUsr = function(req, res, next) {
if(mailusr){usr=mailusr.name}
else{usr=null;console.log("no usr")}
next()};

var defIn = function(req, res, next) {
  console.log('=== defin ===');
  email = req.body.email;
  // === adr
  phn = req.body.phn;
  zip = req.body.zip;
  sta = req.body.sta;
  city = req.body.city;
  ln1 = req.body.ln1;
  ln2 = req.body.ln2;
  chk = req.body.chk;
  // === cons
  console.log(req.body);
  console.log(phn, ln1, ln2,city,sta,zip,chk);
  next();
};

var emaAdr = function(req, res, next) {
  if (email) {
    mailadr = db.mailAdr(email);
    console.log(mailadr);
  } else {
    console.log('no ema adr');
  }

  next()};
// === insert
var insAdr = function(req, res, next) {
  console.log('=== chkIn ===');
  if (mailadr) {
    console.log('adr already');
  } else {
    if (phn && zip && sta && city && ln1 && chk == 'yes') {
      try {
        db.insAdr(email, phn, ln1, ln2,city,sta,zip);

        console.log('=== ins!!! ===');
        reg = 'ご登録ありがとうございます。';
      } catch (err) {
        console.log(err);
        reg = 'err';
      }
    } else {
      console.log('no input');
    }
  }
  next();
};

var senEma = function(req, res, next) {
var snde = require('snd-ema');
var mes=usr+"さま<br>"+reg
    +"<br>郵便："+zip
    +"<br>都道府県："+sta
    +"<br>市町村："+city
    +"<br>番地："+ln1
    +"<br>"+ln2
console.log('=== senEma =======================================');
snde.trEma(email,reg,mes);
next()};

var chk= function(req, res, next) {
console.log('=== email ===');
console.log(email)

next()};


var rcb = function(req, res) {
  res.render('shop/usr/adr_reg', {
    title: 'address registered',
    name: name,
    email: email,
    chk: req.body.chk,
    reg: reg,
  }); //rend
};

router.post('/shop/usr/adr_reg', [getEma,getUsr,defIn, emaAdr, insAdr, senEma, rcb]);

module.exports = router;
