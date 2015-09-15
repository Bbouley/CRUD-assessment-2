process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../server/app');
var Exercise = require('../server/models/exercise');

var should = chai.should();

chai.use(chaiHttp);

describe('Exercises', function(){

  Exercise.collection.drop();

  beforeEach(function(done){
    var newExercise = new Exercise ({
      name: 'Mocha Testing',
      description: 'Learning how to test with Mocha',
      tags: ['mocha', 'chai']
    });
    newExercise.save(function(err){
      done();
    });
  });

  afterEach(function(done){
    Exercise.collection.drop();
    done();
  });



  it('should list ALL exercises on /exercises GET', function(done){
    chai.request(server)
    .get('/api/v1/exercises')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('name');
      res.body[0].should.have.property('description');
      res.body[0].should.have.property('tags');
      res.body[0].name.should.equal('Mocha Testing');
      res.body[0].description.should.equal('Learning how to test with Mocha');
      done();
    });
  });


  it('should list a SINGLE exercise on /exercises/<id> GET', function(done){

    var newExercise = new Exercise({
      name: 'promises',
      description: 'learn about promises and stuff',
      tags: ['promises', 'no more bloody callbacks']
    });

    newExercise.save(function(err, data){
      chai.request(server)
      .get('/api/v1/exercise/'+ data.id)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('description');
        res.body.should.have.property('tags');
        res.body.tags.should.be.a('array');
        res.body.name.should.equal('promises');
        res.body._id.should.equal(data.id);
        done();
      });
    });
  });

  it('should add a SINGLE exercise on /exercises POST', function(done){
    chai.request(server)
    .post('/api/v1/exercises')
    .send({'name': 'testStuff', 'description': 'more tests', 'tags' : ['things', 'what']})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('SUCCESS');
      res.body.SUCCESS.should.have.property('name');
      res.body.SUCCESS.should.have.property('description');
      res.body.SUCCESS.should.have.property('tags');
      res.body.SUCCESS.name.should.equal('testStuff');
      res.body.SUCCESS.description.should.equal('more tests');
      res.body.SUCCESS.tags.should.be.a('array');
      done();
    });
  });

  it ('should update a SINGLE exercise on /exercise/<id>', function(done){
    chai.request(server)
    .get('./exercises')
    .end(function(err, res){
      chai.request(server)
      .put('/exercise/'+res.body[0]._id)
      .send({'name ': 'change the name'})
      .end(function(error, response){
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('')
      });
    });
  });
  it('should delete a SINGLE exercise on /exercise/<id> DELETE');
});
