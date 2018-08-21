var express = require('express');
var router = express.Router();

//var nodemailer = require('nodemailer');
var snem = require('snd-ema');
// === json
var cnf=require("../son/cnf.json")
var ema=require("../son/ema.json")

var usr,email

var getEma = function(req, res, next) {
var cred = require("../js/cred");
//  email = cred.ema(req);
email="jinjasaisen@gmail.com"
  next();
}; //getEma

var getUsr = function(req, res, next) {
  var cred = require("../js/cred");
  //usr = cred.usr(email);
    usr="jinja"
  next();
};
// === fun
var senEma = function() {
console.log('=== senEma =======================================');
var mes=usr+"サマ"

snem.trEma(
cnf.HOST,cnf.USR,cnf.PSS,
ema.from,email,ema.cc,
ema.sub,mes
);
};

router.put('/shop/usr/mail', [getEma,getUsr,senEma])

module.exports = router;
