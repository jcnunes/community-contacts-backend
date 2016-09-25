var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./services/users');

exports.local = passport.use(new LocalStrategy(function authenticate(userId, password, done) {
    User.authenticate(userId, password)
        .then(function(user) {
                return done(null, user);
            },
            function(rejection) {
                return done(null, false, rejection.message);
            })
        .catch(function(err) {
            return done(err);
        });
}));

passport.serializeUser(function(user, done) {
    done(null, user.user_id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id)
        .then(function(user) {
            return done(null, user);
        })
        .catch(function(err) {
            return done(err);
        });
});
