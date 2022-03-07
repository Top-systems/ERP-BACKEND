const express = require('express');
const { useBody } = require('./db/use');

const {
    novo,
    salvarmdfe,
    iniciaconf,
    selecionar,
    pesquisarPorColuna,
    preencherListaBusca,
    pesquisarPorColunacidade,
    preencherListabuscacidade,
    salvarcondutor,
    salvarcidadecarregamentod,
    salvarcidadecarregamento,
    salvardoc,
    salvarsegurador,
    xmlpdf,
    salvarpercuso,
    salvarciot,
    salvarvale,
    salvarcontratante,
    salvarreboque,
    salvarlacre,
    cancelarmdfe,
    encerrarrmdfe,
    condutoemdfe,
    salvarautorizado,
    consultarnaoenc,
    pegareventosnaoenc,
    preencherListaBuscanfe,
    pesquisarPorColunanfe,
    salvaraverbacao,
    pxmlv,
    LerNoProtv
} = require('./db/MDFe.models');

const MDFe = express.Router();

MDFe.post('/novo', (req, res) => useBody(req, res, novo));
MDFe.post('/salvarmdfe', (req, res) => useBody(req, res, salvarmdfe));
MDFe.post('/iniciaconf', (req, res) => useBody(req, res, iniciaconf));
MDFe.post('/selecionar', (req, res) => useBody(req, res, selecionar));
MDFe.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
MDFe.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
MDFe.post('/pesquisarPorColunacidade', (req, res) => useBody(req, res, pesquisarPorColunacidade));
MDFe.post('/preencherListabuscacidade', (req, res) => useBody(req, res, preencherListabuscacidade));
MDFe.post('/salvarcondutor', (req, res) => useBody(req, res, salvarcondutor));
MDFe.post('/salvarcidadecarregamentod', (req, res) => useBody(req, res, salvarcidadecarregamentod));
MDFe.post('/salvarcidadecarregamento', (req, res) => useBody(req, res, salvarcidadecarregamento));
MDFe.post('/salvardoc', (req, res) => useBody(req, res, salvardoc));
MDFe.post('/salvarsegurador', (req, res) => useBody(req, res, salvarsegurador));
MDFe.post('/xmlpdf', (req, res) => useBody(req, res, xmlpdf));
MDFe.post('/salvarpercuso', (req, res) => useBody(req, res, salvarpercuso));
MDFe.post('/salvarciot', (req, res) => useBody(req, res, salvarciot));
MDFe.post('/salvarvale', (req, res) => useBody(req, res, salvarvale));
MDFe.post('/salvarcontratante', (req, res) => useBody(req, res, salvarcontratante));
MDFe.post('/salvarreboque', (req, res) => useBody(req, res, salvarreboque));
MDFe.post('/salvarlacre', (req, res) => useBody(req, res, salvarlacre));
MDFe.post('/cancelarmdfe', (req, res) => useBody(req, res, cancelarmdfe));
MDFe.post('/encerrarrmdfe', (req, res) => useBody(req, res, encerrarrmdfe));
MDFe.post('/condutoemdfe', (req, res) => useBody(req, res, condutoemdfe));
MDFe.post('/salvarautorizado', (req, res) => useBody(req, res, salvarautorizado));
MDFe.post('/consultarnaoenc', (req, res) => useBody(req, res, consultarnaoenc));
MDFe.post('/pegareventosnaoenc', (req, res) => useBody(req, res, pegareventosnaoenc));
MDFe.post('/preencherListaBuscanfe', (req, res) => useBody(req, res, preencherListaBuscanfe));
MDFe.post('/pesquisarPorColunanfe', (req, res) => useBody(req, res, pesquisarPorColunanfe));
MDFe.post('/salvaraverbacao', (req, res) => useBody(req, res, salvaraverbacao));
MDFe.post('/pxmlv', (req, res) => useBody(req, res, pxmlv));
MDFe.post('/LerNoProtv', (req, res) => useBody(req, res, LerNoProtv));

module.exports = MDFe