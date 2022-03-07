const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/veiculo.models');

const veiculo = express.Router();

veiculo.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
veiculo.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
 
module.exports = veiculo