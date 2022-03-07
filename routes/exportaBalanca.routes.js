const express = require('express');
const { useBody } = require('./db/use');

const {
    iniciar,
    gerar
} = require('./db/exportaBalanca.models');

const exportaBalanca = express.Router();

exportaBalanca.post('/iniciar', (req, res) => useBody(req, res, iniciar));
exportaBalanca.post('/gerar', (req, res) => useBody(req, res, gerar))

module.exports = exportaBalanca;