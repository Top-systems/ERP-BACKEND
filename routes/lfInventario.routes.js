const express = require('express');
const { useBody } = require('./db/use');
 
const{
    iniciaInventario,
    listaEntrada,
    listaSaida,
    processarFiltro,
    excluirFiltro,
    pegarDetalhes
}= require('./db/lfInventario.models');

const lfInventario = express.Router();

lfInventario.post('/iniciaInventario', (req, res) => useBody(req, res, iniciaInventario));
lfInventario.post('/listaEntrada', (req, res) => useBody(req, res, listaEntrada));
lfInventario.post('/listaSaida', (req, res) => useBody(req, res, listaSaida));
lfInventario.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
lfInventario.post('/excluirFiltro', (req, res) => useBody(req, res, excluirFiltro));
lfInventario.post('/pegarDetalhes', (req, res) => useBody(req, res, pegarDetalhes));

module.exports = lfInventario