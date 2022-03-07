const express = require('express')
const { useBody } = require('./db/use');

const {
    iniciarLote,
    salvar,
    pegarLotes,
    listarli,
    filtrar,
    listarliv,
    listar,
    codbarra,
    processarFiltro,
    excluirFiltro,
    selecionarProduto2,
    onCellEdit
} = require('./db/estoque.model');

const estoque = express.Router();

estoque.post('/iniciarLote', (req, res) => useBody(req, res, iniciarLote));
estoque.post('/salvar', (req, res) => useBody(req, res, salvar));
estoque.post('/pegarLotes', (req, res) => useBody(req, res, pegarLotes));
estoque.post('/listarli', (req, res) => useBody(req, res, listarli));
estoque.post('/filtrar', (req, res) => useBody(req, res, filtrar));
estoque.post('/listarliv', (req, res) => useBody(req, res, listarliv));
estoque.post('/listar', (req, res) => useBody(req, res, listar));
estoque.post('/codbarra', (req, res) => useBody(req, res, codbarra));
estoque.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
estoque.post('/excluirFiltro', (req, res) => useBody(req, res, excluirFiltro));
estoque.post('/selecionarProduto2', (req, res) => useBody(req, res, selecionarProduto2));
estoque.post('/onCellEdit', (req, res) => useBody(req, res, onCellEdit));

module.exports = estoque;