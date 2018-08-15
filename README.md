<<<<<<< HEAD
# low-cart
## low-carb, fat free, and no nonsense shopping cart for express
### using express, sqlite, bootstrap3

- no database server required(file based db)
- ultra lite and fast using sqlite3 db
- using boostrap3


### required modules
- better-sqlite3
- nodemailer
- paypal-rest-sdk
- usrdb
```
sqlite db for merch and cart
```
- cardb
```
sqlite db for usr, paidy and paypal
```
- mypal

import paypal payment json template
```js
{
"intent": "sale",
"payer": {
"payment_method": "paypal"
},
"redirect_urls": {
"return_url": "http://localhost:3002/success",
"cancel_url": "http://localhost:3002/cancel"
},
"transactions": [{
"item_list": {"items": []},
"amount": {
"currency": "JPY",
"total": "3000"
},
"description": "This is the payment description."
}]
}
```
- aidy

import paidy payment template json
```js
{
"amount":100,
"currency":"JPY",
"store_name":"tmStore",
"buyer":{
    "email":"",
    "name1":"",
    "phone":""
    },
"buyer_data":{
"age":0,
"order_account":0,
"ltv":0,
"last_order_amount":0,
"last_order_at":0
},
"order":{
"items":[],
"shipping":""
},
"shipping_address":{
"line1":"",
"line2":"",
"city":"",
"state":"",
"zip":""
}
}
```

### ignored files
- routes/shop/son
#### credential json files
aid.json
```js
{
    "pub":"pk_test_***",
    "sec":"sk_test_***",
    "loc":"http://localhost:3000",
    "axe":"https://mysite.com"
}
```

ema.json: email credentials
```js
{
"HOST": "smtp.mysite.com",
"USR": "info@mysite.com",
"PSS": "bighead",
"EMA1": "nelson@mysite.com",
"CC1": "bighetti@mysite.com"
}
```

pal.json:paypal client_ID,client_SECRET
```js
{
"MODE": "sandbox", 
"ID":"AcR***",
"SEC":"EL8***"
}
```

- public/img/cd
merch images. 
```
you need to prepare your own.
```

=======
express cms with bootstrap.
>>>>>>> b4e42674530a2cec2c6936aca8a2c2ca55056558
