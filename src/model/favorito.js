const Sequelize = require('sequelize');
const database = require('../config/db');
const usuario = require('./usuario');
const livro = require('./livro');

const favorito = database.define('Favorito', {
    
    IDFavorito: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }  
});

favorito.belongsTo(usuario, {
    constraint: true, 
    foreignKey: 'IDUsuario'
});

favorito.belongsTo(livro, {
    constraint: true, 
    foreignKey: 'IDLivro'
});

module.exports = favorito;