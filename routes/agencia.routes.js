const express = require('express')
const { useBody } = require('./db/use');

const{
    processarFiltro,
    pesquisarPorColuna
} = require('./db/agencia.models');

const agencia = express.Router();

agencia.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
agencia.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));

module.exports = agencia; 