const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const pegarDetalhes = async function({ faixaVencimento }){ 

    const detalhes = await useDB({ 
        query: `SELECT * FROM Cd_Faixavencimentodet vo WHERE faixavencimentocab_Fk=${faixaVencimento}` 
    }); 

 return { code: 200, results: { detalhes } };  
    
};

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM cd_faixavencimentocab  WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_faixavencimentocab  WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
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
        query:`SELECT * FROM Cd_Faixavencimentocab WHERE UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase().replaceAll("\D", "")}%' ORDER BY ${colunaBusca} ASC` 
    }); 

 return { code: 200, results: { pesquisa }}  
    
};

module.exports = {
    pegarDetalhes,
    processarFiltro,
    pesquisarPorColuna
}