const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/grupoDescontoEmpresa.models');

const grupoDescontoEmpresa = express.Router();

grupoDescontoEmpresa.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
grupoDescontoEmpresa.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna)); 

module.exports = grupoDescontoEmpresa