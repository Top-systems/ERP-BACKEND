const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const pegarbicos = async function({ idTanque }){ 

    const bico = await useDB({ 
    query:  `select * from Cd_Bico where tanque_fk=${idTanque}`
 }); 

 return { code: 200, results: { bico }}  
    
};


const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM cd_tanque WHERE ${filtro} like '${valor.toUpperCase()}%'`
    }); 
 
    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_tanque WHERE ${filtro} LIKE '%${valor.toUpperCase()}%'`
    })

    /**
     * if (filtro.getComparacao().equals("Contendo")) {
            comparacaoLike = " LIKE '%" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

 return { code: 200, results: { comecandoCom, contendo }}  

 //  public void processarFiltro() {

/**
 * //string da consulta
        StringBuilder sb = new StringBuilder("SELECT vo FROM VdAbastecimentos vo");
 */

};

const limparTexto = async function({ idLoja }){ 

    const tanque = await useDB({ 
    query: `SELECT * FROM Cd_Tanque WHERE loja_Fk=${idLoja} ORDER BY id_Tanque DESC`
 }); 

 return { code: 200, results: { tanque }}  
    
};

const pesquisarPorColuna = async function({ idLoja, colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
    query: `SELECT * FROM Cd_Tanque WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase()}%'  and loja_Fk=${idLoja} ORDER BY ${colunaBusca} ASC`
 }); 

 return { code: 200, results: { pesquisa }}  
    
};

const histpv = async function({ insertDataAlthistTanque, idLoja }){ 

    let statusInsert;

    const idAlthisTanque = await useDB({ 
        query: `select max(id)+1 as idc  from es_althist_tanque  where loja_fk=${idLoja} `
    }); 

    const insertAlthistTanque = await useDB({
        query:`INSERT INTO public.es_althist_tanque(
            id, 
            loja_fk, 
            tanque_fk, 
            combustivel_fk, 
            estoqueantes, 
            estoquedepois,  
            usuarioaltera, 
            origem, 
            dataaltera)VALUES (
                ${idAlthisTanque[0].idc}, 
                ${insertDataAlthistTanque.loja_fk},  
                ${insertDataAlthistTanque.tanque_fk}, 
                ${insertDataAlthistTanque.combustivel_fk},
                ${insertDataAlthistTanque.estoqueantes}, 
                ${insertDataAlthistTanque.estoquedepois},  
                ${insertDataAlthistTanque.usuarioaltera}, 
                'compra', 
                '${insertDataAlthistTanque.dataaltera}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });


 return { code: 200, results: { idAlthisTanque, statusInsert }}  
    
};

const pegarhist = async function({ idTanque, idLoja }){ 

    const althistTanque = await useDB({ 
    query: `select * from Es_Althist_Tanque where tanque_Fk =${idTanque}  and loja_Fk=${idLoja}  order by id desc`
 }); 

 return { code: 200, results: { althistTanque }}  
    
};

module.exports = {
    pegarbicos,
    processarFiltro,
    limparTexto,
    pesquisarPorColuna,
    histpv,
    pegarhist
}