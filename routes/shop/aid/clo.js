var adb = require('usrdb');
var age=require("superagent")
var cnf=require("../son/cnf.json")
//var sec=cnf.sec
var sec=cnf.skl
var email="minorhash@gmail.com"
var allpid=adb.allPid(email)

for(var i=0;i<allpid.length;i++){

age
.get('https://api.paidy.com/payments/'+allpid[i].pid)
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+sec)
.then(res => {
if(res.body.status=="closed"){
console.log("already closed")
console.log(res.body.id)
}else{
console.log("auth")
console.log(res.body.id)
    // closed
age
.post('https://api.paidy.com/payments/'+res.body.id+"/close")
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+sec)
.then(res => {
console.log(res.body.order.items)
})

}
})

}//for
//var pay="pay_W8k-XUYAAKQAj38h"
// var pay="pay_W8heHEYAAKQAjsHp"
// age
// .post('https://api.paidy.com/payments/'+pay+"/close")
// .set("Content-Type", "application/json")
// .set("Paidy-Version", "2018-04-10")
// .set("Authorization", "Bearer"+sec)
// .then(res => {
// console.log(res.body.order.items)
// })

