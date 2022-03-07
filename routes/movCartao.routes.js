const express = require('express');
 const { useBody } = require('./db/use');
 
const{
    baixar,
    processar,
    listarCartoes,
    logo,
    editarcartao,
    salvari,
    atualizatp,
    trocatipotp,
    atualizataxas,
    atualizataxasd,
    setarcupom,
    pesquisarPorColunav,
    preencherListaBuscav,
    excluir
}= require('./db/movCartao.models');

 const movCartao = express.Router();

movCartao.post('/baixar', (req, res) => useBody(req, res, baixar));
movCartao.post('/processar', (req, res) => useBody(req, res, processar));
movCartao.post('/listarCartoes', (req, res) => useBody(req, res, listarCartoes));
movCartao.post('/logo', (req, res) => useBody(req, res, logo));
movCartao.post('/editarcartao', (req, res) => useBody(req, res, editarcartao));
movCartao.post('/salvari', (req, res) => useBody(req, res, salvari));
movCartao.post('/atualizatp', (req, res) => useBody(req, res, atualizatp));
movCartao.post('/trocatipotp', (req, res) => useBody(req, res, trocatipotp));
movCartao.post('/atualizataxas', (req, res) => useBody(req, res, atualizataxas));
movCartao.post('/atualizataxasd', (req, res) => useBody(req, res, atualizataxasd));
movCartao.post('/setarcupom', (req, res) => useBody(req, res, setarcupom));
movCartao.post('/pesquisarPorColunav', (req, res) => useBody(req, res, pesquisarPorColunav));
movCartao.post('/preencherListaBuscav', (req, res) => useBody(req, res, preencherListaBuscav));
movCartao.post('/excluir', (req, res) => useBody(req, res, excluir));
 
module.exports = movCartao