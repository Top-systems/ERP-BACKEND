const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const listar = async function ({ idLoja, dataInicial, dataFinal, status }) {

    const listar = await useDB({
        query: `select * from Ecf_Recarga where loja_fk=${idLoja} and (cast(dataaltera as date) between  '${dataInicial}' and  '${dataFinal}' )  and status='${status}' order by dataaltera desc`
    });

    return { code: 200, results: { listar } }

};

module.exports = {
    listar
}