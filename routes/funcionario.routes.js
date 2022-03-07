const express = require('express')
const { useBody } = require('./db/use');

const{
    verificaCPF,
    retornaFoto,
    recebeFoto,
    removerFoto,
    processarFiltro,
    alterarStatus,
    salvar,
    pesquisarPorTexto,
    pesquisarPorInteiro,
    preencherListaBusca
} = require('./db/funcionario.model');

const funcionario = express.Router();

funcionario.post('/verificaCPF', (req, res) => useBody(req, res, verificaCPF)); 
funcionario.post('/retornaFoto', (req, res) => useBody(req, res, retornaFoto));
funcionario.post('/recebeFoto', (req, res) => useBody(req, res, recebeFoto));
funcionario.post('/removerFoto', (req, res) => useBody(req, res, removerFoto));
funcionario.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
funcionario.post('/alterarStatus', (req, res) => useBody(req, res, alterarStatus));
funcionario.post('/salvar', (req, res) => useBody(req, res, salvar));
funcionario.post('/pesquisarPorTexto', (req, res) => useBody(req, res, pesquisarPorTexto));
funcionario.post('/pesquisarPorInteiro', (req, res) => useBody(req, res, pesquisarPorInteiro));
funcionario.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));

module.exports = funcionario;