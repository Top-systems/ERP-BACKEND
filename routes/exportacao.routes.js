const express = require('express');
const { useBody } = require('./db/use');

const {
    gerarm,
    pegarvendasprazo,
    pegarvendasvista,
    pegarcompras,
    pegarnfe,
    numeroserie,
    pegarreducoes  
} = require('./db/exportacao.models');

const exportacao = express.Router();

exportacao.post('/gerarm', (req, res) => useBody(req, res, gerarm));
exportacao.post('/pegarvendasprazo', (req, res) => useBody(req, res, pegarvendasprazo));
exportacao.post('/pegarvendasvista', (req, res) => useBody(req, res, pegarvendasvista));
exportacao.post('/pegarcompras', (req, res) => useBody(req, res, pegarcompras));
exportacao.post('/pegarnfe', (req, res) => useBody(req, res, pegarnfe));
exportacao.post('/numeroserie', (req, res) => useBody(req, res, numeroserie));
exportacao.post('/pegarreducoes', (req, res) => useBody(req, res, pegarreducoes));

module.exports = exportacao