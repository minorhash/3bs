var express = require("express")
var router = express.Router()
// == db =============================
var adb = require("usrdb")

var age=require("superagent")
var cnf=require("./aid.json")
// === glob ============================
var email, usr
var selpid, allpid,allnow,allpal
var ite, oite,opal,ship
var jpal=[],opal=[]

//var cred = require("./js/cred")
// === get ============================
//email = cred.ema(req)
email = "successful.payment@paidy.com"
mailusr=  adb.mailUsr(email)

console.log(email)

if(mailusr){usr=mailusr.name}
else{usr=null;console.log("no usr")}

console.log("usr")

// === pal
console.log("=== allpal")
    opal=[]

    allpal=adb.allPal(email)

console.log(allpal)

if(allpal.length!==0){
for(var i=0;i<allpal.length;i++){

console.log(allpal[i].ite)
//console.log(JSON.parse(allpal[i].ite))
//opal.push(JSON.parse(allpal[i].ite))
}
}else{console.log("no allpal")}



//  aid

//if(!email){    allpid=[],        oite=[]
//console.log("=== no all pid ==================")
//}else{

//allpid= adb.allPid(email)
//console.log(cnf.skl)
//oite=[]
//for (var i = 0; i < allpid.length; i++) {
//oite.push(JSON.parse(allpid[i].ite))
//            console.log(allpid[i].pid)
//age
//.get('https://api.paidy.com/payments/'+allpid[i].pid)
//.set("Content-Type", "application/json")
//.set("Paidy-Version", "2018-04-10")
//.set("Authorization", "Bearer"+cnf.skl)
//.then(function(res){
////console.log(res.body.order.shipping)
//})
//}//for

//}//else


//for (var i = 0; i < allpid.length; i++) {
//age
//.get('https://api.paidy.com/payments/'+allpid[i].pid)
//.set("Content-Type", "application/json")
//.set("Paidy-Version", "2018-04-10")
//.set("Authorization", "Bearer"+cnf.skl)
//.then(function(res){
//if(res.body.status=="authorized"){
//age
//.get('https://api.paidy.com/payments/'+allpid[i].pid)
//.set("Content-Type", "application/json")
//.set("Paidy-Version", "2018-04-10")
//.set("Authorization", "Bearer"+cnf.skl)
//.then(function(res){

// console.log("captured!!!")
//})

//}else{
// console.log("no auth")
//}

//})
//}


//var chkCap= function(req, res, next) {

//for (var i = 0; i < allpid.length; i++) {
//age
//.get('https://api.paidy.com/payments/'+allpid[i].pid)
//.set("Content-Type", "application/json")
//.set("Paidy-Version", "2018-04-10")
//.set("Authorization", "Bearer"+cnf.skl)
//.then(function(res){

////console.log(res.body)
//if(res.body.status=="closed"){

//if(res.body.captures.length!==0){
//console.log("cap!!!")
//}else{

//console.log(res.body.id)
//console.log("cancel")


//    var max=adb.getPid(res.body.id)
//    console.log(max)
//adb.delPid(res.body.id)
//}

//}else{console.log("not closed")}

//})
//}//for

//next()}

//var chk = function(req, res, next) {

//console.log("=== chk =====================")
//console.log(opal)
//console.log("=== oite =====")
//console.log(oite)
//next()}


