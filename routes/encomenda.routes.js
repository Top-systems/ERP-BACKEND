const express = require('express');
const { useBody } = require('./db/use');
 
const{
    selecionar,
    listarn,
    lista,
    salvar
}= require('./db/encomenda.models');

 const encomenda = express.Router();

encomenda.post('/selecionar', (req, res) => useBody(req, res, selecionar));
encomenda.post('/listarn', (req, res) => useBody(req, res, listarn));
encomenda.post('/lista', (req, res) => useBody(req, res, lista));
encomenda.post('/salvar', (req, res) => useBody(req, res, salvar));
 
module.exports = encomenda