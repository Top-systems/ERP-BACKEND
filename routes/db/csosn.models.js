const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM cd_cst WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "")}%'`
    }); 
 
    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_cst WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "")}%'`
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
        StringBuilder sb = new StringBuilder("SELECT vo FROM CdCst vo");
 */

};

const pesquisarPorColuna = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query:`SELECT * FROM Cd_Cst WHERE (cod_Cst in (101,102,103,201,202,203,300,400,500,900)) and UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC` 
    }); 

 return { code: 200, results: { pesquisa }}  
    
};

const preencherListaBusca = async function({  }){ 

    const lista = await useDB({ 
        query:"SELECT * FROM Cd_Cst WHERE (cod_Cst in (101,102,103,201,202,203,300,400,500,900))" 
    }); 

 return { code: 200, results: { lista }}  
    
};

module.exports = {
    processarFiltro,
    pesquisarPorColuna,
    preencherListaBusca
}