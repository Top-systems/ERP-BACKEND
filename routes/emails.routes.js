const express = require('express');
const { useBody } = require('./db/use');

const {
    pesquisar
} = require('./db/emails.models');

const emails = express.Router();

emails.post('/pesquisar', (req, res) => useBody(req, res, pesquisar))

module.exports = emails;