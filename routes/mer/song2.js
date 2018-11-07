var express = require('express');
var router = express.Router();

// === db
var db = require('cardb');
var adb = require('usrdb');
var allmer = db.allMer();

var email,
  allmer,
  usr,
  sku,
  song,
  song_a = [],
  bool,
  myerr,
  mailusr;
// === post

var getEma = function(req, res, next) {
  if (req.session) {
    email = req.session.email;
  } else {
    req.session = null;
    console.log('no sess');
  }
  next();
}; //getEma

var getUsr = function(req, res, next) {
  if (email) {
    try {
      mailusr = adb.mailUsr(email);
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('no email');
  }
  if (mailusr) {
    usr = mailusr.name;
  } else {
    console.log('no mailusr');
  }
  next();
};

var getSku = function(req, res, next) {
  if (req.body) {
    sku = req.body.sku;
    song = req.body.song;
    song_a = [];
    for (var i = 0; i < song; i++) {
      song_a[i] = i;
    }
  } else {
    console.log('no bod');
  }
  next();
};

var chk = function(req, res, next) {
  console.log(req.body);
  console.log(song);
  console.log(song_a);
  next();
};
var cb = function(req, res, next) {
  var robj = {
    title: 'merch admin',
    usr: usr,
    sku: sku,
    song: song,
    song_a: song_a,
  };
  res.render('mer/song2', robj);
};

router.post('/mer/song2', getEma, getUsr, getSku, chk, cb);

module.exports = router;
