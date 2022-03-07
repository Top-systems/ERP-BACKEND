const express = require('express')
const { useBody } = require('./db/use');

const{
    retornaFoto,
    recebeFoto,
    removerFoto,
    carregarSequencias,
    salvarSequencia,
    processarFiltro,
    salvar,
    pesquisarPorColuna,
    pesquisarPorColunaLOJA,
    preencherListaBuscaLOJA,
    PegaPeriodo,
    PegaConf,
    PegaConfVenda,
    pegaSped,
    PegaConfNfe,
    PegarAutomacao,
    PegaServidor,
    getLojasNivel
} = require('./db/loja.models');

const loja = express.Router();

loja.post('/retornaFoto', (req, res) => useBody(req, res, retornaFoto));
loja.post('/recebeFoto', (req, res) => useBody(req, res, recebeFoto));
loja.post('/removerFoto', (req, res) => useBody(req, res, removerFoto));
loja.post('/carregarSequencias', (req, res) => useBody(req, res, carregarSequencias));
loja.post('/salvarSequencia', (req, res) => useBody(req, res, salvarSequencia));
loja.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
loja.post('/salvar', (req, res) => useBody(req, res, salvar));
loja.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
loja.post('/pesquisarPorColunaLOJA', (req, res) => useBody(req, res, pesquisarPorColunaLOJA));
loja.post('/preencherListaBuscaLOJA', (req, res) => useBody(req, res, preencherListaBuscaLOJA));
loja.post('/PegaPeriodo', (req, res) => useBody(req, res, PegaPeriodo));
loja.post('/PegaConf', (req, res) => useBody(req, res, PegaConf));
loja.post('/PegaConfVenda', (req, res) => useBody(req, res, PegaConfVenda));
loja.post('/pegaSped', (req, res) => useBody(req, res, pegaSped));
loja.post('/PegaConfNfe', (req, res) => useBody(req, res, PegaConfNfe));
loja.post('/PegarAutomacao', (req, res) => useBody(req, res, PegarAutomacao));
loja.post('/PegaServidor', (req, res) => useBody(req, res, PegaServidor));
loja.post('/getlojasNivel', (req, res) => useBody(req, res, getLojasNivel));

module.exports = loja;