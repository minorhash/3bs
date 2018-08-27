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

var defIn = function(req, res, next) {
  console.log('=== defin ===');
  email = req.body.email;
  // === adr
  phn = req.body.phn;
  zip = req.body.zip;
  pref = req.body.pref;
  sta = req.body.sta;
  city = req.body.city;
  ln1 = req.body.ln1;
  ln2 = req.body.ln2;
  chk = req.body.chk;
  // === cons
  console.log(req.body);
  console.log(phn, zip, pref, sta, city, ln1, ln2, chk);
  next();
};

var emaAdr = function(req, res, next) {
  if (email) {
    mailadr = db.emaAdr(email);
    console.log(mailadr);
  } else {
    console.log('no ema adr');
  }

  next();
};
// === insert
var insAdr = function(req, res, next) {
  console.log('=== chkIn ===');
  if (mailadr) {
    console.log('adr already');
  } else {
    if (phn && zip && pref && sta && city && ln1 && ln2 && chk == 'yes') {
      try {
        db.insAdr(email, phn, zip, pref, sta, city, ln1, ln2);
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
  console.log('=== senEma =======================================');
  var snem = require('snd-ema');
    var sub=reg
    var mes=usr+""
  snem.trEma(email,    sub,    mes  );
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

router.post('/shop/usr/adr_reg', [defIn, emaAdr, insAdr, senEma, rcb]);

module.exports = router;
