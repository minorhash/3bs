var express = require('express');
var router = express.Router();
// === db =============================
var db = require('cardb');
var adb = require('usrdb');

var age=require("superagent")
var snde = require('snd-ema');

// === glob =============================
var email, dat, pid, str, mai, mnt, usr, sku;
var mailusr,mailadr;
var inspid, getpid, selpid, strbuy, strite;
var buy, ite, oite,gpid
var mes,sub
var cnf=require("../son/cnf.json")
//var sec=cnf.sec
var sec=cnf.skl

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

var getAdr= function(req, res, next) {

next()};

var putPid = function(req, res, next) {
//res.redirect("pid")

console.log('=== putPid ===');

var utc = new Date().toJSON().slice(0,10).replace(/-/g,"/")
var tim=utc.replace(/\//g,"-")

if (req.body && email) {
    pid = req.body.id;

age
.get('https://api.paidy.com/payments/'+pid)
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+sec)
.then(res => {
console.log(email)
console.log(pid)
console.log(tim)
console.log(res.body.amount)
console.log(res.body.buyer)

oite=res.body.order.items
console.log(oite)

try{
adb.insPid(email,pid,res.body.amount,JSON.stringify(res.body.buyer),JSON.stringify(res.body.order.items),tim);
}catch(err){console.log(err)}

var i18=require("../../../i18n/shop/ja.json")
for(var i=0;i<oite.length;i++){

mes=i18.lin1
+i18.cau1+i18.cau3
    +i18.lin1
+usr+"様<br><br>"
    +i18.cau2+"<br>"
    +i18.cau3+"<br>"
    +i18.cau4+"<br>"

+i18.cont+i18.pid+":"+pid+"<br>"
+i18.title+":"+JSON.stringify(oite[i].title)+"<br>"
+i18.sku+":"+JSON.stringify(oite[i].id)+"<br>"
+i18.price+":"+JSON.stringify(oite[i].unit_price)+"<br>"
+i18.unit+":"+JSON.stringify(oite[i].quantity)+"<br><br>"
   +i18.pay +i18.aid+"<br>"

+i18.ship1+i18.ship2+i18.ship3
+i18.ship4+i18.ship5
+i18.misc+i18.lin1+i18.auto1+i18.auto2+i18.lin1
+i18.adr1+i18.adr2+i18.adr3

}


})
} else {
console.log("no pid");  }
next()};

var senEma = function(req, res, next) {
console.log('=== senEma =======================================');
//email="jinjasaisen@gmail.com"
sub=i18.buy
snde.trEma(email,sub,mes);
next()};

var chk = function(req, res, next) {
  console.log('=== pid =======================================');
console.log(mailusr);
};

router.put('/shop/aid/pid', [getEma, getUsr,putPid,
chk]);
module.exports = router;
