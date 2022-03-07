const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna,
    preencherListaBuscaEntrada,
    preencherListaBuscaEntrada135235335,
    pesquisarPorColunaEntrada135235335,
    pesquisarPorColunaEntrada,
    preencherListaBuscaSaida,
    pesquisarPorColunaSaida,
    preencherListaBusca130230330,
    pesquisarPorColuna130230330
}= require('./db/cfop.models');

const cfop = express.Router();

cfop.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
cfop.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
cfop.post('/preencherListaBuscaEntrada', (req, res) => useBody(req, res, preencherListaBuscaEntrada));
cfop.post('/preencherListaBuscaEntrada135235335', (req, res) => useBody(req, res, preencherListaBuscaEntrada135235335));
cfop.post('/pesquisarPorColunaEntrada135235335', (req, res) => useBody(req, res, pesquisarPorColunaEntrada135235335));
cfop.post('/pesquisarPorColunaEntrada', (req, res) => useBody(req, res, pesquisarPorColunaEntrada));
cfop.post('/preencherListaBuscaSaida', (req, res) => useBody(req, res, preencherListaBuscaSaida));
cfop.post('/pesquisarPorColunaSaida', (req, res) => useBody(req, res, pesquisarPorColunaSaida));
cfop.post('/preencherListaBusca130230330', (req, res) => useBody(req, res, preencherListaBusca130230330));
cfop.post('/pesquisarPorColuna130230330', (req, res) => useBody(req, res, pesquisarPorColuna130230330));

module.exports = cfop