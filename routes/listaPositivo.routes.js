const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna,
    lista
}= require('./db/listaPositivo.models');

const listaPositivo = express.Router();

listaPositivo.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
listaPositivo.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
listaPositivo.post('/lista', (req, res) => useBody(req, res, lista));

module.exports = listaPositivo;