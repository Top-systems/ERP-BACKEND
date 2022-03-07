const express = require('express');
 const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/cartaoConvenio.models');

const cartaoConvenio = express.Router();

cartaoConvenio.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
cartaoConvenio.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
 
module.exports = cartaoConvenio