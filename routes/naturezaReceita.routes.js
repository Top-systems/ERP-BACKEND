const express = require('express');
const { useBody } = require('./db/use');

const {
    processarFiltro,
    pesquisarPorColuna,
    pesquisarPorColunancm,
    preencherListaBuscancm
} = require('./db/naturezaReceita.models');

const naturezaReceita = express.Router();

naturezaReceita.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
naturezaReceita.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
naturezaReceita.post('/pesquisarPorColunancm', (req, res) => useBody(req, res, pesquisarPorColunancm));
naturezaReceita.post('/preencherListaBuscancm', (req, res) => useBody(req, res, preencherListaBuscancm));

module.exports = naturezaReceita