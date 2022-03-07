const express = require('express');
const { useBody } = require('./db/use');
 
const{
    salvarcontasareceber,
    salvarcontasapagar, 
    verifica,
    verifica2,
    baixar,
    cancelar,
    consultar
}= require('./db/lancamentoFuncionario.models');

const lancamentoFuncionario = express.Router();

lancamentoFuncionario.post('/salvarcontasareceber', (req, res) => useBody(req, res, salvarcontasareceber));
lancamentoFuncionario.post('/salvarcontasapagar', (req, res) => useBody(req, res, salvarcontasapagar));
lancamentoFuncionario.post('/verifica', (req, res) => useBody(req, res, verifica));
lancamentoFuncionario.post('/verifica2', (req, res) => useBody(req, res, verifica2));
lancamentoFuncionario.post('/baixar', (req, res) => useBody(req, res, baixar));
lancamentoFuncionario.post('/cancelar', (req, res) => useBody(req, res, cancelar));
lancamentoFuncionario.post('/consultar', (req, res) => useBody(req, res, consultar));

module.exports = lancamentoFuncionario