const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const listarprodutos = async function({ idLoja, idPromo }){ 

    const lista = await useDB({ 
        query: `select * from Cd_Promocao_Produtos where loja_Fk=${idLoja} and id=${idPromo} order by id desc `
    }); 

    /**
     *String hqlc = "select vo from CdPromocaoProdutos vo"
                + " where vo.cdPromocaoProdutosPK.lojaFk=" + lojalogada.getIdLoja() + ""
                + " and vo.cdPromocao.cdPromocaoPK.id=" + promocao.getCdPromocaoPK().getId() + ""
                + " order by vo.cdPromocaoProdutosPK.id desc "; 
     */

 return { code: 200, results: { lista }}  

//  public void listarprodutos() {
  
};

const Excluir = async function({ idProd, idLoja }){ 

    const excluir = await useDB({ 
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    }); 

    /**
     * String hql = "SELECT vo FROM EsEstoquegeral vo"
                        + " WHERE vo.produtoFk=" + p.getProdutoFk().getIdProd() + ""
                        + " AND vo.cfLoja=" + lojalogada.getIdLoja() + "";
     */

 return { code: 200, results: { excluir }}  

//  public void excluir() {
 
};

const listarPromocoes = async function({ idLoja }){ 

    const lista = await useDB({ 
        query: `select * from Cd_Promocao where loja_fk=${idLoja} order by id desc `
    }); 

    /**
     *  String hql = "select vo from CdPromocao vo"
                + " where vo.cfLoja=" + lojalogada.getIdLoja() + ""
                + " order by vo.cdPromocaoPK.id desc ";
     */

 return { code: 200, results: { lista }}  

//  public void listarpromocoes() {

};

