var config={"api_key":"pk_test_pvve8rdmjtcqbjejq4idolh8l9","closed":function(cb){var xhr = new XMLHttpRequest();xhr.open("PUT", "http://localhost:3023/shop/aid/pid", true);xhr.setRequestHeader("Content-Type", "application/json");xhr.send(JSON.stringify(cb));}};var hand=Paidy.configure(config);function paidyPay(){var load={"amount":1211,"currency":"JPY","store_name":"tmStore","buyer":{"email":"successful.payment@paidy.com","name1":"さくせすタロウ","phone":""},"buyer_data":{"age":10,"order_account":0,"ltv":1211,"last_order_amount":1211,"last_order_at":10},"order":{"items":[{"id":"3411","quantity":1,"title":"ass","unit_price":100},{"id":"358","quantity":1,"title":"シアワセメロディー（TypeB）","unit_price":1111}],"shipping":650},"shipping_address":{"line1":"AXISΝ 10","line2":"ろっぽんぎ4-22-1","city":"みなとく","state":"とうきょうと","zip":"1062004"}};hand.launch(load);};