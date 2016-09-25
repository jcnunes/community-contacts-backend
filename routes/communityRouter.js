var express = require('express');
var bodyParser = require('body-parser');

var Verify = require('./verify');

var communityRouter = express.Router();
communityRouter.use(bodyParser.json());

communityRouter.route('/theming')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    res.json({
      community_logo: '/images/community_logo.png',
      community_style: '/stylesheets/style.css'
    });
})

module.exports = communityRouter;
