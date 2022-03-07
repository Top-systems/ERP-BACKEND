const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: ` SELECT * FROM Cd_Transportadora WHERE ${filtro.replaceAll("\\D", "")} LIKE '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '%" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({ 
        query: `SELECT * FROM Cd_Transportadora WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'` 
    })

    /**
     * if (filtro.getComparacao().equals("Contendo")) {
            comparacaoLike = " LIKE '%" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

 return { code: 200, results: { comecandoCom, contendo }}  

//  public void processarFiltro() {

// StringBuilder sb = new StringBuilder("SELECT vo FROM CdTransportadora vo");

};

const pesquisarPorTexto = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Transportadora WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("//D", "")}%' ORDER BY ${colunaBusca} ASC`
    }); 

    /**
     * String hql = "SELECT vo FROM CdTransportadora  vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' ORDER BY vo." + this.colunaBusca + " ASC";
     */

 return { code: 200, results: { pesquisa }}  
 //public void pesquisarPorTexto(String texto) {
    
};

const pesquisarPorInteiro = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Transportadora WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("//D", "")}%' ORDER BY ${colunaBusca} ASC`
    }); 

    /**
     * String hql = "SELECT vo FROM CdTransportadora vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' ORDER BY vo." + this.colunaBusca + " ASC";
     */

 return { code: 200, results: { pesquisa }}  

 //public void pesquisarPorInteiro(String texto) {
    
};

const verificardest = async function({ idLoja }){ 

    const nfe = await useDB({ 
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    }); 

    /**
     *  String hql = "select vo from CfConfigNfe vo where vo.cfConfigNfePK.lojaFk = " + l.getIdLoja();
     */

 return { code: 200, results: { nfe }}  

//  public void verificardest() {

    
};

module.exports = {
    processarFiltro,
    pesquisarPorTexto,
    pesquisarPorInteiro,
    verificardest
}