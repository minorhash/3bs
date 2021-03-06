var express = require("express");
var router = express.Router();
var crypto = require("crypto");
// == db =============================
var db = require("cardb");
var adb = require("usrdb");
var idy = require("aidy");
var taid = idy.tmpAid();

// === glob ============================
var email, usr, sku, uni, sum, tsum,stax
var num,boo
var mer = [],  suma = [],  skua = [],boa=[];
var mailtmp, mailusr,mailadr

var cred = require("./js/cred");
// === get ============================

var cred = require('./js/cred');

var getEma = function(req, res, next) {
email = cred.ema(req);
mailusr=  adb.mailUsr(email)
    console.log(email)
next()}

var getUsr = function(req, res, next) {
if(mailusr){usr=mailusr.name}
else{usr=null;console.log("no usr")}
next()}

var getAdr= function(req, res, next) {
mailadr=adb.mailAdr(email)
next()};

var getTmp = function(req, res, next) {
  mailtmp = [];
      //db.delUni()
  if (email) {
  mailtmp = db.mailTmp(email);
  } else {    console.log("no mail");  }
  next()};

var getSku= function(req, res, next) {
    skua=[]
if (mailtmp) {
for(var i=0;i<mailtmp.length;i++){
skua.push(mailtmp[i].sku)
}
} else {    console.log("mailtmp");  }
  next()};

var putMer = function(req, res, next) {
mer = [];
if (mailtmp) {
for (var i = 0; i < mailtmp.length; i++) {
mer[i] = db.skuPre(mailtmp[i].sku);
}
}else {    console.log("no mailtmp");  }
next()};

var putSum = function(req, res, next) {
  suma = [];
  if (mailtmp.length!==0 && mer.length!==0) {
    for (var i = 0; i < mailtmp.length; i++) {
      suma[i] = mailtmp[i].uni * mer[i].pri;
    }
  } else {    console.log("no mailtmp");  }
  next()};

// === chk dl ===
// check for dl mer. if sku is 4 digit, then its dl.
var chkSh = function(req, res, next) {
    boa=[]
  for (var i = 0; i < skua.length; i++) {
    var pat = /^\d{3}$/;
    boa.push(pat.test(skua[i]));
    }

console.log(boa.indexOf(true))
if(boa.indexOf(true)==-1){
boo=false
}else{       boo=true}

next()};

var redSum = function(req, res, next) {
  sum = null, tsum = null
  function getSum(total, num) {    return total + num;  }
  if (suma.length !== 0) {
    sum = suma.reduce(getSum);

if(boo!==-1){
    console.log(boo)
    tsum = sum + 650;
}else{tsum=sum;}

} else {    console.log("no sum");  }

  next()};
// === chk ===============================
var chk = function(req, res, next) {
  console.log("=== cart ===================");
  console.log(email);
  console.log("=== mailtmp ===");
  console.log(mailtmp);
  console.log(mer);
  console.log(skua)
  console.log(boa)
  console.log(boo)
  console.log(tsum)
  next()};

// === rend
var gcb = function(req, res) {
res.render("shop/pre-cart", {
seltmp: mailtmp,mailadr:mailadr,
mer: mer,    sum: sum,tsum:tsum,boo:boo,   usr: usr,    email: email
});
};
var arr=[  getEma,  getUsr, getAdr, getTmp, getSku, putMer,  putSum,chkSh,  redSum,
chk,  gcb
]
router.get("/shop/pre-cart", arr);
// ====== post ===============================

// === add item ===

var getIte = function(req, res, next) {
  if (req.body) {
    uni = req.body.uni;
    sku = req.body.sku;
  } else {
    console.log("no bod");
  }
  next()};

var insUpd = function(req, res, next) {
  if (req.body.sku) {
    num = parseInt(sku);
    var ind = skua.indexOf(num);
    console.log(ind);
    if (ind == -1) {
      db.insTmp(email, sku, uni);
      //res.redirect("pre-cart");
    } else {
mailtmp=[]
        skua=[],boa=[]
      db.updTmp(uni, email, sku);
  //    db.delUni()
      //res.redirect("pre-cart");
    } //ind
  } else {
    console.log("no body.sku");
  }
  next()}; //insUpd

// === clr ===============================
var clrEma = function(req, res, next) {
  if (req.body.clr == "yes") {
    db.delEma(email);
    //    sku=null
    mailtmp = null;
    //console.log(mailtmp)
    console.log("=== CLR! ==================");
    //res.redirect("cart")
  } else {    console.log("no clr");  }
  next()};

// === aid ===============================

var putAid = function(req, res, next) {
  router.put("/shop/aid/pre-aid");
  next()};


var pcb = function(req, res) {
  res.render("shop/pre-cart", {
seltmp: mailtmp,    sum: sum,tsum:tsum,    mer: mer,    usr: usr,
email: email
  }); //rend
};

var arr=[
getEma,  getUsr,  getTmp,  getIte,  getSku, chkSh, insUpd,  clrEma,
chk,  pcb
]
router.post("/shop/pre-cart", arr);

module.exports = router;
