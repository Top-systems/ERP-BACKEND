const express = require('express');
const { useBody } = require('./db/use');

const {
    listar,
    verhoje,
    ver,
    criticarselecao
} = require('./db/registro60.models');

const registro60 = express.Router();

registro60.post('/listar', (req, res) => useBody(req, res, listar));
registro60.post('/verhoje', (req, res) => useBody(req, res, verhoje));
registro60.post('/ver', (req, res) => useBody(req, res, ver));
registro60.post('/criticarselecao', (req, res) => useBody(req, res, criticarselecao));

module.exports =registro60