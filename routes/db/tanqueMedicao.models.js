const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM cd_tanque_medicao WHERE ${filtro} like '${valor.toUpperCase()}%'`
    }); 
 
    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_tanque_medicao WHERE ${filtro} LIKE '%${valor.toUpperCase()}%'`
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

const salvar = async function({  }){ 

    const tanqueMedicao = await useDB({ 
    query: `SELECT * FROM Cd_Tanque_Medicao ORDER BY id_Tanque_Medicao DESC`
 }); 

 return { code: 200, results: { tanqueMedicao }}  
    
};

const pesquisarPorColuna = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
    query: `SELECT * FROM Cd_Tanque_Medicao WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase()}%' ORDER BY ${colunaBusca} ASC`
 }); 

 return { code: 200, results: { pesquisa }}  
    
};


module.exports = {
    processarFiltro,
    salvar,
    pesquisarPorColuna
}