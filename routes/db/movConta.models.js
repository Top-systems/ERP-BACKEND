const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const salvarlancamento = async function ({ numConta, idLoja }) {

    const conta = await useDB({
        query: `SELECT * FROM Fn_Conta WHERE num_Conta=${numConta}`
    });

    const movContaHist = await useDB({
        query:`SELECT * FROM Fn_Movcontahist WHERE loja_Fk=${idLoja} ORDER BY id_Movcontahist DESC`
    });

    return { code: 200, results: { conta, movContaHist } }

};

const consultar = async function({ tipoData, dataInicial, dataFinal, idConta, tipoMovConta, idLoja }){ 

    const contaHist = await useDB({ 
    query: `SELECT * FROM Fn_Movcontahist WHERE (cast(${tipoData} as date) BETWEEN '${dataInicial}' AND '${dataFinal}') AND conta_Fk=${idConta}  AND tipomov_Mvcont='${tipoMovConta}' AND loja_Fk=${idLoja} order by ${tipoData} asc`
 }); 

 return { code: 200, results: { contaHist }}  
    
};

module.exports = {
    salvarlancamento,
    consultar
}