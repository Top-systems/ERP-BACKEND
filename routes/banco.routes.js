const express = require('express')
const { useBody } = require('./db/use');

const{
    processarFiltro,
    pesquisarPorColuna,
    preencherListaBusca,
    logo
} = require('./db/banco.models');

const banco = express.Router();

banco.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
banco.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
banco.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
banco.post('/logo', (req, res) => useBody(req, res, logo));

module.exports = banco;