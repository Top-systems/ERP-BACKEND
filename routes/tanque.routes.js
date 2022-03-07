const express = require('express');
const { useBody } = require('./db/use');

const {
    pegarbicos,
    processarFiltro,
    limparTexto,
    pesquisarPorColuna,
    histpv,
    pegarhist
} = require('./db/tanque.models');

const tanque = express.Router();

tanque.post('/pegarbicos', (req, res) => useBody(req, res, pegarbicos));
tanque.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
tanque.post('/limparTexto', (req, res) => useBody(req, res, limparTexto));
tanque.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
tanque.post('/histpv', (req, res) => useBody(req, res, histpv));
tanque.post('/pegarhist', (req, res) => useBody(req, res, pegarhist));

module.exports = tanque