var express = require("express")
var router = express.Router()
var paypal = require("paypal-rest-sdk")
// === db
var adb = require("usrdb")
var paljs=require("../js/pal")

var usr,email,mailtmp,mer
var pid,payerId,exeJson,getpal
var sum,suma,item

var snde = require('snd-ema');
var conf=require("../son/pal.json")

paypal.configure({
    mode: conf.MODE,
    client_id:conf.ID,
    client_secret:conf.SEC
})

// === db
var db = require("cardb")

// === get

var getEma = function(req, res, next) {
    var cred = require("../js/cred")
    email = cred.ema(req)
    next()} //getEma

var getUsr = function(req, res, next) {
    var cred = require("../js/cred")
    usr = cred.usr(email)
    next()}

var getTmp = function(req, res, next) {
    mailtmp = []
    if (email) {
    mailtmp = db.mailTmp(email)
    } else {        console.log("no mail")    }
    next()}

var putMer = function(req, res, next) {
    mer=[]
    if (mailtmp) {
        for (var i = 0; i < mailtmp.length; i++) {
            mer[i] = db.skuMer(mailtmp[i].sku)
        }
    } else {        console.log("no mailtmp")    }
    next()}

var putSum = function(req, res, next) {
    suma = []
    if (mailtmp) {
        for (var i = 0; i < mailtmp.length; i++) {
            suma[i] = mailtmp[i].uni * mer[i].pri
        }
    } else {        console.log("no mailtmp")    }
    next()}

var redSum = function(req, res, next) {
    sum = ""
    function getSum(total, num) {        return total + num    }
    if (suma.length !== 0) {
        sum = suma.reduce(getSum)
    } else {        console.log("no sum")    }
    next()}

var getPid= function(req, res, next) {
    pid = req.query.paymentId
console.log(pid)
    payerId = req.query.PayerID
    exeJson = {
        payer_id: payerId,
        transactions: [{amount: {currency: "JPY",total: sum}}],
    }
    next()}

var chk= function(req, res, next) {
    console.log("=== suc ===")

    next()}

var senEma = function(req, res, next) {
var mes=name+"サマ<br>"+reg
console.log('=== senEma =======================================');
snde.trEma(email,reg,mes);
next()};

var exePal= function(req, res) {
var utc = new Date().toJSON().slice(0,10).replace(/-/g,"/")
paypal.payment.execute(pid, exeJson, function(error, pay) {
if (error) {console.log("exe fail");throw error    }
else {
var ite=    JSON.stringify(pay.transactions[0].item_list)
adb.insPal(email,pay.id,ite,utc)
console.log(ite)
console.log(utc)
res.render("shop/paypal/success", {
title: "ご購入ありがとうございました。",
pid: payerId,
payid: pid,
pay:pay
})
var mes=name+"サマ<br>"+reg
console.log('=== senEma =======================================');
snde.trEma(email,reg,mes);
}
})
}

router.get("/shop/paypal/success", [getEma,getUsr,getTmp,putMer,putSum,redSum,getPid,chk,exePal])

module.exports = router
