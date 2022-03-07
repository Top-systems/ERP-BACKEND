const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM fn_banco  WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM fn_banco  WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
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
        StringBuilder sb = new StringBuilder("SELECT vo FROM FnBanco vo");
 */

}

const pesquisarPorColuna = async function({ textoBusca, colunaBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Fn_banco WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC`
    }); 

 return { code: 200, results: { pesquisa }}  
    
};

const preencherListaBusca = async function({ colunaBusca }){ 

    const lista = await useDB({ 
        query: `SELECT * FROM Fn_Banco ORDER BY ${colunaBusca} ASC`
    }); 

 return { code: 200, results: { lista }}  
    
};

const logo = async function({ idLoja }){ 

    const foto = await useDB({ 
        query: `select logo_loja from cf_loja where id_loja=${idLoja}`
    }); 

 return { code: 200, results: { foto }}  
    
};

module.exports = {

    processarFiltro,
    pesquisarPorColuna,
    preencherListaBusca,
    logo
    
};
 