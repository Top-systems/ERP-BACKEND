const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/tipoServico.models');

const tipoServico = express.Router();

tipoServico.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
tipoServico.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
 
module.exports = tipoServico