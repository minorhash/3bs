var url = 'http://localhost:3023';

var app = require('../app'),
chai = require('chai'),
request = require('supertest'),
age = require('superagent'),
expect = chai.expect;

var ses = require('supertest-session');
var testSes = null;

var email="successful.payment@paidy.com"
var pss="2112"

describe('POST', function() {
beforeEach(function () {
testSes = ses(app);
});
it('should sign in', function (done) {
    testSes.post("/shop")
    .send({ email:email , pss:pss})
    .expect(200)
.end(function(err){
if(err) return done(err)
return done()
})
});
})

