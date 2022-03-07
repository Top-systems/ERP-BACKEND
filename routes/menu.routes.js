const express = require('express');
const { useBody } = require('./db/use');

const {
    processarFiltro,
    pesquisarPorColuna,
    logo
} = require('./db/menu.models');

const menu = express.Router();

menu.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
menu.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
menu.post('/logo', (req, res) => useBody(req, res, logo));

module.exports = menu