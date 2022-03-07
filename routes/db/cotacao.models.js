const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const setarsugestao = async function({ idCompraSugestao, idLoja }){ 

    const fornecedor = await useDB({ 
        query: "select * from Cd_Fornecedor where cotacao='S' order by nome_Forn asc"
    }); 

    const produto = await useDB({ 
        query: `select * from Cd_Compra_Sugestao_Det where id=${idCompraSugestao} and loja_Fk=${idLoja}`
    })

 return { code: 200, results: { fornecedor, produto }}  
    
};

module.exports = {
    setarsugestao
}