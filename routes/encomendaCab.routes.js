const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna,
}= require('./db/encomendaCab.models');

const encomendaCab = express.Router();

encomendaCab.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
encomendaCab.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));

module.exports = encomendaCab;