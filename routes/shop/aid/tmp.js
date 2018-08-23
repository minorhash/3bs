var    pid = 'pay_Wz8zdysAAF0AirLI'
var age=require("./age")
var str=age.get(pid)
console.log("=== ===")
//console.log(str)
var utc = new Date().toJSON().slice(0,10).replace(/-/g,"/")
console.log(utc)

