const express = require('express');
const { useBody } = require('./db/use');

const {
    contas,
    processarFiltro,
    salvar,
    pesquisarPorColuna,
    logo
} = require('./db/configBoleto.models');

const configBoleto = express.Router();

configBoleto.post('/contas', (req, res) => useBody(req, res, contas));
configBoleto.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
configBoleto.post('/salvar', (req, res) => useBody(req, res, salvar));
configBoleto.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
configBoleto.post('/logo', (req, res) => useBody(req, res, logo));

module.exports = configBoleto