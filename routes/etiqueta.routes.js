const express = require('express')
const { useBody } = require('./db/use');

const{
    estoque,
    pesquisarPorColuna,
    pegarCodigoDeBarras,
    desconto,
    preco,
    setarproduto,
    preencherListaBusca
} = require('./db/etiqueta.models');

const etiqueta = express.Router();

etiqueta.post('/estoque', (req, res) => useBody(req, res, estoque));
etiqueta.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
etiqueta.post('/pegarCodigoDeBarras', (req, res) => useBody(req, res, pegarCodigoDeBarras));
etiqueta.post('/desconto', (req, res) => useBody(req, res, desconto));
etiqueta.post('/preco', (req, res) => useBody(req, res, preco));
etiqueta.post('/setarproduto', (req, res) => useBody(req, res, setarproduto));
etiqueta.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));

module.exports = etiqueta;
