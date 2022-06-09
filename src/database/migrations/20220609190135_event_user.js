/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('event_user', function (table) {
        table.string('event_id').notNullable();
        table.foreign('event_id').references('event_id').inTable('events').onDelete('CASCADE');
        table.string('user_id').notNullable();
        table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('event_user');
};
