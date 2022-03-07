const express = require('express')
const { useBody } = require('./db/use');

const{
    processarFiltro,
    pesquisarPorColuna

} = require('./db/codBarra.model');

const codBarra = express.Router();

codBarra.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
codBarra.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));

module.exports = codBarra;