const express = require('express');
const { useBody } = require('./db/use');
 
const{
    verificaab,
    processarFiltro,
    pesquisarPorColuna,
    logo
}= require('./db/abastecimento.models');

const abastecimento = express.Router();

abastecimento.post('/verificaab', (req, res) => useBody(req, res, verificaab));
abastecimento.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
abastecimento.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
abastecimento.post('/logo', (req, res) => useBody(req, res, logo));
 
module.exports = abastecimento