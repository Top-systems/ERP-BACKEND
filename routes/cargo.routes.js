const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    primeiro,
    ultimo,
    anterior,
    proximo,
    pesquisarPorColuna,
    logo
}= require('./db/cargo.models');

const cargo = express.Router();

cargo.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
cargo.post('/primeiro', (req, res) => useBody(req, res, primeiro));
cargo.post('/ultimo', (req, res) => useBody(req, res, ultimo));
cargo.post('/anterior', (req, res) => useBody(req, res, anterior)); 
cargo.post('/proximo', (req, res) => useBody(req, res, proximo));
cargo.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
cargo.post('/logo', (req, res) => useBody(req, res, logo));

module.exports = cargo