var config = {
"api_key": "pk_0000_000000000000000",
"logo_url": "http://www.paidy.com/images/logo.png",
"closed": function(callbackData) {
/*
Data returned in the callback:
callbackData.id,
callbackData.amount,
callbackData.currency,
callbackData.created_at,
callbackData.status 
*/     
 }
   };
   var paidyHandler = Paidy.configure(config); 
   function paidyPay() {
 var payload = {
"amount": 100,
"currency" : "JPY",
"store_name": "Paidy sample store",
"buyer": {
     "email": "successful.payment@paidy.com",
     "name1": "山田　太郎",
     "name2": "ヤマダ　タロウ",
     "phone" : "08000000001",
     "dob": "1990-10-25"
},
"buyer_data": {
     "age": 29,
     "order_count": 1000,
     "ltv": 250000,
     "last_order_amount": 20000,
     "last_order_at": 20
},
"order": {
     "items": [
          {
               "id":"PDI001",
               "quantity":1,
               "title":"Paidyスニーカー",
               "unit_price":10000,
               "description":" "
          }
     ],
     "order_ref": "20161214ato06",
     "shipping": 0,
     "tax": 0
},
"shipping_address": {
     "line1": "AXISビル 10F",
     "line2": "六本木4-22-1",
     "city": "港区",
     "state": "東京都",
     "zip": "106-2004"
},
"description" : "Sample store"
   };
   paidyHandler.launch(payload);
     };

