const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const listarel = async function({  }){ 

    const lista = await useDB({ 
        query: "SELECT * FROM Cd_Fabricante order by nome_Fab asc" 
    }); 

 return { code: 200, results: { lista }}  

 /**
  * public List<CdFabricante> listarel() {
        String hql = "SELECT vo FROM CdFabricante vo order by vo.nomeFab asc";
        return new FabricanteRN().listarFabricanteHQL(hql);
    }
  */
    
};

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM Cd_Fabricante WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: "SELECT * FROM Cd_Fabricante WHERE "+ filtro.replaceAll("\\D", "") + " LIKE '%" + valor.replaceAll("\\D", "").toUpperCase() + "%'"
    })

    /**
     * if (filtro.getComparacao().equals("Contendo")) {
            comparacaoLike = " LIKE '%" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

 return { code: 200, results: { comecandoCom, contendo }}  
    
//  public void processarFiltro() {

// StringBuilder sb = new StringBuilder("SELECT vo FROM CdFabricante vo");

};

const pesquisarPorColuna = async function({ textoBusca, colunaBusca }){ 

    const lista = await useDB({ 
        query: `SELECT * FROM Cd_Fabricante WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC`
    }); 

    /**
     * String hql = "SELECT vo FROM CdFabricante vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' ORDER BY vo." + this.colunaBusca + " ASC";
     */

 return { code: 200, results: { lista }}  

//  public void pesquisarPorColuna() {

};

const  verificardest = async function({ idLoja }){ 

    const nfe = await useDB({ 
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    }); 

    

    /**
     * String hql = "select vo from CfConfigNfe vo where vo.cfConfigNfePK.lojaFk = " + l.getIdLoja();
     */

 return { code: 200, results: { nfe }}  

//  public void verificardest() {

    
};

module.exports = {
    listarel,
    processarFiltro,
    pesquisarPorColuna,
    verificardest

}