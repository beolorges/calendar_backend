const connection = require('../database/connection');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async create(userData) {
        userData.user_id = uuidv4();
        const result = await connection('users').insert(userData);
        return result;
    },
    async deleteById(user_id) {
        const result = await connection('users').where({ user_id }).delete();
        return result;
    }
}