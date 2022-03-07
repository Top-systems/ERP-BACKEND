const express = require('express');
const { useBody } = require('./db/use');
 
const{
    adicionarPlano2,
    listarPlanos2,
    adicionarPlano3,
    listarPlanos3,
    adicionarPlano7,
    listarPlanos7,
    adicionarPlano6,
    listarPlanos6,
    adicionarPlano4,
    listarPlanos4,
    adicionarPlano5,
    listarPlanos5,
    processarFiltro,
    inserir,
    pesquisarPorTexto,
    pesquisarPorInteiro,
    preencherListaBusca,
    preencherListaBusca2,
    pesquisarPorTexto2,
    pesquisarPorInteiro2
}= require('./db/planoConta.models');

const planoConta = express.Router();

planoConta.post('/adicionarPlano2', (req, res) => useBody(req, res, adicionarPlano2));
planoConta.post('/listarPlanos2', (req, res) => useBody(req, res, listarPlanos2));
planoConta.post('/adicionarPlano3', (req, res) => useBody(req, res, adicionarPlano3));
planoConta.post('/listarPlanos3', (req, res) => useBody(req, res, listarPlanos3));
planoConta.post('/adicionarPlano7', (req, res) => useBody(req, res, adicionarPlano7));
planoConta.post('/listarPlanos7', (req, res) => useBody(req, res, listarPlanos7));
planoConta.post('/adicionarPlano6', (req, res) => useBody(req, res, adicionarPlano6));
planoConta.post('/listarPlanos6', (req, res) => useBody(req, res, listarPlanos6));
planoConta.post('/adicionarPlano4', (req, res) => useBody(req, res, adicionarPlano4));
planoConta.post('/listarPlanos4', (req, res) => useBody(req, res, listarPlanos4));
planoConta.post('/adicionarPlano5', (req, res) => useBody(req, res, adicionarPlano5));
planoConta.post('/listarPlanos5', (req, res) => useBody(req, res, listarPlanos5));
planoConta.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
planoConta.post('/inserir', (req, res) => useBody(req, res, inserir));
planoConta.post('/pesquisarPorTexto', (req, res) => useBody(req, res, pesquisarPorTexto));
planoConta.post('/pesquisarPorInteiro', (req, res) => useBody(req, res, pesquisarPorInteiro));
planoConta.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
planoConta.post('/preencherListaBusca2', (req, res) => useBody(req, res, preencherListaBusca2));
planoConta.post('/pesquisarPorTexto2', (req, res) => useBody(req, res, pesquisarPorTexto2));
planoConta.post('/pesquisarPorInteiro2', (req, res) => useBody(req, res, pesquisarPorInteiro2));

module.exports = planoConta;