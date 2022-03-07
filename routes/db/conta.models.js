const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM fn_conta WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM fn_conta WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
    })


    /**
     * if (filtro.getComparacao().equals("Contendo")) {
            comparacaoLike = " LIKE '%" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

 return { code: 200, results: { comecandoCom, contendo }}  
    
//  public void processarFiltro() {

// StringBuilder sb = new StringBuilder("SELECT vo FROM fn_conta vo");
    
};

const listaALvo = async function({ idLoja }){ 

    const lista = await useDB({ 
        query:`SELECT * FROM Fn_Conta WHERE loja_Fk=${idLoja}ORDER BY id_Conta ASC`
    }); 

    /**
     * String hql = "SELECT vo FROM FnConta vo"
                + " WHERE vo.lojaFk=" + loja.getIdLoja() + ""
                + " ORDER BY vo.idConta ASC";
     */

 return { code: 200, results: { lista }}  
//  public void listaAlvo() {
    
};

const pesquisarPorTexto = async function({ colunaBusca, textoBusca, idLoja }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Fn_Conta WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' AND loja_Fk=${idLoja}ORDER BY ${colunaBusca} ASC` 
    }); 

    /**
     * String hql = "SELECT vo FROM FnConta vo"
            + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
            + " LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%'"
            + " AND vo.lojaFk=" + loja.getIdLoja() + ""
            + "  ORDER BY vo." + this.colunaBusca + " ASC";

     */

 return { code: 200, results: { pesquisa }}  

//  public void pesquisarPorTexto(String texto) {
    
};

const pesquisarPorInteiro = async function({ colunaBusca, textoBusca, idLoja }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Fn_Conta WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' AND loja_Fk=${idLoja} ORDER BY ${colunaBusca} ASC`
    }); 

    /**
     * String hql = "SELECT vo FROM FnConta vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' "
                + " AND vo.lojaFk=" + loja.getIdLoja() + ""
                + " ORDER BY vo." + this.colunaBusca + " ASC";
     */

 return { code: 200, results: { pesquisa }}  

//  public void pesquisarPorInteiro(String texto) {
    
};

const preencherListaBusca = async function({ idLoja }){ 

    const lista = await useDB({ 
        query: `SELECT * FROM Fn_Conta WHERE loja_Fk=${idLoja}`
    }); 

    /**
     *  String hql = "SELECT vo FROM FnConta vo"
                + " WHERE vo.lojaFk=" + loja.getIdLoja() + "";
     */

 return { code: 200, results: { lista }} 
 
//  public void preencherListaBusca()
    
};

const logo = async function({ idLoja }){ 

    const foto = await useDB({ 
        query: `select logo_loja from cf_loja where id_loja=${idLoja}`
    }); 

    /**
     *  byte[] foto = (byte[]) new CargoRN().porSql2semcache("select logo_loja from cf_loja where id_loja=" + loja.getIdLoja() + " ");
     */

 return { code: 200, results: { foto }}  

//  public String logo() {

};


module.exports = {
    processarFiltro,
    listaALvo,
    pesquisarPorTexto,
    pesquisarPorInteiro,
    preencherListaBusca,
    logo

}