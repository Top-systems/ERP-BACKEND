const express = require('express');
const { useBody } = require('./db/use');

const {
    cProduto,
    pesquisarPorColunaprodutox,
    pesquisarPorColunaDescricaox,
    pesquisarCodigoProdutox,
    listarFabricantes,
    listarGrupos,
    pesquisarPorColuna,
    excluirItens,
    excluir,
    selecionar,
    atualizaprodutosb,
    ultimofornecedor,
    preencherListaBusca,
    listaForn,
    sugerir,
    contadores,
    salvar,
    pegarProdutosLoja,
    pegarestoques,
    listarcupons,
    listarcuponsbico,
    listarnfe,
    listarnfebico,
    listarseried,
    listarm1,
    setarestoqueqtd,
    setarestoqueqtdbico,
    ultimacompra,
    ultimacomprabico,
    pegarEstoquesZero,
    pegarQuantidadeVendidaporLoja,
    pegarQuantidadeVendida,
    pegarEncomendas,
    pegarEstoquesProduto,
    pegarPrecoMedio,
    pegarEstoqueMin,
    pegarEstoqueMax,
    pegarEstoqueAtual,
    pegarCurva,
    pegarCurvad,
    pegarUltimaCompra,
    pesquisarCodigoProduto,
    pesquisarPorColunaproduto,
    pesquisarPorColunaDescricao,
    pegarEstoque,
    pegarCusto,
    pegarCodigoDeBarras,
    pegarCodigoDeBarrasx,
    pegarConf,
    processar2,
    atualizaCadastros
} = require('./db/compraSugestao.models');

const compraSugestao = express.Router();

compraSugestao.post('/cProduto', (req, res) => useBody(req, res, cProduto));
compraSugestao.post('/pesquisarPorColunaprodutox', (req, res) => useBody(req, res, pesquisarPorColunaprodutox));
compraSugestao.post('/pesquisarPorColunaDescricaox', (req, res) => useBody(req, res, pesquisarPorColunaDescricaox));
compraSugestao.post('/pesquisarCodigoProdutox', (req, res) => useBody(req, res, pesquisarCodigoProdutox));
compraSugestao.post('/listarFabricantes', (req, res) => useBody(req, res, listarFabricantes));
compraSugestao.post('/listarGrupos', (req, res) => useBody(req, res, listarGrupos));
compraSugestao.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
compraSugestao.post('/excluirItens', (req, res) => useBody(req, res, excluirItens));
compraSugestao.post('/excluir', (req, res) => useBody(req, res, excluir));
compraSugestao.post('/selecionar', (req, res) => useBody(req, res, selecionar));
compraSugestao.post('/atualizaprodutosb', (req, res) => useBody(req, res, atualizaprodutosb));
compraSugestao.post('/ultimofornecedor', (req, res) => useBody(req, res, ultimofornecedor));
compraSugestao.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
compraSugestao.post('/listaForn', (req, res) => useBody(req, res, listaForn));
compraSugestao.post('/sugerir', (req, res) => useBody(req, res, sugerir));
compraSugestao.post('/contadores', (req, res) => useBody(req, res, contadores));
compraSugestao.post('/salvar', (req, res) => useBody(req, res, salvar));
compraSugestao.post('/pegarProdutosLoja', (req, res) => useBody(req, res, pegarProdutosLoja));
compraSugestao.post('/pegarestoques', (req, res) => useBody(req, res, pegarestoques));
compraSugestao.post('/listarcupons', (req, res) => useBody(req, res, listarcupons));
compraSugestao.post('/listarcuponsbico', (req, res) => useBody(req, res, listarcuponsbico));
compraSugestao.post('/listarnfe', (req, res) => useBody(req, res, listarnfe));
compraSugestao.post('/listarnfebico', (req, res) => useBody(req, res, listarnfebico));
compraSugestao.post('/listarseried', (req, res) => useBody(req, res, listarseried));
compraSugestao.post('/listarm1', (req, res) => useBody(req, res, listarm1));
compraSugestao.post('/setarestoqueqtd', (req, res) => useBody(req, res, setarestoqueqtd));
compraSugestao.post('/setarestoqueqtdbico', (req, res) => useBody(req, res, setarestoqueqtdbico));
compraSugestao.post('/ultimacompra', (req, res) => useBody(req, res, ultimacompra));
compraSugestao.post('/ultimacomprabico', (req, res) => useBody(req, res, ultimacomprabico));
compraSugestao.post('/pegarEstoquesZero', (req, res) => useBody(req, res, pegarEstoquesZero));
compraSugestao.post('/pegarQuantidadeVendidaporLoja', (req, res) => useBody(req, res, pegarQuantidadeVendidaporLoja));
compraSugestao.post('/pegarQuantidadeVendida', (req, res) => useBody(req, res, pegarQuantidadeVendida));
compraSugestao.post('/pegarEncomendas', (req, res) => useBody(req, res, pegarEncomendas));
compraSugestao.post('/pegarEstoquesProduto', (req, res) => useBody(req, res, pegarEstoquesProduto));
compraSugestao.post('/pegarPrecoMedio', (req, res) => useBody(req, res, pegarPrecoMedio));
compraSugestao.post('/pegarEstoqueMin', (req, res) => useBody(req, res, pegarEstoqueMin));
compraSugestao.post('/pegarEstoqueMax', (req, res) => useBody(req, res, pegarEstoqueMax));
compraSugestao.post('/pegarEstoqueAtual', (req, res) => useBody(req, res, pegarEstoqueAtual));
compraSugestao.post('/pegarCurva', (req, res) => useBody(req, res, pegarCurva));
compraSugestao.post('/pegarCurvad', (req, res)=> useBody(req, res, pegarCurvad));
compraSugestao.post('/pegarUltimaCompra', (req, res) => useBody(req, res, pegarUltimaCompra));
compraSugestao.post('/pesquisarCodigoProduto', (req, res) => useBody(req, res, pesquisarCodigoProduto));
compraSugestao.post('/pesquisarPorColunaproduto', (req, res) => useBody(req, res, pesquisarPorColunaproduto));
compraSugestao.post('/pesquisarPorColunaDescricao', (req, res) => useBody(req, res, pesquisarPorColunaDescricao));
compraSugestao.post('/pegarEstoque', (req, res) => useBody(req, res, pegarEstoque));
compraSugestao.post('/pegarCusto', (req, res) => useBody(req, res, pegarCusto));
compraSugestao.post('/pegarCodigoDeBarras', (req, res) => useBody(req, res, pegarCodigoDeBarras));
compraSugestao.post('/pegarCodigoDeBarrasx', (req, res) => useBody(req, res, pegarCodigoDeBarrasx));
compraSugestao.post('/pegarConf', (req, res) => useBody(req, res, pegarConf));
compraSugestao.post('/processar2', (req, res) => useBody(req, res, processar2));
compraSugestao.post('/atualizaCadastros', (req, res) => useBody(req, res, atualizaCadastros))

module.exports = compraSugestao;