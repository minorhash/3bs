var url = 'http://localhost:3000';

var app = require('../app'),
ema = require('../routes/shop/son/ema'),
chai = require('chai'),
request = require('supertest'),
age = require('superagent'),
expect = chai.expect;

var ses = require('supertest-session');
 
var testSes = null;

var email=ema.AID
var pss=ema.APSS

var arr=[
"shop","shop/cart"
]


describe('POST', function() {
beforeEach(function () {
testSes = ses(app);
});
it('should sign in', function (done) {
    for(var i=0;i<arr.length;i++){
testSes.post('/'+arr[i])
    .send({ email:email , pss:pss}) 
    .expect(200)
    .end(done);
    }
});
})


describe('after auth', function () {
var auth
 
beforeEach(function (done) {
testSes.post('/shop')
    .send({ email:email , pss:pss}) 
      .expect(200)
      .end(function (err) {
        if (err) return done(err);
        auth=testSes 
        return done();
      });
  });

it('should get a restricted page', function (done) {
auth.get('/shop')
    //.expect(200)
.end(function(req,res){
expect(200)
expect(res.body).to.exist
});
      done()
});
});

describe('CART AUTH', function () {
it('should sign in', function (done) {
testSes.post('/shop/cart')
    .send({ email:email , pss:pss}) 
      .expect(200)
      .end(function (err) {
        if (err) return done(err);
        auth=testSes 
        return done();
      });
  });

it('cart', function (done) {
    auth.get('/shop/cart')
    //.expect(200)
.end(function(req,res){
expect(200)
expect(res.body).to.exist
});
      done()
});
});

//var arr = [
  //'usr/adr',
  //'note/agmt',
  //'cart',
  //'note/guide',
  //'history',
  //'my',
  //'note/notation',
  //'usr/sig',
  //'paypal/pay'
//];

// === desc
//describe('GET', function() {

//var red="https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout"
  ////
//for (let i = 0; i < arr.length; i++) {
//console.log(arr[i]);
//it('===== get =====', function(done) {
//request(app)
//.get('/shop/' + arr[i])
//.end(function(err, res) {
//if(err) return done(err)

////var red="https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-12P08543JV5191154"
////res.should.redirectTo(red)
//.expect(200)
//.expect(function(req,res){
  //// user-provided function can include Chai assertions
  //expect(res.body).to.exist;
  //expect(req.session).to.exist;
  //expect(res.body).to.have.property('email');
//})
//done();
          ////console.log(res.req)
//});//end
//});//it
//}//for
//}); //describe
