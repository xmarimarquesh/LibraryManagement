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

route.get('/', home.pagInicialGet);
route.get('/inicio', home.pagInicialGet);

// Rotas do usuario (user)
route.post('/login', usuario.verificarUser);
route.post('/registro', usuario.createUser);
route.get('/logout', usuario.logout);
route.post('/updateUser', usuario.updateUser);

// Rotas do livros (ADM)
route.post('/UpdateLivro/:id', multer(config).single('foto'), livro.updateLivro);
route.get('/DeleteLivro/:id', livro.deleteLivro);
route.get('/livrosADM', home.isAdmin, home.pagLivrosADMGet);
route.post('/livrosADM', multer(config).single('foto'), livro.createLivro);

// Rotas do Emprestimo (ADM)
route.get('/emprestimosADM', home.isAdmin, home.pagEmprestimosADMGet);
route.post('/emprestimoADM', emprestimo.createEmprestimo);
route.get('/Devolucao/:id', emprestimo.devolucao);
route.post('/UpdateEmprestimo/:id', emprestimo.updateEmprestimo);

// Rotas de Favoritos (user)
route.get('/favoritos', home.pagFavoritosGet);
route.post('/favoritos', favorito.createFavoritos);

// Rotas de CRUD Usuario (ADM)
route.get('/usuariosADM', home.isAdmin, home.pagUsuariosADMGet);
route.post('/registroADM', home.isAdmin, usuario.createUser);
route.post('/updateUsuarioADM/:id', usuario.updateUserADM);
route.get('/DeleteUser/:id', usuario.deleteUser);

route.get('/livros', home.pagLivrosGet);
route.get('/livro/:id', home.pagLivroGet);
route.get('/emprestimos', home.pagEmprestimosGet);

module.exports = route;

