const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarp,
    pc,
    pv,
    run,
    pesquisarPrecosgp,
    pesquisarPrecos,
    limparPesquisa,
    excluirLista,
    atualizaqtd,
    atualizaEstoque,
    carregar,
    setarAtualizacao,
    listarAtualizacoes,
    listarFabricantes,
    listarLojas,
    listarGrupos,
    pesquisarPorColunaproduto,
    listarProdutos,
    pegarCodigoDeBarras,
    setarProdutocodigobarra,
    histpv
}= require('./db/atualizacaoPreco.models');

const atualizacaoPreco = express.Router();

atualizacaoPreco.post('/processarp', (req, res) => useBody(req, res, processarp));
atualizacaoPreco.post('/pc', (req, res) => useBody(req, res, pc));
atualizacaoPreco.post('/pv', (req, res) => useBody(req, res, pv));
atualizacaoPreco.post('/run', (req, res) => useBody(req, res, run));
atualizacaoPreco.post('/pesquisarPrecosgp', (req, res) => useBody(req, res, pesquisarPrecosgp));
atualizacaoPreco.post('/pesquisarPrecos', (req, res) => useBody(req, res, pesquisarPrecos));
atualizacaoPreco.post('/limparPesquisa', (req, res) => useBody(req, res, limparPesquisa));
atualizacaoPreco.post('/excluirLista', (req, res) => useBody(req, res, excluirLista));
atualizacaoPreco.post('/atualizaqtd', (req, res) => useBody(req, res, atualizaqtd));
atualizacaoPreco.post('/atualizaEstoque', (req, res) => useBody(req, res, atualizaEstoque));
atualizacaoPreco.post('/carregar', (req, res) => useBody(req, res, carregar));
atualizacaoPreco.post('/setarAtualizacao', (req, res) => useBody(req, res, setarAtualizacao));
atualizacaoPreco.post('/listarAtualizacoes', (req, res) => useBody(req, res, listarAtualizacoes));
atualizacaoPreco.post('/listarFabricantes', (req, res) => useBody(req, res, listarFabricantes));
atualizacaoPreco.post('/listarLojas', (req, res) => useBody(req, res, listarLojas));
atualizacaoPreco.post('/listarGrupos', (req, res) => useBody(req, res, listarGrupos));
atualizacaoPreco.post('/pesquisarPorColunaproduto', (req, res) => useBody(req, res, pesquisarPorColunaproduto));
atualizacaoPreco.post('/listarProdutos', (req, res) => useBody(req, res, listarProdutos));
atualizacaoPreco.post('/pegarCodigoDeBarras', (req, res) => useBody(req, res, pegarCodigoDeBarras));
atualizacaoPreco.post('/setarProdutocodigobarra', (req, res) => useBody(req, res, setarProdutocodigobarra));
atualizacaoPreco.post('/histpv', (req, res) => useBody(req, res, histpv));
 
module.exports = atualizacaoPreco