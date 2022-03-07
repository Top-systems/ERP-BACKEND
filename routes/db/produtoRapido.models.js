const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const montarConsulta = async function({ descProd, nomeFab, descSbgrp, descGrp }){ 

    const produto = await useDB({ 
        query: `select * from Cd_Produto where descricao_Prod like '${descProd.toUpperCase()}%'`
    }); 

    /**
     * if (a.getTipo().equals("produto")) {
            produtolr.append(" where vo.descricaoProd like '")
                     .append(a.getValor()).
                     append("%' ");
            p++;
        }
     */

    const fabricante = await useDB({
         query: `select cd_produto.* from Cd_Produto, cd_fabricante where fabricante_fk = id_fab AND cd_fabricante.nome_Fab like '${nomeFab.toUpperCase()}%'`
    });

    /**
     * if (a.getTipo().equals("fabricante")) {
                fabricantelr.append(" ").
                        append(fab).
                        append(" vo.fabricanteFk.nomeFab like '")
                        .append(a.getValor()).
                        append("%' ");
                fab = "or";
                f++;
            }
     */

    const subGrupo = await useDB({ 
        query: `select cd_produto.* from Cd_Produto, cd_subgrupoproduto where subgrupoprod_Fk = id_sbgrpprd AND cd_subgrupoproduto.descricao_Sbgrpprd like '${descSbgrp.toUpperCase()}%'` 
    });

    /**
     * if (a.getTipo().equals("subgrupo")) {
                subgrupolr.append(" ").
                        append(sub).
                        append(" vo.subgrupoprodFk.descricaoSbgrpprd like '")
                        .append(a.getValor()).
                        append("%' ");
                sub = "or";
                s++;
     */

    const grupo = await useDB({ 
        query: `select cd_produto.* from Cd_Produto, cd_grupoproduto where grupoprod_Fk = id_grpprod AND cd_grupoproduto.descricao_grpprod like '${descGrp.toUpperCase()}%'` 
    });

    /**
     * if (a.getTipo().equals("grupo")) {
                grupolr.append(" ").
                        append(gub).
                        append(" vo.grupoprodFk.descricaoGrpprod like '")
                        .append(a.getValor()).
                        append("%' ");
                gub = "or";
                g++;
     */



 return { code: 200, results: { produto, fabricante, subGrupo, grupo }}  

//  public void montarConsulta() {

    // String hql = "select vo from CdProduto vo"
    // + " ";
    
};

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM cd_produto  WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_produto  WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
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
        StringBuilder sb = new StringBuilder("SELECT vo FROM CdProduto vo");
 */

};

const salvar = async function({ idProd, segmento }){ 

    const salvar1 = await useDB({ 
        query: `SELECT es_estoquegeral.* FROM Es_Estoquegeral, cf_loja WHERE produto_Fk=${idProd}AND segmento_Fk=${segmento}`
    });

    /**
     * if (this.produto.getIdProd() != null) {

                String hql = "SELECT vo FROM EsEstoquegeral vo"
                        + " WHERE vo.produtoFk=" + this.produto.getIdProd() + ""
                        + " AND vo.cfLoja.segmentoFk=" + Util.pegarObjetoDaSessao("segmento") + "";
     */
      

 return { code: 200, results: { salvar1 }}  

//  public void salvar() {
    
};

