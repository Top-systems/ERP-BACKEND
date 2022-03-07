const express = require('express');
const { useBody } = require('./db/use');
 
const{
    setaribpt,
    processarFiltro,
    pesquisarPorColuna,
    preencherListaBusca,
    pesquisarPorColunap,
    preencherListaBuscap
}= require('./db/ncm.models');

const ncm = express.Router();

ncm.post('/setaribpt', (req, res) => useBody(req, res, setaribpt));
ncm.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
ncm.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
ncm.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
ncm.post('/pesquisarPorColunap', (req, res) => useBody(req, res, pesquisarPorColunap));
ncm.post('/preencherListaBuscap', (req, res) => useBody(req, res, preencherListaBuscap));

module.exports = ncm