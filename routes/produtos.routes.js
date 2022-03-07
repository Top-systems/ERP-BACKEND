const express = require('express')
const { useBody } = require('./db/use');

const {
    atualizarCodigodeBarras,
    buscarncmelista,
    usarSim,
    setarcest2,
    setarcest,
    listaAlvo,
    retornaFoto,
    recebeFoto,
    removerFoto,
    salvar,
    histpv,
    temvenda,
    pegarTodosOsEstoques,
    pegarTodosOsLotes,
    pegarCodigoDeBarras,
    pegarCodBarras,
    pegarEstoque1,
    pegarPromo,
    pegarCusto,
    pegarVenda,
    pesquisarPorColunafracionavel,
    pesquisarPorColuna,
    pesquisarPorColunacl12,
    pesquisarPorColunaDescricao,
    pegarhist,
    pegarEstoque,
    pesquisarPorColunacest,
    listarcompras,
    listardesc,
    listardescp,
    preencherListaBusca,
    preencherListaBuscafracionavel,
    preencherListaBuscacl12
} = require('./db/produtos.model');

const produtos = express.Router();

produtos.post('/atualizarCodigodeBarras', (req, res) => useBody(req, res, atualizarCodigodeBarras));
produtos.post('/buscarncmelista', (req, res) => useBody(req, res, buscarncmelista));
produtos.post('/usarSim', (req, res) => useBody(req, res, usarSim));
produtos.post('/setarcest2', (req, res) => useBody(req, res, setarcest2));
produtos.post('/setarcest', (req, res) => useBody(req, res, setarcest));
produtos.post('/listaAlvo', (req, res) => useBody(req, res, listaAlvo));
produtos.post('/retornaFoto', (req, res) => useBody(req, res, retornaFoto));
produtos.post('/recebeFoto', (req, res) => useBody(req, res, recebeFoto));
produtos.post('/removerFoto', (req, res) => useBody(req, res, removerFoto));
produtos.post('/salvar', (req, res) => useBody(req, res, salvar));
produtos.post('/histpv', (req, res) => useBody(req, res, histpv));
produtos.post('/temvenda', (req, res) => useBody(req, res, temvenda));
produtos.post('/pegarTodosOsEstoques', (req, res) => useBody(req, res, pegarTodosOsEstoques));
produtos.post('/pegarTodosOsLotes', (req, res) => useBody(req, res, pegarTodosOsLotes));
produtos.post('/pegarCodigoDeBarras', (req, res) => useBody(req, res, pegarCodigoDeBarras));
produtos.post('/pegarCodBarras', (req, res) => useBody(req, res, pegarCodBarras));
produtos.post('/pegarEstoque1', (req, res) => useBody(req, res, pegarEstoque1));
produtos.post('/pegarPromo', (req, res) => useBody(req, res, pegarPromo));
produtos.post('/pegarCusto', (req, res) => useBody(req, res, pegarCusto));
produtos.post('/pegarVenda', (req, res) => useBody(req, res, pegarVenda));
produtos.post('/pesquisarPorColunafracionavel', (req, res) => useBody(req, res, pesquisarPorColunafracionavel));
produtos.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
produtos.post('/pesquisarPorColunacl12', (req, res) => useBody(req, res, pesquisarPorColunacl12));
produtos.post('/pesquisarPorColunaDescricao', (req, res) => useBody(req, res, pesquisarPorColunaDescricao));
produtos.post('/pegarhist', (req, res) => useBody(req, res, pegarhist));
produtos.post('/pegarEstoque', (req, res) => useBody(req, res, pegarEstoque));
produtos.post('/pesquisarPorColunacest', (req, res) => useBody(req, res, pesquisarPorColunacest));
produtos.post('/listarcompras', (req, res) => useBody(req, res, listarcompras));
produtos.post('/listardesc', (req, res) => useBody(req, res, listardesc));
produtos.post('/listardescp', (req, res) => useBody(req, res, listardescp));
produtos.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
produtos.post('/preencherListaBuscafracionavel', (req, res) => useBody(req, res, preencherListaBuscafracionavel));
produtos.post('/preencherListaBuscacl12', (req, res) => useBody(req, res, preencherListaBuscacl12));

module.exports = produtos;