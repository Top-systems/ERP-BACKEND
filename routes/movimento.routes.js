const express = require('express');
const { useBody } = require('./db/use');

const {
    ultimoturno,
    listarx,
    listardet,
    listardet2,
    listar,
    tarefacorrigitipospag,
    processarFiltro,
    salvar,
    pesquisarPorColuna,
    preencherListaBusca,
    gerarrelatorio,
    gerarrelatorioitens,
    gerarrelatoriocupons,
    gerarrelatorioqtd,
    gerarrelatorioperiodo,
    listarTipos,
    salvar2,
    listarvendas
} = require('./db/movimento.models');

const movimento = express.Router();

movimento.post('/ultimoturno', (req, res) => useBody(req, res, ultimoturno));
movimento.post('/listarx', (req, res) => useBody(req, res, listarx));
movimento.post('/listardet', (req, res) => useBody(req, res, listardet));
movimento.post('/listardet2', (req, res) => useBody(req, res, listardet2));
movimento.post('/listar', (req, res) => useBody(req, res, listar));
movimento.post('/tarefacorrigitipospag', (req, res) => useBody(req, res, tarefacorrigitipospag));
movimento.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
movimento.post('/salvar', (req, res) => useBody(req, res, salvar));
movimento.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
movimento.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
movimento.post('/gerarrelatorio', (req, res) => useBody(req, res, gerarrelatorio));
movimento.post('/gerarrelatorioitens', (req, res) => useBody(req, res, gerarrelatorioitens));
movimento.post('/gerarrelatoriocupons', (req, res) => useBody(req, res, gerarrelatoriocupons));
movimento.post('/gerarrelatorioqtd', (req, res) => useBody(req, res, gerarrelatorioqtd));
movimento.post('/gerarrelatorioperiodo', (req, res) => useBody(req, res, gerarrelatorioperiodo));
movimento.post('/listarTipos', (req, res) => useBody(req, res, listarTipos));
movimento.post('/salvar2', (req, res) => useBody(req, res, salvar2));
movimento.post('/listarvendas', (req, res) => useBody(req, res, listarvendas));

module.exports = movimento