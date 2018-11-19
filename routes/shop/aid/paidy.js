var express = require('express');
var router = express.Router();
// == db =============================
var db = require('cardb');
var adb = require('usrdb');
var aid = require('aidy');
var taid = aid.tmpAid();
var cnf= require('../son/aid.json');
var pub=cnf.pub;

var cred = require('../js/cred');
// === put ===

var email, usr, sku, sum,tsum,adr
var son,    sson
var boa,ind,tax
var mailtmp, mailusr, mailadr,mailson;
var mer = [],  suma = [],  skua = [],ite=[]

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

console.log("=== chk dl ===")
var pat=/^\d{3}$/;
var test=pat.test(skua[i])
boa.push(test)
}
ind=boa.indexOf(true)
    console.log("ind")
    console.log(ind)

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
tax=Math.round(sum*0.08)
if(ind!==-1){tsum=sum+tax+650;

// taid.buyer.email = email;
// taid.buyer.name1 = mailusr.name;
taid.amount = tsum;
}
else{tsum=Math.round(sum*1.08)
taid.amount = tsum;

}
    } else {
      console.log('no sum');
    }
  next()};

var getTai = function(req, res, next) {
  taid.amount = tsum;
  // // buyer
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
taid.order.tax=Math.round(sum*0.08)

if(ind!==-1){  taid.order.shipping = 650;}
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

var chk = function(req, res, next) {
console.log('=== aid ====================================');
//console.log(son)
console.log(pub)
console.log(email)
console.log(tsum)
console.log(taid.amount)
//console.log(mer)
//console.log(mailadr)
console.log(taid.order.shipping)
console.log(taid.order.tax)
console.log(taid.order.items)

next()};

var gcb = function(req, res) {
res.render("shop/paidy", {
title: "paidy", email:email,usr: usr,
seltmp:mailtmp,mer:mer,
mailadr:mailadr,ite:taid.order.items,
sum:sum,tsum:tsum,tax:tax,
pub:pub,ship:taid.order.shipping

})
}
var fun= [  getEma,  getUsr,  getAdr,getTmp,putMer,chkSh,putSum,redSum,getTai,putTai,
    chk,gcb]
router.get("/shop/paidy",fun); //put


module.exports = router;
