const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/clienteEndereco.models');

const clienteEndereco = express.Router();

clienteEndereco.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
clienteEndereco.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
 
module.exports = clienteEndereco