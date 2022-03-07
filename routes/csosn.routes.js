const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna,
    preencherListaBusca
}= require('./db/csosn.models');

const csosn = express.Router();

csosn.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
csosn.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
csosn.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
 
module.exports = csosn