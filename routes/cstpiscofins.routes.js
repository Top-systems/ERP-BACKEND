const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna,
    pesquisarPorColunaAguaLuz,
    preencherListaBuscaAguaLuz,
    pesquisarPorColunaTelecomunicacao,
    preencherListaBuscaTelecomunicacao,
    pesquisarPorColunaMaior49,
    preencherListaBuscaMaior49,
    pesquisarPorColunaMenor49,
    preencherListaBuscaMenor49
}= require('./db/cstpiscofins.models');

const cstpiscofins = express.Router();

cstpiscofins.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
cstpiscofins.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
cstpiscofins.post('/pesquisarPorColunaAguaLuz', (req, res) => useBody(req, res, pesquisarPorColunaAguaLuz));
cstpiscofins.post('/preencherListaBuscaAguaLuz', (req, res) => useBody(req, res, preencherListaBuscaAguaLuz));
cstpiscofins.post('/pesquisarPorColunaTelecomunicacao', (req, res) => useBody(req, res, pesquisarPorColunaTelecomunicacao));
cstpiscofins.post('/preencherListaBuscaTelecomunicacao', (req, res) => useBody(req, res, preencherListaBuscaTelecomunicacao));
cstpiscofins.post('/pesquisarPorColunaMaior49', (req, res) => useBody(req, res, pesquisarPorColunaMaior49));
cstpiscofins.post('/preencherListaBuscaMaior49', (req, res) => useBody(req, res, preencherListaBuscaMaior49));
cstpiscofins.post('/pesquisarPorColunaMenor49', (req, res) => useBody(req, res, pesquisarPorColunaMenor49));
cstpiscofins.post('/preencherListaBuscaMenor49', (req, res) => useBody(req, res, preencherListaBuscaMenor49));
 
module.exports = cstpiscofins