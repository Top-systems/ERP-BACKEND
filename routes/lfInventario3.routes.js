const express = require('express');
 const { useBody } = require('./db/use');
 
const{
    iniciaInventario,
    entrada
}= require('./db/lfInventario3.models');

 const lfInventario3 = express.Router();

lfInventario3.post('/iniciaInventario', (req, res) => useBody(req, res, iniciaInventario));
lfInventario3.post('/entrada', (req, res) => useBody(req, res, entrada));
 
module.exports = lfInventario3