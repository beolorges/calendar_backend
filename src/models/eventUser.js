const connection = require('../database/connection');

module.exports = {
    async create(eventData) {
        const result = await connection('event_user').insert(eventData);
        return result;
    },
    async delete({ event_id, user_id }) {
        const result = await connection('event_user').where({ event_id, user_id }).delete();
        return result;
    },
    async get(user_id) {
        const result = await connection('event_user')
            .innerJoin('events', 'event_user.event_id', 'events.event_id')
            .where('event_user.user_id', user_id)
            .select('events.*');

        return result;
    },
    async getByEventId(event_id) {
        const result = await connection('event_user')
            .where({ event_id })
            .select('user_id');

        return result;
    }
}