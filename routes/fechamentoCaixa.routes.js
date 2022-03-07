const express = require('express');
const { useBody } = require('./db/use');

const {
    tipospag,
    salvar,
    consultar,
    listarhoje,
    consultarlancamentos,
    consutarlancamentosdiaanterior,
    troco,
    inicial,
    carga,
    sangria,
    contaspagarentrada,
    contaspagarsaida,
    contasrecebersaida,
    contasreceberentrada,
    cupomtipo7,
    cupomtipo6,
    cupomtipo5,
    cupomtipo4,
    cupomtipo3,
    cupomtipo2,
    cupomtipo1
} = require('./db/fechamentoCaixa.models');

const fechamentoCaixa = express.Router();

fechamentoCaixa.post('/tipospag', (req, res) => useBody(req, res, tipospag));
fechamentoCaixa.post('/salvar', (req, res) => useBody(req, res, salvar));
fechamentoCaixa.post('/consultar', (req, res) => useBody(req, res, consultar));
fechamentoCaixa.post('/listarhoje', (req, res) => useBody(req, res, listarhoje));
fechamentoCaixa.post('/consultarlancamentos', (req, res) => useBody(req, res, consultarlancamentos));
fechamentoCaixa.post('/consutarlancamentosdiaanterior', (req, res) => useBody(req, res, consutarlancamentosdiaanterior));
fechamentoCaixa.post('/troco', (req, res) => useBody(req, res, troco));
fechamentoCaixa.post('/inicial', (req, res) => useBody(req, res, inicial));
fechamentoCaixa.post('/carga', (req, res) => useBody(req, res, carga));
fechamentoCaixa.post('/sangria', (req, res) => useBody(req, res, sangria));
fechamentoCaixa.post('/contaspagarentrada', (req, res) => useBody(req, res, contaspagarentrada));
fechamentoCaixa.post('/contaspagarsaida', (req, res) => useBody(req, res, contaspagarsaida));
fechamentoCaixa.post('/contasrecebersaida', (req, res) => useBody(req, res, contasrecebersaida));
fechamentoCaixa.post('/contasreceberentrada', (req, res) => useBody(req, res, contasreceberentrada));
fechamentoCaixa.post('/cupomtipo7', (req, res) => useBody(req, res, cupomtipo7));
fechamentoCaixa.post('/cupomtipo6', (req, res) => useBody(req, res, cupomtipo6));
fechamentoCaixa.post('/cupomtipo5', (req, res) => useBody(req, res, cupomtipo5));
fechamentoCaixa.post('/cupomtipo4', (req, res) => useBody(req, res, cupomtipo4));
fechamentoCaixa.post('/cupomtipo3', (req, res) => useBody(req, res, cupomtipo3));
fechamentoCaixa.post('/cupomtipo2', (req, res) => useBody(req, res, cupomtipo2));
fechamentoCaixa.post('/cupomtipo1', (req, res) => useBody(req, res, cupomtipo1));



module.exports = fechamentoCaixa