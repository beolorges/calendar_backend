const connection = require('../database/connection');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async create(eventData) {
        eventData.event_id = uuidv4();
        const result = await connection('events').insert(eventData);
        return { event_id: eventData.event_id };
    },
    async edit(eventData, event_id) {
        const result = await connection('events').where({ event_id }).update(eventData);
        return { event_id: eventData.event_id };
    },
    async getByEventId(event_id) {
        const result = await connection('events').where({ event_id }).select('*').first();
        return result;
    },
    async getCreatedByUser(user_id) {
        const result = await connection('events').where({ user_id }).select('*');
        return result;
    },
    async delete({ event_id, user_id }) {
        const result = await connection('events').where({ event_id, user_id }).delete();
        return result;
    }
}