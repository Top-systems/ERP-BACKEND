const express = require('express');
const { useBody } = require('./db/use');

const {
    onCellEditms,
    fabricante,
    init,
    ultimoinventario,
    confirmaalteracaodataprescricao,
    confirmaalteracaodataanvisa,
    confirmaalteracaodataanvisa2,
    confirmaalteracaodataanvisa2m1,
    confirmaalteracaodataanvisa2m1d,
    abrirlotes,
    atualizarLote,
    pegarUltimaDataAceita,
    listarArquivos,
    atualizarArquivos,
    retornoAtualizarlistalotemed,
    enviarArquivo,
    atualizarlistalotemed,
    criarArquivoInventario,
    veRetorno,
    gerarMovimento,
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
    consultarNFEPerda
} = require('./db/movimentacaoSNGPC.models');

const movimentacaoSNGPC = express.Router();

movimentacaoSNGPC.post('/onCellEditms', (req, res) => useBody(req, res, onCellEditms));
movimentacaoSNGPC.post('/fabricante', (req, res) => useBody(req, res, fabricante));
movimentacaoSNGPC.post('/init', (req, res) => useBody(req, res, init));
movimentacaoSNGPC.post('/ultimoinventario', (req, res) => useBody(req, res, ultimoinventario));
movimentacaoSNGPC.post('/confirmaalteracaodataprescricao', (req, res) => useBody(req, res, confirmaalteracaodataprescricao));
movimentacaoSNGPC.post('/confirmaalteracaodataanvisa', (req, res) => useBody(req, res, confirmaalteracaodataanvisa));
movimentacaoSNGPC.post('/confirmaalteracaodataanvisa2', (req, res) => useBody(req, res, confirmaalteracaodataanvisa2));
movimentacaoSNGPC.post('/confirmaalteracaodataanvisa2m1', (req, res) => useBody(req, res, confirmaalteracaodataanvisa2m1));
movimentacaoSNGPC.post('/confirmaalteracaodataanvisa2m1d', (req, res) => useBody(req, res, confirmaalteracaodataanvisa2m1d));
movimentacaoSNGPC.post('/abrirlotes', (req, res) => useBody(req, res, abrirlotes));
movimentacaoSNGPC.post('/atualizarLote', (req, res) => useBody(req, res, atualizarLote));
movimentacaoSNGPC.post('/pegarUltimaDataAceita', (req, res) => useBody(req, res, pegarUltimaDataAceita));
movimentacaoSNGPC.post('/listarArquivos', (req, res) => useBody(req, res, listarArquivos));
movimentacaoSNGPC.post('/atualizarArquivos', (req, res) => useBody(req, res, atualizarArquivos));
movimentacaoSNGPC.post('/retornoAtualizarlistalotemed', (req, res) => useBody(req, res, retornoAtualizarlistalotemed));
movimentacaoSNGPC.post('/enviarArquivo', (req, res) => useBody(req, res, enviarArquivo));
movimentacaoSNGPC.post('/atualizarlistalotemed', (req, res) => useBody(req, res, atualizarlistalotemed));
movimentacaoSNGPC.post('/criarArquivoInventario', (req, res) => useBody(req, res, criarArquivoInventario));
movimentacaoSNGPC.post('/veRetorno', (req, res) => useBody(req, res, veRetorno));
movimentacaoSNGPC.post('/gerarMovimento', (req, res) => useBody(req, res, gerarMovimento));
movimentacaoSNGPC.post('/consultarCompras2', (req, res) => useBody(req, res, consultarCompras2));
movimentacaoSNGPC.post('/consultarCompras', (req, res) => useBody(req, res, consultarCompras));
movimentacaoSNGPC.post('/consultarCupons', (req, res) => useBody(req, res, consultarCupons));
movimentacaoSNGPC.post('/consultarM1', (req, res) => useBody(req, res, consultarM1));
movimentacaoSNGPC.post('/consultarM1Perda', (req, res) => useBody(req, res, consultarM1Perda));
movimentacaoSNGPC.post('/consultarM1Loja', (req, res) => useBody(req, res, consultarM1Loja));
movimentacaoSNGPC.post('/consultarM1Devolucao', (req, res) => useBody(req, res, consultarM1Devolucao));
movimentacaoSNGPC.post('/consultarNFE', (req, res) => useBody(req, res, consultarNFE));
movimentacaoSNGPC.post('/consultarNFELoja', (req, res) => useBody(req, res, consultarNFELoja));
movimentacaoSNGPC.post('/consultarNFEDevolucao', (req, res) => useBody(req, res, consultarNFEDevolucao));
movimentacaoSNGPC.post('/consultarNFEDevolucaocli', (req, res) => useBody(req, res, consultarNFEDevolucaocli));
movimentacaoSNGPC.post('/consultarNFETransferencia', (req, res) => useBody(req, res, consultarNFETransferencia));
movimentacaoSNGPC.post('/consultarNFEPerda', (req, res) => useBody(req, res, consultarNFEPerda));



module.exports = movimentacaoSNGPC