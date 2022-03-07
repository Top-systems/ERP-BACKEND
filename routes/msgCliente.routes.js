const express = require('express');
const { useBody } = require('./db/use');

const {
    processarFiltro,
    pesquisarPorTexto,
    pesquisarPorInteiro
} = require('./db/msgCliente.models');

const msgCliente = express.Router();

msgCliente.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
msgCliente.post('/pesquisarPorTexto', (req, res) => useBody(req, res, pesquisarPorTexto));
msgCliente.post('/pesquisarPorInteiro', (req, res) => useBody(req, res, pesquisarPorInteiro));

module.exports = msgCliente