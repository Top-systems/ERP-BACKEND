const express = require('express');
const { useBody } = require('./db/use');

const {
    salvarc,
    pegarClassFiscalImpressora,
    processarFiltro,
    listaAlvo,
    salvar,
    primeiro,
    ultimo,
    anterior,
    proximo,
    pesquisarPorColuna,
    preencherListaBusca,
    listaa,
    listaanfce,
    listasat
} = require('./db/ecfImpressora.models');

const ecfImpressora = express.Router();

ecfImpressora.post('/salvarc', (req, res) => useBody(req, res, salvarc));
ecfImpressora.post('/pegarClassFiscalImpressora', (req, res) => useBody(req, res, pegarClassFiscalImpressora));
ecfImpressora.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
ecfImpressora.post('/listaAlvo', (req, res) => useBody(req, res, listaAlvo));
ecfImpressora.post('/salvar', (req, res) => useBody(req, res, salvar));
ecfImpressora.post('/primeiro', (req, res) => useBody(req, res, primeiro));
ecfImpressora.post('/ultimo', (req, res) => useBody(req, res, ultimo));
ecfImpressora.post('/anterior', (req, res) => useBody(req, res, anterior));
ecfImpressora.post('/proximo', (req, res) => useBody(req, res, proximo));
ecfImpressora.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
ecfImpressora.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
ecfImpressora.post('/listaa', (req, res) => useBody(req, res, listaa));
ecfImpressora.post('/listaanfce', (req, res) => useBody(req, res, listaanfce));
ecfImpressora.post('/listasat', (req, res) => useBody(req, res, listasat));

module.exports = ecfImpressora