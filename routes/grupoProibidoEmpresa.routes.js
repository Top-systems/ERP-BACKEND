const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/grupoProibidoEmpresa.models');

const grupoProibidoEmpresa = express.Router();

grupoProibidoEmpresa.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
grupoProibidoEmpresa.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
 
module.exports = grupoProibidoEmpresa;