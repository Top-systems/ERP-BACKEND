const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const processarFiltro = async function ({ valor, filtro }) {

    const comecandoCom = await useDB({
        query: `SELECT * FROM cd_produto WHERE ${filtro} like '${valor.toUpperCase()}%'`
    });

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_produto WHERE ${filtro} LIKE '%${valor.toUpperCase()}%'`
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

const salvarProduto = async function ({ idSegmento, idProd }) {

    const loja = await useDB({
        query: `SELECT * FROM Cf_Loja WHERE segmento_Fk=${idSegmento} AND id_Loja!=9999`
    });

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral ORDER BY id_Estoquegeral DESC`
    });

    const codigoBarra = await useDB({
        query: `SELECT * FROM Cd_Codigobarras WHERE produto_Fk=${idProd} ORDER BY id_Codigobarras DESC`
    });

    return { code: 200, results: { loja, codigoBarra } }

};

const pegarEstoque = async function ({ idLoja, idProd }) {

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE loja_Fk=${idLoja} AND produto_Fk=${idProd}`
    });

    return { code: 200, results: { estoqueGeral } }

};

const pegarCodBarras = async function({ idProd }){ 

    const codBarra = await useDB({ 
    query: `SELECT * FROM Cd_Codigobarras WHERE produto_Fk=${idProd} ORDER BY id_Codigobarras DESC`
 }); 

 return { code: 200, results: { codBarra }}  
    
};

const pegarTodosOsLotes = async function({ idProd }){ 

    const lote = await useDB({ 
    query:  `SELECT * FROM Cd_Lote WHERE produto_Fk=${idProd} and cast(qtde_Lote as double precision)>0.00`
 }); 

 return { code: 200, results: { lote }}  
    
};

const pegarTodosOsEstoques = async function({ idProd }){ 

    const estoqueGeral = await useDB({ 
    query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} ORDER BY loja_Fk ASC`
 }); 

 return { code: 200, results: { estoqueGeral }}  
    
};

const pesquisarPorColuna = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
    query: `SELECT * FROM Cd_Produto WHERE UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase()}%' ORDER BY ${colunaBusca} ASC`
 }); 

 return { code: 200, results: { pesquisa }}  
    
};

const pesquisarPorColunaDescricao = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
    query: `SELECT * FROM Cd_Produto WHERE UPPER(CAST(descricao_prod as text))   LIKE '%${textoBusca.toUpperCase()}%' ORDER BY ${colunaBusca} ASC`
 }); 

 return { code: 200, results: { pesquisa }}  
    
};

module.exports = {
    processarFiltro,
    salvarProduto,
    pegarEstoque,
    pegarCodBarras,
    pegarTodosOsLotes,
    pegarTodosOsEstoques,
    pesquisarPorColuna,
    pesquisarPorColunaDescricao
}