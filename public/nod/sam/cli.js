var CREATE_PAYMENT_URL  = 'https://my-store.com/paypal/create-payment';
var EXECUTE_PAYMENT_URL = 'https://my-store.com/paypal/execute-payment';

paypal.Button.render({

env: 'production', // Or 'sandbox'

commit: true, // Show a 'Pay Now' button

payment: function() {
return paypal.request.post(CREATE_PAYMENT_URL).then(function(data) {
return data.id;
});
},

onAuthorize: function(data) {
return paypal.request.post(EXECUTE_PAYMENT_URL, {
paymentID: data.paymentID,
payerID:   data.payerID
}).then(function() {

// The payment is complete!
// You can now show a confirmation message to the customer
});
}

}, '#paypal-button');
