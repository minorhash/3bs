var express = require("express")
var router = express.Router()
// == db =============================
var adb = require("usrdb")

var age=require("superagent")
var cnf=require("./son/aid.json")
// === glob ============================
var email, usr
var selpid, allpid,allnow,allpal
var ite, oite,opal,ship
var jpal=[],opal=[]

var cred = require("./js/cred")
// === get ============================
var getEma = function(req, res, next) {
email = cred.ema(req)
mailusr=  adb.mailUsr(email)
next()}

var getUsr = function(req, res, next) {
if(mailusr){usr=mailusr.name}
else{usr=null;console.log("no usr")}
next()};

// === pal
var allPal= function(req, res, next) {
    opal=[]

    allpal=adb.allPal(email)

if(!allpal.length==0){
for(var i=0;i<allpal.length;i++){
opal.push(JSON.parse(allpal[i].ite))
}
}else{console.log("no allpal")}

next()}


//  aid
var allPid = function(req, res, next) {

if(!email){    allpid=[],        oite=[]
console.log("=== no all pid ==================")
}else{

        allpid= adb.allPid(email)
            console.log(cnf.sec)
        oite=[]
for (var i = 0; i < allpid.length; i++) {
oite.push(JSON.parse(allpid[i].ite))
            console.log(allpid[i].pid)
age
.get('https://api.paidy.com/payments/'+allpid[i].pid)
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+cnf.sec)
.then(function(res){
//console.log(res.body.order.shipping)
})
}//for

}//else
next()}

var chk = function(req, res, next) {

console.log("=== chk =====================")
console.log(opal)
console.log("=== oite =====")
console.log(oite)
next()}

var gcb = function(req, res) {
res.render("shop/history", {
title: "history", usr: usr, selpid: selpid,
allpid: allpid, allnow: allnow, oite: oite,opal:opal,
allpal:allpal
})
}

router.get("/shop/history", [getEma, getUsr, allPid, allPal,
chk, gcb])

module.exports = router
