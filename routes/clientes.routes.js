const express = require('express')
const { useBody } = require('./db/use');


const {
    adicionarCombustivelDesconto,
    atualizasequencia,
    clientemsg,
    listarDependentes,
    listarDescProduto,
    listarEmpresas,
    listarEnderecos,
    listarcompras,
    listarhistcli,
    listarve,
    logo,
    onCellEditc,
    pesquisarPorColuna,
    pesquisarPorColunaFuncionario,
    pesquisarPorColunanfe,
    precovar,
    precovarc,
    precovarcbico,
    preencherListaBuscaFuncionario,
    preencherListaBuscanfe,
    processarFiltro,
    recebeFoto,
    removerFoto,
    retornaFoto,
    run,
    salvar,
    verificardest,
    listarDescCombustivel,
    pesquisaRelatorioEmp,
    atualizaCliente
} = require('./db/clientes.model');

const clientes = express.Router();

clientes.post('/adicionarCombustivelDesconto', (req, res) => useBody(req, res, adicionarCombustivelDesconto));
clientes.post('/atualizasequencia', (req, res) => useBody(req, res, atualizasequencia));
clientes.post('/clientemsg', (req, res) => useBody(req, res, clientemsg));
clientes.post('/listarDependentes', (req, res) => useBody(req, res, listarDependentes));
clientes.post('/listarDescProduto', (req, res) => useBody(req, res, listarDescProduto));
clientes.get('/listarEmpresas', (req, res) => useBody(req, res, listarEmpresas));
clientes.post('/listarEnderecos', (req, res) => useBody(req, res, listarEnderecos));
clientes.post('/listarcompras', (req, res) => useBody(req, res, listarcompras));
clientes.post('/listarhistcli', (req, res) => useBody(req, res, listarhistcli));
clientes.post('/listarve', (req, res) => useBody(req, res, listarve));
clientes.post('/logo', (req, res) => useBody(req, res, logo));
clientes.post('/onCellEditc', (req, res) => useBody(req, res, onCellEditc));
clientes.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
clientes.post('/pesquisarPorColunaFuncionario', (req, res) => useBody(req, res, pesquisarPorColunaFuncionario));
clientes.post('/pesquisarPorColunanfe', (req, res) => useBody(req, res, pesquisarPorColunanfe));
clientes.post('/precovar', (req, res) => useBody(req, res, precovar));
clientes.post('/precovarc', (req, res) => useBody(req, res, precovarc));
clientes.post('/precovarcbico', (req, res) => useBody(req, res, precovarcbico));
clientes.post('/preencherListaBuscaFuncionario', (req, res) => useBody(req, res, preencherListaBuscaFuncionario));
clientes.post('/preencherListaBuscanfe', (req, res) => useBody(req, res, preencherListaBuscanfe));
clientes.get('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
clientes.post('/recebeFoto', (req, res) => useBody(req, res, recebeFoto));
clientes.post('/removerFoto', (req, res) => useBody(req, res, removerFoto));
clientes.post('/retornaFoto', (req, res) => useBody(req, res, retornaFoto));
clientes.post('/run', (req, res) => useBody(req, res, run));
clientes.post('/salvar', (req, res) => useBody(req, res, salvar));
clientes.post('/verificardest', (req, res) => useBody(req, res, verificardest));
clientes.post('/listarDescCombustivel', (req, res) => useBody(req, res, listarDescCombustivel));
clientes.post('/pesquisaRelatorioEmp', (req, res) => useBody(req, res, pesquisaRelatorioEmp));
clientes.post('/atualizaCliente', (req, res) => useBody(req, res, atualizaCliente));

module.exports = clientes;