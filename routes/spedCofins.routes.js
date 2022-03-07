const express = require('express');
const { useBody } = require('./db/use');

const {
    cancelarcuponsemaberto,
    gerarsped,
    lojas,
    listarpis,
    listarpiss,
    listarnat
} = require('./db/spedCofins.models');

const spedCofins = express.Router();

spedCofins.post('/cancelarcuponsemaberto', (req, res) => useBody(req, res, cancelarcuponsemaberto));
spedCofins.post('/gerarsped', (req, res) => useBody(req, res, gerarsped));
spedCofins.post('/lojas', (req, res) => useBody(req, res, lojas));
spedCofins.post('/listarpis', (req, res) => useBody(req, res, listarpis));
spedCofins.post('/listarpiss', (req, res) => useBody(req, res, listarpiss));
spedCofins.post('/listarnat', (req, res) => useBody(req, res, listarnat));

module.exports = spedCofins