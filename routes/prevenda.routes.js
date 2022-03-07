const express = require('express');
const { useBody } = require('./db/use');

const {
    setar,
    filtrar
} = require('./db/prevenda.models');

const prevenda = express.Router();

prevenda.post('/setar', (req, res) => useBody(req, res, setar));
prevenda.post('/filtrar', (req, res) => useBody(req, res, filtrar));

module.exports = prevenda