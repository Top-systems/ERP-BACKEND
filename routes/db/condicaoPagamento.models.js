const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const pegarParcelas = async function ({ idCondicaoPag }) {

    const parcelas = await useDB({
        query: `SELECT * FROM Cd_Condicoesparcela WHERE condpag_Fk=${idCondicaoPag} ORDER BY id_Condicoesparcela ASC`
    });

    return { code: 200, results: { parcelas} }

};

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM cd_condicoespagamento WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 
 
    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_condicoespagamento WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
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
        StringBuilder sb = new StringBuilder("SELECT vo FROM cdCondicoespagamento vo");
 */

};

const salvar = async function({ idCondicoesPag }){ 

    const condicaoParcela = await useDB({ 
        query: `SELECT * FROM Cd_Condicoesparcela WHERE condpag_Fk=${idCondicoesPag}`
    }); 

 return { code: 200, results: { condicaoParcela }}  
    
};

const onCellEdit = async function({ idCondicoesPag }){ 

    const condicaoParcela = await useDB({ 
        query: `SELECT * FROM Cd_Condicoesparcela WHERE condpag_Fk=${idCondicoesPag}`
    });

 return { code: 200, results: { condicaoParcela }}  
    
};

const pesquisarPorColuna = async function({ colunaBusca, textoBusca}){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Condicoespagamento WHERE UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase().replaceAll("\D", "")}%' ORDER BY ${colunaBusca} ASC`
    }); 

 return { code: 200, results: { pesquisa }}  
    
};


module.exports = {
    pegarParcelas,
    processarFiltro,
    salvar,
    onCellEdit,
    pesquisarPorColuna
}