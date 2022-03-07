const express = require('express');
const { useBody } = require('./db/use');
 
const{
    buscari,
    pesquisarPorColunaProduto,
    pegarclass,
    pegarCusto,
    pegarCodigoDeBarras,
    onCellEdit,
    excluir,
    listar,
    salvar,
    gerar,
    perdassobrastanque,
    novo,
    abrirtanques,
    setar,
    excluirp,
    ok,
    es
}= require('./db/inventario.models');

const inventario = express.Router();

inventario.post('/buscari', (req, res) => useBody(req, res, buscari));
inventario.post('/pesquisarPorColunaProduto', (req, res) => useBody(req, res, pesquisarPorColunaProduto));
inventario.post('/pegarclass', (req, res) => useBody(req, res, pegarclass));
inventario.post('/pegarCusto', (req, res) => useBody(req, res, pegarCusto));
inventario.post('/pegarCodigoDeBarras', (req, res) => useBody(req, res, pegarCodigoDeBarras)); 
inventario.post('/onCellEdit', (req, res) => useBody(req, res, onCellEdit));
inventario.post('/excluir', (req, res) => useBody(req, res, excluir));
inventario.post('/listar', (req, res) => useBody(req, res, listar));
inventario.post('/salvar', (req, res) => useBody(req, res, salvar));
inventario.post('/gerar', (req, res) => useBody(req, res, gerar))
inventario.post('/perdassobrastanque', (req, res) => useBody(req, res, perdassobrastanque));
inventario.post('/novo', (req, res) => useBody(req, res, novo));
inventario.post('/abrirtanques', (req, res) => useBody(req, res, abrirtanques));
inventario.post('/setar', (req, res) => useBody(req, res, setar));
inventario.post('/excluirp', (req, res) => useBody(req, res, excluirp));
inventario.post('/ok', (req, res) => useBody(req, res, ok));
inventario.post('/es', (req, res) => useBody(req, res, es));

module.exports = inventario