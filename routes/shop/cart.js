var express = require("express");
var router = express.Router();
var crypto = require("crypto");
// == db =============================
var db = require("cardb");
var adb = require("usrdb");
var idy = require("aidy");
var taid = idy.tmpAid();

var str = crypto
  .createHash("md5")
  .update(Math.random().toString())
  .digest("hex");

// === glob ============================
var email, usr, sku, uni, sum, tsum, num, myerr;
var mailtmp, mailusr;
var mer = [],  suma = [],  skua = [];
var mailtmp, mailusr,mailadr
var mer = [],
  suma = [],
  skua = [];

// === rend ============================
var gcb = function(req, res) {
res.render("shop/cart", {
    seltmp: mailtmp,    mer: mer,    sum: sum,    usr: usr,    email: email  });
};

// === fun ============================
var getEma = function(req, res, next) {
  var cred = require("./js/cred");
  email = cred.ema(req);
  next()};

var getAdr= function(req, res, next) {
mailadr=adb.mailAdr(email)

  next()};

var getUsr = function(req, res, next) {
  var cred = require("./js/cred");
  usr = cred.usr(email);
  next()};

var getTmp = function(req, res, next) {
  mailtmp = [];
  if (email) {
      mailtmp = db.mailTmp(email);
      console.log("== mailtmp ===")
  } else {    console.log("no mail");  }
  next()};

var putMer = function(req, res, next) {
  mer = [];
  if (mailtmp) {
    for (var i = 0; i < mailtmp.length; i++) {
      mer[i] = db.skuMer(mailtmp[i].sku);
    }
  } else {    console.log("no mailtmp");  }
  next()};

var putSum = function(req, res, next) {
  suma = [];
  if (mailtmp) {
    for (var i = 0; i < mailtmp.length; i++) {
      suma[i] = mailtmp[i].uni * mer[i].pri;
    }
  } else {
    console.log("no mailtmp");
  }
  next()};

// === chk dl ===
// check for dl mer. if sku is 4 digit, then its dl.
var chkSh = function(req, res, next) {
  boo = [];
  for (var i = 0; i < skua.length; i++) {
    console.log("=== chk ship===");
    console.log(skua[i]);
    var pat = /^\d{3}$/;
    var test = pat.test(skua[i]);
    console.log(test);
    boo.push(test);
  }
  console.log(boo);
  ind = boo.indexOf(true);
  console.log("ind:" + ind);

  next()};

var redSum = function(req, res, next) {
  (sum = ""), (tsum = "");
  function getSum(total, num) {
    return total + num;
  }
  if (suma.length !== 0) {
    sum = suma.reduce(getSum);
    tsum = sum + 650;
    console.log("tsum:" + tsum);
  } else {
    console.log("no sum");
  }
  next()};
// === chk ===============================
var chk = function(req, res, next) {
  console.log("=== cart ===================");
  console.log(email);
  console.log("=== mailtmp ===");
  console.log(mailtmp);
  ////console.log(skua)
  next()};

router.get("/shop/cart", [  getEma,  getUsr,  getTmp,putMer,putSum,redSum,
chk,  gcb]);


// ====== post ===============================

// === add item ===

var getIte = function(req, res, next) {
  if (req.body) {
    uni = req.body.uni;
    sku = req.body.sku;
  } else {
    console.log("no bod");
  }
  next();
};

var putSku = function(req, res, next) {
  skua = []; // == VERY IMPORTANT!!!! always init ==
  if (mailtmp.length !== 0) {
    for (var i = 0; i < mailtmp.length; i++) {
      skua[i] = mailtmp[i].sku;
    } //for
  } else {
    mailtmp = null;
    console.log("no mailtmp");
  }
  next();
};

var pcb = function(req, res, next) {
  res.render("shop/cart", {
    seltmp: mailtmp,
    sum: sum,
    mer: mer,
    usr: usr,
    email: email
  }); //rend
};

var insUpd = function(req, res, next) {
  if (req.body.sku) {
    num = parseInt(sku);
    var ind = skua.indexOf(num);
    console.log(ind);
    if (ind == -1) {
      db.insTmp(email, sku, uni);
      var hea = res.headersSent;
      console.log("=== head ==================");
      console.log(hea);
      res.redirect("cart");
    } else {
      db.updTmp(uni, email, sku);
      var hea = res.headersSent;
      console.log(hea);
      res.redirect("cart");
    } //ind
  } else {
    console.log("no body.sku");
  }
  next();
}; //insUpd

// === clr ===============================
var clrEma = function(req, res, next) {
  if (req.body.clr == "yes") {
    db.delEma(email);
    //    sku=null
    mailtmp = null;
    //console.log(mailtmp)
    console.log("=== CLR! ==================");
    //res.redirect("cart")
  } else {
    console.log("no clr");
  }
  next();
};

// === chk ===============================
var chk = function(req, res, next) {
  console.log("=== cart ===================");
  console.log(email);
  console.log("=== mailtmp ===");
  console.log(mailtmp);
  ////console.log(skua)
  next()};

// === aid ===============================

var putAid = function(req, res, next) {
  router.put("/shop/aid/aid");
  next();
};


router.post("/shop/cart", [  getEma,  getUsr,  getTmp,  getIte,  putSku,  insUpd,  clrEma,
// === rend
var gcb = function(req, res) {
  res.render("shop/cart", {
      seltmp: mailtmp,mailadr:mailadr,
    mer: mer,    sum: sum,    usr: usr,    email: email
  });
};

router.get("/shop/cart", [
  getEma,  getUsr, getAdr, getTmp,  putMer,  putSum,  redSum,  chkShi,
  chk,  gcb
]);
router.post("/shop/cart", [
  getEma,  getUsr,  getTmp,  getIte,  putSku,  insUpd,  clrEma,
  chk,  pcb
]);

module.exports = router;
