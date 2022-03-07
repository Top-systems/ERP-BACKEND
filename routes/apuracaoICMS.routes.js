const express = require('express');
const { useBody } = require('./db/use');
 
const{
    listar
}= require('./db/apuracaoICMS.models');

const apuracaoICMS = express.Router();

apuracaoICMS.post('/listar', (req, res) => useBody(req, res, listar));
 
module.exports = apuracaoICMS