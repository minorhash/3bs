var express = require('express');
var router = express.Router();

// === db
var db = require('cardb');
var adb = require('usrdb');
var allmer = db.allMer();

var email, allmer, usr, bool, myerr, mailusr;
// === get

var getEma = function(req, res, next) {
  if (req.session) {
    email = req.session.email;
  } else {
    email = null;
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
    usr = mailusr.name;
  } else {
    usr = null;
    console.log('no email');
  }
  next();
};

var chk = function(req, res, next) {
  console.log(email);
  console.log(usr);
  next();
};

var robj = {
    title: 'merch admin',
    usr: usr,
    mer: allmer,
  };
var cb = function(req, res, next) {
  res.render('mer', robj);
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
    } catch (err) {
      myerr = err;
      console.log(err);
    }
    if (mailusr && email == 'd1nesh@mail.com' && pss == 'chugta1') {
      usr = mailusr.name;
    } else {
      console.log('no adm');
    }
  } else {
    console.log('no email');
  }
  next();
}; //getUsr

var chk = function(req, res, next) {
  console.log(email);
  console.log(pss);
  console.log(usr);
  next();
};

var rcb = function(req, res) {
  var rob = { usr: usr, mer: allmer, err: myerr };
  res.render('mer', rob);
};

router.post('/mer', [getCok, getAdm, chk, rcb]);

module.exports = router;
