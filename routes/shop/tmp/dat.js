var dat=new Date()
var str=dat.toString()
console.log(str)
var dd=dat.getDate()
console.log(dd)
var mon=dat.getMonth()+1
console.log(mon)
var yea=dat.getFullYear()
console.log(yea)
var to=yea+"/"+mon+"/"+dd
console.log(to)

var utc = new Date().toJSON().slice(0,10).replace(/-/g,"/")
console.log(utc)

