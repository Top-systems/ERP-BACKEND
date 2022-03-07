const express = require('express');
const { useBody } = require('./db/use');

const {
    cancelarcuponsemaberto,
    gerarsped,
    lojas,
    trocainventario,
    listarcfop,
    listarcfope,
    listarcst,
    listarlf
} = require('./db/sped.models');

const sped = express.Router();

sped.post('/cancelarcuponsemaberto', (req, res) => useBody(req, res, cancelarcuponsemaberto));
sped.post('/gerarsped', (req, res) => useBody(req, res, gerarsped));
sped.post('/lojas', (req, res) => useBody(req, res, lojas));
sped.post('/trocainventario', (req, res) => useBody(req, res, trocainventario));
sped.post('/listarcfop', (req, res) => useBody(req, res, listarcfop));
sped.post('/listarcfope', (req, res) => useBody(req, res, listarcfope));
sped.post('/listarcst', (req, res) => useBody(req, res, listarcst));
sped.post('/listarlf', (req, res) => useBody(req, res, listarlf));


module.exports =sped