const salvarPromocao = async function({ idLoja, loja_fk, produto_fk, desconto, valor, promocao_fk, idProd }){ 

    const salvar = await useDB({ 
        query: `SELECT max(id)+1 as idc FROM public.cd_promocao where loja_fk=${idLoja}`
    }); 

    /**
     * String hqlc1 = "SELECT max(id)+1 as idc\n"
                + "  FROM public.cd_promocao\n"
                + "  where loja_fk=" + lojalogada.getIdLoja() + " ";
     */

    const salvar1 = await useDB({ 
        query:`SELECT max(id)+1 as idc FROM public.cd_promocao_produtos where loja_fk=${idLoja}`  
    });

    /**
     *  String hqlc1c = "SELECT max(id)+1 as idc\n"
                    + "  FROM public.cd_promocao_produtos\n"
                    + "  where loja_fk=" + lojalogada.getIdLoja() + " ";
     */
    
    const insert = await useDB({ 
        query: `INSERT INTO cd_promocao_produtos(loja_fk, produto_fk, desconto, valor, promocao_fk) VALUES (${id}, ${loja_fk}, ${produto_fk}, ${desconto}, ${valor}, ${promocao_fk})` 
    });

    /**
     * String sqlcc = "INSERT INTO cd_promocao_produtos(\n"
                                    + "            id, loja_fk, produto_fk, desconto, valor, promocao_fk)\n"
                                    + "    VALUES (?, ?, ?, ?, ?, ?);";
     */

    const salvar2 = await useDB({ 
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    /**
     * String hqlx = "SELECT vo FROM EsEstoquegeral vo"
                                        + " WHERE vo.produtoFk=" + pf.getProdutoFk().getIdProd() + ""
                                        + " AND vo.cfLoja=" + lojalogada.getIdLoja() + "";
     */

 return { code: 200, results: { salvar, salvar1, insert, salvar2}}  

//  public void salvarpromocao() throws ParseException {
 
};

const editarPromocao = async function({ idProd, idLoja }){ 

    const editar = await useDB({ 
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    }); 

    /**
     *   String hql = "SELECT vo FROM EsEstoquegeral vo"
                + " WHERE vo.produtoFk=" + p.getProdutoFk().getIdProd() + ""
                + " AND vo.cfLoja=" + lojalogada.getIdLoja() + "";
     */

    const editar2 = await useDB({ 
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    /**
     * String hql = "SELECT vo FROM EsEstoquegeral vo"
                + " WHERE vo.produtoFk=" + p.getProdutoFk().getIdProd() + ""
                + " AND vo.cfLoja=" + lojalogada.getIdLoja() + "";
    */

 return { code: 200, results: { editar, editar2 }}  

//  public void editarpromocao() {

};

const selecionarproduto2 = async function({ idLoja, idProd }){ 

    const seleciona = await useDB({ 
        query: `select cd_promocao_produtos.* from Cd_Promocao_Produtos, cd_promocao where cd_promocao_produtos.loja_Fk=${idLoja} and produto_Fk=${idProd} and cd_Promocao.iniciada='S'`
    }); 

    /**
     *  String hqlcd = "select vo from CdPromocaoProdutos vo"
                + " where vo.cdPromocaoProdutosPK.lojaFk=" + lojalogada.getIdLoja() + ""
                + " and vo.produtoFk=" + produto.getProdutoFk().getIdProd() + ""
                + " and vo.cdPromocao.iniciada='S'";
     */

 return { code: 200, results: { seleciona }}  

//  public void selecionarproduto2() {
   
};

const selecionarproduto = async function({ idLoja, idProd, loja_fk, produto_fk, desconto, valor, promocao_fk }){ 

    let statusInsert = "";

    const seleciona = await useDB({ 
        query: `select cd_promocao_produtos.* from Cd_Promocao_Produtos, cd_promocao where cd_promocao_produtos.loja_Fk=${idLoja} and produto_Fk=${idProd} and cd_Promocao.iniciada='S'`
    }); 

    /**
     * String hqlcd = "select vo from CdPromocaoProdutos vo"
                + " where vo.cdPromocaoProdutosPK.lojaFk=" + lojalogada.getIdLoja() + ""
                + " and vo.produtoFk=" + produto.getProdutoFk().getIdProd() + ""
                + " and vo.cdPromocao.iniciada='S'";
     */

    const seleciona2 = await useDB({ 
        query: `select * from Cd_Promocao_Produtos where loja_Fk=${idLoja} order by id desc `
     });

     /**
      *String hqlc = "select vo from CdPromocaoProdutos vo"
                + " where vo.cdPromocaoProdutosPK.lojaFk=" + lojalogada.getIdLoja() + ""
                + " order by vo.cdPromocaoProdutosPK.id desc "; 
      */
     
    const inserir = await useDB({ 
        query: `INSERT INTO cd_promocao_produtos(loja_fk, produto_fk, desconto, valor, promocao_fk) VALUES ( ${loja_fk}, ${produto_fk}, ${desconto}, ${valor}, ${promocao_fk})` 
    }).then(() => {
        statusInsert = "Registro inserido com sucesso";
    }).catch((err) => {
        statusInsert = err.message;
    })
    /**
     * String sqlcc = "INSERT INTO cd_promocao_produtos(\n"
                + "            id, loja_fk, produto_fk, desconto, valor, promocao_fk)\n"
                + "    VALUES (?, ?, ?, ?, ?, ?);";

     */
    
    const estoque = await useDB({ 
        query:`SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`  
    });

    /**
     *  String hql = "SELECT vo FROM EsEstoquegeral vo"
                        + " WHERE vo.produtoFk=" + pf.getProdutoFk().getIdProd() + ""
                        + " AND vo.cfLoja=" + lojalogada.getIdLoja() + "";
     */

 return { code: 200, results: { seleciona, seleciona2, statusInsert , estoque }}  

//  public void selecionarproduto() {

};

const pegarVenda = async function({ idProd, idLoja }){ 

    const venda = await useDB({ 
        query: `SELECT precovenda_Prod FROM Es_Estoquegeral  WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    }); 

    /**
     *  String hql = "SELECT vo.precovendaProd FROM EsEstoquegeral vo"
                    + " WHERE vo.produtoFk=" + produto.getIdProd() + ""
                    + " AND vo.cfLoja=" + l.getIdLoja() + "";
     */

 return { code: 200, results: { venda }}  

//  public BigDecimal pegarVenda(CdProduto produto) {

};

const excluirProduto = async function({ idProd, idLoja }){ 

    const excluir = await useDB({ 
        query:`SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });
    
    /**
     * String hql = "SELECT vo FROM EsEstoquegeral vo"
                    + " WHERE vo.produtoFk=" + produtosel.getProdutoFk().getIdProd() + ""
                    + " AND vo.cfLoja=" + lojalogada.getIdLoja() + "";
     */

 return { code: 200, results: { excluir }}
 
//  public void excluirproduto() {
 
};

module.exports = {
    listarprodutos,
    Excluir,
    listarPromocoes,
    salvarPromocao,
    editarPromocao,
    selecionarproduto2,
    selecionarproduto,
    pegarVenda,
    excluirProduto
}