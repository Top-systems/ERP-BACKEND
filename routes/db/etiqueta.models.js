const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const estoque = async function({ idLoja, idProd }){ 

    const lista = await useDB({ 
        query: `select estoque from  es_estoquegeral where loja_fk=${idLoja} and produto_fk=${idProd}`
    }); 

    /**
     *  return (BigDecimal) new CargoRN().porSql2semcache("select estoque from  es_estoquegeral "
                    + " where loja_fk=" + loja.getIdLoja() + " and produto_fk=" + p.getIdProd() + "");
     */

 return { code: 200, results: { lista }}  
//  public BigDecimal estoque(CdProduto p) {
    
};

const pesquisarPorColuna = async function({ colunaBusca, textoBusca, idLoja }){ 

    const pesquisa = await useDB({ 
        query:  `SELECT id_prod,descricao_prod,descricaoetiqueta_prod ,numero_codbar,precovenda_prod, desconto_prod,estoque,nome_fab FROM public.es_estoquegeral as es inner join cd_produto as p on p.id_prod=es.produto_fk inner join cd_codigobarras as cb on cb.produto_fk=p.id_prod inner join cd_fabricante as f on f.id_fab=p.fabricante_fk where loja_fk=${idLoja}and ativo_codbar='S' and upper(cast(${colunaBusca} as text)) like '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' order by ${colunaBusca} asc limit 50`
    }); 
    /**
     * String sql = "SELECT id_prod,descricao_prod,descricaoetiqueta_prod ,"
                + "numero_codbar,precovenda_prod, desconto_prod,estoque,nome_fab\n"
                + "  FROM public.es_estoquegeral as es\n"
                + "  inner join cd_produto as p on p.id_prod=es.produto_fk\n"
                + "  inner join cd_codigobarras as cb on cb.produto_fk=p.id_prod\n"
                + " inner join cd_fabricante as f on f.id_fab=p.fabricante_fk "
                + "  where loja_fk=" + loja.getIdLoja() + " "
                + " and ativo_codbar='S'"
                + " and upper(cast(" + colunaBusca + " as text)) like '%" + textoBusca.toUpperCase() + "%'  "
                + " order by " + colunaBusca + " asc limit 50";
     */

 return { code: 200, results: { pesquisa }}  

//  public void pesquisarPorColuna() {
    
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
//  public String pegarCodigoDeBarras(CdProduto produto) {
};

const desconto = async function({ idLoja, idProd }){ 

    const desc = await useDB({ 
        query: `select desconto_prod from  es_estoquegeral where loja_fk=${idLoja} and produto_fk=${idProd}`
    }); 
    /**
     *  return (BigDecimal) new CargoRN().porSql2semcache("select desconto_prod from  es_estoquegeral "
                    + " where loja_fk=" + loja.getIdLoja() + " and produto_fk=" + p.getIdProd() + "");
     */

 return { code: 200, results: { desc }}  
//  public BigDecimal desconto(CdProduto p) {
    
};

const preco = async function({ idLoja, idProd }){ 

    const pre = await useDB({ 
        query: `select precovenda_prod from  es_estoquegeral where loja_fk=${idLoja} and produto_fk=${idProd}`
    }); 

    /**
     * return (BigDecimal) new CargoRN().porSql2semcache("select precovenda_prod from  es_estoquegeral "
                    + " where loja_fk=" + loja.getIdLoja() + " and produto_fk=" + p.getIdProd() + "");
     */

 return { code: 200, results: { pre }}  

//  public BigDecimal preco(CdProduto p) {
    
};

const setarproduto = async function({ idLoja, idProd }){ 

    const estoqueGeral = await useDB({ 
        query: `select * from Es_Estoquegeral  where loja_fk=${idLoja} and produto_Fk=${idProd}`
    }); 

    /**
     * pegarEstoqueGeral("select vo from EsEstoquegeral  vo"
                        + " where vo.cfLoja=" + loja.getIdLoja() + ""
                        + " and vo.produtoFk=" + produto.getIdprod() + "");
     */

    const codigoBarra = await useDB({ 
        query:  `select * from Cd_Codigobarras where ativo_Codbar='S' and produto_Fk=${idProd}`
    })

 return { code: 200, results: { estoqueGeral, codigoBarra }}  

//  public void setarproduto() {
    
};

const preencherListaBusca = async function({ idLoja }){ 

    const lista = await useDB({ 
        query: `SELECT id_prod,descricao_prod,descricaoetiqueta_prod ,numero_codbar,precovenda_prod, desconto_prod,estoque,nome_fab FROM public.es_estoquegeral as es inner join cd_produto as p on p.id_prod=es.produto_fk inner join cd_codigobarras as cb on cb.produto_fk=p.id_prod inner join cd_fabricante as f on f.id_fab=p.fabricante_fk where loja_fk=${idLoja} and ativo_codbar='S' order by descricao_prod asc limit 50`
    }); 

 return { code: 200, results: { lista }}  
    
};

module.exports = {
    estoque,
    pesquisarPorColuna,
    pegarCodigoDeBarras,
    desconto,
    preco,
    setarproduto,
    preencherListaBusca
};
