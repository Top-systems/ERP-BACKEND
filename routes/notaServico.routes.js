const express = require('express');
const { useBody } = require('./db/use');
 
const{
    salvarnota,
    setar,
    listarnatbc,
    excluirn,
    pesquisarPorColunaservico,
    pesquisarPorColunaDescricao,
    pesquisarCodigoServico,
    preencherListabusca,
    preencherListabuscaentrada,
    pesquisarPorColuna
}= require('./db/notaServico.models');

const notaServico = express.Router();

notaServico.post('/salvarnota', (req, res) => useBody(req, res, salvarnota));
notaServico.post('/setar', (req, res) => useBody(req, res, setar));
notaServico.post('/listarnatbc', (req, res) => useBody(req, res, listarnatbc));
notaServico.post('/excluirn', (req, res) => useBody(req, res, excluirn));
notaServico.post('/pesquisarPorColunaservico', (req, res) => useBody(req, res, pesquisarPorColunaservico));
notaServico.post('/pesquisarPorColunaDescricao', (req, res) => useBody(req, res, pesquisarPorColunaDescricao));
notaServico.post('/pesquisarCodigoServico', (req, res) => useBody(req, res, pesquisarCodigoServico));
notaServico.post('/preencherListabusca', (req, res) => useBody(req, res, preencherListabusca));
notaServico.post('/preencherListabuscaentrada', (req, res) => useBody(req, res, preencherListabuscaentrada));
notaServico.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
 
module.exports = notaServico