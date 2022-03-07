const express = require('express');
const { useBody } = require('./db/use');

const {
    vermedicoes,
    verab,
    salvarg,
    atualizatanque,
    verificargerar,
    pegarsituacao,
    atualizatotais,
    pegartanque,
    pegarc,
    pegarcatual,
    listar,
    cancelarl,
    cancelarltodos,
    excluir,
    inserircab,
    verificar,
    termo
} = require('./db/gerarLMC.models');

const gerarLMC = express.Router();

gerarLMC.post('/vermedicoes', (req, res) => useBody(req, res, vermedicoes));
gerarLMC.post('/verab', (req, res) => useBody(req, res, verab));
gerarLMC.post('/salvarg', (req, res) => useBody(req, res, salvarg));
gerarLMC.post('/atualizatanque', (req, res) => useBody(req, res, atualizatanque));
gerarLMC.post('/verificargerar', (req, res) => useBody(req, res, verificargerar));
gerarLMC.post('/pegarsituacao', (req, res) => useBody(req, res, pegarsituacao));
gerarLMC.post('/atualizatotais', (req, res) => useBody(req, res, atualizatotais));
gerarLMC.post('/pegartanque', (req, res) => useBody(req, res, pegartanque));
gerarLMC.post('/pegarc', (req, res) => useBody(req, res, pegarc));
gerarLMC.post('/pegarcatual', (req, res) => useBody(req, res, pegarcatual));
gerarLMC.post('/listar', (req, res) => useBody(req, res, listar));
gerarLMC.post('/cancelarl', (req, res) => useBody(req, res, cancelarl));
gerarLMC.post('/cancelarltodos', (req, res) => useBody(req, res, cancelarltodos));
gerarLMC.post('/excluir', (req, res) => useBody(req, res, excluir));
gerarLMC.post('/inserircab', (req, res) => useBody(req, res, inserircab));
gerarLMC.post('/verificar', (req, res) => useBody(req, res, verificar));
gerarLMC.post('/termo', (req, res) => useBody(req, res, termo));

module.exports = gerarLMC