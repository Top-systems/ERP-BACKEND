const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    preencherListadePaginas,
    listarPermissoesDoGrupo,
    salvar,
    pesquisarPorTexto,
    pesquisarPorInteiro
}= require('./db/grupoPermissao.models');

const grupoPermissao = express.Router();

grupoPermissao.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
grupoPermissao.post('/preencherListadePaginas', (req, res) => useBody(req, res, preencherListadePaginas));
grupoPermissao.post('/listarPermissoesDoGrupo', (req, res) => useBody(req, res, listarPermissoesDoGrupo));
grupoPermissao.post('/salvar', (req, res) => useBody(req, res, salvar));
grupoPermissao.post('/pesquisarPorTexto', (req, res) => useBody(req, res, pesquisarPorTexto));
grupoPermissao.post('/pesquisarPorInteiro', (req, res) => useBody(req, res, pesquisarPorInteiro));
 
module.exports = grupoPermissao;