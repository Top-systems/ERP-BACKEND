const express = require('express');
const { useBody } = require('./db/use');
 
const{
    presalvarcp,
    salvarcontasapagar,
    verifica,
    verifica2,
    baixar,
    cancelar,
    gerarf,
    tp,
    pc,
    fo
}= require('./db/contasPagar.models');

const contasPagar = express.Router();

contasPagar.post('/presalvarcp', (req, res) => useBody(req, res, presalvarcp));
contasPagar.post('/salvarcontasapagar', (req, res) => useBody(req, res, salvarcontasapagar));
contasPagar.post('/verifica', (req, res) => useBody(req, res, verifica));
contasPagar.post('/verifica2', (req, res) => useBody(req, res, verifica2));
contasPagar.post('/baixar', (req, res) => useBody(req, res, baixar));
contasPagar.post('/cancelar', (req, res) => useBody(req, res, cancelar));
contasPagar.post('/gerarf', (req, res) => useBody(req, res, gerarf));
contasPagar.post('/tp', (req, res) => useBody(req, res, tp));
contasPagar.post('/pc', (req, res) => useBody(req, res, pc));
contasPagar.post('/fo', (req, res) => useBody(req, res, fo));
 
module.exports = contasPagar