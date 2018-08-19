var express = require('express');
var router = express.Router();
// == db =============================
var db = require('cardb');
var adb = require('usrdb');
var aid = require('aidy');
var taid = aid.tmpAid();
var cnf= require('../son/aid.json');
// === put ===

var email, usr, sku, sum,tsum,adr,sson
var boo,ind
var mailtmp, mailusr, mailadr,mailson;
var mer = [],  suma = [],  skua = []

var getEma = function(req, res, next) {
  var cred = require('../js/cred');
  email = cred.ema(req);
  next()}; //getEma

var getUsr = function(req, res, next) {
  var cred = require('../js/cred');
  usr = cred.usr(email);
    if(email){
  mailusr = adb.mailUsr(email);
  usr = mailusr.name;
    }else{console.log("no mail")}
  next()};

var getAdr = function(req, res, next) {
if(email){mailadr = adb.mailAdr(email);}
else{console.log("no email for adr")}

  if (mailadr == null) {
    console.log('=== adr null ===');
  }
  next()};

var getTmp = function(req, res, next) {
  try {
    mailtmp = db.mailTmp(email);
  } catch (err) {
    console.log(err);
  }
  next()};

var putMer = function(req, res, next) {
    mer=[]
    skua=[]
  for (var i = 0; i < mailtmp.length; i++) {
    mer[i] = db.skuMer(mailtmp[i].sku);
skua.push(mer[i].sku)
  }
  next()};

var putSum = function(req, res, next) {
    suma=[]
  for (var i = 0; i < mailtmp.length; i++) {
    suma[i] = mailtmp[i].uni * mer[i].pri;
  }
  next()};
// === chk dl ===
var chkShi= function(req, res, next) {

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

var redSum = function(req, res, next) {
    function getSum(total, num) {
      return total + num;
    }
    if (suma.length !== 0) {
      sum = suma.reduce(getSum);

if(ind==0){tsum=sum+650}
else{tsum=sum}

    } else {
      console.log('no sum');
    }
//  }
  next()};

var getTai = function(req, res, next) {
//  console.log('=== getTai ====================================');
  taid.amount = tsum;
  // buyer
  taid.buyer.email = email;
  taid.buyer.name1 = mailusr.name;

  if (mailadr) {
    taid.buyer.phone = mailadr.phn;
  } else {
    console.log('=== mailadr null ===');
  }

  // === buyer_data ===
  var d = new Date();
  taid.buyer_data.age = d.getDate();
  taid.buyer_data.ltv = tsum;
  taid.buyer_data.last_order_amount = tsum;
  taid.buyer_data.last_order_at = d.getDate();
  next()};

//=============================================== putTai
var putTai = function(req, res, next) {

console.log(taid)
if(ind==0){  taid.order.shipping = 650;}
else{  taid.order.shipping = 0;}

for (var i = 0; i < mer.length; i++) {
    //
taid.order.items[i] = {
id: mer[i].sku.toString(),
quantity: mailtmp[i].uni,
title: mer[i].name,
unit_price: mer[i].pri,
      //
};
} //for

 if (mailadr) {
     taid.shipping_address.line1 = mailadr.ln1;
     taid.shipping_address.line2 = mailadr.ln2;
     taid.shipping_address.city = mailadr.city;
     taid.shipping_address.state = mailadr.sta;
     taid.shipping_address.zip = mailadr.zip;
 } else {
     console.log('=== mailadr null ===');
 }

next()};

var fsSon = function(req, res, next) {
var str = JSON.stringify(taid);

sson=    'var config={"api_key":"' +
    cnf.pub +
    '",' +
    '"closed":function(cb){var xhr = new XMLHttpRequest();' +
    'xhr.open("PUT", "http://localhost:3023/shop/aid/pid", true);' +
    'xhr.setRequestHeader("Content-Type", "application/json");' +
    'xhr.send(JSON.stringify(cb));}};' +
    'var hand=Paidy.configure(config);' +
    'function paidyPay(){' +
    'var load=' +
    str +
    ';' +
    'hand.launch(load);};';

db.insSon(email, sson);

// var fs = require('fs');
// var son=__dirname+"/../../../public/son/"+email+".js"
// fs.stat(son, function(err, stats) {
// if(err){throw err}
// console.log(son);
// })
// fs.unlink(son,function(err) {
// if (err) {return console.log(err);    }
// else {console.log('no err');    }
// console.log('unlink!');
// });

// fs.writeFile(son, sson, function(err) {
// if (err) {return console.log(err);    }
// else {console.log('no err');    }
//     console.log('The file was saved!');
// });

  next()};

var chk = function(req, res, next) {
console.log('=== aid ====================================');
console.log(skua);
console.log(tsum);
console.log(ind);
};

router.put('/shop/aid/aid',
[  getEma,  getUsr,  getAdr,getTmp,putMer,putSum,chkShi,redSum,getTai,putTai,fsSon,chk]); //put

module.exports = router;
