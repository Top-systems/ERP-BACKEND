const express = require('express');
const { useBody } = require('./db/use');

const {
    salvarlancamento,
    consultar
} = require('./db/movConta.models');

const movConta = express.Router();

movConta.post('/salvarlancamento', (req, res) => useBody(req, res, salvarlancamento));
movConta.post('/consultar', (req, res) => useBody(req, res, consultar));

module.exports =movConta