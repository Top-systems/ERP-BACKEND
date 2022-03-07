const express = require('express');
 const { useBody } = require('./db/use');
 
const{
    setarsugestao
}= require('./db/cotacao.models');

 const cotacao = express.Router();

cotacao.post('/setarsugestao', (req, res) => useBody(req, res, setarsugestao));
 
module.exports = cotacao