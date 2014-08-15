'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    derby           = require('../controllers/derby');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());

  app.get('/', derby.all);
  app.delete('/gamblers/:id/assets/:name', derby.destroy);

  console.log('Routes Loaded');
};

