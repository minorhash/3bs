var express = require("express")
var router = express.Router()
var paypal = require("paypal-rest-sdk")
// === db
var adb = require("usrdb")
var db = require("cardb")

var usr,email,mailtmp,mer
var pid,payerId,exeJson,getpal
var sum,suma,item=[]
var mes

var cnf=require("../son/pal.json")

paypal.configure({
mode: cnf.sand,
//mode: cnf.live,
client_id:cnf.tid,
//client_id:cnf.lid,
client_secret:cnf.tsc
//client_secret:cnf.lsc
})

// === db

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
    } else {console.log("no mailtmp")    }
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
if (error) {console.log("exe fail");
res.redirect("/shop/cart")
}
else {
item=pay.transactions[0].item_list.items
var ite=JSON.stringify(pay.transactions[0].item_list.items)
console.log(item)

adb.insPal(email,pay.id,ite,utc)

var i18=require("../../../i18n/shop/ja.json")

for(var i=0;i<item.length;i++){
mes=usr+"様<br>"
+i18.cau1+i18.cau2+i18.cau3
    +i18.lin1
+i18.cont+i18.pid+":"+pid+"<br>"
+i18.title+":"+item[i].name+"<br>"
+i18.sku+": TMS-"+item[i].sku+"<br>"
+i18.price+":"+parseInt(item[i].price).toLocaleString()+"円<br>"
+i18.unit+":"+item[i].quantity+"<br>"
   +i18.pay +i18.pal+"<br>"
    +i18.lin1
+i18.ship1+i18.ship2+i18.ship3
+i18.ship4+i18.ship5
+i18.misc+i18.lin1+i18.auto1+i18.auto2
        +i18.lin1
+i18.shop+i18.adr1+i18.adr2+i18.adr3
}

console.log('=== senEma =======================================');
}//else
snde.trEma(email,reg,mes);

res.render("shop/paypal/success", {
usr:usr,
title:reg,
pid: pid,
payid:payerId,
pay:pay,
item:item
})
})
}

router.get("/shop/paypal/success", [getEma,getUsr,getTmp,putMer,putSum,redSum,getPid,
exePal,chk])

module.exports = router
