const express = require('express');
const { useBody } = require('./db/use');
 
const{
    pegarQuantidadeVendida,
    pegarEncomendas,
    pegarEstoqueProduto,
    pesquisarCodigoProduto,
    pesquisarPorColunaProduto,
    pesquisarPorColunaDescricao,
    pegarEstoque,
    pegarCodigoDeBarras
}= require('./db/compraSugestao2.models');

const compraSugestao2 = express.Router();

compraSugestao2.post('/pegarQuantidadeVendida', (req, res) => useBody(req, res, pegarQuantidadeVendida));
compraSugestao2.post('/pegarEncomendas', (req, res) => useBody(req, res, pegarEncomendas));
compraSugestao2.post('/pegarEstoqueProduto', (req, res) => useBody(req, res, pegarEstoqueProduto));
compraSugestao2.post('/pesquisarCodigoProduto', (req, res) => useBody(req, res, pesquisarCodigoProduto));
compraSugestao2.post('/pesquisarPorColunaProduto', (req, res) => useBody(req, res, pesquisarPorColunaProduto));
compraSugestao2.post('/pesquisarPorColunaDescricao', (req, res) => useBody(req, res, pesquisarPorColunaDescricao));
compraSugestao2.post('/pegarEstoque', (req, res) => useBody(req, res, pegarEstoque));
compraSugestao2.post('/pegarCodigoDeBarras', (req, res) => useBody(req, res, pegarCodigoDeBarras));
 
module.exports = compraSugestao2