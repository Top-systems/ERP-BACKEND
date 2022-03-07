const express = require('express')
const { useBody } = require('./db/use');

const{
    processarFiltro,
    pesquisarPorTexto,
    pesquisarPorInteiro
} = require('./db/unidade.models');

const unidade = express.Router();

unidade.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
unidade.post('/pesquisarPorTexto', (req, res) => useBody(req, res, pesquisarPorTexto));
unidade.post('/pesquisarPorInteiro', (req, res) => useBody(req, res, pesquisarPorInteiro));

module.exports = unidade;