var express = require('express');
var router = express.Router();
const paypal = require('paypal-rest-sdk');
// === db
var adb = require('usrdb');

var email,mailtmp,mer
var pid,payerId,exeJson

var conf=require("../son/pal.json")

paypal.configure({
  mode: conf.MODE,
  client_id:conf.ID,
  client_secret:conf.SEC
});

// === db
var db = require('cardb');

// === get

var getEma = function(req, res, next) {
  var cred = require('../js/cred');
  email = cred.ema(req);
  next();}; //getEma

var getUsr = function(req, res, next) {
  var cred = require('../js/cred');
  usr = cred.usr(email);
  next()};

var getTmp = function(req, res, next) {
  mailtmp = [];
  if (email) {
    try {
      mailtmp = db.mailTmp(email);
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('no mail');
  }
  next();
};

var putMer = function(req, res, next) {
    mer=[]
  if (mailtmp) {
    for (var i = 0; i < mailtmp.length; i++) {
      console.log(mailtmp[i].sku);
      mer[i] = db.skuMer(mailtmp[i].sku);
    }
  } else {
    console.log('no mailtmp');
  }
  next();
};

var putSum = function(req, res, next) {
  suma = [];
  if (mailtmp) {
    for (var i = 0; i < mailtmp.length; i++) {
      suma[i] = mailtmp[i].uni * mer[i].pri;
    }
  } else {
    console.log('no mailtmp');
  }
  next()};

var redSum = function(req, res, next) {
  sum = '',tsum="";
  function getSum(total, num) {
    return total + num;
  }
  if (suma.length !== 0) {
    sum = suma.reduce(getSum);
    tsum=sum+650
//    console.log('tsum:' + tsum);
  } else {
    console.log('no sum');
  }
  next()};

var getPid= function(req, res, next) {
pid = req.query.paymentId;
payerId = req.query.PayerID;

exeJson = {
payer_id: payerId,
transactions: [{amount: {currency: 'JPY',total: sum}}],
};
next()};

var exePal= function(req, res, next) {

paypal.payment.execute(pid, exeJson, function(error, pay) {
if (error) {console.log("exe fail");      throw error;    } 
else {

item=pay.transactions[0].item_list.items[0]
var str = JSON.stringify(pay);
var sitem= JSON.stringify(item);

console.log(sitem)
adb.insPal(email,pid,sitem)
      res.render('shop/paypal/success', {
        title: 'ご購入ありがとうございました。',
        pid: payerId,
        payid: pid,
        pay:pay
      });
    }
  });
};

var getPay= function(req, res, next) {
for (var i = 0; i < atok.length; i++) {
paypal.payment.get(atok[i], function (err, pay) {
if (err) {        console.log(err);        throw err;} 
else {
aite=[]
palid=pay.id
console.log(palid)
item=pay.transactions[0].item_list.items[0]
site=JSON.stringify(item)
console.log(site)
aite.push(site)
}
})//get
}//for
next()}

var chk= function(req, res, next) {
console.log(payerId)

next()};
router.get('/shop/paypal/success', [getEma,getUsr,getTmp,putMer,putSum,redSum,getPid,exePal,chk])

module.exports = router;
