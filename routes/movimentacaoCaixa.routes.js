const express = require('express');
const { useBody } = require('./db/use');

const {
    consultar,
    listartipos,
    salvar,
    listarvendas
} = require('./db/movimentacaoCaixa.models');

const movimentacaoCaixa = express.Router();

movimentacaoCaixa.post('/consultar', (req, res) => useBody(req, res, consultar));
movimentacaoCaixa.post('/listartipos', (req, res) => useBody(req, res, listartipos));
movimentacaoCaixa.post('/salvar', (req, res) => useBody(req, res, salvar));
movimentacaoCaixa.post('/listarvendas', (req, res) => useBody(req, res, listarvendas));

module.exports = movimentacaoCaixa