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
    gerarrelatoriocupons2,
    gerarrelatorioqtd,
    gerarrelatorioperiodo,
    listartipos,
    salvar2,
    listarvendas
} = require('./db/turno.models');

const turno = express.Router();

turno.post('/ultimoturno', (req, res) => useBody(req, res, ultimoturno));
turno.post('/listarx', (req, res) => useBody(req, res, listarx));
turno.post('/listardet', (req, res) => useBody(req, res, listardet));
turno.post('/listardet2', (req, res) => useBody(req, res, listardet2));
turno.post('/listar', (req, res) => useBody(req, res, listar));
turno.post('/tarefacorrigitipospag', (req, res) => useBody(req, res, tarefacorrigitipospag));
turno.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
turno.post('/salvar', (req, res) => useBody(req, res, salvar));
turno.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
turno.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
turno.post('/gerarrelatorio', (req, res) => useBody(req, res, gerarrelatorio));
turno.post('/gerarrelatorioitens', (req, res) => useBody(req, res, gerarrelatorioitens));
turno.post('/gerarrelatoriocupons', (req, res) => useBody(req, res, gerarrelatoriocupons));
turno.post('/gerarrelatoriocupons2', (req, res) => useBody(req, res, gerarrelatoriocupons2));
turno.post('/gerarrelatorioqtd', (req, res) => useBody(req, res, gerarrelatorioqtd));
turno.post('/gerarrelatorioperiodo', (req, res) => useBody(req, res, gerarrelatorioperiodo));
turno.post('/listartipos', (req, res) => useBody(req, res, listartipos));
turno.post('/salvar2', (req, res) => useBody(req, res, salvar2));
turno.post('/listarvendas', (req, res) => useBody(req, res, listarvendas));

module.exports =turno