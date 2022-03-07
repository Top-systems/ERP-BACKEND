const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/impressora.models');

const impressora = express.Router();

impressora.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
impressora.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));

module.exports = impressora;