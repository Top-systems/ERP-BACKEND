const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna,
    logo
}= require('./db/cest.models');

const cest = express.Router();

cest.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
cest.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
cest.post('/logo', (req, res) => useBody(req, res, logo));
 
module.exports = cest