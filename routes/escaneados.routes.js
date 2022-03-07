const express = require('express');
const { useBody } = require('./db/use');

const {
    atualiza,
    run
} = require('./db/escaneados.models')

const escaneados = express.Router();

escaneados.post('/atualiza', (req, res) => useBody(req, res, atualiza));
escaneados.post('/run', (req, res) => useBody(req, res, run))


module.exports = escaneados;