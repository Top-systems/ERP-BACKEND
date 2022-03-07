const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna,
}= require('./db/listaPsico.models');

const listaPsico = express.Router();

listaPsico.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
listaPsico.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));

module.exports = listaPsico;