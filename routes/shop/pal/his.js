var express = require('express');
var router = express.Router();
// === pal
const paypal = require('paypal-rest-sdk');
require(__dirname + '/config');

var pal = require('mypal');
var mypal = pal.myPal();
//var trans=mypal.transactions[0];

var tmp_a = [],
  mer_a = [],
  sum_a = [],
  uni_s = [],
  pri_s = [];
var email, usr, mer, sum, add
var mailtmp, mailusr,getpal,trans;
var tok


// === db
var db = require('cardb');
var adb = require('usrdb');

// post ======================================
var getEma = function(req, res, next) {
  var cred = require('./js/cred');
  email = cred.ema(req);
  next();
}; //getEma

var getUsr = function(req, res, next) {
  var cred = require('./js/cred');
  usr = cred.usr(email);
  next()};

//var getPal= function(req, res, next) {
//getpal=adb.getPal(email)
//tok=getpal.tok
//next()};

var allPal= function(req, res, next) {
allpal=adb.allPal(email)
atok=[]
for (var i = 0; i < allpal.length; i++) {
console.log(allpal[i].tok)
atok[i]=allpal[i].tok;
//   atok.push(allpal[i].tok);
//    otok= JSON.parse(atok);
  }
  next()}

var tokPal= function(req, res, next) {

paypal.payment.get(tok, function (error, pay) {
if (error) {        console.log(error);        throw error;    }
else {console.log("Get Payment Response");
tran=[]
trans=pay.transactions
console.log(trans)
}
})
next()};

var chk = function(req, res, next) {
console.log(getpal)
console.log(email);
next()};

var rcb = function(req, res, next) {
  res.render('shop/paypal/his', {
allpal:allpal,
tok:tok,
trans:trans,
usr: usr,
email: email
  }); //rend
};

router.get('/shop/paypal/his', [
  getEma,
  getUsr,
  allPal,
  chk,
  rcb
]);

module.exports = router;
