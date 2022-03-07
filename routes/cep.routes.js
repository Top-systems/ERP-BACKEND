const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    salvar,
    atualizacep,
    pesquisarPorColuna,
    preencherListaBuscaCidade,
    pesquisarPorColunaCidade,
    logo
}= require('./db/cep.models');

const cep = express.Router();

cep.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
cep.post('/salvar', (req, res) => useBody(req, res, salvar));
cep.post('/atualizacep', (req, res) => useBody(req, res, atualizacep));
cep.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
cep.post('/preencherListaBuscaCidade', (req, res) => useBody(req, res, preencherListaBuscaCidade));
cep.post('/pesquisarPorColunaCidade', (req, res) => useBody(req, res, pesquisarPorColunaCidade));
cep.post('/logo', (req, res) => useBody(req, res, logo)); 

module.exports = cep