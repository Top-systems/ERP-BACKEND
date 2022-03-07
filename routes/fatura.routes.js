const express = require('express');
const { useBody } = require('./db/use');
 
const{
    cancelar,
    excluirs,
    editarFaturas,
    vercr,
    gerarxmlpdf,
    consultar,
    emitirnfe,
    enviarnfe,
    atualizaSequenciador,
    inserir,
    numeroserie,
    salvarcuponsnfe7,
    salvaritensnfe7,
    salvarEmitente,
    salvarnaturezainfo,
    salvarDestinatario,
    salvarfaturapagamento,
    salvarnfecab3,
    veritens,
    criarfatura,
    processarfatura,
    salvarfaturas,
    baixarparcial,
    xmlpdf,
    setamail,
    mailnfe,
    cancelarfaturas
}= require('./db/fatura.models');

const fatura = express.Router();

fatura.post('/cancelar', (req, res) => useBody(req, res, cancelar));
fatura.post('/excluirs', (req, res) => useBody(req, res, excluirs));
fatura.post('/editarFaturas', (req, res) => useBody(req, res, editarFaturas));
fatura.post('/vercr', (req, res) => useBody(req, res, vercr));
fatura.post('/gerarxmlpdf', (req, res) => useBody(req, res, gerarxmlpdf));
fatura.post('/consultar', (req, res) => useBody(req, res, consultar));
fatura.post('/emitirnfe', (req, res) => useBody(req, res, emitirnfe));
fatura.post('/enviarnfe', (req, res) => useBody(req, res, enviarnfe));
fatura.post('/atualizaSequenciador', (req, res) => useBody(req, res, atualizaSequenciador));
fatura.post('/inserir', (req, res) => useBody(req, res, inserir));
fatura.post('/numeroserie', (req, res) => useBody(req, res, numeroserie));
fatura.post('/salvarcuponsnfe7', (req, res) => useBody(req, res, salvarcuponsnfe7));
fatura.post('/salvaritensnfe7', (req, res) => useBody(req, res, salvaritensnfe7));
fatura.post('/salvarEmitente', (req, res) => useBody(req, res, salvarEmitente));
fatura.post('/salvarnaturezainfo', (req, res) => useBody(req, res, salvarnaturezainfo));
fatura.post('/salvarDestinatario', (req, res) => useBody(req, res, salvarDestinatario));
fatura.post('/salvarfaturapagamento', (req, res) => useBody(req, res, salvarfaturapagamento));
fatura.post('/salvarnfecab3', (req, res) => useBody(req, res, salvarnfecab3));
fatura.post('/veritens', (req, res) => useBody(req, res, veritens));
fatura.post('/criarfatura', (req, res) => useBody(req, res, criarfatura));
fatura.post('/processarfatura', (req, res) => useBody(req, res, processarfatura));
fatura.post('/salvarfaturas', (req, res) => useBody(req, res, salvarfaturas));
fatura.post('/baixarparcial', (req, res) => useBody(req, res, baixarparcial));
fatura.post('/xmlpdf', (req, res) => useBody(req, res, xmlpdf));
fatura.post('/setamail', (req, res) => useBody(req, res, setamail));
fatura.post('/mailnfe', (req, res) => useBody(req, res, mailnfe));
fatura.post('/cancelarfaturas', (req, res) => useBody(req, res, cancelarfaturas));
 
module.exports = fatura