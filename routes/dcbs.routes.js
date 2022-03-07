const express = require('express');
const { useBody } = require('./db/use');

const {
    processarFiltro,
    pesquisarPorColuna,
    logo
} = require('./db/dcbs.models');

const dcbs = express.Router();

dcbs.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
dcbs.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
dcbs.post('/logo', (req, res) => useBody(req, res, logo))

module.exports = dcbs;