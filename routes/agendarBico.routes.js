const express = require('express');
const { useBody } = require('./db/use');
 
const{
    pegardatahora,
    listar,
    inserirt,
    salvar
}= require('./db/agendarBico.models');

const agendarBico = express.Router();

agendarBico.post('/pegardatahora', (req, res) => useBody(req, res, pegardatahora));
agendarBico.post('/listar', (req, res) => useBody(req, res, listar));
agendarBico.post('/inserirt', (req, res) => useBody(req, res, inserirt));
agendarBico.post('/salvar', (req, res) => useBody(req, res, salvar));
 
module.exports = agendarBico