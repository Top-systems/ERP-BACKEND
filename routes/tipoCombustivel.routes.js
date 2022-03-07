const express = require('express');
const { useBody } = require('./db/use');
 
const{
    setarCest,
    setarncm,
    pegarPrecos,
    processarFiltro,
    listarTipoCombustivel,
    salvar,
    pesquisarPorColuna,
    pesquisarPorColunabico,
    preencherListaBuscabico,
    pesquisarPorColunaDescricao
}= require('./db/tipoCombustivel.models');

const tipoCombustivel = express.Router();

tipoCombustivel.post('/setarCest', (req, res) => useBody(req, res, setarCest));
tipoCombustivel.post('/setarncm', (req, res) => useBody(req, res, setarncm)); 
tipoCombustivel.post('/pegarPrecos', (req, res) => useBody(req, res, pegarPrecos));
tipoCombustivel.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
tipoCombustivel.post('/listarTipoCombustivel', (req, res) => useBody(req, res, listarTipoCombustivel));
tipoCombustivel.post('/salvar', (req, res) => useBody(req, res, salvar));
tipoCombustivel.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
tipoCombustivel.post('/pesquisarPorColunabico', (req, res) => useBody(req, res, pesquisarPorColunabico));
tipoCombustivel.post('/preencherListaBuscabico', (req, res) => useBody(req, res, preencherListaBuscabico));
tipoCombustivel.post('/pesquisarPorColunaDescricao', (req, res) => useBody(req, res, pesquisarPorColunaDescricao));

module.exports = tipoCombustivel