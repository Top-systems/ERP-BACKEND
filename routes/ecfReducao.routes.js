const express = require('express');
const { useBody } = require('./db/use');

const {
    totaiscodcf,
    excluirFiltro,
    processarFiltro,
    listaDetalheECF,
    salvar,
    listarImpressora,
    listarAliquota
} = require('./db/ecfReducao.models');

const ecfReducao = express.Router();

ecfReducao.post('/totaiscodcf', (req, res) => useBody(req, res, totaiscodcf));
ecfReducao.post('/excluirFiltro', (req, res) => useBody(req, res, excluirFiltro));
ecfReducao.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
ecfReducao.post('/listaDetalheECF', (req, res) => useBody(req, res, listaDetalheECF));
ecfReducao.post('/salvar', (req, res) => useBody(req, res, salvar));
ecfReducao.post('/listarImpressora', (req, res) => useBody(req, res, listarImpressora));
ecfReducao.post('/listarAliquota', (req, res) => useBody(req, res, listarAliquota));

module.exports = ecfReducao