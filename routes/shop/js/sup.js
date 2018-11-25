// === db
var db = require('usrdb');
// == mail
var snde = require('snd-ema');

var email="minorhash@gmail.com"
var name="min"
var reg="",mailusr

var chkUsr=function(email) {
if (email) {
try {
mailusr = db.mailUsr(email);
} catch (err) {console.log(err);}
return mailusr;
//console.log(mailusr)
} else {
console.log('no req.body.email');
}
}

var fun=chkUsr(email)
console.log(fun.name)
var i18=require("../../../i18n/usr/ja.json")

console.log(i18.reg)

var reg=i18.reg
var mes=i18.lin1+i18.auto1+i18.auto2+i18.lin1
+name+"さま<br>"
+i18.reg2+"<br>"
+i18.cont
+i18.name+fun.name+"<br>"
+i18.pss+fun.pss+"<br>"
+"email:"+email

console.log('=== senEma =======================================');
try{
snde.trEma(email,reg,mes);
}catch(err){console.log(err)}