const salvarProduto = async function({ idProd, segmento }){ 

    const salvar1 = await useDB({ 
        query: `SELECT * FROM Cf_Loja WHERE segmento_Fk=${segmento} AND id_Loja!=9999 `
    }); 

    /**
     * String hqll = "SELECT vo FROM CfLoja vo"
                        + " WHERE vo.segmentoFk=" + lojas.getSegmentoFk().getIdSegmento() + ""
                        + " AND vo.idLoja!=9999 ";
     */
    
    const salvar2 = await useDB({ 
        query:  "SELECT * FROM Es_Estoquegeral ORDER BY id_Estoquegeral DESC"
    });  
    
    /**
     *  String hql = "SELECT vo FROM EsEstoquegeral vo"
                            + " ORDER BY vo.esEstoquegeralPK.idEstoquegeral DESC";
     */

    const salvar3 = await useDB({ 
        query: `SELECT * FROM Cd_Codigobarras WHERE produto_Fk=${idProd} ORDER BY id_Codigobarras DESC` 
    });

    /**
     * String hql2 = "SELECT vo FROM CdCodigobarras vo"
                            + " WHERE vo.produtoFk=" + this.produto.getIdProd() + ""
                            + " ORDER BY vo.idCodigobarras DESC";
     */

    const salvar4 = await useDB({ 
        query: `SELECT * FROM Cd_Codigobarras WHERE produto_Fk=${idProd} ORDER BY id_Codigobarras DESC` 
    });     
    
     /**
     * String hql2 = "SELECT vo FROM CdCodigobarras vo"
                            + " WHERE vo.produtoFk=" + this.produto.getIdProd() + ""
                            + " ORDER BY vo.idCodigobarras DESC";
     */

 return { code: 200, results: { salvar1, salvar2, salvar3, salvar4 }}  

//  public void salvarProduto() {

    
};

const pegarTodosOsEstoques = async function({ idProd }){ 

    const estoque = await useDB({ 
        query:  `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} ORDER BY loja_Fk ASC`
    }); 

    /**
     *  String hql = "SELECT vo FROM EsEstoquegeral vo"
                + " WHERE vo.produtoFk=" + this.produto.getIdProd() + ""
                + " ORDER BY vo.esEstoquegeralPK.lojaFk ASC";
     */

 return { code: 200, results: { estoque }}  

//  public void pegarTodosOsEstoques() {

};

const pegarTodosOsLotes = async function({ idProd }){ 

    const lote = await useDB({ 
        query: `SELECT * FROM Cd_Lote WHERE produto_Fk=${idProd}`
    }); 

    /**
     * String hql = "SELECT vo FROM CdLote vo"
                + " WHERE vo.produtoFk=" + this.produto.getIdProd() + "";

     */

 return { code: 200, results: { lote }}  

//  public void pegarTodosOsLotes() {
    
};

const pegarCodigoDeBarras = async function({ idProd }){ 

    const codBarra = await useDB({ 
        query: `SELECT numero_codbar FROM cd_codigobarras where ativo_codbar='S' and produto_fk=${idProd}` 
    }); 

    /**
     * String hql = "SELECT numero_codbar\n"
                + "  FROM public.cd_codigobarras\n"
                + "  where ativo_codbar='S' and produto_fk=" + produto.getIdProd() + " ";

     */

 return { code: 200, results: { codBarra }}  

//  public String pegarCodigoDeBarras(CdProduto produto) {
    
};

const pegarCodBarras = async function({ idProd }){ 

    const codBarra = await useDB({ 
        query: `SELECT * FROM Cd_Codigobarras WHERE produto_Fk=${idProd} ORDER BY id_Codigobarras DESC`
    }); 

    /**
     * String hql2 = "SELECT vo FROM CdCodigobarras vo"
                + " WHERE vo.produtoFk=" + this.produto.getIdProd() + ""
                + " ORDER BY vo.idCodigobarras DESC";
     */

 return { code: 200, results: { codBarra }}  

//  public void pegarCodBarras() {
    
};

