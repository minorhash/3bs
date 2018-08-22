var nodemailer = require("nodemailer");
//console.log(__dirname)
var cnf=require(__dirname+"/son/cnf.json")

var trans = nodemailer.createTransport({
host: cnf.HOST,port: 465,
tls: true,
auth: {user:cnf.USR,pass:cnf.PSS}
});

exports.trEma=function(to,sub,mes){

try{
trans.sendMail({
from:cnf.USR,
to: to,
cc:cnf.CC,
subject:sub,
html:mes
})
}catch(err){console.dir(err);}

}
