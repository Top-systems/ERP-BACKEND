const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const setarCest = async function({ ncmCompleto }){ 

    const ncm = await useDB({ 
        query: `select * from Trib_Ncm  where ncm_Completo = '${ncmCompleto}'` 
    });
    
    /**
     * TribNcm ncm = new NcmRN().pegarNcm("select vo from TribNcm vo"
                    + " where ncmCompleto = '" + tipoCombustivel.getCestFk().getNcm() + "'");
     */

 return { code: 200, results: { ncm }}  

//  public void setarCest() {

};

const setarncm = async function({ ncm }){ 

    const cest = await useDB({ 
        query: `select * from Cd_Cest where ncm='${ncm}'`
    }); 

    /**
     * CdCest cest = new CestRN().pegarCest("select vo from CdCest vo"
                    + " where ncm='" + tipoCombustivel.getNcmFk().getNcmCompleto() + "'");
     */

 return { code: 200, results: { cest }}  

//  public void setarncm() {
  
};

const pegarPrecos = async function({ idTipoCombustivel, idLoja }){ 

    const preco = await useDB({ 
        query: `SELECT * FROM Cd_Tipocomb_Preco WHERE tipocombustivel_Fk=${idTipoCombustivel} AND loja_fk=${idLoja}` 
    }); 

 return { code: 200, results: { preco }}  
    
};

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM cd_Tipocombustivel WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 
 
    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_Tipocombustivel WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
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
        StringBuilder sb = new StringBuilder("SELECT vo FROM CdTipocombustivel vo");
 */

};

const listarTipoCombustivel = async function({  }){ 

    const lista = await useDB({ 
        query: "SELECT * FROM Cd_Tipocombustivel"
    });
    
    /**
     *String hql = "SELECT vo FROM CdTipocombustivel vo WHERE"; 
     */

 return { code: 200, results: { lista }}  

//  public List<CdTipocombustivel> listarTipoCombustivel() {
  
};

const salvar = async function({ idLoja }){ 

    const salvar1 = await useDB({ 
        query: `SELECT * FROM Cd_Tipocomb_Preco WHERE loja_Fk=${idLoja} ORDER BY id_Tipocombpreco DESC` 
    }); 

    /**
     * String hqlb = "SELECT vo FROM CdTipocombPreco vo"
                                    + " WHERE vo.lojaFk=" + l.getIdLoja() + ""
                                    + " ORDER BY vo.cdTipocombPrecoPK.idTipocombpreco DESC";
     */

 return { code: 200, results: { salvar1 }}  

//  public void salvar() {

};

const pesquisarPorColuna = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Tipocombustivel WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC`
    }); 

    /**
     * String hql = "SELECT vo FROM CdTipocombustivel vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' ORDER BY vo." + this.colunaBusca + " ASC"
     */

 return { code: 200, results: { pesquisa }}

//  public void pesquisarPorColuna() {
};

const pesquisarPorColunabico = async function({ idLoja, textoBusca, colunaBusca }){ 

    const pesquisa = await useDB({ 
        query: `select cd_bico.* from Cd_Bico, cd_tipocombustivel where loja_Fk=${idLoja} and UPPER(CAST(cd_tipocombustivel.${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' order by cd_tipocombustivel.descricao_Tipcomb asc`
    }); 

    /**
     * String k = "select vo from CdBico vo where vo.lojaFk=" + l.getIdLoja() + ""
                + "and UPPER(CAST(vo.tanqueFk.tipocombustivelFk." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%'"
                + " order by vo.tanqueFk.tipocombustivelFk.descricaoTipcomb asc";
     */

 return { code: 200, results: { pesquisa }}  

//  public void pesquisarPorColunabico() {
    
};

const preencherListaBuscabico = async function({ idLoja }){ 

    const lista = await useDB({ 
        query:`select cd_bico.* from Cd_Bico, cd_tipocombustivel where loja_Fk=${idLoja} order by cd_tipocombustivel.descricao_Tipcomb asc ` 
    }); 

    /**
     * String k = "select vo from CdBico vo where vo.lojaFk=" + l.getIdLoja() + " "
                    + " order by vo.tanqueFk.tipocombustivelFk.descricaoTipcomb asc ";
     */

 return { code: 200, results: { lista }}  
    
//  public void preencherListaBuscabico() {

};

const pesquisarPorColunaDescricao = async function({ textoBusca, colunaBusca }){ 

    const pesquisa = await useDB({ 
        query:`SELECT * FROM Cd_Tipocombustivel WHERE CAST(descricao_Tipcomb as text)  LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC` 
    }); 

    /**
     * String hql = "SELECT vo FROM CdTipocombustivel vo"
                    + " WHERE CAST(vo.descricaoTipcomb as text) "
                    + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' ORDER BY vo." + this.colunaBusca + " ASC";
     */

 return { code: 200, results: { pesquisa }}  
 
//  public void pesquisarPorColunaDescricao(String descricao) {

};


module.exports = {
    setarCest,
    setarncm,
    pegarPrecos,
    processarFiltro,
    listarTipoCombustivel,
    salvar,
    pesquisarPorColuna,
    pesquisarPorColunabico,
    preencherListaBuscabico,
    pesquisarPorColunaDescricao
}