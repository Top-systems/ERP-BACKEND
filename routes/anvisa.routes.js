const express = require('express');
const { useBody } = require('./db/use');
 
const{
    entradaMedicamento,
    entradaMedicamentoInventario,
    saidaMedicamento,
    perdaMedicamento,
    dataIni,
    listaXml,
    movimentacaoAnvisa
}= require('./db/anvisa.models');

const anvisa = express.Router();

anvisa.post('/entradaMedicamento', (req, res) => useBody(req, res, entradaMedicamento));
anvisa.post('/entradaMedicamentoInventario', (req, res) => useBody(req, res, entradaMedicamentoInventario));
anvisa.post('/saidaMedicamento', (req, res) => useBody(req, res, saidaMedicamento));
anvisa.post('/perdaMedicamento', (req, res) => useBody(req, res, perdaMedicamento));
anvisa.post('/dataIni', (req, res) => useBody(req, res, dataIni));
anvisa.post('/listaXml', (req, res) => useBody(req, res, listaXml));
anvisa.post('/movimentacaoAnvisa', (req, res) => useBody(req, res, movimentacaoAnvisa));
 
module.exports = anvisa