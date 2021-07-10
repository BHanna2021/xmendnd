const { DataTypes } = require("sequelize");
const db = require("../db");

const Character = db.define("character", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    race: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alignment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    height_ft: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    height_in: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    char_class: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    background: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    experience: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});


module.exports = Character;