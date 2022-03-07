const express = require('express');
const { useBody } = require('./db/use');
 
const{  
    atualizar,
    atualizarl,
    listar
}= require('./db/analiseTributacao.models');

const analiseTributacao = express.Router();

analiseTributacao.post('/atualizar', (req, res) => useBody(req, res, atualizar));
analiseTributacao.post('/atualizarl', (req, res) => useBody(req, res, atualizarl));
analiseTributacao.post('/listar', (req, res) => useBody(req, res, listar));
 
module.exports = analiseTributacao