const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processar,
    pegarDescricao,
    pegarDescricaoGrupo,
    atualizarCadastros
}= require('./db/curvaABC.models');

const curvaABC = express.Router();

curvaABC.post('/processar', (req, res) => useBody(req, res, processar));
curvaABC.post('/pegarDescricao', (req, res) => useBody(req, res, pegarDescricao));
curvaABC.post('/pegarDescricaoGrupo', (req, res) => useBody(req, res, pegarDescricaoGrupo));
curvaABC.post('/atualizarCadastros', (req, res) => useBody(req, res, atualizarCadastros));
 
module.exports = curvaABC