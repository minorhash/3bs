var express = require('express');
var router = express.Router();
// === pal
const paypal = require('paypal-rest-sdk');
require(__dirname + '/config');

var pal = require('mypal');
var mypal = pal.myPal();
//var trans=mypal.transactions[0];

var tmp_a = [],  mer_a = [],  sum_a = [],  uni_s = [],  pri_s = [];
var email, usr, mer, sum, add
var mailtmp, mailusr;

// === db
var db = require('cardb');
var adb = require('usrdb');

// post ======================================
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

var putTmp = function(req, res, next) {
  tmp_a = [];
  if (email) {
    mailtmp = db.mailTmp(email);
    for (var i = 0; i < mailtmp.length; i++) {
      if (mailtmp[i].uni !== 0) {
        tmp_a.push(mailtmp[i]);
      } //if
    } //for
  } else {
    console.log('no mail');
  }
  next()};

var putMer = function(req, res, next) {
  mer_a = [];
  mypal.transactions[0].item_list.items = [];
  if (tmp_a) {
    for (var i = 0; i < tmp_a.length; i++) {
      mer_a.push(db.skuMer(tmp_a[i].sku));
      uni_s[i] = tmp_a[i].uni.toString();
      pri_s[i] = mer_a[i].pri.toString();
      ite = {
        name: mer_a[i].name,
        quantity: uni_s[i],
        price: pri_s[i],
        sku: tmp_a[i].sku,
        currency: 'JPY',
      };
mypal.transactions[0].item_list.items.push(ite);
    }
  } else {
    console.log('no tmp_a');
  }
  next()};

// === sum ===
var getSum = function(req, res, next) {
  sum_a = [];
  for (var i = 0; i < tmp_a.length; i++) {
    sum_a.push(mer_a[i].pri * tmp_a[i].uni);
  }
  if (sum_a.length !== 0) {
    add = sum_a.reduce(function(tot, cur) {
      return tot + cur;
    });
var num=parseInt(add)
var sum=num+650
var sub=sum.toString()

mypal.transactions[0].amount.details.subtotal = add;
mypal.transactions[0].amount.total = sub
}
next()};

// === pal ===

var goPal = function(req, res, next) {
paypal.payment.create(mypal, function(err, pay) {
if (err) {
    console.log(err.response.name);
    console.log(err.response.details);
    throw err.message;      }
else {
//console.log(pay.transactions[0].amount)
for (let i = 0; i < pay.links.length; i++) {
//console.log(pay.links[i]);
if (pay.links[i].rel === 'approval_url') {
res.redirect(pay.links[i].href.replace(' =', '='));
          } //if
        } //for
      } //else
    });

  next()};

//var json=JSON.stringify(mypal);

var chk = function(req, res, next) {
  console.log('=== pal/pay');
//  console.log(mypal.transactions[0].amount.details)
  console.log('=== trans');
  console.log(mypal.transactions[0].item_list);
  console.log(add);
//  console.log(full.transactions[0].amount.details.shipping);
//  console.log(mypal.transactions[0].amount.details)

next()};

var rcb = function(req, res, next) {
  res.render('shop/paypal/pay', {
    seltmp: mailtmp,
    sum: sum,
    mer: mer,
    usr: usr,
    email: email,
  }); //rend
};

router.get('/shop/paypal/pay', [
getEma,  getUsr,  putMer,  putTmp,  putMer,  getSum,goPal,chk
  ]);

module.exports = router;
