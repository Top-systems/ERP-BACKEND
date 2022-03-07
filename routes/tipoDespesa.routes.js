const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorTexto,
    pesquisarPorInteiro
}= require('./db/tipoDespesa.models');

const tipoDespesa = express.Router();

tipoDespesa.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
tipoDespesa.post('/pesquisarPorTexto', (req, res) => useBody(req, res, pesquisarPorTexto));
tipoDespesa.post('/pesquisarPorInteiro', (req, res) => useBody(req, res, pesquisarPorInteiro));

module.exports = tipoDespesa