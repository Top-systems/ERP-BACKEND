const express = require('express');
const { useBody } = require('./db/use');
 
const{
    montarConsulta,
    processarFiltro,
    salvar,
    salvarProduto,
    pegarTodosOsEstoques,
    pegarTodosOsLotes,
    pegarCodigoDeBarras,
    pegarCodBarras,
    pegarEstoque,
    pegarCusto,
    pegarVenda,
    pesquisarPorColuna,
    pesquisarPorColunaDescricao,
    preencherListaBusca,
    pegarEstoque2,
    logo
}= require('./db/produtoRapido.models');

const produtoRapido = express.Router();

produtoRapido.post('/montarConsulta', (req, res) => useBody(req, res, montarConsulta));
produtoRapido.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
produtoRapido.post('/salvar', (req, res) => useBody(req, res, salvar));
produtoRapido.post('/salvarProduto', (req, res) => useBody(req, res, salvarProduto));
produtoRapido.post('/pegarTodosOsEstoques', (req, res) => useBody(req, res, pegarTodosOsEstoques));
produtoRapido.post('/pegarTodosOsLotes', (req, res) => useBody(req, res, pegarTodosOsLotes)); 
produtoRapido.post('/pegarCodigoDeBarras', (req, res) => useBody(req, res, pegarCodigoDeBarras));
produtoRapido.post('/pegarCodBarras', (req, res) => useBody(req, res, pegarCodBarras));
produtoRapido.post('/pegarEstoque', (req, res) => useBody(req, res, pegarEstoque));
produtoRapido.post('/pegarCusto', (req, res) => useBody(req, res, pegarCusto));
produtoRapido.post('/pegarVenda', (req, res) => useBody(req, res, pegarVenda));
produtoRapido.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
produtoRapido.post('/pesquisarPorColunaDescricao', (req, res) => useBody(req, res, pesquisarPorColunaDescricao));
produtoRapido.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
produtoRapido.post('/pegarEstoque2', (req, res) => useBody(req, res, pegarEstoque2));
produtoRapido.post('/logo', (req, res) => useBody(req, res, logo));


module.exports = produtoRapido