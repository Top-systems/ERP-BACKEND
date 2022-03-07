const express = require('express');
const { useBody } = require('./db/use');
 
const{
    listar,
    setar
}= require('./db/transacao.models');

const transacao = express.Router();

transacao.post('/listar', (req, res) => useBody(req, res, listar));
transacao.post('/setar', (req, res) => useBody(req, res, setar));
 
module.exports = transacao;
