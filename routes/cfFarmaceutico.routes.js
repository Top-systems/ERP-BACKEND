const express = require('express');
const { useBody } = require('./db/use');
 
const{
    salvar,
    pesquisarPorColuna,
    processarFiltro,
    preencherListaBusca,
    logo
}= require('./db/cfFarmaceutico.models');

const cfFarmaceutico = express.Router();

cfFarmaceutico.post('/salvar', (req, res) => useBody(req, res, salvar));
cfFarmaceutico.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
cfFarmaceutico.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
cfFarmaceutico.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
cfFarmaceutico.post('/logo', (req, res) => useBody(req, res, logo));
 
module.exports = cfFarmaceutico