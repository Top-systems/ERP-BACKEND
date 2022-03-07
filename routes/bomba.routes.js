const express = require('express');
const { useBody } = require('./db/use');

const {
    processarFiltro,
    salvar,
    pesquisarPorColuna,
    lacress,
    limp,
    inserircab,
    excluiri,
    pegarbicos,
    atualizabicos,
    editarl
} = require('./db/bomba.models');

const bomba = express.Router();

bomba.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
bomba.post('/salvar', (req, res) => useBody(req, res, salvar));
bomba.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
bomba.post('/lacress', (req, res) => useBody(req, res, lacress));
bomba.post('/limp', (req, res) => useBody(req, res, limp));
bomba.post('/inserircab', (req, res) => useBody(req, res, inserircab));
bomba.post('/excluiri', (req, res) => useBody(req, res, excluiri));
bomba.post('/pegarbicos', (req, res) => useBody(req, res, pegarbicos));
bomba.post('/atualizabicos', (req, res) => useBody(req, res, atualizabicos));
bomba.post('/editarl', (req, res) => useBody(req, res, editarl));

module.exports =bomba