const express = require('express');
const { useBody } = require('./db/use');

const { 
    pegarParcelas,
    processarFiltro,
    salvar,
    onCellEdit,
    pesquisarPorColuna
} = require('./db/condicaoPagamento.models');

const condicaoPagamento = express.Router();

condicaoPagamento.post('/pegarParcelas', (req, res) => useBody(req, res, pegarParcelas));
condicaoPagamento.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
condicaoPagamento.post('/salvar', (req, res) => useBody(req, res, salvar));
condicaoPagamento.post('/onCellEdit', (req, res) => useBody(req, res, onCellEdit))
condicaoPagamento.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna))

module.exports = condicaoPagamento;