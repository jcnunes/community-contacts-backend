'use strict'

var _ = require('lodash');

var contacts = require('../data/contacts');
var extendedContacts = require('../data/extendedContacts');

function find(opts) {
    return Promise.resolve(contacts);
}

function findById(contactId) {
    return new Promise(function(resolve, reject) {
        var baseContact = _.find(contacts, {
            'contact_id': contactId
        });

        if (!baseContact) {
            reject(new Error('Unknown contact'));
        }

        var contactDetails = _.find(extendedContacts, {
            'contact_id': contactId
        });

        resolve({
            base_contact: baseContact,
            details: contactDetails ? contactDetails.details || [] : []
        });
    });
}

module.exports = {
    find: find,
    findById: findById
}
