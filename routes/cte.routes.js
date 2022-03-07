const express = require('express');
const { useBody } = require('./db/use');

const {
    iniciaconf,
    novo,
    salvarcte,
    salvarenvolvido,
    pesquisarPorColunacidade,
    preencherListaBuscanfe,
    pesquisarPorColunanfe,
    salvarcomponente,
    salvarcarga,
    salvaroutro,
    salvarnf,
    salvardoc,
    pegareventos,
    pesquisarPorColuna,
    preencherListaBusca,
    xmlpdf,
    cancelarcomprovantecte,
    cancelarcte,
    desacordocte,
    salvarocc,
    salvarpassagem,
    salvarobsc,
    salvarobscf,
    salvarveiculo,
    salvarduplicata,
    salvarautorizado,
    salvardoca,
    enviaremail,
    mailnfe,
    iniciardfe,
    buscareventos,
    consultar,
    validarxml,
    gerarzip,
    consultarf,
    gerarf,
    xmlpdf2,
    pxmlv,
    LerNoProtv
} = require('./db/cte.models');

const cte = express.Router();

cte.post('/iniciaconf', (req, res) => useBody(req, res, iniciaconf));
cte.post('/novo', (req, res) => useBody(req, res, novo));
cte.post('/salvarcte', (req, res) => useBody(req, res, salvarcte));
cte.post('/salvarenvolvido', (req, res) => useBody(req, res, salvarenvolvido));
cte.post('/pesquisarPorColunacidade', (req, res) => useBody(req, res, pesquisarPorColunacidade));
cte.post('/preencherListaBuscanfe', (req, res) => useBody(req, res, preencherListaBuscanfe));
cte.post('/pesquisarPorColunanfe', (req, res) => useBody(req, res, pesquisarPorColunanfe));
cte.post('/salvarcomponente', (req, res) => useBody(req, res, salvarcomponente));
cte.post('/salvarcarga', (req, res) => useBody(req, res, salvarcarga));
cte.post('/salvaroutro', (req, res) => useBody(req, res, salvaroutro));
cte.post('/salvarnf', (req, res) => useBody(req, res, salvarnf));
cte.post('/salvardoc', (req, res) => useBody(req, res, salvardoc));
cte.post('/pegareventos', (req, res) => useBody(req, res, pegareventos));
cte.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
cte.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
cte.post('/xmlpdf', (req, res) => useBody(req, res, xmlpdf));
cte.post('/cancelarcomprovantecte', (req, res) => useBody(req, res, cancelarcomprovantecte));
cte.post('/cancelarcte', (req, res) => useBody(req, res, cancelarcte));
cte.post('/desacordocte', (req, res) => useBody(req, res, desacordocte));
cte.post('/salvarocc', (req, res) => useBody(req, res, salvarocc));
cte.post('/salvarpassagem', (req, res) => useBody(req, res, salvarpassagem));
cte.post('/salvarobsc', (req, res) => useBody(req, res, salvarobsc));
cte.post('/salvarobscf', (req, res) => useBody(req, res, salvarobscf));
cte.post('/salvarveiculo', (req, res) => useBody(req, res, salvarveiculo));
cte.post('/salvarduplicata', (req, res) => useBody(req, res, salvarduplicata));
cte.post('/salvarautorizado', (req, res) => useBody(req, res, salvarautorizado));
cte.post('/salvardoca', (req, res) => useBody(req, res, salvardoca));
cte.post('/enviaremail', (req, res) => useBody(req, res, enviaremail));
cte.post('/mailnfe', (req, res) => useBody(req, res, mailnfe));
cte.post('/iniciardfe', (req, res) => useBody(req, res, iniciardfe));
cte.post('/buscareventos', (req, res) => useBody(req, res, buscareventos));
cte.post('/consultar', (req, res) => useBody(req, res, consultar));
cte.post('/validarxml', (req, res) => useBody(req, res, validarxml));
cte.post('/gerarzip', (req, res) => useBody(req, res, gerarzip));
cte.post('/consultarf', (req, res) => useBody(req, res, consultarf));
cte.post('/gerarf', (req, res) => useBody(req, res, gerarf));
cte.post('/xmlpdf2', (req, res) => useBody(req, res, xmlpdf2));
cte.post('/pxmlv', (req, res) => useBody(req, res, pxmlv));
cte.post('/LerNoProtv', (req, res) => useBody(req, res, LerNoProtv));

module.exports = cte