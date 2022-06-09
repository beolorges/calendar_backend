const enviroment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[enviroment];
console.log(configuration);

const connection = require('knex')(configuration);
module.exports = connection;