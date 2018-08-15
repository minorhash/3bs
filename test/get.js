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
    testSes.post("/shop")
    .send({ email:email , pss:pss}) 
    .expect(200)
.end(function(err){
if(err) return done(err)
return done()
})
});

})
<<<<<<< HEAD
=======
done();
          //console.log(res.req)
});//end
});//it
}//for
});//des

>>>>>>> cb3010d2fc20a996213c1119dc87ae1af29f9973
