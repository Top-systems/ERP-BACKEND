const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM cd_produtosecao  WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_produtosecao  WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
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
        StringBuilder sb = new StringBuilder("SELECT vo FROM CdProdutosecao vo");
 */

};

const pesquisarPorTexto = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_produtosecao WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC`
    }); 

 return { code: 200, results: { pesquisa }}  
    
};

const pesquisarPorInteiro = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_produtosecao  WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC`
    }); 

 return { code: 200, results: { pesquisa }}  
    
};

module.exports = {
    processarFiltro,
    pesquisarPorTexto,
    pesquisarPorInteiro
}