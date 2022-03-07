const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/grupoProduto.models');

const grupoProduto = express.Router();

grupoProduto.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
grupoProduto.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
 
module.exports = grupoProduto