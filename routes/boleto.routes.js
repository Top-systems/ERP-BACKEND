const express = require('express');
const { useBody } = require('./db/use');

const {
    logar
} = require('./db/boleto.models')

const boleto = express.Router();

boleto.post('/logar', (req, res) => useBody(req, res, logar))

module.exports = boleto;