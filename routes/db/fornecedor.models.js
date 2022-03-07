const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const listarel = async function({  }){ 

    const lista = await useDB({ 
        query: "SELECT * FROM Cd_Fornecedor  order by nome_Forn asc"
    }); 

    //String hql = "SELECT vo FROM CdFornecedor vo order by vo.nomeForn asc";
     

 return { code: 200, results: { lista }}  
//  public List<CdFornecedor> listarel() {
};

const  listarelcomb = async function({ idLoja }){ 

    const lista = await useDB({ 
        query: `select *, descricao_Tipcomb from Cd_Bico, cd_tipocombustivel where loja_Fk=${idLoja} order by cd_tipocombustivel.descricao_Tipcomb asc `
    }); 

    /**
     * String k = "select vo from CdBico vo where vo.lojaFk=" + l.getIdLoja() + " "
                + " order by vo.tanqueFk.tipocombustivelFk.descricaoTipcomb asc ";
     */

 return { code: 200, results: { lista }}  

//  public List<CdTipocombustivel> listarelcomb() {
    
};

const pegarConfig = async function({ idLoja, idForn }){ 

    const config = await useDB({ 
        query: `SELECT * FROM Cd_Fornecedor_Config WHERE loja_Fk=${idLoja} AND fornecedor_Fk=${idForn}`
    }); 

    /**
     * String hql = "SELECT vo FROM CdFornecedorConfig vo"
                + " WHERE vo.lojaFk=" + l.getIdLoja() + ""
                + " AND vo.fornecedorFk=" + this.fornecedor.getIdForn() + "";
     */

 return { code: 200, results: { config }}  

//  public void pegarConfig() {
    
};

const pegarProdutos = async function({ idLoja, idForn }){ 

    const produto = await useDB({ 
        query: `SELECT * FROM Cd_Produtofornec WHERE fornecedor_Fk=${idForn} and loja_Fk=${idLoja}` 
    }); 
    /**
     * String hql = "SELECT vo FROM  CdProdutofornec vo"
                + " WHERE vo.fornecedorFk=" + this.fornecedor.getIdForn() + ""
                + " and vo.cdProdutofornecPK.lojaFk=" + l.getIdLoja() + "";
     */

 return { code: 200, results: { produto }}  
//  public void pegarProdutos() {
    
};

const pesquisaProdutos = async function({ colunaf, textof, idForn, idLoja }){ 

    const pesquisa1 = await useDB({ 
        query: `SELECT * FROM  Cd_Produtofornec  WHERE (UPPER(CAST(${colunaf} as text))  like '%${textof.toUpperCase()}%') AND fornecedor_Fk=${idForn} and loja_Fk=${idLoja}`
    }); 

    /**
     *   if (this.textof != null && !colunaf.equals("produtoFk.descricaoProd")) {
            CfLoja l = (CfLoja) Util.pegarObjetoDaSessao("loja");
            String hql = "SELECT vo FROM  CdProdutofornec vo"
                    + " WHERE (UPPER(CAST(vo." + this.colunaf + " as text)) "
                    + " like '%" + this.textof.toUpperCase() + "%')"
                    + " AND vo.fornecedorFk=" + this.fornecedor.getIdForn() + ""
                    + " and vo.cdProdutofornecPK.lojaFk=" + l.getIdLoja() + "";

            this.produtos = new ProdutoFornecedorRN().listarProdutoFornecedorHQL2(hql);
        }
     */

    const pesquisa2 = await useDB({ 
        query:  `SELECT * FROM  Cd_Produtofornec  WHERE (UPPER(CAST(${colunaf} as text))  like '%${textof.toUpperCase()}%') AND fornecedor_Fk=${idForn} and loja_Fk=${idLoja}and produto_fk is not null`
    })

    /**
     *  if (this.textof != null && colunaf.equals("produtoFk.descricaoProd")) {
            CfLoja l = (CfLoja) Util.pegarObjetoDaSessao("loja");
            String hql = "SELECT vo FROM  CdProdutofornec vo"
                    + " WHERE (UPPER(CAST(vo." + this.colunaf + " as text)) "
                    + " like '%" + this.textof.toUpperCase() + "%')"
                    + " AND vo.fornecedorFk=" + this.fornecedor.getIdForn() + ""
                    + " and vo.cdProdutofornecPK.lojaFk=" + l.getIdLoja() + ""
                    + " and vo.produtoFk is not null ";

            this.produtos = new ProdutoFornecedorRN().listarProdutoFornecedorHQL2(hql);
        }
     */

 return { code: 200, results: { pesquisa1, pesquisa2 }}  

 //public void pesquisaProdutos() {
    
};

