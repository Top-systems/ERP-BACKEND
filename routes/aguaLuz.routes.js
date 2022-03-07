const express = require('express');
const { useBody } = require('./db/use');
 
const{
    excluir,
    popularListaconsumoAgua,
    verificaTiponota,
    processarFiltro,
    excluirFiltro,
    listaAlvo,
    salvar,
    cancelar,
    inserir,
    pesquisarPorColuna,
    preencherListaBusca
}= require('./db/aguaLuz.models');

const aguaLuz = express.Router();

aguaLuz.post('/excluir', (req, res) => useBody(req, res, excluir));
aguaLuz.post('/popularListaconsumoAgua', (req, res) => useBody(req, res, popularListaconsumoAgua));
aguaLuz.post('/verificaTiponota', (req, res) => useBody(req, res, verificaTiponota));
aguaLuz.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
aguaLuz.post('/excluirFiltro', (req, res) => useBody(req, res, excluirFiltro));
aguaLuz.post('/listaAlvo', (req, res) => useBody(req, res, listaAlvo));
aguaLuz.post('/salvar', (req, res) => useBody(req, res, salvar)); 
aguaLuz.post('/cancelar', (req, res) => useBody(req, res, cancelar));
aguaLuz.post('/inserir', (req, res) => useBody(req, res, inserir));
aguaLuz.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
aguaLuz.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));

module.exports = aguaLuz