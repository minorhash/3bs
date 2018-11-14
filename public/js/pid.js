// === db =============================
var db = require('cardb');
var adb = require('usrdb');

var age=require("superagent")
var snde = require('snd-ema');

// === glob =============================
var email, dat, pid, str, mai, mnt, usr, sku;
var mailusr,mailadr;
var inspid, getpid, selpid, strbuy, strite;
var buy, ite, oite,gpid;
var mes,sub;
var sndboo=false;

// === cnf =============================
var cnf=require("./son/cnf.json");
var sec=cnf.sec;
//var sec=cnf.skl;

var cred = require('./js/cred');
// === fun =============================
//email = cred.ema(req);
email="jinjasaisen@gmail.com"
mailusr=  adb.mailUsr(email)

// adr
if(email){mailadr = adb.mailAdr(email);}

console.log(mailadr)
console.log(mailadr)
console.log(mailadr)

// var utc = new Date().toJSON().slice(0,10).replace(/-/g,"/")
// var tim=utc.replace(/\//g,"-")

// pid = req.body.id;

// age
// .get('https://api.paidy.com/payments/'+pid)
// .set("Content-Type", "application/json")
// .set("Paidy-Version", "2018-04-10")
// .set("Authorization", "Bearer"+sec)
// .then(res => {
// console.log("=== age ==")
// console.log(email)
// console.log(pid)
// console.log(tim)
// console.log(res.body.amount)
//     mnt=res.body.amount;
// console.log(res.body.buyer)

// oite=res.body.order.items
// console.log(oite)

// try{
// adb.insPid(email,pid,mnt,JSON.stringify(res.body.buyer),JSON.stringify(res.body.order.items),tim);
// sndboo=true;
// }catch(err){sndboo=false;
// console.log(err);}

// if(oite){
// var i18=require("../../../i18n/shop/ja.json")

// mes=i18.lin1
// +i18.cau1+i18.cau3
//     +i18.lin1
// +usr+"様<br><br>"
//     +i18.cau2+"<br>"
//     +i18.cau3+"<br>"
//     +i18.cau4+"<br>"

// +i18.cont+i18.pid+":"+pid+"<br>"

// for(var i=0;i<oite.length;i++){
// +i18.title+":"+JSON.stringify(oite[i].title)+"<br>"
// +i18.sku+":"+JSON.stringify(oite[i].id)+"<br>"
// +i18.price+":"+JSON.stringify(oite[i].unit_price)+"<br>"
// +i18.unit+":"+JSON.stringify(oite[i].quantity)+"<br><br>"
// }
//    +i18.pay +i18.aid+"<br>"
//    +i18.sub+mnt+"<br>"
//    +i18.tax+Math.round(mnt*0.08)+"<br>"
//    +i18.tot+Math.round(mnt*1.08)+"<br>"

// // +i18.send+"<br>"
// // +i18.zip+mailadr.zip+"<br>"
// // +i18.senadr+mailadr.sta+"&nbsp;"+mailadr.city+"&nbsp;"+mailadr.ln1+"&nbsp;"+mailadr.ln2+"<br>"
// // +i18.sentel+mailadr.tel+"<br>"

// +i18.ship1+i18.ship2+i18.ship3
// +i18.ship4+i18.ship5
// +i18.misc+i18.lin1+i18.auto1+i18.auto2+i18.lin1
// +i18.adr1+i18.adr2+i18.adr3

// }


//var senEma = function(req, res, next) {
//console.log('=== senEma =======================================');
////email="jinjasaisen@gmail.com"
//    if(sndboo=true){
//sub="subject";
////sub=i18.buy
//snde.trEma(email,sub,mes);
//    }else{console.log("cant send email");}
//next()};

//var chk = function(req, res, next) {
//console.log('=== pid =======================================');
//console.log(mailusr);
//console.log("=== adr");
//console.log(mailadr);
//};

