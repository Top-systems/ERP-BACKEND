const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/anp.models');

const anp = express.Router();

anp.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
anp.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
 
module.exports = anp