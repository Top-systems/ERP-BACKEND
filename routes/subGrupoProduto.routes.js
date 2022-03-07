const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/subGrupoProduto.models');

const subGrupoProduto = express.Router();

subGrupoProduto.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
subGrupoProduto.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));

module.exports = subGrupoProduto