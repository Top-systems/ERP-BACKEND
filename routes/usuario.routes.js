const express = require('express')
const { useBody } = require('./db/use');

const{
    pegaNomeFuncionario,
    pegarNiveisUsuario,
    salvarNivelAcesso,
    alterarSenha,
    alterarSenha2,
    listaAlvo,
    salvar,
    pesquisarPorTexto,
    pesquisarPorInteiro,
    preencherListaBusca
} = require('./db/usuario.model')

const usuario = express.Router();

usuario.post('/pegaNomeFuncionario', (req, res) => useBody(req, res, pegaNomeFuncionario));
usuario.post('/pegarNiveisUsuario', (req, res) => useBody(req, res, pegarNiveisUsuario));
usuario.post('/salvarNivelAcesso', (req, res) => useBody(req, res, salvarNivelAcesso));
usuario.post('/alterarSenha', (req, res) => useBody(req, res, alterarSenha));
usuario.post('/alterarSenha2', (req, res) => useBody(req, res, alterarSenha2));
usuario.post('/listaAlvo', (req, res) => useBody(req, res, listaAlvo));
usuario.post('/salvar', (req, res) => useBody(req, res, salvar));
usuario.post('/pesquisarPorTexto', (req, res) => useBody(req, res, pesquisarPorTexto));
usuario.post('/pesquisarPorInteiro', (req, res) => useBody(req, res, pesquisarPorInteiro));
usuario.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));

module.exports = usuario;