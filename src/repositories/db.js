const {Sequelize} = require('sequelize');
require("dotenv").config(".env");

// Obtener datos desde variables de entorno.

const dialect = process.env.SEQUELIZE_DIALECT
const username = process.env.SEQUELIZE_USERNAME
const password = process.env.SEQUELIZE_PASSWORD
const port = process.env.SEQUELIZE_PORT
const database = process.env.SEQUELIZE_DATABASE
const host = process.env.SEQUELIZE_HOST

const database_url = `postgres://${username}:${password}@${host}:${port}/${database}`

const sequelize = new Sequelize(database_url, {
    dialect: dialect
});

module.exports = sequelize;