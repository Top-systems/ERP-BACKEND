const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const pegardatahora = async function({ idLoja }){ 

    const datahora = await useDB({ 
        query: `select datahorapc from cf_config_automacao where loja_fk =${idLoja}`
    }); 

    /**
     * datahorapc = (Date) new CargoRN().porSql2semcache("select datahorapc "
                + " from cf_config_automacao"
                + " where loja_fk =" + loja.getIdLoja() + "  ");
     */

 return { code: 200, results: { datahora }}  
//  public void pegardatahora() {
    
};

const listar = async function({ idLoja, idBico }){ 

    const lista = await useDB({ 
        query: ` select * from Es_Althist_Preco where loja_Fk=${idLoja} and origem='preco bico' order by id desc`
    }); 

    /**
     * hist = new AlteHistPrecoRN().buscarHQL(""
                + " select vo from EsAlthistPreco vo"
                + " where vo.esAlthistPrecoPK.lojaFk=" + loja.getIdLoja() + " "
                + " and origem='preco bico' "
                + " "
                + " order by esAlthistPrecoPK.id desc");
     */

    const lista2 = await useDB({ 
        query: `select * from Cd_Bico where id_Bico=${idBico} and loja_Fk=${idLoja}` 
     });
     /**
      * e.setBico(new BicoRN().pegarBico("select vo from CdBico vo "
                        + " where vo.cdBicoPK.idBico=" + e.getBicoFk() + " "
                        + " and vo.cdBicoPK.lojaFk=" + e.getEsAlthistPrecoPK().getLojaFk() + " "));
      */

 return { code: 200, results: { lista, lista2 }}  
//  private void listar() {
    
};

const inserirt = async function({ idLoja }){ 

    const inserir = await useDB({ 
        query: `select * from Cd_Bico where loja_Fk=${idLoja} order by numero_Bic asc`
    }); 

    /**
     * List<CdBico> b = new BicoRN().listarBicoHQL("select vo from CdBico vo "
                + " where  vo.cdBicoPK.lojaFk=" + loja.getIdLoja() + ""
                + " order by  numeroBic asc");
     */

 return { code: 200, results: { inserir }}  
//  public void inserirt() {
    
};

const salvar = async function({ idLoja }){ 

    const salvar = await useDB({ 
        query:` select max(id)+1 as idc from es_althist_preco where loja_fk=${idLoja}` 
    }); 

    /**
     *  Integer id = (Integer) sessao.createSQLQuery(""
                        + " select max(id)+1 as idc "
                        + " from es_althist_preco"
                        + " where loja_fk=" + loja.getIdLoja() + " ").setMaxResults(1).uniqueResult();
     */
 return { code: 200, results: { salvar }}  
//  public void salvar() {
    
};





module.exports = {  
    pegardatahora,
    listar,
    inserirt,
    salvar
}