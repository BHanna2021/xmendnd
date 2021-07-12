require("dotenv").config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL);

const Express = require("express");



module.exports = sequelize;