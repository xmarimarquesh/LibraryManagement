const Sequelize = require('sequelize');
const database = require('../config/db');
const genero = require('./genero');
const livro = require('./livro');

const generoLivro = database.define('generoLivro', {
    
    IDGeneroLivro: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

generoLivro.belongsTo(genero, {
    constraint: true, 
    foreignKey: 'IDGenero'
});

generoLivro.belongsTo(livro, {
    constraint: true, 
    foreignKey: 'IDLivro'
});

module.exports = generoLivro;