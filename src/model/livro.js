const Sequelize = require('sequelize');
const database = require('../config/db');

const livro = database.define('Livro', {
    
    IDLivro: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    ISBN: {
        type: Sequelize.STRING(13),
        allowNull: false
    },

    Titulo: {
        type: Sequelize.STRING(255),
        allowNull: false
    },

    Autor: {
        type: Sequelize.STRING(255),
        allowNull: false
    },

    Ano: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    Descricao: {
        type: Sequelize.STRING(999),
        allowNull: false
    },
    
    Foto: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    
    Disponibilidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    Qtd_emprestimo: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    
    Destaque: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
})

module.exports = livro;