// === db
var db = require('usrdb');
var email= "minorhash@gmail.com";

// === glob
var usr,name, pss, email, mes,reg;
    var mailusr,mailadr;
var phn, zip, pref, sta, city, ln1, ln2, chk;

var chkUsr=function(email) {
if (email) {
try {
mailusr = db.mailUsr(email);
} catch (err) {console.log(err);}
return mailusr;
} else {
console.log('email');
}
}
var usr=chkUsr(email)
console.log(usr.name)

var chkAdr=function(email) {
if (email) {
try {
mailadr = db.mailAdr(email);
} catch (err) {console.log(err);}
return mailadr;
//console.log(mailadr)
} else {
console.log('no req.body.email');
}
}
var fun=chkAdr(email)
console.log(fun)
var i18=require("../../../i18n/usr/ja.json")

console.log(i18.reg)

reg=i18.reg
mes=i18.lin1+i18.auto1+i18.auto2+i18.lin1
+usr.name+"さま<br>"
+i18.reg2+"<br>"
+i18.cont
+i18.phn+fun.phn+"<br>"
+i18.zip+fun.zip+"<br>"
+i18.sta+fun.sta+"<br>"
+i18.city+fun.city+"<br>"
+i18.ln1+fun.ln1+"<br>"
+i18.ln2+fun.ln2+"<br>"
+"email:"+email

console.log(mes)

 var senEma = function(email) {
 var snde = require('snd-ema');

 console.log('=== senEma =======================================');
 try{
 snde.trEma(email,reg,mes);
 }catch(err){console.log(err)}
 }

senEma(email)

