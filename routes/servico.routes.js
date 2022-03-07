const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna,
    pesquisarPorColunaDescricao
}= require('./db/servico.models');

const servico = express.Router();

servico.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
servico.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
servico.post('/pesquisarPorColunaDescricao', (req, res) => useBody(req, res, pesquisarPorColunaDescricao));
 
module.exports = servico