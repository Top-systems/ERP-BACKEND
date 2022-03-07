const express = require('express');
const { useBody } = require('./db/use');
 
const{
    listarprodutos,
    Excluir,
    listarPromocoes,
    salvarPromocao,
    editarPromocao,
    selecionarproduto2,
    selecionarproduto,
    pegarVenda,
    excluirProduto
}= require('./db/promocao.models');

const promocao = express.Router();

promocao.post('/listarprodutos', (req, res) => useBody(req, res, listarprodutos));
promocao.post('/Excluir', (req, res) => useBody(req, res, Excluir));
promocao.post('/listarPromocoes', (req, res) => useBody(req, res, listarPromocoes));
promocao.post('/salvarPromocao', (req, res) => useBody(req, res, salvarPromocao));
promocao.post('/editarPromocao', (req, res) => useBody(req, res, editarPromocao));
promocao.post('/selecionarproduto2', (req, res) => useBody(req, res, selecionarproduto2));
promocao.post('/selecionarproduto', (req, res) => useBody(req, res, selecionarproduto));
promocao.post('/pegarVenda', (req, res) => useBody(req, res, pegarVenda));
promocao.post('/excluirProduto', (req, res) => useBody(req, res, excluirProduto));
 
module.exports = promocao