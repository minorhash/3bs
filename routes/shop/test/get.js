var url = 'http://localhost:3023';

var app = require('../../../app'),
  chai = require('chai'),
  request = require('supertest'),
  age = require('superagent'),
  expect = chai.expect;


describe('GET', function() {
  //
    it('get', function(done) {
      request(app)
        .get('/shop')
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          done();
          //console.log(res.req)
        });
    });

}); //describe
