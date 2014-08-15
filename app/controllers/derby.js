'use strict';

var Gambler = require('../models/gambler');

exports.all = function(req, res){
  Gambler.all(function(err, gamblers){
    res.render('derby/', {gamblers:gamblers});
  });
};

exports.destroy = function(req, res){
  Gambler.findById(req.params.id, function(gambler){
    gambler.liquidate(req.params.name, function(obj){
      console.log('Liquidate:', obj);
      res.send(obj);
    });
  });
};
