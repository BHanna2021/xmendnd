const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:endor1979@localhost:5432/dnd-creator");
// const sequelize = new Sequelize("postgres://postgres:061021_Webd3v@localhost:5432/dnd-creator");


module.exports = sequelize;