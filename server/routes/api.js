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
  Exercise.findById(req.params.id, function(err, data){
    data.name = req.body.name;
    data.description = req.body.description;
    data.tags = req.body.tags;
    data.save(function(err){
      if(err){
        res.json({'ERROR': err});
      } else {
        res.json({'UPDATED': data});
      }
    });
  });
});


module.exports = router;
