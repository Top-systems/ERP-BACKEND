const express = require('express');
const { useBody } = require('./db/use');

const {
    setar,
    filtrar
} = require('./db/dav.models');

const dav = express.Router();

dav.post('/setar', (req, res) => useBody(req, res, setar));
dav.post('/filtrar', (req, res) => useBody(req, res, filtrar))

module.exports = dav;