const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/produtoFornecedor.models');

const produtoFornecedor = express.Router();

produtoFornecedor.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
produtoFornecedor.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
 
module.exports = produtoFornecedor;