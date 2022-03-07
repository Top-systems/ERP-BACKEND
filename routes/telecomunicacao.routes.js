const express = require('express');
const { useBody } = require('./db/use');
 
const{
    excluir,
    popularListaconsumoAgua,
    verificaTiponota,
    processarFiltro,
    excluirFiltro,
    listaAlvo,
    salvar,
    inserir,
    pesquisarPorColuna,
    preencherListaBusca
}= require('./db/telecomunicacao.models');

const telecomunicacao = express.Router();

telecomunicacao.post('/excluir', (req, res) => useBody(req, res, excluir)); 
telecomunicacao.post('/popularListaconsumoAgua', (req, res) => useBody(req, res, popularListaconsumoAgua));
telecomunicacao.post('/verificaTiponota', (req, res) => useBody(req, res, verificaTiponota));
telecomunicacao.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
telecomunicacao.post('/excluirFiltro', (req, res) => useBody(req, res, excluirFiltro));
telecomunicacao.post('/listaAlvo', (req, res) => useBody(req, res, listaAlvo));
telecomunicacao.post('/salvar', (req, res) => useBody(req, res, salvar));
telecomunicacao.post('/inserir', (req, res) => useBody(req, res, inserir));
telecomunicacao.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
telecomunicacao.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
 
module.exports = telecomunicacao