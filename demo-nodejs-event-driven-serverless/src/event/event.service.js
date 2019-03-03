'use strict';

const EventFactory = require('./event.factory');

class EventService {

    constructor() {
    }

    createByPayload(name,type,parentEventId,author,expiration,payload) {
        console.log('info','[SERVICE] [EVENT] createByPayload ...');
        const event = EventFactory.createEvent(name,type,parentEventId,author,expiration,payload);
        if(event.isJoi) { 
            event.isError = true;
            return {event : 'error'};
        }    
        return event;
    }

    create(name,type,parentEventId,author,expiration) {
        console.log('info','[SERVICE][EVENT] create ...');
        return this.createByPayload(name,type,parentEventId,author,expiration,null);
    }
    
}

module.exports = EventService;