const pegarEstoque = async function({ idProd, idLoja }){ 

    const estoque = await useDB({ 
        query: `SELECT estoque FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    }); 

    /**
     * String hql = "SELECT vo.estoque FROM EsEstoquegeral vo"
                + " WHERE vo.produtoFk=" + produto.getIdProd() + ""
                + " AND vo.cfLoja=" + l.getIdLoja() + "";
     */

 return { code: 200, results: { estoque }}  

//  public BigDecimal pegarEstoque(CdProduto produto) {
  
};

const pegarCusto = async function({ idProd, idLoja }){ 

    const custo = await useDB({ 
        query: `SELECT precocusto_Prod FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    }); 

    /**
     * String hql = "SELECT vo.precocustoProd FROM EsEstoquegeral vo"
                + " WHERE vo.produtoFk=" + produto.getIdProd() + ""
                + " AND vo.cfLoja=" + l.getIdLoja() + "";

     */

 return { code: 200, results: { custo }}  

//  public BigDecimal pegarCusto(CdProduto produto) {

};

const pegarVenda = async function({ idProd, idLoja }){ 

    const venda = await useDB({ 
        query: `SELECT precovenda_Prod FROM Es_Estoquegeral WHERE produto_Fk=${idProd}AND loja_fk=${idLoja}`
    });
    
    /**
     * String hql = "SELECT vo.precovendaProd FROM EsEstoquegeral vo"
                + " WHERE vo.produtoFk=" + produto.getIdProd() + ""
                + " AND vo.cfLoja=" + l.getIdLoja() + "";
     */

 return { code: 200, results: { venda }}  

//  public BigDecimal pegarVenda(CdProduto produto) {
    
};

const pesquisarPorColuna = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM  Cd_Produto WHERE CAST(${colunaBusca} as text) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC`
    }); 

    /**
     *  String hql = "SELECT vo FROM  CdProduto vo"
                    + " WHERE CAST(vo." + this.colunaBusca + " as text) "
                    + " LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%'"
                    + " ORDER BY vo." + this.colunaBusca + " ASC";
     */

 return { code: 200, results: { pesquisa }}  

//  public void pesquisarPorColuna() {
    
};

const pesquisarPorColunaDescricao = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query:  `SELECT * FROM  Cd_Produto WHERE CAST(${colunaBusca} as text) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC`
    }); 

    /**
     *  String hql = "SELECT vo FROM CdProduto vo"
                    + " WHERE CAST(vo." + this.colunaBusca + " as text) "
                    + " LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%'"
                    + " ORDER BY vo." + this.colunaBusca + " ASC";
     */

 return { code: 200, results: { pesquisa }}  

//  public void pesquisarPorColunaDescricao(String descricao) {
    
};

const preencherListaBusca = async function({  }){ 

    const lista = await useDB({ 
        query: "SELECT * FROM Cd_Produto ORDER BY id_Prod ASC"
    }); 

    /**
     * String hql = "SELECT vo FROM CdProduto vo"
                    + " ORDER BY vo.idProd ASC";
     */

 return { code: 200, results: { lista }}  

//  public void preencherListaBusca() {
    
};

const pegarEstoque2 = async function({ idLoja, idProd }){ 

    const estoque = await useDB({ 
        query: `SELECT * FROM Es_Estoquegeral WHERE loja_Fk=${idLoja} AND produto_Fk=${idProd}` 
    }); 

    /**
     * String hql = "SELECT vo FROM EsEstoquegeral vo"
                    + " WHERE vo.esEstoquegeralPK.lojaFk=" + lojas.getIdLoja() + ""
                    + " AND vo.produtoFk=" + this.produto.getIdProd() + "";
     */

 return { code: 200, results: { estoque }}  
//  public void pegarEstoque() {
    
};

const logo = async function({ idLoja }){ 

    const foto = await useDB({ 
        query: `select logo_loja from cf_loja where id_loja=${idLoja}`
    }); 

 return { code: 200, results: { foto }}  
    
};



module.exports = {
    montarConsulta,
    processarFiltro,
    salvar,
    salvarProduto,
    pegarTodosOsEstoques,
    pegarTodosOsLotes,
    pegarCodigoDeBarras,
    pegarCodBarras,
    pegarEstoque,
    pegarCusto,
    pegarVenda,
    pesquisarPorColuna,
    pesquisarPorColunaDescricao,
    preencherListaBusca,
    pegarEstoque2,
    logo
}