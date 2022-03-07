const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorTexto,
    pesquisarPorInteiro
}= require('./db/centroCusto.models');

const centroCusto = express.Router();

centroCusto.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
centroCusto.post('/pesquisarPorTexto', (req, res) => useBody(req, res, pesquisarPorTexto));
centroCusto.post('/pesquisarPorInteiro', (req, res) => useBody(req, res, pesquisarPorInteiro));

module.exports = centroCusto