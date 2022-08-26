
const { Sequelize } = require('sequelize');
require("dotenv").config(".env");

// Obtener datos desde variables de entorno.

const dialect = 'postgres'
const host = 'db'
const username = 'postgres'
const password = 'admin'
const port = 5432
const database = 'eCommerce'

const database_url = `postgres://${username}:${password}@${host}:${port}/${database}`

const sequelize = new Sequelize(database_url, {
    dialect: dialect
});

module.exports = sequelize;