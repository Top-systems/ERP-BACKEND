const express = require('express');
const { useBody } = require('./db/use');

const {
    recebetxt,
    altera,
    pegarProd,
    pesquisar,
    pegarConfig,
    pegarconfignull,
    salvar,
    excluirpedido,
    salvarpedidonobanco,
    preencherListaBusca,
    pesquisarPorColuna,
    selecionarcab,
    selecionar,
    consultarpedidosantacruz,
    consultarpedidopanpharma,
    consultarpedidopanarello,
    consultarpedidocloseup,
    consultarpedidofidelize,
    consultarpedidopharmalink,
    run
} = require('./db/pedido.models');

const pedido = express.Router();

pedido.post('/recebetxt', (req, res) => useBody(req, res, recebetxt));
pedido.post('/altera', (req, res) => useBody(req, res, altera));
pedido.post('/pegarProd', (req, res) => useBody(req, res, pegarProd));
pedido.post('/pesquisar', (req, res) => useBody(req, res, pesquisar));
pedido.post('/pegarConfig', (req, res) => useBody(req, res, pegarConfig));
pedido.post('/pegarconfignull', (req, res) => useBody(req, res, pegarconfignull));
pedido.post('/salvar', (req, res) => useBody(req, res, salvar));
pedido.post('/excluirpedido', (req, res) => useBody(req, res, excluirpedido));
pedido.post('/salvarpedidonobanco', (req, res) => useBody(req, res, salvarpedidonobanco));
pedido.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
pedido.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
pedido.post('/selecionarcab', (req, res) => useBody(req, res, selecionarcab));
pedido.post('/selecionar', (req, res) => useBody(req, res, selecionar));
pedido.post('/consultarpedidosantacruz', (req, res) => useBody(req, res, consultarpedidosantacruz));
pedido.post('/consultarpedidopanpharma', (req, res) => useBody(req, res, consultarpedidopanpharma));
pedido.post('/consultarpedidopanarello', (req, res) => useBody(req, res, consultarpedidopanarello));
pedido.post('/consultarpedidocloseup', (req, res) => useBody(req, res, consultarpedidocloseup));
pedido.post('/consultarpedidofidelize', (req, res) => useBody(req, res, consultarpedidofidelize));
pedido.post('/consultarpedidopharmalink', (req, res) => useBody(req, res, consultarpedidopharmalink));
pedido.post('/run', (req, res) => useBody(req, res, run));

module.exports = pedido