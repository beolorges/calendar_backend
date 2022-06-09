/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('events', function (table) {
        table.string('event_id').primary().notNullable();
        table.string('user_id').notNullable();
        table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE');
        table.string('name').notNullable();
        table.string('startTime').notNullable();
        table.string('endTime').notNullable();
        table.string('description');
        table.string('location');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('events');
};
