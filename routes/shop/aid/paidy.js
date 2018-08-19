var express = require('express');
var router = express.Router();
// == db =============================
var db = require('cardb');
var adb = require('usrdb');
var idy = require('aidy');
var taid = idy.tmpAid();

// === post ============================
var email, usr, sku, uni, sum, tsum, boo
var mailtmp, mailusr, mailadr,mailson;
var mer = [],  suma = [],  skua = [],  unia = [],  numa = [];
var emp, ind;

var getEma = function(req, res, next) {
  var cred = require('../js/cred');
  email = cred.ema(req);
  next()}; //getEma

var getUsr = function(req, res, next) {
  var cred = require('../js/cred');
  usr = cred.usr(email);
  next()};

var getTmp = function(req, res, next) {
  if (email) {
mailtmp = db.mailTmp(email);
  } else {    console.log('no mail for tmp');  }
  db.delUni();
  next()};

var getAdr = function(req, res, next) {
  if (email) {
      mailadr = adb.mailAdr(email);
  } else {    console.log('no mail for adr');  }
  if (mailadr == undefined) {
    res.redirect('usr/adr');
  }
  next()};

// === sum
var putSum = function(req, res, next) {
  if (mailtmp) {
    for (var i = 0; i < mailtmp.length; i++) {
      mer[i] = db.skuMer(mailtmp[i].sku);
      suma[i] = mailtmp[i].uni * mer[i].pri;
    }
  } else {
    console.log('no mailtmp');
  }
  console.log('=== putSum ===');
  next()};

var redSum = function(req, res, next) {
  function getSum(total, num) {
    return total + num;
  }
  if (suma.length !== 0) {
    sum = suma.reduce(getSum);
    console.log('sum:' + sum);
  } else {
    console.log('no sum');
  }
  next()};

var chkDl= function(req, res, next) {

boo=[]
for(var i=0;i<skua.length;i++){

console.log("=== chk dl ===")
console.log(skua[i])
var pat=/^\d{3}$/;
var test=pat.test(skua[i])
console.log(test)
boo.push(test)
}
console.log(boo)
ind=boo.indexOf(true)
console.log("ind:"+ind)

next()};

// === add item ===
var putSku = function(req, res, next) {
  if (mailtmp) {
    for (var i = 0; i < mailtmp.length; i++) {
      skua[i] = mailtmp[i].sku;
      unia[i] = mailtmp[i].uni;
    } //for
    console.log('=== put sku ===');
    console.log(unia);
  } else {
    console.log('no mailtmp');
  }

  next()};

var getSon= function(req, res, next) {
mailson=db.mailSon(email).son
next()};


var chk = function(req, res, next) {
  console.log('=== paidy ===');
  console.log(mailtmp);
console.log(skua)
//console.log(mailusr)
  next()};

// === rend

var pcb = function(req, res, next) {
  res.render('shop/paidy', {
    seltmp: mailtmp,
    sum: sum,
    tsum: tsum,
    mer: mer,
    email: email,
    mailson:mailson,
    usr: usr,
  }); //rend
};

router.get('/shop/paidy',
[  getEma,  getUsr,  getTmp,  getAdr,  putSum,  redSum,  putSku,  getSon,  chk,  pcb,]);
//router.post('/shop/paidy', [getEma,getUsr,getTmp,getAdr,putSum,redSum,putSku,chk,pcb])

module.exports = router;
