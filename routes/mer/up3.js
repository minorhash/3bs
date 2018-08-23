var express = require('express');
var router = express.Router();
var process = require('process');

// === db ===
var db = require('cardb');
var adb = require('usrdb');

// glob
var email, sku, song, allmer, usr, bool, myerr;
var mailusr, skumer;
var bod, name, pri, img, rel, cat, des;
// === post

var getEma = function(req, res, next) {
  if (req.session) {
    email = req.session.email;
  } else {
    email = null;
    console.log('no sess');
  }
  next()}; //getEma

var getUsr = function(req, res, next) {
  if (email) {
    try {
      mailusr = adb.mailUsr(email);
    } catch (err) {
      console.log(err);
    }
    usr = mailusr.name;
  } else {
    (usr = null), console.log('no mail');
  }
  next()};

var putBod = function(req, res, next) {
  bod = req.body;
  sku = bod.sku;
  name = bod.name;
  pri = bod.pri;
  rel = bod.rel;
  cat = bod.cat;
  des = bod.des;
  song = bod.song;
  // up

  next()}; //getMer

var putMer = function(req, res, next) {
  try {
    db.namMer(name, sku);
    db.priMer(pri, sku);
    db.relMer(rel, sku);
    db.catMer(cat, sku);
    db.desMer(des, sku);
    db.sonMer(song, sku);
  } catch (err) {
    console.log(err)}

  next()};

var getMer = function(req, res, next) {
try {    skumer = db.skuMer(sku);  }
catch (err) {    console.log(err);  }
next()}; //getMer

var chk = function(req, res, next) {
  console.log(email);
  console.log(usr);
  console.log(name);
  console.log(pri);
  console.log(song);
  next()};

var rcb = function(req, res, next) {
  res.render('mer/up3', {
    title: 'up fin',
    sku: sku,    usr: usr,    bod: bod,
      skumer: skumer
  });
};

router.post('/mer/up3', [getEma, getUsr, putBod, putMer, getMer,
    chk, rcb]);
module.exports = router;
