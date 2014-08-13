'use strict';

var Gambler = require('../models/gambler');

exports.all = function(req, res){
  Gambler.all(function(err, gamblers){
    res.render('derby/gamblers', {gamblers:gamblers});
  });
};

exports.remove = function(req, res){
  Gambler.findById(req.params.id, function(err, gambler){
    gambler.removeAsset(req.parmas.name, function(){
      res.send({id:req.params.id, name:req.params.name, gambler:gambler});
    });
  });
};
