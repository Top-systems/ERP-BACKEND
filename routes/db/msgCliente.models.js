const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const processarFiltro = async function ({ valor, filtro }) {

    const comecandoCom = await useDB({
        query: `SELECT * FROM cd_msgclientes WHERE ${filtro} like '${valor}%'`
    });

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_msgclientes WHERE ${filtro} LIKE '%${valor}%'`
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

const pesquisarPorTexto = async function ({ colunaBusca, textoBusca }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Cd_Msgclientes WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase()}%' ORDER BY ${colunaBusca} ASC`
    });

    return { code: 200, results: { pesquisa } }

};

const pesquisarPorInteiro = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
    query: `SELECT * FROM Cd_Msgclientes WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase()}%' ORDER BY ${colunaBusca} ASC`
 }); 

 return { code: 200, results: { pesquisa }}  
    
};

module.exports = {
    processarFiltro,
    pesquisarPorTexto,
    pesquisarPorInteiro
}