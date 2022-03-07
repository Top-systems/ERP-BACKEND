const express = require('express');
const { useBody } = require('./db/use');
 
const{
    verificaTiponota,
    excluir,
    processarFiltro,
    salvar,
    primeiro,
    ultimo,
    anterior,
    proximo,
    cancelar,
    pesquisarPorColuna,
    preencherListaBusca
}= require('./db/conhecimentoTransporte.models');

const conhecimentoTransporte = express.Router();

conhecimentoTransporte.post('/verificaTiponota', (req, res) => useBody(req, res, verificaTiponota));
conhecimentoTransporte.post('/excluir', (req, res) => useBody(req, res, excluir));
conhecimentoTransporte.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
conhecimentoTransporte.post('/salvar', (req, res) => useBody(req, res, salvar));
conhecimentoTransporte.post('/primeiro', (req, res) => useBody(req, res, primeiro));
conhecimentoTransporte.post('/ultimo', (req, res) => useBody(req, res, ultimo));
conhecimentoTransporte.post('/anterior', (req, res) => useBody(req, res, anterior));
conhecimentoTransporte.post('/proximo', (req, res) => useBody(req, res, proximo)); 
conhecimentoTransporte.post('/cancelar', (req, res) => useBody(req, res, cancelar));
conhecimentoTransporte.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
conhecimentoTransporte.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));

module.exports = conhecimentoTransporte