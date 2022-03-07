const express = require('express');
const { useBody } = require('./db/use');

const {
    excluirempresa,
    faixas,
    listaGrupoDesconto,
    adicionarGrupoProduto,
    adicionarGrupoProdutoProibido,
    listaGrupoProibido,
    processarFiltro,
    atualizaClienteMaxDias,
    salvar,
    run,
    pegarfaixa,
    pesquisarPorColuna,
    verificardest
} = require('./db/empresaConveniada.models');

const empresaConveniada = express.Router();

empresaConveniada.post('/excluirempresa', (req, res) => useBody(req, res, excluirempresa));
empresaConveniada.post('/faixas', (req, res) => useBody(req, res, faixas));
empresaConveniada.post('/listaGrupoDesconto', (req, res) => useBody(req, res, listaGrupoDesconto));
empresaConveniada.post('/adicionarGrupoProduto', (req, res) => useBody(req, res, adicionarGrupoProduto));
empresaConveniada.post('/adicionarGrupoProdutoProibido', (req, res) => useBody(req, res, adicionarGrupoProdutoProibido));
empresaConveniada.post('/listaGrupoProibido', (req, res) => useBody(req, res, listaGrupoProibido));
empresaConveniada.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
empresaConveniada.post('/atualizaClienteMaxDias', (req, res) => useBody(req, res, atualizaClienteMaxDias));
empresaConveniada.post('/salvar', (req, res) => useBody(req, res, salvar));
empresaConveniada.post('/run', (req, res) => useBody(req, res, run));
empresaConveniada.post('/pegarfaixa', (req, res) => useBody(req, res, pegarfaixa));
empresaConveniada.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
empresaConveniada.post('/verificardest', (req, res) => useBody(req, res, verificardest));

module.exports = empresaConveniada