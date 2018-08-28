var sg=require("superagent")

var cnf= require('../son/aid.json');

//var    pid = 'pay_Wz8zdysAAF0AirLI'
age={

get:function(pid){
sg
.get('https://api.paidy.com/payments/'+pid)
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+cnf.sec)
.then(res => {
       console.log(JSON.stringify(res.body.order.items))
       console.log(typeof res.body.order.items)
   });
},

mnt:function(pid){
sg
.get('https://api.paidy.com/payments/'+pid)
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+cnf.sec)
.then(res => {
console.log(res.body.amount)
});
},
buy:function(pid){
sg
.get('https://api.paidy.com/payments/'+pid)
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+cnf.sec)
.then(res => {
console.log(res.body.buyer)
});
}
}
module.exports=age
