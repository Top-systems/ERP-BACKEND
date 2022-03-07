const express = require('express');
const { useBody } = require('./db/use');

const {
    graficoss,
    createP1,
    initBarModel2,
    initBarModel,
    filtrar
} = require('./db/dash.models');

const dash = express.Router();

dash.post('/graficoss', (req, res) => useBody(req, res, graficoss));
dash.post('/createP1', (req, res) => useBody(req, res, createP1));
dash.post('/initBarModel2', (req, res) => useBody(req, res, initBarModel2));
dash.post('/initBarModel', (req, res) => useBody(req, res, initBarModel));
dash.post('/filtrar', (req, res) => useBody(req, res, filtrar));

module.exports =dash