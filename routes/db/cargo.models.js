const Utils = require('./use.js'); 
const { useDB, useQuery } = Utils; 

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM cd_cargofunc  WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_cargofunc  WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
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
        StringBuilder sb = new StringBuilder("SELECT vo FROM CdCargofunc vo");
 */

}

const primeiro = async function({  }){ 

    const cargos = await useDB({ 
        query: "select * from Cd_Cargofunc order by id_Cargo asc"
    }); 

    /**
     *  this.cargo = new CargoRN().paginacaov("select vo from CdCargofunc vo"
                    + "  order by vo.idCargo asc ");
     */

 return { code: 200, results: { cargos }}  

//  public void primeiro() {
    
};

const ultimo = async function({  }){ 

    const cargos = await useDB({ 
        query: "select * from Cd_Cargofunc order by id_Cargo desc "
    }); 
    /**
     * this.cargo = new CargoRN().paginacaov("select vo from CdCargofunc vo"
                    + "  order by vo.idCargo desc ");
     */

    

 return { code: 200, results: { cargos }}  

//  public void ultimo() {
    
};

const anterior = async function({ idCargo }){ 

    const cargoAnterior = await useDB({ 
        query: `select * from Cd_Cargofunc where id_Cargo<${idCargo} order by id_Cargo desc`
    }); 

    const cargo = await useDB({ 
        query: "select * from Cd_Cargofunc order by id_Cargo desc " 
    });

    /**
     * if (total > 0) {
            this.cargo = new CargoRN().paginacaov("select vo from CdCargofunc vo"
                    + "  where vo.idCargo<" + cargo.getIdCargo() + " order by vo.idCargo desc");
            if (this.cargo == null) {
                this.cargo = new CargoRN().paginacaov("select vo from CdCargofunc vo"
                        + "  order by vo.idCargo desc ");
            }
        }
     */

 return { code: 200, results: { cargoAnterior, cargo }}  
//  public void anterior() {
};

const proximo = async function({ idCargo }){ 

    const proximoCargo = await useDB({ 
        query: `select * from Cd_Cargofunc where id_Cargo>${idCargo} order by id_Cargo desc`
    }); 

    const cargo = await useDB({ 
        query: "select * from Cd_Cargofunc order by id_Cargo asc" 
    });

    /**
     * if (total > 0) {
            this.cargo = new CargoRN().paginacaov("select vo from CdCargofunc vo"
                    + "  where vo.idCargo>" + cargo.getIdCargo() + " order by vo.idCargo desc");
            if (this.cargo == null) {
                this.cargo = new CargoRN().paginacaov("select vo from CdCargofunc vo"
                        + "  order by vo.idCargo asc ");
            }
        }
     */

 return { code: 200, results: { proximoCargo, cargo }}  
    // public void proximo() {
};

const pesquisarPorColuna = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
    query: `SELECT * FROM Cd_Cargofunc WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC`
 }); 

 /**
  * String hql = "SELECT vo FROM CdCargofunc vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' ORDER BY vo." + this.colunaBusca + " ASC";
  */

 return { code: 200, results: { pesquisa }}  

//  public void pesquisarPorColuna() {
    
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
    primeiro,
    ultimo,
    anterior,
    proximo,
    pesquisarPorColuna,
    logo
}