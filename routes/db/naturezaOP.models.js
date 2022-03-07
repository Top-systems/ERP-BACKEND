const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const processarFiltro = async function ({ valor, filtro }) {

    const comecandoCom = await useDB({
        query: `SELECT * FROM cd_trib_naturezaoper WHERE ${filtro} like '${valor}%'`
    });

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_trib_naturezaoper WHERE ${filtro} LIKE '%${valor}%'`
    })

    /**
     * if (filtro.getComparacao().equals("Contendo")) {
            comparacaoLike = " LIKE '%" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    return { code: 200, results: { comecandoCom, contendo } }

    //  public void processarFiltro() {

    /**
     * //string da consulta
            StringBuilder sb = new StringBuilder("SELECT vo FROM VdAbastecimentos vo");
     */

};

const pesquisarPorColuna = async function ({ colunaBusca, textoBusca }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM cd_trib_naturezaoper WHERE CAST(${colunaBusca} as text) LIKE '%${textoBusca}%' ORDER BY ${colunaBusca} ASC`
    });

    return { code: 200, results: { pesquisa } }

};

const pesquisarPorColunaEntradas = async function ({ colunaBusca, textoBusca }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM cd_trib_naturezaoper WHERE CAST(${colunaBusca} as text) LIKE '%${textoBusca}%' and tipooperacao='1'`
    });

    return { code: 200, results: { pesquisa } }

};

const preencherListaBuscaEntradas = async function({  }){ 

    const lista = await useDB({ 
    query: `SELECT * FROM Cd_Trib_Naturezaoper WHERE tipooperacao='1' or  tipooperacao='6'  or  tipooperacao='10'`
 }); 

 return { code: 200, results: { lista }}  
    
};

module.exports = {
    processarFiltro,
    pesquisarPorColuna,
    pesquisarPorColunaEntradas,
    preencherListaBuscaEntradas
}