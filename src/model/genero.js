const Sequelize = require('sequelize');
const database = require('../config/db');

const genero = database.define('Genero', {
    
    IDGenero: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    Tipo: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
})

module.exports = genero;