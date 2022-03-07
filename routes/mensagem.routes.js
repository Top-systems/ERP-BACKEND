const express = require('express');
const { useBody } = require('./db/use');

const {
    alertas,
    pesquisar,
    enviarmsgres,
    listar,
    listar2,
    listarenviadas,
    ler,
    lerenviada,
    listaruser,
    user,
    enviarmsg,
    atualizarncm,
} = require('./db/mensagem.models');

const mensagem = express.Router();

mensagem.post('/alertas', (req, res) => useBody(req, res, alertas));
mensagem.post('/pesquisar', (req, res) => useBody(req, res, pesquisar));
mensagem.post('/enviarmsgres', (req, res) => useBody(req, res, enviarmsgres));
mensagem.post('/listar', (req, res) => useBody(req, res, listar));
mensagem.post('/listar2', (req, res) => useBody(req, res, listar2));
mensagem.post('/listarenviadas', (req, res) => useBody(req, res, listarenviadas));
mensagem.post('/ler', (req, res) => useBody(req, res, ler));
mensagem.post('/lerenviada', (req, res) => useBody(req, res, lerenviada));
mensagem.post('/listaruser', (req, res) => useBody(req, res, listaruser));
mensagem.post('/user', (req, res) => useBody(req, res, user));
mensagem.post('/enviarmsg', (req, res) => useBody(req, res, enviarmsg));
mensagem.post('/atualizarncm', (req, res) => useBody(req, res, atualizarncm));

module.exports = mensagem