const express = require('express');
const { useBody } = require('./db/use');
 
const{
    listar
}= require('./db/totalizador.models');

const totalizador = express.Router();

totalizador.post('/listar', (req, res) => useBody(req, res, listar));

module.exports = totalizador