const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/segmento.models');

const segmento = express.Router();

segmento.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
segmento.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
 
module.exports = segmento