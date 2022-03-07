const express = require('express');
const { useBody } = require('./db/use');

const {
    processarFiltro,
    pesquisarPorColuna,
    pesquisarPorColunaEntradas,
    preencherListaBuscaEntradas
} = require('./db/naturezaOP.models');

const naturezaOP = express.Router();

naturezaOP.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
naturezaOP.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
naturezaOP.post('/pesquisarPorColunaEntradas', (req, res) => useBody(req, res, pesquisarPorColunaEntradas));
naturezaOP.post('/preencherListaBuscaEntradas', (req, res) => useBody(req, res, preencherListaBuscaEntradas));

module.exports = naturezaOP