var snd = require('snd-ema');
var email="jinjasaisen@gmail.com"
var cred = require('../js/cred');
var usr = "jinja"

var i18=require("../../../i18n/shop/ja.json")
var mes=i18.cau1+i18.cau2+i18.cau3
+i18.cont+i18.ship1+i18.ship2+i18.ship3
+i18.ship4+i18.ship5
+i18.misc+i18.lin1+i18.auto1+i18.auto2+i18.lin1
+i18.adr1+i18.adr2+i18.adr3

console.log('=== senEma =======================================');

snd.trEma(email,i18.buy,mes)
