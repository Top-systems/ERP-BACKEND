const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/ibpt.models');

const ibpt = express.Router();

ibpt.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
ibpt.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
 
module.exports = ibpt;