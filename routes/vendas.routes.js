const express = require('express');
const { useBody } = require('./db/use');

const {
    listaritens,
    consultar,
    processarXML,
    processarXMLsat,
    consultarxmls,
    gerarxml,
    montacupom,
    consultarxmlsSAT,
    itensnfe,
    cancelarnfce,
    situacaonfe,
    geraxmlcancelado,
    geraxmlinutilizado
} = require('./db/vendas.models');

const vendas = express.Router();

vendas.post('/listaritens', (req, res) => useBody(req, res, listaritens));
vendas.post('/consultar', (req, res) => useBody(req, res, consultar));
vendas.post('/processarXML', (req, res) => useBody(req, res, processarXML));
vendas.post('/processarXMLsat', (req, res) => useBody(req, res, processarXMLsat));
vendas.post('/consultarxmls', (req, res) => useBody(req, res, consultarxmls));
vendas.post('/gerarxml', (req, res) => useBody(req, res, gerarxml));
vendas.post('/montacupom', (req, res) => useBody(req, res, montacupom));
vendas.post('/consultarxmlsSAT', (req, res) => useBody(req, res, consultarxmlsSAT));
vendas.post('/itensnfe', (req, res) => useBody(req, res, itensnfe));
vendas.post('/cancelarnfce', (req, res) => useBody(req, res, cancelarnfce));
vendas.post('/situacaonfe', (req, res) => useBody(req, res, situacaonfe));
vendas.post('/geraxmlcancelado', (req, res) => useBody(req, res, geraxmlcancelado));
vendas.post('/geraxmlinutilizado', (req, res) => useBody(req, res, geraxmlinutilizado));

module.exports = vendas