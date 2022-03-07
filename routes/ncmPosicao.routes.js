const express = require('express');
const { useBody } = require('./db/use');

const {
    processarFiltro,
    pesquisarPorColuna
} = require('./db/ncmPosicao.models');

const ncmPosicao = express.Router();

ncmPosicao.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
ncmPosicao.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));

module.exports = ncmPosicao