const express = require('express');
const { useBody } = require('./db/use');

const {
    confirmaalteracaodataprescricao,
    confirmaalteracaodataanvisa,
    confirmaalteracaodataanvisa2,
    confirmaalteracaodataanvisa2m1,
    abrirlotes,
    atualizarLote,
    pegarUltimaDataAceita,
    atualizarArquivos,
    listarArquivos,
    retornoAtualizarlistalotemed,
    enviarArquivo,
    atualizarlistalotemed,
    gerarMovimentos,
    consultarCompras2,
    consultarCompras,
    consultarCupons,
    consultarM1,
    consultarM1Perda,
    consultarM1Loja,
    consultarM1Devolucao,
    consultarNFE,
    consultarNFELoja,
    consultarNFEDevolucao,
    consultarNFEDevolucaocli,
    consultarNFETransferencia,
    consultarNFEPerda,
    confirmaalteracaodataanvisa2m1d
} = require('./db/movimentacaoSNGPC2.models');

const movimentacaoSNGPC2 = express.Router();

movimentacaoSNGPC2.post('/confirmaalteracaodataprescricao', (req, res) => useBody(req, res, confirmaalteracaodataprescricao));
movimentacaoSNGPC2.post('/confirmaalteracaodataanvisa', (req, res) => useBody(req, res, confirmaalteracaodataanvisa));
movimentacaoSNGPC2.post('/confirmaalteracaodataanvisa2', (req, res) => useBody(req, res, confirmaalteracaodataanvisa2));
movimentacaoSNGPC2.post('/confirmaalteracaodataanvisa2m1', (req, res) => useBody(req, res, confirmaalteracaodataanvisa2m1));
movimentacaoSNGPC2.post('/abrirlotes', (req, res) => useBody(req, res, abrirlotes));
movimentacaoSNGPC2.post('/atualizarLote', (req, res) => useBody(req, res, atualizarLote));
movimentacaoSNGPC2.post('/pegarUltimaDataAceita', (req, res) => useBody(req, res, pegarUltimaDataAceita));
movimentacaoSNGPC2.post('/atualizarArquivos', (req, res) => useBody(req, res, atualizarArquivos));
movimentacaoSNGPC2.post('/listarArquivos', (req, res) => useBody(req, res, listarArquivos));
movimentacaoSNGPC2.post('/retornoAtualizarlistalotemed', (req, res) => useBody(req, res, retornoAtualizarlistalotemed));
movimentacaoSNGPC2.post('/enviarArquivo', (req, res) => useBody(req, res, enviarArquivo));
movimentacaoSNGPC2.post('/atualizarlistalotemed', (req, res) => useBody(req, res, atualizarlistalotemed));
movimentacaoSNGPC2.post('/gerarMovimentos', (req, res) => useBody(req, res, gerarMovimentos));
movimentacaoSNGPC2.post('/consultarCompras2', (req, res) => useBody(req, res, consultarCompras2));
movimentacaoSNGPC2.post('/consultarCompras', (req, res) => useBody(req, res, consultarCompras));
movimentacaoSNGPC2.post('/consultarCupons', (req, res) => useBody(req, res, consultarCupons));
movimentacaoSNGPC2.post('/consultarM1', (req, res) => useBody(req, res, consultarM1));
movimentacaoSNGPC2.post('/consultarM1Perda', (req, res) => useBody(req, res, consultarM1Perda));
movimentacaoSNGPC2.post('/consultarM1Loja', (req, res) => useBody(req, res, consultarM1Loja));
movimentacaoSNGPC2.post('/consultarM1Devolucao', (req, res) => useBody(req, res, consultarM1Devolucao));
movimentacaoSNGPC2.post('/consultarNFE', (req, res) => useBody(req, res, consultarNFE));
movimentacaoSNGPC2.post('/consultarNFELoja', (req, res) => useBody(req, res, consultarNFELoja));
movimentacaoSNGPC2.post('/consultarNFEDevolucao', (req, res) => useBody(req, res, consultarNFEDevolucao));
movimentacaoSNGPC2.post('/consultarNFEDevolucaocli', (req, res) => useBody(req, res, consultarNFEDevolucaocli));
movimentacaoSNGPC2.post('/consultarNFETransferencia', (req, res) => useBody(req, res, consultarNFETransferencia));
movimentacaoSNGPC2.post('/consultarNFEPerda', (req, res) => useBody(req, res, consultarNFEPerda));
movimentacaoSNGPC2.post('/confirmaalteracaodataanvisa2m1d', (req, res) => useBody(req, res, confirmaalteracaodataanvisa2m1d));

module.exports =movimentacaoSNGPC2