const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna,
    logo

}= require('./db/cartao.models');

const cartao = express.Router();

cartao.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
cartao.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
cartao.post('/logo', (req, res) => useBody(req, res, logo));
 
module.exports = cartao;