const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const salvar = async function({ idLoja, cpfFarmaceutico }){ 

    const farmaceutico = await useDB({ 
        query: `SELECT * FROM Cf_Farmaceutico WHERE  loja_fk=${idLoja} AND cpf_Farmaceutico = '${cpfFarmaceutico.replaceAll("\\D", "")}'`
    }); 

    /**
     * String hql = "SELECT vo FROM CfFarmaceutico vo "
                        + "WHERE  vo.cfLoja =" + loja.getIdLoja() + " "
                        + "AND vo.cpfFarmaceutico = '" + farmaceutico.getCpfFarmaceutico().replaceAll("\\D", "") + "'"; 
     */

 return { code: 200, results: { farmaceutico }}  

//  public void salvar() {
    
};

const pesquisarPorColuna = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query:`SELECT * FROM Cf_Farmaceutico WHERE UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC` 
    }); 

    /**
     *String hql = "SELECT vo FROM CfFarmaceutico vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' ORDER BY vo." + this.colunaBusca + " ASC"; 
     */

 return { code: 200, results: { pesquisa }}  

//  public void pesquisarPorColuna() {
    
};

const processarFiltro = async function({ valor, filtro, idLoja }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM cf_farmaceutico WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%' AND loja_fk=${idLoja}AND id_Farmaceutico IS NOT NULL`
    }); 
 
    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cf_farmaceutico WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%' AND loja_fk=${idLoja}AND id_Farmaceutico IS NOT NULL`
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
        StringBuilder sb = new StringBuilder("SELECT vo FROM CfFarmaceutico vo WHERE vo.cfLoja= " + loja.getIdLoja());
 */

};

const preencherListaBusca = async function({ idLoja }){ 

    const lista = await useDB({ 
        query: `SELECT * FROM Cf_Farmaceutico  WHERE id_Farmaceutico IS NOT NULL AND loja_fk = ${idLoja} ORDER BY id_Farmaceutico ASC` 
    }); 

    /**
     * String hql = "SELECT vo FROM CfFarmaceutico vo"
                + " WHERE vo.cfFarmaceuticoPK.idFarmaceutico IS NOT NULL"
                + " AND vo.cfLoja = " + loja.getIdLoja() + " "
                + "ORDER BY vo.cfFarmaceuticoPK.idFarmaceutico ASC";
     */

 return { code: 200, results: { lista }}  

//  public void preencherListaBusca() {
    
};

const logo = async function({ idLoja }){ 

    const foto = await useDB({ 
        query: `select logo_loja from cf_loja where id_loja=${idLoja}` 
    }); 

 return { code: 200, results: { foto }}  
    
};

module.exports = {
    salvar,
    pesquisarPorColuna,
    processarFiltro,
    preencherListaBusca,
    logo
}