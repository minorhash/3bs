var express = require('express');
var router = express.Router();
// === pal
const paypal = require('paypal-rest-sdk');
require('../routes/config');
var pal=require('mypal');
var mypal=pal.myPal();
var trans=mypal.transactions[0];
// === db
var db=require('cardb');
// post ======================================
router.post('/pay', function(req, res, next) {

console.log(trans);
var email=req.cookies.cmail;
console.log(email);

if(email){
var mailtmp=db.mailTmp(email);
var tmp_a=[];
var mer_a=[];
var sum_a=[];
for(var i=0;i<mailtmp.length;i++){
if(mailtmp[i].uni!==0){
tmp_a.push(mailtmp[i]);
}//if
}//for
}else{console.log("no mail");}

for(var i=0;i<tmp_a.length;i++){
mer_a.push(db.skuMer(tmp_a[i].sku));
}

var uni_s=[];
var pri_s=[];
for(var i=0;i<tmp_a.length;i++){

uni_s[i]=tmp_a[i].uni.toString();
pri_s[i]=mer_a[i].pri.toString();
//console.log(typeof uni_s[i]);

ite={name:mer_a[i].name,
quantity:uni_s[i],
price:pri_s[i],
sku:tmp_a[i].sku,
currency:"JPY"}
mypal.transactions[0].item_list.items.push(ite);
}

// === sum ===
for(var i=0;i<tmp_a.length;i++){
    sum_a.push(mer_a[i].pri*tmp_a[i].uni);
}
if(sum_a.length!==0){
var add= sum_a.reduce(function(tot,cur){ return tot+cur; });
}

// === pal ===
mypal.transactions[0].amount.total=add;
console.log(mypal.transactions[0].amount.total);
console.log(mypal.transactions[0].item_list.items);
console.log(tmp_a);

try{
paypal.payment.create(mypal, function (error, payment) {
if (error) {
console.log(error);
throw error.message;
} else {
for(let i = 0;i < payment.links.length;i++){
console.log(payment.links[i]);
if(payment.links[i].rel === 'approval_url'){
res.redirect(payment.links[i].href.replace(" =","="));
//res.redirect(payment.links[i].href);
}}}});
}catch(err){console.log(err);}
    
var json=JSON.stringify(mypal);

//res.render("pay",{
//title:"pay",
//mypal:mypal
//});//rend

});//post


module.exports = router;
