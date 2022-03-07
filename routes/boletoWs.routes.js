const express = require('express');
const { useBody } = require('./db/use');

const {
    listar,
    listarp,
    setarconfig,
    pesquisarPorColuna,
    ver,
    gerarbradesco,
    enviaremailx,
    mailnfe,
    mailnfe2,
    listaremails,
    listarboletositau,
    processarretornobancodobrasil,
    retorno
} = require('./db/boletoWs.models');

const boletoWs = express.Router();

boletoWs.post('/listar', (req, res) => useBody(req, res, listar));
boletoWs.post('/listarp', (req, res) => useBody(req, res, listarp));
boletoWs.post('/setarconfig', (req, res) => useBody(req, res, setarconfig));
boletoWs.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
boletoWs.post('/ver', (req, res) => useBody(req, res, ver));
boletoWs.post('/gerarbradesco', (req, res) => useBody(req, res, gerarbradesco));
boletoWs.post('/enviaremailx', (req, res) => useBody(req, res, enviaremailx));
boletoWs.post('/mailnfe', (req, res) => useBody(req, res, mailnfe));
boletoWs.post('/mailnfe2', (req, res) => useBody(req, res, mailnfe2));
boletoWs.post('/listaremails', (req, res) => useBody(req, res, listaremails));
boletoWs.post('/listarboletositau', (req, res) => useBody(req, res, listarboletositau));
boletoWs.post('/processarretornobancodobrasil', (req, res) => useBody(req, res, processarretornobancodobrasil));
boletoWs.post('/retorno', (req, res) => useBody(req, res, retorno));

module.exports = boletoWs