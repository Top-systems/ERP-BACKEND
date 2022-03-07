const express = require('express');
const { useBody } = require('./db/use');

const {
    excluir,
    listar,
    inserircab,
    verificar,
    pegartanque,
    listardetalhe
} = require('./db/encerrante.models');

const encerrante = express.Router();

encerrante.post('/excluir', (req, res) => useBody(req, res, excluir));
encerrante.post('/listar', (req, res) => useBody(req, res, listar));
encerrante.post('/inserircab', (req, res) => useBody(req, res, inserircab));
encerrante.post('/verificar', (req, res) => useBody(req, res, verificar));
encerrante.post('/pegartanque', (req, res) => useBody(req, res, pegartanque));
encerrante.post('/listardetalhe', (req, res) => useBody(req, res, listardetalhe));

module.exports = encerrante