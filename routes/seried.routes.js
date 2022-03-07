const express = require('express');
const { useBody } = require('./db/use');
 
const{
    setarNota,
    salvar,
    inserir,
    pesquisarPorColuna,
    preencherListaBusca,
    pesquisarPorColunaDescricao,
    pesquisarCodigoProduto,
    pesquisarPorColunaProduto,
    setarProduto,
    pegarCodigoDeBarras,
    pegarCusto,
    pegarVenda,
    pegarEstoque,
    onCellEdit
}= require('./db/seried.models');

const seried = express.Router();

seried.post('/setarNota', (req, res) => useBody(req, res, setarNota));
seried.post('/salvar', (req, res) => useBody(req, res, salvar));
seried.post('/inserir', (req, res) => useBody(req, res, inserir));
seried.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
seried.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
seried.post('/pesquisarPorColunaDescricao', (req, res) => useBody(req, res, pesquisarPorColunaDescricao));
seried.post('/pesquisarCodigoProduto', (req, res) => useBody(req, res, pesquisarCodigoProduto));
seried.post('/pesquisarPorColunaProduto', (req, res) => useBody(req, res, pesquisarPorColunaProduto));
seried.post('/setarProduto', (req, res) => useBody(req, res, setarProduto));
seried.post('/pegarCodigoDeBarras', (req, res) => useBody(req, res, pegarCodigoDeBarras));
seried.post('/pegarCusto', (req, res) => useBody(req, res, pegarCusto));
seried.post('/pegarVenda', (req, res) => useBody(req, res, pegarVenda));
seried.post('/pegarEstoque', (req, res) => useBody(req, res, pegarEstoque));
seried.post('/onCellEdit', (req, res) => useBody(req, res, onCellEdit));
 
module.exports = seried