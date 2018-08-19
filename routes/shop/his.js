var express = require('express');
var router = express.Router();
// == db =============================

var db = require('cardb');
var adb = require('usrdb');

var paypal = require('paypal-rest-sdk');

// === glob ============================
var email, usr, myerr;
var mailusr, selpid, allpid,allnow;
var ite, oite,tok,atok,sid,palid,sit,sitem
var hea
var item=[],aite=[];
// === get ============================
var getEma = function(req, res, next) { var cred = require('./js/cred'); email = cred.ema(req);
next();
}; //getEma

var getUsr = function(req, res, next) {
var cred = require('./js/cred');
usr = cred.usr(email);
next();
};

//  aid
var allPid = function(req, res, next) {
if(!email){    allpid=[]; oite=[]
console.log('=== no all pid ==================');
}else{

allpid= adb.allPid(email);
for (var i = 0; i < allpid.length; i++) {
ite = allpid[i].ite;
oite = JSON.parse(ite);
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
    console.log("===allpal")
    console.log(allpal)

next()}

var itePal= function(req, res, next) {
for(var i=0;i<atok.length;i++){
paypal.payment.get(atok[i],function(err,pay){
//console.log(pay.transactions[0].amount)

aite=JSON.stringify(pay.transactions[0].item_list.items)
//item.push(aite)
//adb.itePal(item[i],atok[i])
})
}
next()}

var chk = function(req, res, next) {

  console.log('=== chk =====================');
  console.log(email);
  console.log(usr);
  console.log(allpid);
  console.log(allnow);
  console.log(allpal);
  next();
}; //chkEma

var gcb = function(req, res) {
res.render('shop/history', {
title: 'history', usr: usr, selpid: selpid, allpid: allpid, allnow: allnow, oite: oite
});
};

router.get('/shop/history', [getEma, getUsr, allPid, allNow,allPal,chk, gcb]);

module.exports = router;
