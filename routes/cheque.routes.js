const express = require('express');
const { useBody } = require('./db/use');
 
const{
    salvarCheque,
    baixar,
    editarCheques
}= require('./db/cheque.models');

const cheque = express.Router();

cheque.post('/salvarCheque', (req, res) => useBody(req, res, salvarCheque));
cheque.post('/baixar', (req, res) => useBody(req, res, baixar));
cheque.post('/editarCheques', (req, res) => useBody(req, res, editarCheques));
 
module.exports = cheque