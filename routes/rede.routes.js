const express = require('express');
const { useBody } = require('./db/use');

const {
    salvar,
    pesquisarPorColuna, 
    salvarusuario, 
    listarve,
    listarprodutos,
    filtrarn,
    filtrarv,
    filtrarvd,
    filtrarvp,
    listarregistros,
    listarlista,
    consultar
} = require('./db/rede.models');

const rede = express.Router();

rede.post('/salvar', (req, res) => useBody(req, res, salvar));
rede.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
rede.post('/salvarusuario', (req, res) => useBody(req, res, salvarusuario));
rede.post('/listarve', (req, res) => useBody(req, res, listarve));
rede.post('/listarprodutos', (req, res) => useBody(req, res, listarprodutos));
rede.post('/filtrarn', (req, res) => useBody(req, res, filtrarn));
rede.post('/filtrarv', (req, res) => useBody(req, res, filtrarv));
rede.post('/filtrarvd', (req, res) => useBody(req, res, filtrarvd));
rede.post('/filtrarvp', (req, res) => useBody(req, res, filtrarvp));
rede.post('/listarregistros', (req, res) => useBody(req, res, listarregistros));
rede.post('/listarlista', (req, res) => useBody(req, res, listarlista));
rede.post('/consultar', (req, res) => useBody(req, res, consultar));

module.exports = rede