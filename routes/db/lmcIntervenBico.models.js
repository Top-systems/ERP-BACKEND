
const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM cd_lmc_interven_bico WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_lmc_interven_bico WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
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
        StringBuilder sb = new StringBuilder("SELECT vo FROM CdCargofunc vo");
 */

} 

const pesquisarPorColuna = async function({ colunaBusca, textoBusca}){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Lmc_interven_bico WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\D", "")}%' ORDER BY ${colunaBusca} ASC`
    }); 

 return { code: 200, results: { pesquisa }}  
    
};

const salvar = async function({  }){ 

    const lmcInterven = await useDB({ 
        query: "SELECT * FROM Cd_Lmc_Interven_bico ORDER BY id_Lmc_Interven_bico DESC"
    }); 

 return { code: 200, results: { lmcInterven }}  
    
};

module.exports = {
    processarFiltro,
    pesquisarPorColuna,
    salvar
}