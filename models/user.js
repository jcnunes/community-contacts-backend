'use strict'

var crypto = require('crypto');

var _ = require('lodash');

function loadUsers() {
    return [{
        user_id: 'joana.nunes228@gmail.com',
        first_name: 'joana',
        last_name: 'nunes',
        email: 'joana.nunes228@gmail.com',
        password: '3c6efb268bde2923e4f7cbc086995f6158a606e66df45e307829e6b28f7aaf0e'
    }];
}

function findById(userId) {
    return new Promise(function(resolve, reject) {
        var users = [];

        try {
            users = loadUsers();
        } catch (err) {
            reject(err);
        }

        resolve(_.find(users, {
            'user_id': userId
        }));
    });
}

function validPassword(user, password) {
    return new Promise(function(resolve, reject) {
        var hash = crypto.createHash('sha256');
        hash.update(password);

        if (user.password !== hash.digest('hex')) {
          reject();
        }

        resolve(user);
    });

}

function authenticate(userId, password, done) {
    return findById(userId)
        .then(function(user) {
            if (!user) {
                return Promise.reject(new Error('Incorrect authentication data.'));
            }

            return validPassword(user, password);
        })
        .then(function(user) {
            return _.omit(user, ['password']);
        })
        .catch(function(err) {
          return Promise.reject(new Error('Incorrect authentication data.'));
        });
}

module.exports = {
    authenticate: authenticate,
    findById: findById
}
