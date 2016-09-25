var express = require('express');
var bodyParser = require('body-parser');

var Contacts = require('../models/contact');

var Verify = require('./verify');

var contactRouter = express.Router();
contactRouter.use(bodyParser.json());

contactRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
  Contacts.find({})
    .then(function(contacts) {
      res.json(contacts);
    })
    .catch(function(err) {
      next(err);
    });
})

contactRouter.route('/:contact_id')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Contacts.findById(req.params.contact_id)
      .then(function(contact) {
        res.json(contact);
      })
      .catch(function(err) {
        next(err);
      });
});

module.exports = contactRouter;
