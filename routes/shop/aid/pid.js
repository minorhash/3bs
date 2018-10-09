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
var mes,i18
i18=require("../../../i18n/shop/ja.json")

var cnf=require("../son/cnf.json")

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
var tim=utc.replace(/\//g,"-")
if (req.body && email) {
    pid = req.body.id;
    console.log(email)
    console.log(pid)
    console.log(tim)

age
.get('https://api.paidy.com/payments/'+pid)
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+cnf.sec)
.then(res => {
adb.insPid(email,pid,res.body.amount,JSON.stringify(res.body.buyer),JSON.stringify(res.body.order.items),tim);

oite=res.body.order.items
console.log(oite)

for(var i=0;i<oite.length;i++){
mes=usr+"様<br>"
+i18.cau1+i18.cau2+i18.cau3
+i18.cont+i18.pid+":"+pid+"<br>"
+i18.title+":"+JSON.stringify(oite[i].title)+"<br>"
+i18.sku+":"+JSON.stringify(oite[i].id)+"<br>"
+i18.price+":"+JSON.stringify(oite[i].unit_price)+"<br>"
+i18.unit+":"+JSON.stringify(oite[i].quantity)+"<br>"
+i18.ship1+i18.ship2+i18.ship3
+i18.ship4+i18.ship5
+i18.misc+i18.lin1+i18.auto1+i18.auto2+i18.lin1
+i18.adr1+i18.adr2+i18.adr3
}

console.log(mes)

})


//adb.insPid(email,pid,res.body.amount,JSON.stringify(res.body.order.items),utc,res.body.order.shipping,utc);
} else {
//var    pid = 'pay_Wz8zdysAAF0AirLI'
console.log("no pid");  }
next()};

var senEma = function(req, res, next) {
console.log('=== senEma =======================================');
var email="jinjasaisen@gmail.com"
var sub=i18.buy
//var sub="sub"

snde.trEma(email,sub,mes);
next()};

var chk = function(req, res, next) {
  console.log('=== pid =======================================');
  console.log(usr);
  console.log(email);
  console.log(pid);
};

router.put('/shop/aid/pid', [getEma, getUsr,putPid,senEma,
chk]);
module.exports = router;
