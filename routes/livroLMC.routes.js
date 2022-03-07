const express = require('express');
const { useBody } = require('./db/use');

const {
    totalizarperdasesobras,
    intervencaobico,
    intervencaolacre,
    listardetalhe,
    listardetalhe2,
    listarLMC,
    processarFiltro,
    pesquisarPorColuna,
    filtrarrd,
    preencherListaBusca,
    logo,
    pegartanque,
    excluir,
    pesquisarPorColunai
} = require('./db/livroLMC.models');

const livroLMC = express.Router();

livroLMC.post('/totalizarperdasesobras', (req, res) => useBody(req, res, totalizarperdasesobras));
livroLMC.post('/intervencaobico', (req, res) => useBody(req, res, intervencaobico));
livroLMC.post('/intervencaolacre', (req, res) => useBody(req, res, intervencaolacre));
livroLMC.post('/listardetalhe', (req, res) => useBody(req, res, listardetalhe));
livroLMC.post('/listardetalhe2', (req, res) => useBody(req, res, listardetalhe2));
livroLMC.post('/listarLMC', (req, res) => useBody(req, res, listarLMC));
livroLMC.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
livroLMC.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
livroLMC.post('/filtrarrd', (req, res) => useBody(req, res, filtrarrd));
livroLMC.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
livroLMC.post('/logo', (req, res) => useBody(req, res, logo));
livroLMC.post('/pegartanque', (req, res) => useBody(req, res, pegartanque));
livroLMC.post('/excluir', (req, res) => useBody(req, res, excluir));
livroLMC.post('/pesquisarPorColunai', (req, res) => useBody(req, res, pesquisarPorColunai));

module.exports =livroLMC