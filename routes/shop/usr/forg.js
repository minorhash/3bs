var express = require('express');
var router = express.Router();
var adb = require('usrdb');
// === mail
var nodemailer = require('nodemailer');
var snem = require('snd-ema');
// === json
var cnf= require('../son/aid.json');
var ema= require('../son/ema.json');
// === glob
var email,usr,pss
var mailusr

var getEma = function(req, res, next) {
    email=req.body.email
  next()};

var getUsr = function(req, res, next) {
mailusr=adb.mailUsr(email)
usr=mailusr.name
pss=mailusr.pss

  next()};

var senEma = function(req, res, next) {
var sub="dear,"+usr
var mes="usr name: "+usr
+ "<br>pss:"+pss
console.log('=== senEma =======================================');

snem.trEma(
cnf.HOST,cnf.USR,cnf.PSS,
cnf.USR,email,ema.cc,
sub,mes
);
next()};

var chk= function(req, res, next) {
console.log(email)
console.log(mailusr)
next()}
/* GET home page. */
var gcb = function(req, res, next) {
  res.render('shop/usr/for', {
    title: 'please enter your email.'
}); //rend
};

var pcb = function(req, res, next) {
  res.render('shop/usr/for_fin', {
    title: "password sent"
}); //rend
};
router.get('/shop/usr/for', gcb);
router.post('/shop/usr/for_fin', [getEma,getUsr,senEma,chk,pcb]);

module.exports = router;
