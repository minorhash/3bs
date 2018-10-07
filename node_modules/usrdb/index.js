var Database = require('better-sqlite3');
var db = new Database(__dirname+'/db/aid.db');

// === usr ===
exports.mailUsr=function(arg2){
var stm=db.prepare('select * from usr where email=?');
var row=stm.get(arg2);
return row;
};
exports.psslUsr=function(arg2){
var stm=db.prepare('select * from usr where pss=?');
var row=stm.get(arg2);
return row;
};
exports.namUsr=function(arg2){
var stm=db.prepare('select * from usr where name=?');
try{var row=stm.all(arg2);
}catch(err){console.log(err);}
return row;
};
exports.allUsr=function(){
var stm=db.prepare('select * from usr ');
var row=stm.all();
return row;
};
exports.phnUsr=function(arg2){
var stm=db.prepare('select * from usr where phn=?');
try{var row=stm.get(arg2);
}catch(err){console.log(err);}
return row;
};

// === adr ===
exports.mailAdr=function(email){
var stm=db.prepare('select * from adr where email=? ');
try{var row=stm.get(email);}catch(err){console.log(err)}
return row;
};
exports.insAdr=function(email,phn,ln1,ln2,city,sta,zip){
var stm=db.prepare('insert into adr values(?,?,?,?,?,?,?)')
try{stm.run(email,phn,ln1,ln2,city,sta,zip);}
catch(err){console.log(err);}
};
exports.phnAdr=function(phn,email,){
var stm=db.prepare('update adr set phn=? where email=?')
try{stm.run(phn,email);}catch(err){console.log(err);}
};
// === usr run ===
exports.updUsr=function(uni,usr,sku){
var stm=db.prepare('update usr set uni=? where usr=? and sku=? ');
try{stm.run(uni,usr,sku);
}catch(err){console.log(err);}
};

exports.insUsr=function(name,pss,email){
var stm=db.prepare('insert into usr values(?,?,?) ');
stm.run(name,pss,email);
};

exports.delusr=function(){
var stm=db.prepare('delete from usr where uni=0');
try{stm.run();
}catch(err){var err=err;console.log(err);}
};
// === mer ===
exports.allMer=function(){
var stm=db.prepare('select *,rowid from mer');
try{var row=stm.all();
}catch(err){console.log(err);}
return row;
};

exports.skuMer=function(sku){
var stm=db.prepare('select * from mer where sku=?');
try{var row=stm.get(sku);
}catch(err){console.log(err);}
return row;
};

exports.insMer=function(name,sku,pri,img,rel,cat,des){
var stm=db.prepare('insert into mer values(?,?,?,?,?,?,?)');
stm.run(name,sku,pri,img,rel,cat,des);
};

// === pid ===

exports.insPid=function(email,pid){
var stm=db.prepare('insert into pid values(?,?)');
stm.run(email,pid,mnt,buy,ite)
};

exports.getPid=function(email){
var stm=db.prepare('select *,rowid from pid where email=? order by rowid desc ');
try{var row=stm.get(email);
}catch(err){console.log(err);}
return row;
};

exports.allPid=function(email){
var stm=db.prepare('select *,rowid from pid where email=? order by rowid desc ');
try{var row=stm.all(email);
}catch(err){console.log(err);}
return row;
};

exports.selPid=function(pid){
var stm=db.prepare('select *,rowid from pid where email=?');
try{var row=stm.get(pid);
}catch(err){console.log(err);}
return row;
};


exports.maxPid=function(){
var stm=db.prepare('select rowid from pid order by rowid desc');
try{var row=stm.get();
}catch(err){console.log(err);}
return row;
};

exports.idPid=function(id){
var stm=db.prepare('select * from pid where rowid=?');
try{var row=stm.get(id);
}catch(err){console.log(err);}
return row;
// === req pid
exports.reqPid=function(pid){
var sec = 'sk_test_qbmquibktb7s3n4dov1mdihod3';
var hreq= require('httpreq');
var obj
var url= "https://api.paidy.com/payments/"+pid
const opt= {
headers:{ "Content-Type": "application/json" ,
"Paidy-Version": "2016-07-01",
"Authorization": "Bearer "+sec}
};

hreq.get(url,opt,  function(err,res){
if (err) { return console.log(err); }
else{
obj=JSON.parse(res.body)
    console.log("=== req aid ====")
    console.log(obj.amount)
//    console.log(res.body)
    return obj
}
})
}//reqPid

};
// === aid ======================================================
exports.allAid=function(){
var stm=db.prepare('select * from aid');
try{var row=stm.all();}catch(err){console.log(err);}
return row;
};
exports.insAid=function(usr,pss,email,phn){
var stm=db.prepare('insert into aid values(?,?,?,?)');
stm.run(usr,pss,email,phn);
};
exports.updAid=function(pid,usr){
var stm=db.prepare('update aid set pid=? where usr=?');
stm.run(pid,usr);
};
exports.ordAid=function(usr,pid,name,mnt,dat,stat){
var stm=db.prepare('insert into aid_ord values(?,?,?,?,?,?)');
stm.run(usr,pid,name,mnt,dat,stat);
};

// === pal ===

exports.insPal=function(email,id,ite){
var stm=db.prepare('insert into pal values(?,?,?)');

try{stm.run(email,id,ite)}
catch(err){console.log(err)}
};

exports.itePal=function(ite,tok){
var stm=db.prepare('update pal set ite=? where tok=?');
stm.run(ite,tok);
};

exports.getPal=function(email){
var stm=db.prepare('select *,rowid from pal where email=? order by rowid desc ');
try{var row=stm.get(email);
}catch(err){console.log(err);}
return row;
};

exports.allPal=function(email){
var stm=db.prepare('select *,rowid from pal where email=? order by rowid desc ');
try{var row=stm.all(email);
}catch(err){console.log(err);}
return row;
};
