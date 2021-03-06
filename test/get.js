var url = 'http://localhost:3023';

var app = require('../app'),
chai = require('chai'),
request = require('supertest'),
age = require('superagent'),
expect = chai.expect;
var cnf=require("./cnf.json")

var ses = require('supertest-session');
var testSes = null;

var email="successful.payment@paidy.com"
var pss="2112"

var arr=[
"shop","shop/cart"
]

var email=cnf.email
var pss=cnf.pss

describe('POST', function() {
beforeEach(function () {
testSes = ses(app);
});

it('should sign in', function (done) {
testSes.post("/shop/cart")
.send({ email:email , pss:pss})
.expect(200)
.end(function(err){
if(err) return done(err)
return done()
})
});

it('.post should work with data', function (done) {
testSes.post('/shop/cart', function(req, res){
res.send(req.session.email);
res.send(req.session.pss);
});
request(app)
.post('/shop/cart', { email:email })
.expect(email, done);
})
})

