const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM Cd_cidade WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM Cd_cidade WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
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
        StringBuilder sb = new StringBuilder("SELECT vo FROM CdCidade vo");
 */

}

 const salvar = async function({ sigla }){ 
 
     const estado = await useDB({ 
        query: `select * from Cd_Estado where sigla='${sigla}' `
    }); 
    /**
     *  cidade.setEstadoFk(new EstadoRN().pegarEstado("select vo from CdEstado vo "
         + " where vo.sigla='" + cidade.getEstadoFk().getSigla() + "' "));
     */
 
  return { code: 200, results: { estado }}  
    //public void salvar() {
      
 };

 const pesquisarPorColuna = async function({ colunaBusca, textoBusca }){ 
 
     const pesquisa = await useDB({ 
         query: `SELECT * FROM Cd_Cidade WHERE UPPER(CAST(${colunaBusca} as text))  LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC`
    }); 

    /**
     * String hql = "SELECT vo FROM CdCidade vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' ORDER BY vo." + this.colunaBusca + " ASC";
     */
 
  return { code: 200, results: { pesquisa }}  

  //public void pesquisarPorColuna() {
     
 };

 const preencherListaBusca = async function({  }){ 
 
     const lista = await useDB({ 
        query: "select * from Cd_Cidade where codibge_Cid!='' and codibge_Cid is not null"
    }); 
 
  return { code: 200, results: { lista }}  
     //public void preencherListaBusca() {
 };

module.exports = {
    processarFiltro,
    salvar,
    pesquisarPorColuna,
    preencherListaBusca
};
