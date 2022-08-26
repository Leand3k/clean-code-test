const User = require("./sequelize-users-repository")

const {Sequelize, Model}=require("sequelize")
const sequelize = require("./db")

sequelize.sync()