const pegarCodigoDeBarras = async function({ idProd }){ 

    const codBarra = await useDB({ 
        query: `SELECT numero_codbar FROM public.cd_codigobarras where ativo_codbar='S' and produto_fk=${idProd}`
    }); 

    /**
     * String hql = "SELECT numero_codbar\n"
                    + "  FROM public.cd_codigobarras\n"
                    + "  where ativo_codbar='S' and produto_fk=" + produto.getIdProd() + " ";
     */

 return { code: 200, results: { codBarra }}  

 //public String pegarCodigoDeBarras(CdProduto produto) {
    
};

const pegarArquivo = async function({ idForn, idLoja, codProd, codBarra }){ 

    const arquivo = await useDB({ 
        query: `SELECT * FROM Cd_Produtofornec WHERE (codprodfornec=${codProd} OR codigobarras='${codBarra}') AND fornecedor_Fk=${idForn} and loja_Fk=${idLoja}`
    }); 

    /**
     * String hql = "SELECT vo FROM CdProdutofornec vo"
                + " WHERE (vo.codprodfornec=" + codigo + ""
                + " OR vo.codigobarras='" + codigobarra + "')"
                + " AND vo.fornecedorFk=" + this.fornecedor.getIdForn() + ""
                + " and vo.cdProdutofornecPK.lojaFk=" + l.getIdLoja() + "";
     */

    const arquivo2 = await useDB({ 
        query: `SELECT * FROM Cd_Produtofornec WHERE (codprodfornec=${codProd} OR codigobarras='${codBarra}') AND fornecedor_Fk=${idForn} and loja_Fk=${idLoja}`
     })

     /**
      * 
            String hql = "SELECT vo FROM CdProdutofornec vo"
                        + " WHERE (vo.codprodfornec=" + codigo + ""
                        + " OR vo.codigobarras='" + codigobarra + "')"
                        + " AND vo.fornecedorFk=" + this.fornecedor.getIdForn() + ""
                        + " and vo.cdProdutofornecPK.lojaFk=" + l.getIdLoja() + " ";
      */

 return { code: 200, results: { arquivo, arquivo2 }}  

 //public void pegarArquivo(FileUploadEvent event) {
    
};

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM cd_fornecedor  WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_fornecedor  WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
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
        StringBuilder sb = new StringBuilder("SELECT vo FROM cdFornecedor vo");
 */

}

const pesquisarPorTexto = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Fornecedor WHERE UPPER(CAST(${colunaBusca} as text))  LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC`
    }); 

    /**
     * String hql = "SELECT vo FROM CdFornecedor vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' ORDER BY vo." + this.colunaBusca + " ASC";

     */

 return { code: 200, results: { pesquisa }}  
 //public void pesquisarPorTexto(String texto) {
    
};

const pesquisarPorInteiro = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Fornecedor WHERE UPPER(CAST(${colunaBusca} as text))  LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC`
    }); 

    /**
     * String hql = "SELECT vo FROM CdFornecedor vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' ORDER BY vo." + this.colunaBusca + " ASC";

     */

 return { code: 200, results: { pesquisa }}  
//  public void pesquisarPorInteiro(String texto) {
};

const verificardest = async function({ idLoja }){ 

    const dest = await useDB({ 
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    }); 

 return { code: 200, results: { dest }}  
    
};


module.exports = {
    listarel,
    listarelcomb,
    pegarConfig,
    pegarProdutos,
    pesquisaProdutos,
    pegarCodigoDeBarras,
    pegarArquivo,
    processarFiltro,
    pesquisarPorTexto,
    pesquisarPorInteiro,
    verificardest
};
