var snd = require('snd-ema');
var age=require("superagent")

var email="successful.payment@paidy.com"
var cred = require('../../js/cred');
var adb = require('usrdb');
var usr = "min"

var pid="pay_W5YsHlUAAC4AaWnL"
// var sec="sk_live_8vjr28982pco233d35421fnpcm"

var gpid=adb.getPid(email)
var ite=gpid.ite
var oite=JSON.parse(ite)
console.log(oite)

var i18=require("../../../../i18n/shop/ja.json")
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
+ite
.replace(/,/g,"<br>")
.replace(/\[/g,"").replace(/\]/g,"").replace(/\{/g,"").replace(/\}/g,"")
.replace(/id/g,"品番").replace(/title/g,"タイトル").replace(/quantity/g,"数量").replace(/unit_price/g,"価格").replace(/description/g,"詳細")
.replace(/"/g,"")
+"<br>"
+i18.lin1
+i18.ship1+i18.ship2+i18.ship3
+i18.ship4+i18.ship5
+i18.misc+i18.lin1+i18.auto1+i18.auto2+i18.lin1
+i18.adr1+i18.adr2+i18.adr3

for(var i=0;i<oite.length;i++){
console.log(oite[i].id)
}

console.log('=== senEma =======================================');

var to="jinjasaisen@gmail.com"

try{
snd.trEma(to,i18.buy,mes)
}catch(err){console.log(err)}
