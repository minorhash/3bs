var express = require("express")
var router = express.Router()
// === pal
var paypal = require("paypal-rest-sdk")
require(__dirname + "/config")

var adb = require('usrdb')

var pal = require("mypal")
var mypal = pal.myPal()
var tran=mypal.transactions[0]

var tmp_a = [],  mer_a = [],  sum_a = [],  uni_s = [],  pri_s = [],skua=[]
var email, usr, mer, sum, add,ite
var mailtmp,mailusr

// === db
var db = require("cardb")

// post ======================================
var getEma = function(req, res, next) {
    var cred = require("../js/cred")
    email = cred.ema(req)
mailusr=  adb.mailUsr(email)
    next()
} //getEma

var getUsr = function(req, res, next) {
if(req.session.pss){
if(req.session.pss==mailusr.pss){usr=mailusr.name}
else{usr=null;console.log("no usr")}
}else{console.log("no pss")}
next()};

var putTmp = function(req, res, next) {
tmp_a = []
if (email) {
mailtmp = db.mailTmp(email)
for (var i = 0; i < mailtmp.length; i++) {
if (mailtmp[i].uni !== 0) {
tmp_a.push(mailtmp[i])
} //if
} //for
} else {        console.log("no mail")    }
next()}

var putMer = function(req, res, next) {
    mer_a = []
    //tran.item_list.items = []
    if (tmp_a) {
        for (var i = 0; i < tmp_a.length; i++) {
            mer_a.push(db.skuMer(tmp_a[i].sku))
            uni_s[i] = tmp_a[i].uni.toString()
            pri_s[i] = mer_a[i].pri.toString()
            skua[i] = mer_a[i].sku.toString()
            ite = {
                name: mer_a[i].name,
                quantity: uni_s[i],
                price: pri_s[i],
                sku: tmp_a[i].sku,
                currency: "JPY",
            }
            tran.item_list.items.push(ite)
        }
    } else {        console.log("no tmp_a")    }
    next()}


var chkSh= function(req, res, next) {

boa=[]
for(var i=0;i<skua.length;i++){

console.log("=== chk dl ===")
var pat=/^\d{3}$/;
var test=pat.test(skua[i])
boa.push(test)
}

console.log(skua)
console.log(boa)
ind=boa.indexOf(true)

next()};

// === sum ===
var getSum = function(req, res, next) {
    sum_a = []
    for (var i = 0; i < tmp_a.length; i++) {
        sum_a.push(mer_a[i].pri * tmp_a[i].uni)
    }
    if (sum_a.length !== 0) {
        add = sum_a.reduce(function(tot, cur) {
            return tot + cur
        })
        var str=add.toString()
var ship=null
if(ind==0){ship=650}
        else{ship=0}

        var sship=ship.toString()
        var sum=add+ship
        var ssum=sum.toString()
        console.log("=== amount===")
        tran.amount.details.subtotal =str
        tran.amount.details.shipping=sship
        tran.amount.total =ssum
    }
    next()}

// === pal ===

var goPal = function(req, res) {
    paypal.payment.create(mypal, function(err, pay) {
        if (err) {
            console.log("err.response.name")
            console.log(err.response.name)
            console.log(err.response.details)
            throw err.message      }
        else {
            console.log(pay.links[1].href)
            res.redirect(pay.links[1].href)
        } //else
    })
}

//var json=JSON.stringify(mypal)

var chk = function(req, res, next) {
    console.log("=== mypal")
    //console.log(mypal)
    console.log(ind)
    console.log("=== items")
    console.log(tran.item_list)
    console.log("=== amount")
    console.log(tran.amount.total)
    console.log(tran.amount)

    next()}

var rcb = function(req, res) {
    res.render("shop/paypal/pay", {
        seltmp: mailtmp,
        sum: sum,
        mer: mer,
        usr: usr,
        email: email,
        mypal:mypal
    }) //rend
}

router.get("/shop/paypal/pay", [
    getEma,getUsr,putMer,putTmp,putMer,chkSh,getSum,chk,goPal
])

module.exports = router
