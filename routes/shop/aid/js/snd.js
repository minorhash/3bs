var snd = require('snd-ema');
var age=require("superagent")

//var email="successful.payment@paidy.com"
var email="minorhash@gmail.com"
var cred = require('../../js/cred');
var adb = require('usrdb');
var usr = "min"

//var pid="pay_W5YsHlUAAC4AaWnL"
var pid="pay_W_uqTzAAAFoARdoY"
// var sec="sk_live_8vjr28982pco233d35421fnpcm"

var gpid=adb.getPid(email)
var ite=gpid.ite
var oite=JSON.parse(ite)
console.log(oite)

var i18=require("../../../../i18n/shop/ja.json")
var sub=i18.buy

var mes=
i18.lin1
+i18.cau1
+i18.lin1+"<br>"
+usr+"様<br><br>"
+i18.cau2+"<br><br>"
+i18.cau3
+i18.cau4+"<br>"

+i18.cont+"<br>"
+i18.pid+pid+"<br>"
+"<br>"

var loo="";
oite=res.body.order.items
for(var i=0;i<oite.length;i++){
loo+=
i18.sku+oite[i].id+"<br>"
+i18.title+oite[i].title+"<br>"
+i18.price+(oite[i].unit_price).toLocaleString()+i18.yen+"<br>"
+i18.unit+oite[i].quantity+"<br>"
+i18.lin1
}
var msum=i18.sub+(res.body.amount-650).toLocaleString()+i18.yen+"<br>"
+i18.cour+650+i18.yen
var ship=
i18.ship1+i18.ship2+i18.ship3
+i18.ship4+i18.ship5
+i18.misc+i18.lin1+i18.auto1+i18.auto2+i18.lin1
+i18.adr1+i18.adr2+i18.adr3

var fin=mes+loo+msum+ship


if(pid){
snde.trEma(email,sub,fin);
}else{console.log("no pid")}


console.log('=== senEma =======================================');

var to="jinjasaisen@gmail.com"

try{
snd.trEma(to,i18.buy,mes)
}catch(err){console.log(err)}
