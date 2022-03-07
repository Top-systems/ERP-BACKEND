const express = require('express')
const { useBody } = require('./db/use');

const{
    processarFiltro,
    pesquisarPorColuna,
    logo,
    verificardest
} = require("./db/admCartao.models");

const admCartao = express.Router();

admCartao.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
admCartao.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
admCartao.post('/logo', (req, res) => useBody(req, res, logo));
admCartao.post('/verificardest', (req, res) => useBody(req, res, verificardest));

module.exports = admCartao;