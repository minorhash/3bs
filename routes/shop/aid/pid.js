var express = require('express');
var router = express.Router();
// === db =============================
var db = require('cardb');
var adb = require('usrdb');

var age=require("superagent")
var snde = require('snd-ema');

// === glob =============================
var email, dat, pid, str, mai, mnt, usr, sku;
var mailusr;
var inspid, getpid, selpid, strbuy, strite;
var buy, ite, itea, oite;

var cnf=require("../son/aid.json")

var cred = require('../js/cred');
// === fun =============================
var getEma = function(req, res, next) {
email = cred.ema(req);
mailusr=  adb.mailUsr(email)
  next()}; //getEma

var getUsr = function(req, res, next) {
if(req.session.pss){
if(req.session.pss==mailusr.pss){usr=mailusr.name}
else{usr=null;console.log("no usr")}
}else{console.log("no pss")}
next()};

var putPid = function(req, res, next) {
//res.redirect("pid")

    console.log('=== putPid ===');

var utc = new Date().toJSON().slice(0,10).replace(/-/g,"/")
  if (req.body && email) {
    pid = req.body.id;
    console.log(email)
    console.log(pid)

age
.get('https://api.paidy.com/payments/'+pid)
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+cnf.sec)
.then(res => {
adb.insPid(email,pid,res.body.amount,JSON.stringify(res.body.order.items),utc,res.body.order.shipping);
})
} else {
//var    pid = 'pay_Wz8zdysAAF0AirLI'
console.log("no pid");  }
next()};

var senEma = function(req, res, next) {
console.log('=== senEma =======================================');
var eto="jinjasaisen@gmail.com"
var reg="thanks"
var mes=usr+"サマ<br>"+reg
snde.trEma(eto,reg,mes);
next()};

var chk = function(req, res, next) {
  console.log('=== pid =======================================');
  console.log(email);
  console.log(pid);
};

router.put('/shop/aid/pid', [getEma, getUsr, putPid,senEma,
    chk]);
module.exports = router;
