const express = require('express')
const { useBody } = require('./db/use');

const{
    processarFiltro,
    listaALvo,
    pesquisarPorTexto,
    pesquisarPorInteiro,
    preencherListaBusca,
    logo
} = require('./db/conta.models');

const conta = express.Router();

conta.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
conta.post('/listaAlvo', (req, res) => useBody(req, res, listaALvo));
conta.post('/pesquisarPorTexto', (req, res) => useBody(req, res, pesquisarPorTexto));
conta.post('/pesquisarPorInteiro', (req, res) => useBody(req, res, pesquisarPorInteiro));
conta.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
conta.post('/logo', (req, res) => useBody(req, res, logo));

module.exports = conta;