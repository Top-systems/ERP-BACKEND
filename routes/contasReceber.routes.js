const express = require('express');
const { useBody } = require('./db/use');

const {
    recalcularp,
    recalcular,
    excluirlancamento,
    salvarcontasreceber,
    baixar,
    baixarparcial,
    cancelar,
    consultar,
    opcoesclie,
    atualizarecf,
    veritens,
    onCellEdit,
    iniciarFatura,
    pegarfaixa,
    criarfatura,
    desfazerexclusao
} = require('./db/contasReceber.models');

const contasReceber = express.Router();

contasReceber.post('/recalcularp', (req, res) => useBody(req, res, recalcularp));
contasReceber.post('/recalcular', (req, res) => useBody(req, res, recalcular));
contasReceber.post('/excluirlancamento', (req, res) => useBody(req, res, excluirlancamento));
contasReceber.post('/salvarcontasreceber', (req, res) => useBody(req, res, salvarcontasreceber));
contasReceber.post('/baixar', (req, res) => useBody(req, res, baixar));
contasReceber.post('/baixarparcial', (req, res) => useBody(req, res, baixarparcial));
contasReceber.post('/cancelar', (req, res) => useBody(req, res, cancelar));
contasReceber.post('/consultar', (req, res) => useBody(req, res, consultar));
contasReceber.post('/opcoesclie', (req, res) => useBody(req, res, opcoesclie));
contasReceber.post('/atualizarecf', (req, res) => useBody(req, res, atualizarecf));
contasReceber.post('/veritens', (req, res) => useBody(req, res, veritens));
contasReceber.post('/onCellEdit', (req, res) => useBody(req, res, onCellEdit));
contasReceber.post('/iniciarFatura', (req, res) => useBody(req, res, iniciarFatura));
contasReceber.post('/pegarfaixa', (req, res) => useBody(req, res, pegarfaixa));
contasReceber.post('/criarfatura', (req, res) => useBody(req, res, criarfatura));
contasReceber.post('/desfazerexclusao', (req, res) => useBody(req, res, desfazerexclusao));

module.exports = contasReceber