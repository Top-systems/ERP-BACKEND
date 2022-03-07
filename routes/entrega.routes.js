const express = require('express');
const { useBody } = require('./db/use');
 
const{
    listar
}= require('./db/entrega.models');

const entrega = express.Router();

entrega.post('/listar', (req, res) => useBody(req, res, listar));
 
module.exports = entrega