var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Exercise = require('../models/exercise');

//GET all
router.get('/exercises', function(req, res, next) {
  Exercise.find(function(err, data){
    if(err){
      res.json({'ERROR': err});
    } else {
      res.json(data);
    }
  });
});

//single GET
router.get('/exercise/:id', function(req, res, next){
  Exercise.findById(req.params.id, function(err, data){
    if(err){
      res.json({'ERROR': err});
    } else {
      res.json(data);
    }
  });
});

//single post
router.post('/exercises', function(req, res, next){
  var newExercise = new Exercise({
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags
  });
  newExercise.save(function(err){
    if(err){
      res.json({'ERROR': err});
    } else {
      res.json({'SUCCESS': newExercise});
    }
  });
});

//put single exercise
router.put('/exercise/:id', function(req, res, next){
  var update = req.body;
  options = {new: true};

  Exercise.findOneAndUpdate(req.params.id, update, options, function(err, data){
    if(err){
      res.json({'ERROR': err});
    } else {
      res.json({'UPDATED': data});
    }
  });
});

router.delete('/exercise/:id', function(req, res, next){
  var query = {'_id' : req.params.id};
  Exercise.findOneAndRemove(query, function(err, data){
    if(err){
      res.json({'ERROR': err});
    } else {
      res.json({'DELETED': data});
    }
  });
});


module.exports = router;
