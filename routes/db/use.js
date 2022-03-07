const useQuery = async (query, vars, callback) => {
    const { Client, Pool } = require('pg')

    const client = new Pool({
        user: process.env.DB_USE || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_DATABASE || 'Monkeys-erp',
        password: process.env.DB_PASSWORD || 'postgres',
        port: process.env.DB_PORT || 5432,
    });

    await client.connect();

    return client;
}


const useDB = ({ query = '', vars = [] }) => {
    return new Promise((resolve, reject) => {
        useQuery(query, vars, function (err, res) {
            !res && console.log(query, err);
            if (!err) {
                resolve(res.rows)
            } else {
                reject(err)
            }
        })
    })
}

const removeAspa = function (str) {
    return str.replace("'", "")
}

const useBody = function (req, res, fn) {
    return fn(req.body)
        .then(db => res.status(200).send(db))
        .catch(err => res.status(500).json(err.message))
}

module.exports = { useDB, useQuery, removeAspa, useBody }