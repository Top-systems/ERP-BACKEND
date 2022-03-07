const express = require('express');
const { useBody } = require('./db/use');
 
const{
    consultaLotesNota,
    salvarNotaCancelada,
    selecionaNatureza, 
    jaReferenciado,
    jaReferenciado2,
    excluirdetalhe,
    consultarDetalhes,
    consultarNotas,
    listarreferenciados,
    onCellEdit,
    salvarNota,
    salvar1,
    salvar2,
    salvar5,
    salvar4,
    inserir,
    pesquisarPorColuna,
    preencherListaBusca,
    preencherListaBuscaNormal,
    pesquisarNotasNormais,
    pesquisarNotasNormais2,
    setarNotaCancelada,
    setarNota,
    pesquisarPorColunaDescricao,
    ok,
    pesquisarCodigoProduto,
    pesquisarPorColunaproduto,
    setarProduto,
    pegarCodigoDeBarras,
    listaOperacao,
    listaOperacao2,
    listaOperacao3,
    listaCupom,
    listaDetalhe,
    adicionarProduto,
    adicionarProduto3,
    adicionarProduto2,
    pegarCusto,
    pegarVenda,
    pegarEstoque,
    salvarfncancelada
}= require('./db/notaM1.models');

const notaM1 = express.Router();

notaM1.post('/consultaLotesNota', (req, res) => useBody(req, res, consultaLotesNota));
notaM1.post('/salvarNotaCancelada', (req, res) => useBody(req, res, salvarNotaCancelada));
notaM1.post('/selecionaNatureza', (req, res) => useBody(req, res, selecionaNatureza));
notaM1.post('/jaReferenciado', (req, res) => useBody(req, res, jaReferenciado));
notaM1.post('/jaReferenciado2', (req, res) => useBody(req, res, jaReferenciado2));
notaM1.post('/excluirdetalhe', (req, res) => useBody(req, res, excluirdetalhe));
notaM1.post('/consultarDetalhes', (req, res) => useBody(req, res, consultarDetalhes));
notaM1.post('/consultarNotas', (req, res) => useBody(req, res, consultarNotas));
notaM1.post('/listarreferenciados', (req, res) => useBody(req, res, listarreferenciados));
notaM1.post('/onCellEdit', (req, res) => useBody(req, res, onCellEdit));
notaM1.post('/salvarNota', (req, res) => useBody(req, res, salvarNota));
notaM1.post('/salvar1', (req, res) => useBody(req, res, salvar1));
notaM1.post('/salvar2', (req, res) => useBody(req, res, salvar2));
notaM1.post('/salvar5', (req, res) => useBody(req, res, salvar5));
notaM1.post('/salvar4', (req, res) => useBody(req, res, salvar4));
notaM1.post('/inserir', (req, res) => useBody(req, res, inserir));
notaM1.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
notaM1.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
notaM1.post('/preencherListaBuscaNormal', (req, res) => useBody(req, res, preencherListaBuscaNormal));
notaM1.post('/pesquisarNotasNormais', (req, res) => useBody(req, res, pesquisarNotasNormais));
notaM1.post('/pesquisarNotasNormais2', (req, res) => useBody(req, res, pesquisarNotasNormais2));
notaM1.post('/setarNotaCancelada', (req, res) => useBody(req, res, setarNotaCancelada));
notaM1.post('/setarNota', (req, res) => useBody(req, res, setarNota));
notaM1.post('/pesquisarPorColunaDescricao', (req, res) => useBody(req, res, pesquisarPorColunaDescricao));
notaM1.post('/ok', (req, res) => useBody(req, res, ok));
notaM1.post('/pesquisarCodigoProduto', (req, res) => useBody(req, res, pesquisarCodigoProduto));
notaM1.post('/pesquisarPorColunaproduto', (req, res) => useBody(req, res, pesquisarPorColunaproduto));
notaM1.post('/setarProduto', (req, res) => useBody(req, res, setarProduto));
notaM1.post('/pegarCodigoDeBarras', (req, res) => useBody(req, res, pegarCodigoDeBarras));
notaM1.post('/listaOperacao', (req, res) => useBody(req, res, listaOperacao));
notaM1.post('/listaOperacao2', (req, res) => useBody(req, res, listaOperacao2));
notaM1.post('/listaOperacao3', (req, res) => useBody(req, res, listaOperacao3));
notaM1.post('/listaCupom', (req, res) => useBody(req, res, listaCupom));
notaM1.post('/listaDetalhe', (req, res) => useBody(req, res, listaDetalhe));
notaM1.post('/adicionarProduto', (req, res) => useBody(req, res, adicionarProduto));
notaM1.post('/adicionarProduto3', (req, res) => useBody(req, res, adicionarProduto3));
notaM1.post('/adicionarProduto2', (req, res) => useBody(req, res, adicionarProduto2));
notaM1.post('/pegarCusto', (req, res) => useBody(req, res, pegarCusto));
notaM1.post('/pegarVenda', (req, res) => useBody(req, res, pegarVenda));
notaM1.post('/pegarEstoque', (req, res) => useBody(req, res, pegarEstoque));
notaM1.post('/salvarfncancelada', (req, res) => useBody(req, res, salvarfncancelada));

module.exports = notaM1