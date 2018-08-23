var paypal = require("paypal-rest-sdk")
var pal=require("mypal")
var mypal=pal.myPal()
var item=mypal.transactions[0].item_list

var adb = require('usrdb');
var pay= {
get: function(pid) {

paypal.payment.get(pid, function (error, pay) {
    if (error) {
        console.log(error);
        throw error;
} else {
console.log("=== Get Payment Response");

return pay.transactions[0].item_list
console.log(pay.transactions[0].item_list)

}
});
}
};

module.exports = pay;
