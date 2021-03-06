'use strict';
var Mongo = require('mongodb'),
    _ = require('lodash');

function Gambler(){
  //this.name = o.name;
  //this.photo = o.photo;
  //this.spouse = o.spouse;
  //this.cash = parseInt(o.cash);
  //this.assets = o.assets;
  //this.results = o.results;
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gamblers');}
});

Gambler.all = function(cb){
  Gambler.collection.find().toArray(cb);
};

Gambler.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Gambler.collection.findOne({_id:_id}, function(err,obj){
    var found = changePrototype(obj);
    cb(found);
  });
};

Gambler.prototype.removeAsset = function(parameter){
  if(!this.assets.length){return;}
  var assets = _.remove(this.assets, function(a){ return a.name === parameter;});
  this.cash += assets[0].value;

  if(this.assets.length === 0){return this.isDivorced = true;}
};

Gambler.prototype.save = function(cb){
  Gambler.collection.save(this, cb);
};

Gambler.prototype.liquidate = function(name, cb){
  this.removeAsset(name);
  var data = {id:this._id.toString(), name:name, cash:this.cash, isDivorced:this.isDivorced};
  this.save(function(){
    cb(data);
  });
};


module.exports = Gambler;



//Private Helper

function changePrototype(gambler){
  return   _.create(Gambler.prototype, gambler);
}
