const express = require('express');
const { useBody } = require('./db/use');
 
const{
    iniciar,
    listarGrupos,
    logo
}= require('./db/relatorio.models');

const relatorio = express.Router();

relatorio.post('/iniciar', (req, res) => useBody(req, res, iniciar));
relatorio.post('/listarGrupos', (req, res) => useBody(req, res, listarGrupos));
relatorio.post('/logo', (req, res) => useBody(req, res, logo));

module.exports = relatorio