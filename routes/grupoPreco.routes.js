const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/grupoPreco.models');

const grupoPreco = express.Router();

grupoPreco.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
grupoPreco.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
 
module.exports = grupoPreco