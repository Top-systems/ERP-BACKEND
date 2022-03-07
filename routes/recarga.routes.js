const express = require('express');
 const { useBody } = require('./db/use');
 
const{
    listar
}= require('./db/recarga.models');

 const recarga = express.Router();

 recarga.post('/listar', (req, res) => useBody(req, res, listar));
 
module.exports = recarga