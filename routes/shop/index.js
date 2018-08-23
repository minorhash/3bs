var express = require('express');
var cookie = require('cookie');
var router = express.Router();
// == sess =============================
var db = require('cardb'),
adb = require('usrdb'),
allmer = db.allMer();

var email, usr, myerr, coo;
var allmer, mailusr;

// === get ============================

var getEma = function(req, res, next) {
  var cred = require('./js/cred');
  email = cred.ema(req);
  next();
}; //getEma

var getUsr = function(req, res, next) {
  var cred = require('./js/cred');
  usr = cred.usr(email);
  next();
};

var chk = function(req, res, next) {
  console.log('=== get shop ===');
  console.log(email);
  console.log(usr);
  console.log(req.session);
  next();
}; //chkEma

var rcb = function(req, res) {
  res.render('shop', {
    title: 'shop',
    mer: allmer,
    usr: usr,
    err: myerr,
  });
};
router.get('/shop', [getEma, getUsr, chk, rcb]);

// == post ==================================

var usr, email, pss, allmer, myerr;
var getCok = function(req, res, next) {
  if (req.body) {
    req.session.email = req.body.email;
    req.session.pss = req.body.pss;
    email = req.session.email;
    pss = req.session.pss;
  } else {
    console.log('no req.body');
  } //req.body

  next()}; //getCok

var getUsr = function(req, res, next) {
  if (email && pss) {
    try {
      var mailusr = adb.mailUsr(email);
    } catch (err) {
      myerr = err;
      console.log(err);
    }
    if (mailusr) {
      usr = mailusr.name;
    } else {
      console.log('no usr');
    }
  } else {
    console.log('no email');
  }
  next();
}; //getUsr

var chk = function(req, res, next) {
  console.log('=== post shop ===');
  console.log(email);
  console.log(req.body);
  console.log(req.session);
  next();
};


var rcb = function(req, res) {
  var rob = { usr: usr, mer: allmer, err: myerr };
  res.render('shop', rob);
};

router.post('/shop', [getCok, getUsr, chk, rcb]);

module.exports = router;
