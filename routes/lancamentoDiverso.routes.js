const express = require('express');
 const { useBody } = require('./db/use');
 
const{
    salvarcontasreceber,
    salvarcontasapagar,
    verifica,
    verifica2,
    baixar,
    baixarr,
    cancelar,
    cancelarr,
    consultar
}= require('./db/lancamentoDiverso.models');

 const lancamentoDiverso = express.Router();

lancamentoDiverso.post('/salvarcontasreceber', (req, res) => useBody(req, res, salvarcontasreceber));
lancamentoDiverso.post('/salvarcontasapagar', (req, res) => useBody(req, res, salvarcontasapagar));
lancamentoDiverso.post('/verifica', (req, res) => useBody(req, res, verifica));
lancamentoDiverso.post('/verifica2', (req, res) => useBody(req, res, verifica2));
lancamentoDiverso.post('/baixar', (req, res) => useBody(req, res, baixar));
lancamentoDiverso.post('/baixarr', (req, res) => useBody(req, res, baixarr));
lancamentoDiverso.post('/cancelar', (req, res) => useBody(req, res, cancelar));
lancamentoDiverso.post('/cancelarr', (req, res) => useBody(req, res, cancelarr));
lancamentoDiverso.post('/consultar', (req, res) => useBody(req, res, consultar));
 
module.exports = lancamentoDiverso