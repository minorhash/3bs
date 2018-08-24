var snd = require('snd-ema');
var email="jinjasaisen@gmail.com"
var cred = require('../js/cred');
var usr = "jinja"

var reg="thanks"
var mes=usr+"サマ<br>"+reg
console.log('=== senEma =======================================');

snd.trEma(email,reg,mes);
