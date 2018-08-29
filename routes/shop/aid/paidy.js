var express = require('express');
var router = express.Router();
// == db =============================
var db = require('cardb');
var adb = require('usrdb');
var idy = require('aidy');
var taid = idy.tmpAid();

// === post ============================
var email, usr, sku, uni, sum, tsum
var mailtmp, mailusr, mailadr,mailson;
var mer = [],  suma = [],  skua = [],  unia = [],  numa = [], boa=[];
var emp, ind, boo;

var getEma = function(req, res, next) {
    var cred = require("../js/cred")
    email = cred.ema(req)
mailusr=  adb.mailUsr(email)
    next()
} //getEma

var getUsr = function(req, res, next) {
if(req.session.pss){
if(req.session.pss==mailusr.pss){usr=mailusr.name}
else{usr=null;console.log("no usr")}
}else{console.log("no pss")}
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
  } else {    console.log('no mailtmp');  }
  next()};

var putMer = function(req, res, next) {
    mer=[]
    skua=[]
  for (var i = 0; i < mailtmp.length; i++) {
    mer[i] = db.skuMer(mailtmp[i].sku);
skua.push(mer[i].sku)
  }
  next()};

var chkSh= function(req, res, next) {

console.log("=== chk ship  ===")
boa=[]
for(var i=0;i<skua.length;i++){

var pat=/^\d{3}$/;
var test=pat.test(skua[i])
console.log(test)
boa.push(test)
}
console.log(boa)
boo=boa.indexOf(true)
console.log("boo")
console.log(boo)

next()};

var redSum = function(req, res, next) {
    function getSum(total, num) {
      return total + num;
    }
    if (suma.length !== 0) {
      sum = suma.reduce(getSum);
if(boo==0){tsum=sum+650}
else{tsum=sum}
    } else {
      console.log('no sum');
    }
  next()};

// === add item ===
var putSku = function(req, res, next) {
  if (mailtmp) {
    for (var i = 0; i < mailtmp.length; i++) {
      skua[i] = mailtmp[i].sku;
      unia[i] = mailtmp[i].uni;
    } //for
    //console.log(unia);
  } else {    console.log('no mailtmp');  }

  next()};


var getSon= function(req, res, next) {
mailson=db.mailSon(email).son
next()};

var chk = function(req, res, next) {
console.log('=== chk paidy ===');
console.log(mailtmp);
console.log(tsum)
next()};

// === rend

var pcb = function(req, res, next) {
res.render('shop/paidy', {
seltmp: mailtmp,    sum: sum,    tsum: tsum,    mer: mer,email: email,mailson:mailson,usr: usr
}); //rend
};

router.get('/shop/paidy',
[  getEma,  getUsr,  getTmp,  getAdr,  putSum,  putMer,chkSh,redSum,  putSku,  getSon,
    chk,  pcb,]);
//router.post('/shop/paidy', [getEma,getUsr,getTmp,getAdr,putSum,redSum,putSku,chk,pcb])

module.exports = router;
