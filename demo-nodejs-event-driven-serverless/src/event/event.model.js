"use strict";

const Joi = require('joi');

const EventConstant = require('./event.constant');

const eventTypeValues = [EventConstant.EVENT_TYPE.CREATE,EventConstant.EVENT_TYPE.UPDATE,EventConstant.EVENT_TYPE.DELETE];
const name = 'event';
const definition = {

    hashKey: 'eventId',
    schema: Joi.object().keys({
        eventId: Joi.string().required(),
        parentEventId: Joi.string().allow('').optional(),
        eventName: Joi.string().required(),
        eventType: Joi.string().required().valid(eventTypeValues),
        author: Joi.string().allow('').optional(),
        createDate: Joi.date().iso().required(),
        expiration: Joi.number().required(),
        payload: Joi.object().required()   
    })

};

module.exports = {
    name,
    definition
};
