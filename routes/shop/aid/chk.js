var adb = require('usrdb');
var age=require("superagent")
// === cnf ===
var cnf=require("../son/cnf.json")
var sec=cnf.sec
//var sec=cnf.skl
//var email="successful.payment@paidy.com"
var email="minorhash@gmail.com"

// === pid ===

var allpid=adb.allPid(email)
//console.log(allpid)

for(var i=0;i<allpid.length;i++){

age
.get('https://api.paidy.com/payments/'+allpid[i].pid)
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+sec)
.then(res => {
if(res.body.status=="closed"){
console.log("already closed")
}else{
console.log("auth")
console.log(res.body.id)
// closed

}//else

})//then

}//for


