var fs=require('fs');
//var jf=require('jsonfile');
exports.myPal=function(){

try{
var tmp="node_modules/mypal/tmp.json";
var obj=require(__dirname+"/tmp.json")
}catch(err){console.log(err)}
return obj;
};

