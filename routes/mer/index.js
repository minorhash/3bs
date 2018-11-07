var express = require('express');
var router = express.Router();

// === db
var db = require('cardb');
var adb = require('usrdb');
var allmer = db.allMer();

var email, allmer, usr, bool, myerr, mailusr;
// === login ============================
var cred = require("./js/cred");

// === get

var getEma = function(req, res, next) {
  email = cred.ema(req);
  mailusr = adb.mailUsr(email);
  next();
};

var getUsr = function(req, res, next) {
  if (mailusr) {
    usr = mailusr.name;
    console.log( usr);
  } else {
    usr = null;
    console.log("no usr");
  }
  next();
};


var chk = function(req, res, next) {
  console.log(email);
  console.log("=== usr");
  console.log(allmer);
  next();
};


var cb = function(req, res, next) {
var robj = {
    title: 'get merch',
    usr:usr,
    email:email,
    mer: allmer
  };

  res.render('mer',robj);
};

router.get('/mer', getEma, getUsr, chk, cb);

// == post =============================

var getCok = function(req, res, next) {
  if (req.body) {
    req.session.email = req.body.email;
    req.session.pss = req.body.pss;
    email = req.session.email;
    pss = req.session.pss;
  } else {
    console.log('no req.body');
  } //req.body

  next();
}; //getCok

var getAdm = function(req, res, next) {
  if (email) {
    try {
      mailusr = adb.mailUsr(email);
     usr = mailusr.name;
    } catch (err) {
      console.log(err);
    }
    // if (mailusr && email == 'd1nesh@mail.com' && pss == 'chugta1') {
    //   usr = mailusr.name;
    // } else {
    //   console.log('no adm');
    // }

  } else {
    console.log('no email');
  }
  next();
}; //getAdm

var chk = function(req, res, next) {
  console.log(email);
  console.log(pss);
  console.log(usr);
  next();
};

var rcb = function(req, res) {
  var rob = { usr: usr, title:"post usr", mer: allmer};
  res.render('mer', rob);
};

router.post('/mer', [getCok,getAdm, chk, rcb]);

module.exports = router;
