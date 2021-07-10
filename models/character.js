const { DataTypes } = require("sequelize");
const db = require("../db");

const Character = db.define("character", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    race: {
        type: DataTypes.ENUM,
        allowNull: false,
    },
    alignment: {
        type: DataTypes.ENUM,
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM,
        allowNull: false,
    },
    height_ft: {
        type: DataTypes.ENUM,
        allowNull: false,
    },
    height_in: {
        type: DataTypes.ENUM,
        allowNull: false,
    },
    weight: {
        type: DataTypes.ENUM,
        allowNull: false,
    },
    class: {
        type: DataTypes.ENUM,
        allowNull: false,
    },
    background: {
        type: DataTypes.ENUM,
        allowNull: false,
    },
    level: {
        type: DataTypes.ENUM,
        allowNull: false,
    },
    experience: {
        type: DataTypes.ENUM,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});


module.exports = Character;