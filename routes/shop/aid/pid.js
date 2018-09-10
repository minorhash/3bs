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
var buy, ite, oite,gpid

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
.set("Authorization", "Bearer"+cnf.skl)
.then(res => {
adb.insPid(email,pid,res.body.amount,JSON.stringify(res.body.order.items),utc,res.body.order.shipping);

})
} else {
//var    pid = 'pay_Wz8zdysAAF0AirLI'
console.log("no pid");  }
next()};


var getPid= function(req, res, next) {
gpid=adb.getPid(email)
ite=gpid.ite
oite=JSON.parse(ite)
next()};

var senEma = function(req, res, next) {
console.log('=== senEma =======================================');
var i18=require("../../../i18n/shop/ja.json")
//var eto="jinjasaisen@gmail.com"
var eto="jinjasaisen@gmail.com"
var cau1=i18.cau1
var e_sku=oite[0].id

var sub=i18.buy
var mes=usr+"様<br>"
+i18.cau1+i18.cau2+i18.cau3
+i18.cont+i18.pid+":"+pid
+i18.sku+":"+oite[0].id+"<br>"
+i18.title+":"+oite[0].title+"<br>"
+i18.price+":"+oite[0].unit_price+"<br>"
+i18.unit+":"+oite[0].quantity+"<br>"

+i18.ship1+i18.ship2+i18.ship3
+i18.ship4+i18.ship5
+i18.misc+i18.lin1+i18.auto1+i18.auto2+i18.lin1
+i18.adr1+i18.adr2+i18.adr3

snde.trEma(email,sub,mes);
next()};

var chk = function(req, res, next) {
  console.log('=== pid =======================================');
  console.log(email);
  console.log(pid);
  console.log(oite[0]);
  console.log(ite);
};

router.put('/shop/aid/pid', [getEma, getUsr, putPid,getPid,senEma,
    chk]);
module.exports = router;
