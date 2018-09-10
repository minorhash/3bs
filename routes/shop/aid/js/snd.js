var snd = require('snd-ema');
var age=require("superagent")

var email="minorhash@gmail.com"
var cred = require('../../js/cred');
var adb = require('usrdb');
var usr = "minorhash"

var pid="pay_W5YsHlUAAC4AaWnL"
var sec="sk_live_8vjr28982pco233d35421fnpcm"

var gpid=adb.getPid(email)
var ite=gpid.ite
var oite=JSON.parse(ite)
//console.log(oite)

var i18=require("../../../../i18n/shop/ja.json")
var mes=i18.cau1+i18.cau2+i18.cau3

+i18.cont
+i18.lin1

+ite.replace(/,/g,"<br>").replace(/\[/,"").replace(/\]/,"").replace(/\{/g,"").replace(/\}/g,"")
.replace(/id/,"品番").replace(/title/,"タイトル").replace(/quantity/,"数量").replace(/unit_price/,"価格").replace(/description/,"詳細")
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

snd.trEma(email,i18.buy,mes)
