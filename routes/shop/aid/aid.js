var express = require('express');
var router = express.Router();
// == db =============================
var db = require('cardb');
var adb = require('usrdb');
var aid = require('aidy');
var taid = aid.tmpAid();
// == cnf =============================
var cnf= require('../son/cnf.json');
var pub=cnf.pub
//var pub=cnf.pkl
var loc=cnf.loc
//var loc=cnf.axe
//var loc=cnf.tbs

var cred = require('../js/cred');
// === put ===

var email, usr, sku, sum,tsum,adr
var son,    sson
var boa,ind
var mailtmp, mailusr, mailadr,mailson;
var mer = [],  suma = [],  skua = []

var getEma = function(req, res, next) {
email = cred.ema(req);
mailusr=  adb.mailUsr(email)
next()}

var getUsr = function(req, res, next) {
if(mailusr){usr=mailusr.name}
else{console.log("no mailusr")}
next()};

var getAdr = function(req, res, next) {
if(email){mailadr = adb.mailAdr(email);}
else{console.log("no email for adr")}

if (mailadr == null) {
console.log('=== adr null ===');
}
next()};

var getTmp = function(req, res, next) {
    mailtmp = db.mailTmp(email);
  next()};

var putMer = function(req, res, next) {
    mer=[],    skua=[]
  for (var i = 0; i < mailtmp.length; i++) {
    mer[i] = db.skuMer(mailtmp[i].sku);
skua.push(mer[i].sku)
  }
  next()};

var chkSh= function(req, res, next) {

boa=[]
for(var i=0;i<skua.length;i++){

var pat=/^\d{3}$/;
var test=pat.test(skua[i])
boa.push(test)
}
ind=boa.indexOf(true)

next()};

var putSum = function(req, res, next) {
    suma=[]
  for (var i = 0; i < mailtmp.length; i++) {
    suma[i] = mailtmp[i].uni * mer[i].pri;
  }
  next()};
// === chk dl ===

var redSum = function(req, res, next) {
    function getSum(total, num) {
      return total + num;
}
if (suma.length !== 0) {
sum = suma.reduce(getSum);
if(ind==0){tsum=Math.round(sum*1.08)+650;

taid.buyer.email = email;
taid.buyer.name1 = mailusr.name;
taid.amount = tsum;
}
<<<<<<< HEAD
else{tsum=Math.round(sum*1.08)}
} else {
console.log('no sum');
}
=======
else{tsum=sum}
    } else {
      console.log('NO sum');
    }
>>>>>>> adr

  next()};

var getTai = function(req, res, next) {
  taid.amount = tsum;
  // // buyer
  taid.buyer.email = email;
  taid.buyer.name1 = mailusr.name;

  if (mailadr) {
    taid.buyer.phone = mailadr.phn;
  } else {
    console.log('=== NO mailadr ===');
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
    taid.order.tax=Math.round(sum*0.08);
//ind=-1
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

if(mailadr){
var str = JSON.stringify(taid);

sson=    'var config={"api_key":"' +
    pub+
    '",' +
    '"closed":function(cb){var xhr = new XMLHttpRequest();' +
    'xhr.open("PUT","'+loc+
     '/shop/aid/pid", true);' +
    'xhr.setRequestHeader("Content-Type", "application/json");' +
    'xhr.send(JSON.stringify(cb));}};' +
    'var hand=Paidy.configure(config);' +
    'function paidyPay(){' +
    'var load=' +
    str +
    ';' +
    'hand.launch(load);};';

db.insSon(email, sson);

var fs = require('fs');
son=__dirname+"/../../../public/son/"+email+".js"

//son=__dirname+"/"+email+".js"

// fs.stat(son, function(err, stats) {
// if(err){throw err}
// console.log(son);
// })

fs.unlink(son,function(err) {
if (err) {return console.log(err);    }
});

fs.writeFile(son, sson, function(err) {
if (err) {return console.log(err);    }
console.log('=== SAVED!');
});

}else{console.log("no mailadr")}

next()};

var chk = function(req, res, next) {
<<<<<<< HEAD
console.log('=== aid chk ====================================');
=======
console.log('=== put AID ====================================');
console.log(ind)
>>>>>>> adr
console.log(loc)
console.log(pub)
console.log(email)
console.log(tsum)
console.log("=== mailadr")
console.log(mailadr)
console.log(taid)
console.log(taid.order.tax)

};

router.put('/shop/aid/aid',
//[  getEma,  getUsr,  getAdr,getTmp,putMer,chkSh,putSum,redSum,getTai,putTai,
[  getEma,  getUsr,  getAdr,getTmp,putMer,chkSh,putSum,redSum,getTai,putTai,fsSon,
    chk]); //put

module.exports = router;
