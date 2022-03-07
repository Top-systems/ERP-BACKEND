const express = require('express');
const { useBody } = require('./db/use')

const {
    processarFiltro,
    salvar,
    cancelar,
    pesquisarPorColuna,
    pesquisarPorColunav,
    preencherListaBuscav,
    pesquisarPorColunav2,
    preencherListaBuscav2,
    preencherListaBusca
} = require('./db/ecfCupomCab.models');

const ecfCupomCab = express.Router();

ecfCupomCab.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
ecfCupomCab.post('/salvar', (req, res) => useBody(req, res, salvar));
ecfCupomCab.post('/cancelar', (req, res) => useBody(req, res, cancelar));
ecfCupomCab.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
ecfCupomCab.post('/pesquisarPorColunav', (req, res) => useBody(req, res, pesquisarPorColunav));
ecfCupomCab.post('/preencherListaBuscav', (req, res) => useBody(req, res, preencherListaBuscav));
ecfCupomCab.post('/pesquisarPorColunav2', (req, res) => useBody(req, res, pesquisarPorColunav2));
ecfCupomCab.post('/preencherListaBuscav2', (req, res) => useBody(req, res, preencherListaBuscav2));
ecfCupomCab.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca))


module.exports = ecfCupomCab