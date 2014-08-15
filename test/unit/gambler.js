/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Gambler   = require('../../app/models/gambler'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'derby-test';

describe('Gambler', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Gambler object', function(){
      var o = new Gambler({name:'bob', photo:'bob.png', spouse: {name:'jenny', photo:'jenny.png'}});
      expect(o).to.be.instanceof(Gambler);
    });
  });

  describe('.all', function(){
    it('should get all gamblers', function(done){
      Gambler.all(function(err, gamblers){
        expect(gamblers).to.have.length(3);
        done();
      });
    });
  });


  describe('.findById', function(){
    it('should find a gambler by id', function(done){
      Gambler.findById('000000000000000000000001', function(gambler){
        expect(gambler).to.be.instanceof(Gambler);
        expect(gambler.name).to.equal('Taz Jones');
        done();
      });
    });
  });


  describe('#removeAsset', function(){
    it('should remove an asset from a gambler', function(done){
      Gambler.findById('000000000000000000000001', function(gambler){
        gambler.removeAsset('ring');
        expect(gambler.assets).to.have.length(1);
        expect(gambler.cash).to.equal(11000);
        gambler.removeAsset('watch');
        expect(gambler.assets).to.have.length(0);
        expect(gambler.cash).to.equal(11050);
        expect(gambler.isDivorced).to.be.true;
        console.log(gambler);
        done();
      });
    });
  });
});

