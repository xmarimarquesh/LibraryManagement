const Sequelize = require('sequelize');
const database = require('../config/db');

const usuario = database.define('Usuario', {
    IDUsuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    Nome: {
        type: Sequelize.STRING(255),
        allowNull: false
    },

    CPF: {
        type: Sequelize.STRING(15),
        allowNull: false
    },

    DataNascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },

    Telefone: {
        type: Sequelize.STRING(15),
        allowNull: false
    },

    Email: {
        type: Sequelize.STRING(255),
        allowNull: false
    },

    Genero: {
        type: Sequelize.STRING(20),
        allowNull: false
    },

    Senha: {
        type: Sequelize.STRING(255),
        allowNull: false
    },

    Ativo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    Admin: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true // Evita a pluralização automática
  })

module.exports = usuario;