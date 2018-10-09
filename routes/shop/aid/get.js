var adb = require('usrdb');
var email="successful.payment@paidy.com"

gpid=adb.getPid(email)
ite=gpid.ite
oite=JSON.parse(ite)
console.log("oite")
console.log(oite)

for(var i=0;i<oite.length;i++){

    console.log(oite[i].title)
}

