const express = require('express');
const { useBody } = require('./db/use');

const {
    processarFiltro,
    salvarProduto,
    pegarEstoque,
    pegarCodBarras,
    pegarTodosOsLotes,
    pegarTodosOsEstoques,
    pesquisarPorColuna,
    pesquisarPorColunaDescricao
} = require('./db/produtoDlg.models');

const produtoDlg = express.Router();

produtoDlg.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
produtoDlg.post('/salvarProduto', (req, res) => useBody(req, res, salvarProduto));
produtoDlg.post('/pegarEstoque', (req, res) => useBody(req, res, pegarEstoque));
produtoDlg.post('/pegarCodBarras', (req, res) => useBody(req, res, pegarCodBarras));
produtoDlg.post('/pegarTodosOsLotes', (req, res) => useBody(req, res, pegarTodosOsLotes));
produtoDlg.post('/pegarTodosOsEstoques', (req, res) => useBody(req, res, pegarTodosOsEstoques));
produtoDlg.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
produtoDlg.post('/pesquisarPorColunaDescricao', (req, res) => useBody(req, res, pesquisarPorColunaDescricao));

module.exports = produtoDlg