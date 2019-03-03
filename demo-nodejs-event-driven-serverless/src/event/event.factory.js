'use strict';

const uuidv1 = require('uuid/v1');
const Joi = require('joi');

const EventModel = require('./event.model');

function createEvent(name,type,parentEventId,author,expiration,payload) {
    
    const event = {
        eventId:  uuidv1(),
        parentEventId: parentEventId || '',
        eventName: name,
        eventType: type,
        author: author || '',
        createDate: new Date(),
        expiration: expiration || 0,
        payload: payload || {}
    };

    let result = Joi.validate(event, EventModel.definition.schema, function(err,value) {
        if (err === null) {
            return event;
        }
        return err;
    });
    
    return result;
}

module.exports = {
    createEvent
}