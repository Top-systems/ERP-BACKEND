const express = require('express');
 const { useBody } = require('./db/use');
 
const{
    entrada,
    saida,
    carrega
}= require('./db/lfInventario2.models');

 const lfInventario2 = express.Router();

lfInventario2.post('/entrada', (req, res) => useBody(req, res, entrada ));
lfInventario2.post('/saida', (req, res) => useBody(req, res, saida));
lfInventario2.post('/carrega', (req, res) => useBody(req, res, carrega));
 
module.exports = lfInventario2