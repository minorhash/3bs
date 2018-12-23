var express = require('express');
var router = express.Router();
var crypto = require('crypto');
// == db =============================
var db = require('cardb');
var adb = require('usrdb');
var str = crypto
  .createHash('md5')
  .update(Math.random().toString())
  .digest('hex');
//console.log(str)

var email, usr, sku,par
var skupre, mailusr, mailtmp
// === post =============================
var cred = require('./js/cred');

var getEma = function(req, res, next) {
email = cred.ema(req);
mailusr=  adb.mailUsr(email)
  next()}

var getUsr = function(req, res, next) {
if(mailusr){usr=mailusr.name}
else{usr=null;console.log("no usr")}
next()};

var getSku = function(req, res, next) {
sku = req.body.sku;
par=req.params.id

if (sku) {
try {skupre= db.skuPre(sku);
} catch (err) {      console.log(err);    }
} else {    console.log('no sku');  }
next()}; //getSku

var chk = function(req, res, next) {
  console.log(sku);
  console.log(par);
  console.log(skupre);
  next();
};
// === rend
var rcb = function(req, res) {
rob = { title: 'pre-item', usr: usr, skupre: skupre,par:par}
res.render('shop/pre-item', rob);
}; //rcb
var arr=[getEma, getUsr, getSku,  chk, rcb]
router.post('/shop/pre-item:id', arr)

module.exports = router;
