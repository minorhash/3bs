var express = require("express")
var router = express.Router()
// == db =============================

var adb = require("usrdb")

// === glob ============================
var email, usr
var selpid, allpid,allnow,allpal
var ite, oite,opal
// === get ============================
var getEma = function(req, res, next) { var cred = require("./js/cred")
    email = cred.ema(req)
    next()
} //getEma

var getUsr = function(req, res, next) {
    var cred = require("./js/cred")
    usr = cred.usr(email)
    next()
}

//  aid
var allPid = function(req, res, next) {
    if(!email){    allpid=[]
        oite=[]
        console.log("=== no all pid ==================")
    }else{
        allpid= adb.allPid(email)
        for (var i = 0; i < allpid.length; i++) {
            ite = allpid[i].ite
            oite = JSON.parse(ite)
        }
    }
    next()}

// === now
var allNow= function(req, res, next) {
    allnow=adb.allNow(email)
    console.log("===allnow")
    console.log(allnow)

    next()}

// === pal
var allPal= function(req, res, next) {
    allpal=adb.allPal(email)
    if(!allpal.length==0){
    var son=allpal[0].ite
    son.replace(/^/,"\"")
    var str="{\"name\":\"ass\"}"
    var obj=JSON.parse(str)
    console.log(obj)

    console.log("===res")
    allpal.forEach(function(res){
        console.log(res.ite)
    })
    }else{console.log("no allpal")}
    next()}

var chk = function(req, res, next) {

    console.log("=== chk =====================")
    console.log(email)
    console.log(usr)
    console.log(allpid)
    next()
} //chkEma

var gcb = function(req, res) {
    res.render("shop/history", {
        title: "history", usr: usr, selpid: selpid, allpid: allpid, allnow: allnow, oite: oite,
        allpal:allpal
    })
}

router.get("/shop/history", [getEma, getUsr, allPid, allPal,chk, gcb])

module.exports = router
