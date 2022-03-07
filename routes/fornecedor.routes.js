const express = require('express')
const { useBody } = require('./db/use');

const{
    listarel,
    listarelcomb,
    pegarConfig,
    pegarProdutos,
    pesquisaProdutos,
    pegarCodigoDeBarras,
    pegarArquivo,
    processarFiltro,
    pesquisarPorTexto,
    pesquisarPorInteiro,
    verificardest
} = require('./db/fornecedor.models');

const fornecedor = express.Router();

fornecedor.post('/listarel', (req, res) => useBody(req, res, listarel));
fornecedor.post('/listarelcomb', (req, res) => useBody(req, res, listarelcomb));
fornecedor.post('/pegarConfig', (req, res) => useBody(req, res, pegarConfig));
fornecedor.post('/pegarProdutos', (req, res) => useBody(req, res, pegarProdutos));
fornecedor.post('/pesquisaProdutos', (req, res) => useBody(req, res, pesquisaProdutos));
fornecedor.post('/pegarCodigoDeBarras', (req, res) => useBody(req, res, pegarCodigoDeBarras));
fornecedor.post('/pegarArquivo', (req, res) => useBody(req, res, pegarArquivo));
fornecedor.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
fornecedor.post('/pesquisarPorTexto', (req, res) => useBody(req, res, pesquisarPorTexto));
fornecedor.post('/pesquisarPorInteiro', (req, res) => useBody(req, res, pesquisarPorInteiro));
fornecedor.post('/verificardest', (req, res) => useBody(req, res, verificardest));

module.exports = fornecedor;