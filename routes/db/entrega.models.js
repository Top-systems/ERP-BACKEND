const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const listar = async function({ idLoja, datainicial, datafinal, situacao }){ 

    const lista = await useDB({ 
        query: `select ecf_cupomcab_entrega.* from Ecf_Cupomcab_Entrega, ecf_cupomcab where ecf_cupomcab.loja_fk=${idLoja} and (cast(ecf_Cupomcab.datahora_Cupom as date) between '${datainicial}' and '${datafinal}' ) and situacao='${situacao}' AND ecf_cupomcab.id_cupomcab = ecf_cupomcab_entrega.cupomcab_fk order by ecf_Cupomcab.datahora_Cupom desc`
    }); 

 return { code: 200, results: { lista }}  
    
};

module.exports = {
    listar
}