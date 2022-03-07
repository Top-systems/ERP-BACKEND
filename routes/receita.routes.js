const express = require('express');
const { useBody } = require('./db/use');
 
const{
    listarcupons,
    listaritens,
    confirmalotes,
    listarLotes,
    listarimg,
    cupom,
    pegarCodBarras,
    processarFiltro,
    salvar,
    pesquisarPorColuna,
    preencherListaBusca,
    run,
    setarnul
}= require('./db/receita.models');

const receita = express.Router();

receita.post('/listarcupons', (req, res) => useBody(req, res, listarcupons));
receita.post('/listaritens', (req, res) => useBody(req, res, listaritens));
receita.post('/confirmalotes', (req, res) => useBody(req, res, confirmalotes));
receita.post('/listarLotes', (req, res) => useBody(req, res, listarLotes));
receita.post('/listarimg', (req, res) => useBody(req, res, listarimg));
receita.post('/cupom', (req, res) => useBody(req, res, cupom));
receita.post('/pegarCodBarras', (req, res) => useBody(req, res, pegarCodBarras));
receita.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
receita.post('/salvar', (req, res) => useBody(req, res, salvar));
receita.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
receita.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
receita.post('/run', (req, res) => useBody(req, res, run));
receita.post('/setarnul', (req, res) => useBody(req, res, setarnul));
 
module.exports = receita