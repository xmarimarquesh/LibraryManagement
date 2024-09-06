// Iniciando Route do Express
const express = require('express');
const route = express.Router();

// Iniciando e importando Multer
const multer = require("multer");
const config = require('./src/config/multer');

// Importando os Controllers
const home = require('./src/controllers/home');
const usuario = require('./src/controllers/usuario');
const livro = require('./src/controllers/livros');
const emprestimo = require('./src/controllers/emprestimo');
const favorito = require('./src/controllers/favoritos');

// Rotas de livro
route.post('/UpdateLivro/:id', livro.updateLivro);
route.get('/DeleteLivro/:id', livro.deleteLivro);

route.get('/', home.pagInicialGet);
route.get('/inicio', home.pagInicialGet);

// Rotas do usuario (user)
route.post('/login', usuario.verificarUser);
route.post('/registro', usuario.createUser);
route.get('/logout', usuario.logout);
route.post('/updateUser', usuario.updateUser);

// Rotas do livros (ADM)
route.get('/livrosADM', home.isAdmin, home.pagLivrosADMGet);
route.post('/livrosADM', multer(config).single('foto'), livro.createLivro);

// Rotas do Emprestimo (ADM)
route.get('/emprestimosADM', home.isAdmin, home.pagEmprestimosADMGet);
route.post('/emprestimoADM', multer(config).single('foto'), emprestimo.createEmprestimo);

// Rotas de Favoritos (user)
route.get('/favoritos', home.pagFavoritosGet);
route.post('/favoritos', favorito.createFavoritos);

// Rotas de CRUD Usuario (ADM)
route.get('/usuariosADM', home.isAdmin, home.pagUsuariosADMGet);
route.post('/registroADM', home.isAdmin, usuario.createUser);


route.get('/livros', home.pagLivrosGet);
route.get('/emprestimos', home.pagEmprestimosGet);

module.exports = route;

