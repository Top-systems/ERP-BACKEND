const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/clienteDescProduto.models');

const clienteDescProduto = express.Router();

clienteDescProduto.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
clienteDescProduto.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
 
module.exports = clienteDescProduto