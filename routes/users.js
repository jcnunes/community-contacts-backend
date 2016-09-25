var express = require('express');
var router = express.Router();

var passport = require('passport');
var Verify = require('./verify');

var users = require('../services/users');

/* GET current user. */
router.get('/me', function(req, res, next) {
  res.json(users.getCurrentUser(req.user));
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }

            var token = Verify.getToken(user);
            res.status(200).json({
                status: 'Login successful!',
                success: true,
                token: token
            });
        });
    })(req, res, next);
});

module.exports = router;
