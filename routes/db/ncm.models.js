const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const setaribpt = async function({ codigo, ncm }){ 

    const ibpt = await useDB({ 
        query: `select * from Cd_Ibpt where codigo='${codigo}'`
    }); 

    /**
     * ibpt = new IbptRN().pegarIbpt("select vo from CdIbpt vo "
                    + " where codigo='" + ncm.getNcmCompleto() + "'"
                    + " ");
     */

    const cest = await useDB({ 
        query: `select * from Cd_Cest where ncm='${ncm}' `
    });

    /**
     * cests = new CestRN().listarCestHQL("select vo from CdCest vo where ncm='" + ncm.getNcmCompleto() + "' ");
     */

 return { code: 200, results: { ibpt, cest }}  

//  public void setaribpt() {
    
};

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM trib_ncm WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 
 
    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM trib_ncm WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
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
        StringBuilder sb = new StringBuilder("SELECT vo FROM TribNcm vo");
 */

};

const pesquisarPorColuna = async function({ colunaBusca, textoBusca, tipoRegimento }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Trib_Ncm WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' and tiporegimento=${tipoRegimento} ORDER BY ${colunaBusca} ASC`
    }); 

    /**
     * String hql = "SELECT vo FROM TribNcm vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' "
                + " and vo.tiporegimento=" + Integer.valueOf(loja.getTipocrtLoja()) + ""
                + " ORDER BY vo." + this.colunaBusca + " ASC";

     */

 return { code: 200, results: { pesquisa }}  
//  public void pesquisarPorColuna() {
};

const preencherListaBusca = async function({ tipoRegimento, colunaBusca }){ 

    const lista = await useDB({ 
        query: `SELECT * FROM Trib_Ncm WHERE tiporegimento=${tipoRegimento} ORDER BY ${colunaBusca} ASC`
    }); 
    /**
     * String hql = "SELECT vo FROM TribNcm vo"
                    + " WHERE vo.tiporegimento=" + Integer.valueOf(loja.getTipocrtLoja()) + ""
                    + " ORDER BY vo." + this.colunaBusca + " ASC";
     */
 return { code: 200, results: { lista }}  
 
//  public void preencherListaBusca() {

};

const pesquisarPorColunap = async function({ colunaBusca, textoBusca, tipoRegimento }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Trib_Ncm WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' and tiporegimento=${tipoRegimento} ORDER BY ${colunaBusca} ASC`
    }); 

    /**
     * String hql = "SELECT vo FROM TribNcm vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' "
                + " and vo.tiporegimento=" + Integer.valueOf(loja.getTipocrtLoja()) + ""
                + " ORDER BY vo." + this.colunaBusca + " ASC";
     */

 return { code: 200, results: { pesquisa }}  

//  public void pesquisarPorColunap() {
    
};

const preencherListaBuscap = async function({ tipoRegimento, colunaBusca }){ 

    const lista = await useDB({ 
        query: `SELECT * FROM Trib_Ncm WHERE tiporegimento=${tipoRegimento} ORDER BY ${colunaBusca} ASC`
    }); 
    /**
     * String hql = "SELECT vo FROM TribNcm vo"
                    + " WHERE vo.tiporegimento=" + Integer.valueOf(loja.getTipocrtLoja()) + ""
                    + " ORDER BY vo." + this.colunaBusca + " ASC";
     */
 return { code: 200, results: { lista }}  
 
//  public void preencherListaBuscap() {
    
};

module.exports = {
    setaribpt,
    processarFiltro,
    pesquisarPorColuna,
    preencherListaBusca,
    pesquisarPorColunap,
    preencherListaBuscap
}