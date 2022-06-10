const connection = require('../database/connection');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async create(userData) {
        userData.user_id = uuidv4();
        const result = await connection('users').insert(userData);
        return result;
    },
    async getByFirebaseId(firebase_id) {
        const result = await connection('users')
            .where({ firebase_id })
            .select("*")
            .first();

        return result;
    },
    async getUserIdByEmail(email) {
        const result = await connection('users')
            .where({ email })
            .select("user_id")
            .first();

        return result?.user_id
    },

    async deleteById(user_id) {
        const result = await connection('users').where({ user_id }).delete();
        return result;
    },
    async getAllEvents(user_id) {
        const result = await connection('events')
            .innerJoin('event_user', 'events.event_id', 'event_user.event_id')
            .innerJoin('users', 'users.user_id', 'events_user.user_id')
            .where({ user_id })
            .select("events.*");

        return result;
    }
}