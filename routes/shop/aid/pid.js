var express = require('express');
var router = express.Router();
// === db =============================
var db = require('cardb');
var adb = require('usrdb');

var cnf=require("../son/aid.json")
// === glob =============================
var email, dat, pid, str, mai, mnt, usr, sku;
var mailusr;
var inspid, getpid, selpid, strbuy, strite;
var buy, ite, itea, oite;

// === fun =============================
var getEma = function(req, res, next) {
  var cred = require('../js/cred');
  email = cred.ema(req);
  next()}; //getEma

var getUsr = function(req, res, next) {
  var cred = require('../js/cred');
  usr = cred.usr(email);
  next()};

var putPid = function(req, res, next) {
  if (req.body) {
    pid = req.body.id;

  inspid = adb.insPid(email,pid);
    console.log('=== putPid ===');
    console.log(pid);
  } else {    console.log("no pid");  }
  next()};

var selPid = function(req, res, next) {
  console.log('=== selPid ===');
  selpid = adb.selPid(pid);
  next()};

var getIte = function(req, res, next) {
  if (selpid) {
    for (var i = 0; i < selpid.length; i++) {
console.log(selpid[i].ite);
      //        itea.push(selpid[i].ite)
    }
  } else {
    console.log('no selpid');
  }
  next()};

var senEma = function(req, res, next) {
var mes=name+"サマ<br>"+reg
console.log('=== senEma =======================================');
snem.trEma(
email,reg,mes
);
next()};

// var senEma = function(req, res, next) {
//   var snem = require('snd-ema');
//   var sub = 'sub:' + usr;
//   var mes = 'mes:' + pid;

  //var oite = JSON.parse(ite);
  //for (var i = 0; i < oite.length; i++) {
    //sku = oite[i].id;
    //tit = oite[i].title;
    //img =
      //"<img src='https://3axe.tmsmusic.tokyo/img/cd/" + oite[i].id + ".png'>";
  //}

  //console.log(sku);
  //var mes =
    //'loc pid:' + pid + '<br>sku:' + sku + '<br>title:' + tit + '<br>' + img;
// snem.trEma(   ema.HOST,    ema.USR,   ema.PSS,    email,   ema.EMA1,    sub,    mes  );
//   next();
// };

var chk = function(req, res, next) {
  console.log('=== pid =======================================');
  console.log(pid);
  //console.log(ite[0].id)
  //console.log(itea)
};

router.put('/shop/aid/pid', [getEma, getUsr, putPid, selPid,getIte,
    chk]);
module.exports = router;
