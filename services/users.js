'use strict'

var _ = require('lodash');

var User = require('../models/user');

function findById(userId) {
    return User.findById(userId);
}

function authenticate(userId, password) {
    return User.authenticate(userId, password);
}

function getCurrentUser(user) {
    return _.omit(user, ['password']);
}

module.exports = {
    getCurrentUser: getCurrentUser,
    authenticate: authenticate,
    findById: findById
};
