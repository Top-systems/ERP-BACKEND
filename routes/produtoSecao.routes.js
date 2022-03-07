const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorTexto,
    pesquisarPorInteiro
}= require('./db/produtoSecao.models');

const produtoSecao = express.Router();

produtoSecao.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
produtoSecao.post('/pesquisarPorTexto', (req, res) => useBody(req, res, pesquisarPorTexto));
produtoSecao.post('/pesquisarPorInteiro', (req, res) => useBody(req, res, pesquisarPorInteiro));
 
module.exports = produtoSecao;