var express = require("express")
var router = express.Router()
var paypal = require("paypal-rest-sdk")
// === db
var adb = require("usrdb")
var paljs=require("../js/pal")

var usr,email,mailtmp,mer
var pid,payerId,exeJson,getpal
var sum,suma,item

var conf=require("../son/pal.json")

paypal.configure({
mode: conf.sand,
client_id:conf.tid,
client_secret:conf.tsc
})

// === db
var db = require("cardb")

var cred = require('../js/cred');
// === get
var getEma = function(req, res, next) {
email = cred.ema(req);
mailusr=  adb.mailUsr(email)
next()}

var getUsr = function(req, res, next) {
if(mailusr){usr=mailusr.name}
else{usr=null;console.log("no usr")}
next()};

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
    } else {console.log("no sum")    }
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
    console.log(email)
    console.log(usr)
    next()}

var exePal= function(req, res) {
var utc = new Date().toJSON().slice(0,10).replace(/-/g,"/")
var reg="ご購入ありがとうございました。"
var snde = require('snd-ema');

paypal.payment.execute(pid, exeJson, function(error, pay) {
if (error) {console.log("exe fail");throw error    }
else {
var ite=    JSON.stringify(pay.transactions[0].item_list)

console.log(pay.id)
adb.insPal(email,pay.id,ite,utc)
console.log(ite)
console.log(utc)

res.render("shop/paypal/success", {
title:reg,
pid: pid,
payid:payerId,
pay:pay
})
var mes=usr+"サマ<br>"+reg
+"<br>"+pid
+"<br>"+ite

console.log('=== senEma =======================================');
snde.trEma(email,reg,mes);
}
})
}

router.get("/shop/paypal/success", [getEma,getUsr,getTmp,putMer,putSum,redSum,getPid,
exePal,chk])

module.exports = router
