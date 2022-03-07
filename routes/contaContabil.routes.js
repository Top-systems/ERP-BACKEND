const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    listaAlvo,
    salvar,
    pesquisarPorColuna,
    preencherListaBusca
}= require('./db/contaContabil.models');

const contaContabil = express.Router();

contaContabil.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
contaContabil.post('/listaAlvo', (req, res) => useBody(req, res, listaAlvo));
contaContabil.post('/salvar', (req, res) => useBody(req, res, salvar));
contaContabil.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
contaContabil.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
 
module.exports = contaContabil;