'use strict';

const EventConstant = require('./event/event.constant');
const EventFactory = require('./event/event.factory');
const EventService = require('./event/event.service');

exports.createEvent = (event, context, callback) => {
    console.log('info', '[createEvent] ...' );

    let hello = "Hello World!" + new Date().toTimeString();
    let payload = { hello : hello }

    let eventService = new EventService();
    
    const params_body = {
        message_factory: EventFactory.createEvent('CREATE Custom Event',EventConstant.EVENT_TYPE.CREATE,'','acme',0,payload),
        message_service: eventService.create('UPDATE Custom Event',EventConstant.EVENT_TYPE.UPDATE,'','acme',0)
    };

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            params_body
        }),
      };
    
    callback(null, response);

};
