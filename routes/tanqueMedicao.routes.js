const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    salvar,
    pesquisarPorColuna
}= require('./db/tanqueMedicao.models');

const tanqueMedicao = express.Router();

tanqueMedicao.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
tanqueMedicao.post('/salvar', (req, res) => useBody(req, res, salvar));
tanqueMedicao.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));

module.exports = tanqueMedicao