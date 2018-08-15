var adb = require('usrdb');
var cred = {
  ema: function(req) {
if (req.session) {
email = req.session.email;
//email="successful.payment@paidy.com"
//email = req.session.email;
email="successful.payment@paidy.com"
      return email;
    } else {
      email = null;
      console.log('no sess');
    }
  },
  usr: function(email) {
    if (email) {
      try {        mailusr = adb.mailUsr(email);      }
      catch (err) {        console.log(err);      }
      usr = mailusr.name;
      return usr;
    } else {      usr = null;        console.log("no usr")    }
  },
  pss: function(email) {
    if (email) {
      try {        mailusr = adb.mailUsr(email);      }
      catch (err) {        console.log(err);      }
      pss= mailusr.pss;
      return usr;
    } else {      pss= null;        console.log("no pss")    }
  }

};

module.exports = cred;
