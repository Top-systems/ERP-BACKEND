const express = require('express');
const { useBody } = require('./db/use');
 
const{
    atualiza,
    pegarCodigoDeBarras,
    salvar,
    listarProdutos,
    pegarEstoqueLoja,
    pegarLotes,
    pegarEstoques,
    setarEstoque2,
    buscarProdutos,
    selecionarProduto,
    selecionarProduto2
}= require('./db/alteracaoEstoque.models');

const alteracaoEstoque = express.Router();

alteracaoEstoque.post('/atualiza', (req, res) => useBody(req, res, atualiza));
alteracaoEstoque.post('/pegarCodigoDeBarras', (req, res) => useBody(req, res, pegarCodigoDeBarras));
alteracaoEstoque.post('/salvar', (req, res) => useBody(req, res, salvar));
alteracaoEstoque.post('/listarProdutos', (req, res) => useBody(req, res, listarProdutos));
alteracaoEstoque.post('/pegarEstoqueLoja', (req, res) => useBody(req, res, pegarEstoqueLoja));
alteracaoEstoque.post('/pegarLotes', (req, res) => useBody(req, res,pegarLotes));
alteracaoEstoque.post('/pegarEstoques', (req, res) => useBody(req, res, pegarEstoques));
alteracaoEstoque.post('/setarEstoque2', (req, res) => useBody(req, res, setarEstoque2));
alteracaoEstoque.post('/buscarProdutos', (req, res) => useBody(req, res, buscarProdutos));
alteracaoEstoque.post('/selecionarProduto', (req, res) => useBody(req, res, selecionarProduto));
alteracaoEstoque.post('/selecionarProduto2', (req, res) => useBody(req, res, selecionarProduto2));
 
module.exports = alteracaoEstoque