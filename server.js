// Renderização
const express = require('express');
const db = require('./src/config/db');
const routes = require('./routes');
const session = require("express-session");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(session({
    secret: '123456',
    saveUninitialized: true,
    resave: false
  }));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(routes);

db.sync();

app.listen(3000, () => console.log('Acesse: http://localhost:3000/'));