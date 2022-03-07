const express = require('express')
const { useBody } = require('./db/use');

const{
    processarFiltro,
    pesquisarPorTexto,
    pesquisarPorInteiro,
    verificardest
} = require('./db/transportadora.model');

const transportadora = express.Router();

transportadora.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
transportadora.post('/pesquisarPorTexto', (req, res) => useBody(req, res, pesquisarPorTexto));
transportadora.post('/pesquisarPorInteiro', (req, res) => useBody(req, res, pesquisarPorInteiro));
transportadora.post('/verificardest', (req, res) => useBody(req, res, verificardest));

module.exports = transportadora;