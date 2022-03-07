const express = require('express')

const DB = require('./db/model')

const first = express.Router()

// POST - localhost:3001/api/v1/db/
/**
    {
        "query": "SELECT * FROM database WHERE id = $1",
        "vars": [1]
    }
 */
first.post('/', (req, res, next) => {
    DB.useDB(req.body)
        .then(db => res.status(200).send(db))
        .catch(err => res.status(500).send(err))
})

// POST - localhost:3001/api/v1/db/ERP/restrito/cadastros/clientes.ip/monkeys/atualizarsaldo
/**
    {
        "loja": Number(loja_fk),
        "lojaLogada": Number(loja_fk)
    }
 */
first.post('/ERP/restrito/cadastros/clientes.ip/monkeys/atualizarsaldo', (req, res, next) => {
    DB.atualizarsaldo(req.body)
        .then(db => res.status(200).send(db))
        .catch(err => res.status(500).send(err))
})

// POST - localhost:3001/api/v1/db/ERP/restrito/cadastros/clientes.ip/monkeys/opcoesCli
/**
    { 
        "escolhaprod" = String("T" or "P" or "C" ...), 
        "clientel": {
            "id": Number()
        }, 
        "loja": {
            "id": Number(loja_fk)
        }, 
        "datainicial": String(),
        "datafinal": String()
    }
 */
first.post('/ERP/restrito/cadastros/clientes.ip/monkeys/opcoesCli', (req, res, next) => {
    DB.opcoesCli(req.body)
        .then(db => res.status(200).send(db))
        .catch(err => res.status(500).send(err))
})

// POST - localhost:3001/api/v1/db/ERP/restrito/cadastros/clientes.ip/monkeys/opcoes
/**
    { 
        "escolha" = String("1" or "2" or "3" ...), 
        "loja": {
            "id": Number(loja_fk)
        },
        "lojai": {
            "id": Number(loja_fk)
        },
        "datainicial": String(),
        "datafinal": String(),
        "empresa": {
            "idEmpconv": any,
        },
        "listCliSelecionado": [
            {
                "id": Number(id_cli)
                ...<Cli>
            }
        ]
    }

    { 
		"escolha": "4", 
		"loja": {
            "id": 1
		},
		"empresa": {
            "idEmpconv": 3
		},
		"listCliSelecionado": [
            {
                    "id": 3
            },
            {
                    "id": 6
            }
		]
    }
    => 
    [
        {
            "id_cli": 6,
            "nome_cli": "DAVI ANTONIO DA SILVA",
            "endereco_cli": "R TEIXEIRA CELHO, 319",
            "bairro_cli": "CENTRO",
            "numero_cli": "0",
            "cidade_cli": "ITUMIRIM",
            "uf_cli": "MG",
            "cep_cli": "37210000",
            "total": "28.53000000000000000000"
        },
        {
            "id_cli": 3,
            "nome_cli": "MARCELO PAULA DA COSTA",
            "endereco_cli": "R VER MARCEL LOPES",
            "bairro_cli": "A BERNARDE",
            "numero_cli": "157",
            "cidade_cli": "LAVRAS",
            "uf_cli": "MG",
            "cep_cli": "37200000",
            "total": "2.55000000000000000000"
        }
    ]
 */
first.post('/ERP/restrito/cadastros/clientes.ip/monkeys/opcoes', (req, res, next) => {
    DB.opcoes(req.body)
        .then(db => res.status(200).send(db))
        .catch(err => res.status(500).send(err))
})



module.exports = first