var express = require('express');
var router = express.Router();
// == post =============================

var email, usr, mailusr, myerr;

var clrEma = function(req, res, next) {
  req.session = null;
  res.clearCookie('session');
  res.clearCookie('sess');
  res.clearCookie('coo');

  next()};

var getEma = function(req, res, next) {
  if (req.session) {
    email = req.session.email;

  } else {
    console.log('no sess');
  }
  next();
}; //getEma


var unSon= function(req, res, next) {
var fs = require('fs');
var son=__dirname+"/../../../public/son/"+email+".js"

// fs.stat(son, function(err, stats) {
// if(err){throw err}
// console.log(son);
// })

fs.unlink(son,function(err) {
if (err) {return console.log(err);    }
else {console.log('no err');    }
console.log('unlink!');
});
  next()};

var chk = function(req, res, next) {
  console.log('=== log out === ');
  console.log(req.session);
  console.log(req.cookies);
  next();
};

var rcb = function(req, res) {
  res.render('shop/usr/out', {
    title: 'logged out',
    email: email,
    usr: usr,
    err: myerr,
  });
};

router.post('/shop/usr/out', [getEma,unSon,clrEma, chk, rcb]);
module.exports = router;
