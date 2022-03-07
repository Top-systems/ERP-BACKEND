const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/afericao.models');

const afericao = express.Router();

afericao.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
afericao.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));

module.exports = afericao