const paypal = require('paypal-rest-sdk');
var cnf=require("../son/pal.json")

paypal.configure({
  mode: cnf.sand,
  client_id:cnf.tid,
  client_secret:cnf.tsc
});
