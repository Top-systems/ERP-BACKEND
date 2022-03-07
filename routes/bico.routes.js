const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    salvar,
    codigos,
    pesquisarPorColuna,
    adicionarcb,
    pegarhist,
    histpv
}= require('./db/bico.models');

const bico = express.Router();

bico.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
bico.post('/salvar', (req, res) => useBody(req, res, salvar));
bico.post('/codigos', (req, res) => useBody(req, res, codigos));
bico.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
bico.post('/adicionarcb', (req, res) => useBody(req, res, adicionarcb));
bico.post('/pegarhist', (req, res) => useBody(req, res, pegarhist));
bico.post('/histpv', (req, res) => useBody(req, res, histpv))

 
module.exports = bico