const express = require('express')
const { useBody } = require('./db/use');

const {
    processarFiltro,
    salvar,
    pesquisarPorColuna,
    preencherListaBusca

} = require('./db/cidade.models');

const cidade = express.Router();

cidade.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
cidade.post('/salvar', (req, res) => useBody(req, res, salvar));
cidade.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
cidade.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));

module.exports = cidade;