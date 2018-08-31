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
var email, usr, mer, sum, add, mailtmp, mailusr;

// === db
var db = require('cardb');
var adb = require('usrdb');

// post ======================================

var getEma = function(req, res, next) {
  if (req.session) {
    email = req.session.email;
  } else {
    email = null;
    console.log('no sess');
  }
  next();
}; //getEma

var getUsr = function(req, res, next) {
  if (email) {
    try {
      mailusr = adb.mailUsr(email);
    } catch (err) {
      console.log(err);
    }
  } else {
    email = null;
    console.log('no email');
  }
  if (mailusr) {
    usr = mailusr.name;
  } else {
    usr = null;
    myerr = 'no mailusr';
  }
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
  next();
};

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
  next();
};

//console.log(typeof uni_s[i]);

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
    mypal.transactions[0].amount.total = add;
    //str=JSON.stringify(mypal);
  }
  next();
};

// === pal ===

var goPal = function(req, res, next) {
  try {
    paypal.payment.create(mypal, function(error, payment) {
      if (error) {
        console.log(error);
        throw error.message;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          console.log(payment.links[i]);
          if (payment.links[i].rel === 'approval_url') {
            res.redirect(payment.links[i].href.replace(' =', '='));
            //res.redirect(payment.links[i].href);
          } //if
        } //for
      } //else
    });
  } catch (err) {
    console.log(err);
  }
  next();
};

var chk = function(req, res, next) {
  console.log(tmp_a);
  console.log(mer_a);
  //console.log(mypal)
  console.log('=== trans');
  console.log(mypal.transactions[0].item_list);
  console.log(sum_a);
  console.log(add);
};

var rcb = function(req, res, next) {
  res.render('shop/paypal/pay', {
    seltmp: mailtmp,    sum: sum,    mer: mer,    usr: usr,    email: email
  }); //rend
};

router.post('/shop/paypal/pay', [
  getEma,  getUsr,  putMer,  putTmp,  putMer,  getSum,  goPal,
  chk,
]);

module.exports = router;
