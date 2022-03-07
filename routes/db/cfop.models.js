const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM cd_cfop WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 

 
    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_cfop WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
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
        StringBuilder sb = new StringBuilder("SELECT vo FROM CdCfop vo");
 */

};

const pesquisarPorColuna = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Cfop WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC`
    }); 

    /**
     *String hql = "SELECT vo FROM CdCfop vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' ORDER BY vo." + this.colunaBusca + " ASC"; 
     */

 return { code: 200, results: { pesquisa }}  

//  public void pesquisarPorColuna() {
    
};

const preencherListaBuscaEntrada = async function({  }){ 

    const lista = await useDB({ 
        query: "SELECT * FROM Cd_Cfop WHERE codigo_Cfop <5000 ORDER BY codigo_Cfop ASC"
    }); 

    /**
     *String hql = "SELECT vo FROM CdCfop vo"
                + " WHERE vo.codigoCfop <5000"
                + " ORDER BY vo.codigoCfop ASC"; 
     */

 return { code: 200, results: { lista }}  

//  public void preencherListaBuscaEntrada() {
    
};

const preencherListaBuscaEntrada135235335 = async function({  }){ 

    const lista = await useDB({ 
        query: "SELECT * FROM Cd_Cfop WHERE cast(codigo_Cfop as text) LIKE '1%' OR cast(codigo_Cfop as text) LIKE '2%' OR cast(codigo_Cfop as text) LIKE '3%' ORDER BY codigo_Cfop ASC"
    }); 

    /**
     *  String hql = "SELECT vo FROM CdCfop vo"
                + " WHERE cast(vo.codigoCfop as text) LIKE '1%'"
                + " OR cast(vo.codigoCfop as text) LIKE '2%'"
                + " OR cast(vo.codigoCfop as text) LIKE '3%'"
                + " ORDER BY vo.codigoCfop ASC";
     */

 return { code: 200, results: { lista }}  

//  public void preencherListaBuscaEntrada135235335() {
    
};

const pesquisarPorColunaEntrada135235335 = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Cfop  WHERE (cast(codigo_Cfop as text) LIKE '1%' OR cast(codigo_Cfop as text) LIKE '2%' OR cast(codigo_Cfop as text) LIKE '3%') AND UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%'  ORDER BY codigo_Cfop ASC`
    }); 

    /**
     * String hql = "SELECT vo FROM CdCfop vo"
                + " WHERE (cast(vo.codigoCfop as text) LIKE '1%'"
                + " OR cast(vo.codigoCfop as text) LIKE '2%'"
                + " OR cast(vo.codigoCfop as text) LIKE '3%')"
                + " AND UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' "
                + " ORDER BY vo.codigoCfop ASC";
     */

 return { code: 200, results: { pesquisa }}  

//  public void pesquisarPorColunaEntrada135235335() {
    
};

const pesquisarPorColunaEntrada = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Cfop  WHERE UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%'  AND codigo_Cfop <5000 ORDER BY codigo_Cfop ASC`
    }); 

    /**
     * String hql = "SELECT vo FROM CdCfop vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' "
                + " AND vo.codigoCfop <5000"
                + " ORDER BY vo.codigoCfop ASC";
     */

 return { code: 200, results: { pesquisa }}
 
//  public void pesquisarPorColunaEntrada() {
    
};

const preencherListaBuscaSaida = async function({  }){ 

    const lista = await useDB({ 
        query: "SELECT * FROM Cd_Cfop WHERE codigo_Cfop >= 5000 ORDER BY codigo_Cfop ASC"
    }); 

    /**
     * String hql = "SELECT vo FROM CdCfop vo"
                + " WHERE vo.codigoCfop >= 5000"
                + " ORDER BY vo.codigoCfop ASC";
     */

 return { code: 200, results: { lista }}  

//  public void preencherListaBuscaSaida() {
    
};

const pesquisarPorColunaSaida = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Cfop  WHERE UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%'  AND codigo_Cfop >=5000 ORDER BY codigo_Cfop ASC`
    }); 

    /**
     *  String hql = "SELECT vo FROM CdCfop vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' "
                + " AND vo.codigoCfop >=5000"
                + " ORDER BY vo.codigoCfop ASC";
     */

 return { code: 200, results: { pesquisa }}  

//  public void pesquisarPorColunaSaida() {
    
};

const preencherListaBusca130230330 = async function({  }){ 

    const lista = await useDB({ 
        query:"SELECT * FROM Cd_Cfop"
             + " WHERE (CAST(codigo_Cfop as text) LIKE '%1%'"
             + " OR CAST(codigo_Cfop as text) LIKE '%2%'"
             + " OR CAST(codigo_Cfop as text) LIKE '%3%')"
             + " ORDER BY codigo_Cfop ASC" 
    }); 

    /**
     *  String hql = "SELECT vo FROM CdCfop vo"
                + " WHERE (CAST(vo.codigoCfop as text) LIKE '%1%'"
                + " OR CAST(vo.codigoCfop as text) LIKE '%2%'"
                + " OR CAST(vo.codigoCfop as text) LIKE '%3%')"
                + " ORDER BY vo.codigoCfop ASC";
     */

 return { code: 200, results: { lista }}  

//  public void preencherListaBusca130230330() {
    
};

const pesquisarPorColuna130230330 = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query:`SELECT * FROM Cd_Cfop  WHERE UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%'  AND (CAST(codigo_Cfop as text) LIKE '%1%' OR CAST(codigo_Cfop as text) LIKE '%2%' OR CAST(codigo_Cfop as text) LIKE '%3%') ORDER BY codigo_Cfop ASC` 
    }); 

    /**
     *String hql = "SELECT vo FROM CdCfop vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' "
                + " AND (CAST(vo.codigoCfop as text) LIKE '%1%'"
                + " OR CAST(vo.codigoCfop as text) LIKE '%2%'"
                + " OR CAST(vo.codigoCfop as text) LIKE '%3%')"
                + " ORDER BY vo.codigoCfop ASC"; 
     */

 return { code: 200, results: { pesquisa }}
 
//  public void pesquisarPorColuna130230330() {
    
};

module.exports = {
    processarFiltro,
    pesquisarPorColuna,
    preencherListaBuscaEntrada,
    preencherListaBuscaEntrada135235335,
    pesquisarPorColunaEntrada135235335,
    pesquisarPorColunaEntrada,
    preencherListaBuscaSaida,
    pesquisarPorColunaSaida,
    preencherListaBusca130230330,
    pesquisarPorColuna130230330
}