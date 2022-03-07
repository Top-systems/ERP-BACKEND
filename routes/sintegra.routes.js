const express = require('express');
const { useBody } = require('./db/use');

const {
    cancelarcuponsemaberto,
    gerarSintegra,
    lojas
} = require('./db/sintegra.models');

const sintegra = express.Router();

sintegra.post('/cancelarcuponsemaberto', (req, res) => useBody(req, res, cancelarcuponsemaberto));
sintegra.post('/gerarSintegra', (req, res) => useBody(req, res, gerarSintegra));
sintegra.post('/lojas', (req, res) => useBody(req, res, lojas));

module.exports = sintegra