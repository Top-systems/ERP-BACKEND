const express = require('express')
const { useBody } = require('./db/use');

const{
    listarel,
    processarFiltro,
    pesquisarPorColuna,
    verificardest
} = require('./db/fabricante.model');

const fabricante = express.Router();

fabricante.post('/listarel', (req, res) => useBody(req, res, listarel));
fabricante.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
fabricante.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
fabricante.post('/verificardest', (req, res) => useBody(req, res, verificardest));

module.exports = fabricante;