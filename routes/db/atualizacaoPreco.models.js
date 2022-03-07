const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const processarp = async function({ codBar, custo_lista, margem_lista, venda_lista, idProd, qtecaixa, idLoja }){ 

    let statusUpdate = "";

    const codigoBarras = await useDB({ 
        query: `select Cd_Codigobarras.id_Codigobarras, cd_produto.id_prod, cd_grupoproduto.descricao_Grpprod, cd_produto.qtdecaixa_Prod from Cd_Codigobarras, cd_produto, cd_grupoproduto  where numero_Codbar='${codBar}' AND cd_codigobarras.produto_fk = cd_produto.id_prod AND cd_produto.grupoprod_fk = cd_grupoproduto.id_grpprod`
    }); 

    /**
     * String hqld = "select vo.idCodigobarras,vo.produtoFk.idProd,"
                        + "vo.produtoFk.grupoprodFk.descricaoGrpprod,vo.produtoFk.qtdecaixaProd from CdCodigobarras vo"
                        + " where vo.numeroCodbar='" + det.getCodigobarras() + "'";
     */

    const update = await useDB({ 
        query:  `UPDATE public.cd_produto SET custo_lista = ${custo_lista}, margem_lista=${margem_lista}, venda_lista=${venda_lista} WHERE id_prod = ${idProd} and qtdecaixa_prod = ${qtecaixa}`
    }).then(() => {
        statusUpdate = "Registro atualizado com sucesso";
    }).catch((err) => {
        statusUpdate = err.message;
    })

    /**
     *  String hx = "UPDATE public.cd_produto\n"
                                    + "   SET  custo_lista=" + det.getPrecocusto12() + ","
                                    + " margem_lista=" + pc + ","
                                    + " venda_lista=" + det.getPrecovenda12() + "\n"
                                    + " WHERE id_prod=" + pv + " "
                                    + " and  qtdecaixa_prod=" + det.getQtdCaixa() + " ;";
     */

    const estoque = await useDB({ 
        query: `select id_Estoquegeral,precocusto_Prod,precovenda_Prod,precoanterior_Prod from Es_Estoquegeral  where produto_Fk=${idProd} and loja_fk=${idLoja}` 
    });

    /**
     * String hqle = "select "
                            + "vo.esEstoquegeralPK.idEstoquegeral,"
                            + "vo.precocustoProd,"
                            + "vo.precovendaProd,"
                            + "vo.precoanteriorProd"
                            + " from EsEstoquegeral vo"
                            + " where vo.produtoFk=" + Integer.valueOf(c[1].toString()) + ""
                            + " and vo.cfLoja=" + loja.getIdLoja() + ""; 
     */

 return { code: 200, results: { codigoBarras, statusUpdate, estoque }}  
//  public void processarp(String pagina, Session sessao, CdAtuaprecocab cab) {
    
};

const pc = async function({ idLoja, codBarra }){ 

    const select = await useDB({ 
        query: `SELECT precocusto_prod\n  FROM public.cd_codigobarras as cb\n  inner join cd_produto as p on p.id_prod=cb.produto_fk\n  inner join es_estoquegeral as e on  e.produto_fk=p.id_prod\n  where  loja_fk=${idLoja}  and numero_codbar='${codBarra}'`
    }); 

    /**
     * BigDecimal pc = (BigDecimal) new CargoRN().porSql2semcache("SELECT precocusto_prod\n"
                + "  FROM public.cd_codigobarras as cb\n"
                + "  inner join cd_produto as p on p.id_prod=cb.produto_fk\n"
                + "  inner join es_estoquegeral as e on  e.produto_fk=p.id_prod\n"
                + "  where  loja_fk=" + d.getAtuaprecocabFk().getLojaFk().getIdLoja() + " "
                + " and numero_codbar='" + d.getCodigobarras().trim() + "'");
     */

 return { code: 200, results: { select }}  

//  public BigDecimal pc(CdAtuaprecodet d) {
    
};


const pv = async function({ idLoja, codBarra }){ 

    const select = await useDB({ 
        query: `SELECT precovenda_prod\n  FROM public.cd_codigobarras as cb\n  inner join cd_produto as p on p.id_prod=cb.produto_fk\n  inner join es_estoquegeral as e on  e.produto_fk=p.id_prod\n  where  loja_fk=${idLoja}  and numero_codbar='${codBarra}'`
    }); 

    /**
     * BigDecimal pv = (BigDecimal) new CargoRN().porSql2semcache("SELECT precovenda_prod\n"
                + "  FROM public.cd_codigobarras as cb\n"
                + "  inner join cd_produto as p on p.id_prod=cb.produto_fk\n"
                + "  inner join es_estoquegeral as e on  e.produto_fk=p.id_prod\n"
                + "  where  loja_fk=" + d.getAtuaprecocabFk().getLojaFk().getIdLoja() + " "
                + "and numero_codbar='" + d.getCodigobarras().trim() + "'");
     */

 return { code: 200, results: { select }} 
 
//  public BigDecimal pv(CdAtuaprecodet d) {
    
};

const run = async function({ precovenda, precocusto, codBarra }){ 

    let statusUpdate = "";

    const update = await useDB({ 
        query: `UPDATE public.cd_atuaprecodet SET precovenda=${precovenda}, precocusto=${precocusto} WHERE codigobarras='${codBarra}'`
    }).then(() => {
        statusUpdate = "Registro atualizado com sucesso";
    }).catch((err)=>{
        statusUpdate = err.message;
    }) 

    /**
     * st.executeUpdate("UPDATE public.cd_atuaprecodet\n"
                            + "   SET  precovenda=" + d.getPv() + ","
                            + " precocusto=" + d.getPc() + "\n"
                            + " WHERE codigobarras='" + d.getCodigobarras().trim() + "'");
     */

 return { code: 200, results: { statusUpdate }}  

//  public void run() {
    
};

const pesquisarPrecosgp = async function({ idCab, grupo }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Atuaprecodet WHERE  atuaprecocab_Fk=${idCab} and grupo in('${grupo}')  and  codprod is not null ORDER BY descricao asc, grupo asc `
    }); 

    /**
     * String hql = "SELECT vo FROM CdAtuaprecodet vo"
                    + " WHERE  vo.atuaprecocabFk.id=" + idcab + ""
                    + " and vo.grupo in(" + gg + ") "
                    + " and  vo.codprod is not null ORDER BY vo.descricao asc,vo.grupo asc ";
     */

 return { code: 200, results: { pesquisa }}  

//  public void pesquisarPrecosgp() {
    
};

const pesquisarPrecos = async function({ colunaBusca, textoBusca, idCab }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Atuaprecodet WHERE UPPER(CAST(${colunaBusca} as text))  LIKE '${textoBusca.toUpperCase()}%'  and  atuaprecocab_Fk=${idCab}ORDER BY ${colunaBusca} ASC`
    }); 

    /**
     *  String hql = "SELECT vo FROM CdAtuaprecodet vo"
                    + " WHERE UPPER(CAST(vo." + this.colunad + " as text)) "
                    + " LIKE '" + this.valord.toUpperCase() + "%' "
                    + " and  vo.atuaprecocabFk.id=" + idcab + ""
                    + "ORDER BY vo." + this.colunad + " ASC";
     */

 return { code: 200, results: { pesquisa }}  

//  public void pesquisarPrecos() {
    
};

const limparPesquisa = async function({ idCab }){ 

    const limpar = await useDB({ 
        query: `SELECT * FROM Cd_Atuaprecodet WHERE atuaprecocab_Fk=${idCab}`
    }); 

    /**
     * String hql = "SELECT vo FROM CdAtuaprecodet vo"
                + " WHERE  vo.atuaprecocabFk.id=" + idcab + ""
                + " ";
     */

 return { code: 200, results: { limpar }}  

//  public void limparPesquisa() {
    
};

const excluirLista = async function({ idCab, id, idLoja }){
    
    let statusDelete1 = "", statusDelete2 = "";

    const excluir = await useDB({ 
        query: `delete from cd_atuaprecodet where atuaprecocab_fk=${idCab}`
    }).then(()=>{
        statusDelete1 = "Registro deletado com sucesso";
    }).catch((err)=>{
        statusDelete2 = err.message;
    }) 
    
    /**
     * String hql = "delete from cd_atuaprecodet "
                    + " where atuaprecocab_fk=" + cab.getId() + ""
                    + " ";
     */

    const excluir2 = await useDB({ 
        query: `delete from cd_atuaprecocab where id=${id} and loja_fk=${idLoja}` 
    }).then(() => {
        statusDelete2 = "Registo apagado com sucesso";
    }).catch((err)=>{
        statusDelete2 = err.message;
    })

    /**
     *  String hql2 = "delete from cd_atuaprecocab "
                    + " where id=" + cab.getId() + " and loja_fk=" + l.getIdLoja() + " ";
     */

 return { code: 200, results: { statusDelete1, statusDelete2 }}  

//  public void excluirlista(CdAtuaprecocab cab) {

};

const atualizaqtd = async function({ qtdecaixa_prod, usuarioaltera, dataaltera, idProd }){ 

    let statusUpdate = "";

    const update = await useDB({ 
        query: `UPDATE cd_produto SET 
        qtdecaixa_prod=${qtdecaixa_prod},
        usuarioaltera=${usuarioaltera},
        dataaltera='${dataaltera}'
        WHERE id_prod=${idProd}`
    }).then(() => {
        statusUpdate = "Registrado atualizado com sucesso";
    }).catch((err) => {
        statusUpdate = err.message;
    })

    /**
     *  sql = "UPDATE cd_produto\n"
                + "SET qtdecaixa_prod=?,"
                + "usuarioaltera=?, \n"
                + "dataaltera=?\n"
                + " WHERE  "
                + " id_prod=?";
     */

 return { code: 200, results: { statusUpdate }}  

//  private void atualizaqtd(Session sessao, CdAtuaprecodet d, CfLoja lojalogada, CdUsuario u) {
    
};

const atualizaEstoque = async function({ idProd, principioAtivo, descricao_princat, principioativo_fk, codBarra, precocusto_prod, margem_prod, precovenda_prod, precoanterior_prod, usuarioaltera, dataaltera, precocustocaixa_prod, precovendacaixa_prod, produto_fk, id_estoquegeral, loja_fk, custo_lista, margem_lista, venda_lista, qtdecaixa_prod}){ 

    let statusInsert = "", statusUpdate = "", statusUpdate2 = "", statusUpdate3 = "", statusUpdate4 = "";

    const PrincipioAtivo = await useDB({ 
        query: `select principioativo_fk from cd_produto where id_prod=${idProd}`
    }); 

    /**
     * Integer idp = (Integer) sessao.createSQLQuery("select principioativo_fk from cd_produto where id_prod=" + d.getCodprod() + " ")
                        .setMaxResults(1)
                        .uniqueResult();
     */

    const idPrincat = await useDB({ 
        query: `select id_princat from cd_principioativo where upper(descricao_princat) like '%${principioAtivo.toUpperCase()}%'` 
    });

    /**
     * Integer idpp = (Integer) sessao.createSQLQuery("select id_princat from cd_principioativo"
                            + " where upper(descricao_princat) like '%" + d.getPrincipioAtivo().toUpperCase() + "%'")
                            .setMaxResults(1)
                            .uniqueResult();
     */
     
    const insertPrincipioAtivo = await useDB({ 
        query: `INSERT INTO public.cd_principioativo(descricao_princat)	VALUES ('${descricao_princat}')` 
    }).then(()=>{
        statusInsert = "Registro inserido com sucesso";
    }).catch((err)=>{
        statusInsert = err.message;
    });

    /**
     * sessao.createSQLQuery("INSERT INTO public.cd_principioativo(descricao_princat)\n"
                                + "	VALUES ('" + d.getPrincipioAtivo().toUpperCase() + "')").executeUpdate();
     */

    const atualizaPrincipioAtivoFK = await useDB({ 
        query: `update cd_produto set principioativo_fk=${principioativo_fk}  where id_prod=${idProd}` 
    }).then(() => {
        statusUpdate = "Registro atualizado com sucesso";
    }).catch((err) => {
        statusUpdate = err.message;
    })

    /**
     * if (idpp != null) {
                        sessao.createSQLQuery("update cd_produto set principioativo_fk=" + idpp + "  where id_prod=" + d.getCodprod() + " ").executeUpdate();
                    }
     */

    const selecionaCodigodeBarra = await useDB({ 
        query: `SELECT id_codigobarras\n  FROM public.cd_codigobarras\n  where  ativo_codbar='S' and produto_fk=${idProd} and numero_codbar='${codBarra}'` 
    });

    /**
     *Integer okk = (Integer) sessao.createSQLQuery("SELECT id_codigobarras\n"
                    + "  FROM public.cd_codigobarras\n"
                    + "  where  ativo_codbar='S' and produto_fk=" + d.getCodprod() + ""
                    + " and numero_codbar='" + d.getCodigobarras().trim() + "'").setMaxResults(1).uniqueResult();
 
     */

    const updateEstoque1 = await useDB({ 
        query: `UPDATE es_estoquegeral
        SET precocusto_prod=${precocusto_prod},
         margem_prod=${margem_prod},
        precovenda_prod=${precovenda_prod}, 
        precoanterior_prod=${precoanterior_prod},
        usuarioaltera=${usuarioaltera}, 
        dataaltera='${dataaltera}',
        precocustocaixa_prod=${precocustocaixa_prod},
        precovendacaixa_prod=${precovendacaixa_prod}
         WHERE produto_fk=${produto_fk}` 
    }).then(() =>{
        statusUpdate2 = "Registrado atualizado com sucesso";
    }).catch((err) =>{
        statusUpdate2 = err.message;
    });

    /**
     * sql = "UPDATE es_estoquegeral\n"
                            + "SET precocusto_prod=?,"
                            + " margem_prod=?,"
                            + "precovenda_prod=?, "
                            + "precoanterior_prod=?,"
                            + "usuarioaltera=?, \n"
                            + "dataaltera=?,precocustocaixa_prod=?,precovendacaixa_prod=?\n"
                            + " WHERE  "
                            + " produto_fk=?";
     */

    const updateEstoque2 = await useDB({ 
        query: `UPDATE es_estoquegeral
        SET precocusto_prod=${precocusto_prod},
         margem_prod=${margem_prod},
        precovenda_prod=${precovenda_prod}, 
        precoanterior_prod=${precoanterior_prod},
        usuarioaltera=${usuarioaltera}, 
        dataaltera='${dataaltera}',
        precocustocaixa_prod=${precocustocaixa_prod},
        precovendacaixa_prod=${precovendacaixa_prod}
         WHERE id_estoquegeral=${id_estoquegeral} and loja_fk=${loja_fk}`  
    }).then(()=> {
        statusUpdate3 = "Registro atualizado com sucesso";
    }).catch((err)=> {
        statusUpdate3 = err.message;
    });

    /**
     * sql = "UPDATE es_estoquegeral\n"
                            + "SET precocusto_prod=?,"
                            + " margem_prod=?,"
                            + "precovenda_prod=?, "
                            + "precoanterior_prod=?,"
                            + "usuarioaltera=?, \n"
                            + "dataaltera=?,precocustocaixa_prod=?,precovendacaixa_prod=?\n"
                            + " WHERE id_estoquegeral=? and "
                            + " loja_fk=?";
     */

    const updateProduto1 = await useDB({ 
        query: `UPDATE public.cd_produto
          SET  custo_lista=${custo_lista},
        margem_lista=${margem_lista} ,
        venda_lista=${venda_lista}
        WHERE id_prod=${idProd} 
        and  qtdecaixa_prod=${qtdecaixa_prod}`
    }).then(() => {
        statusUpdate4 = "Registro atualizado com sucesso"
    }).catch((err) => {
        statusUpdate4 = err.message;
    });

    /**
     *  String h = "UPDATE public.cd_produto\n"
                                + "   SET  custo_lista=" + pc + ","
                                + " margem_lista=" + d.getMargem12() + ","
                                + " venda_lista=" + pv + "\n"
                                + " WHERE id_prod=" + d.getCodprod() + " "
                                + " and  qtdecaixa_prod=" + d.getQtdCaixa() + " ;"
     */



 return { code: 200, results: { PrincipioAtivo, idPrincat, statusInsert, atualizaPrincipioAtivoFK:{statusUpdate}, selecionaCodigodeBarra, statusUpdate2, statusUpdate3, statusUpdate4}}  

//  private void atualizaestoque(Session sessao, CdAtuaprecodet d, CfLoja lojalogada, CdUsuario u) {
    
};

const carregar = async function({ codigoBarras, idProd, custo_lista, margem_lista, venda_lista, qtdecaixa_prod, idLoja }){ 

    let statusUpdate = "";

    const produtos = await useDB({ 
        query: "select count(id_Prod) from Cd_Produto"
    });
    
    /**
     * produtoscadastro = (long) sessao.createQuery("select count(vo.idProd) from CdProduto vo").setMaxResults(1).uniqueResult();
     */

    const codigoBarra = await useDB({ 
        query:  `select Cd_Codigobarras.id_Codigobarras, cd_codigobarras.produto_Fk, cd_grupoproduto.descricao_Grpprod, cd_produto.qtdecaixa_Prod from Cd_Codigobarras, cd_grupoproduto, cd_produto where  numero_Codbar='${codigoBarras}' AND cd_produto.id_prod = cd_codigobarras.produto_fk AND cd_produto.grupoprod_fk = cd_grupoproduto.id_grpprod`
    });

    /**
     *  String hqld = "select vo.idCodigobarras,vo.produtoFk.idProd,"
                        + "vo.produtoFk.grupoprodFk.descricaoGrpprod,vo.produtoFk.qtdecaixaProd from CdCodigobarras vo"
                        + " where vo.numeroCodbar='" + d.getCodigobarras() + "'";
     */

    const atualizaProduto = await useDB({ 
        query:  `UPDATE public.cd_produto
        SET  custo_lista=${custo_lista},
      margem_lista=${margem_lista} ,
      venda_lista=${venda_lista}
      WHERE id_prod=${idProd} 
      and  qtdecaixa_prod=${qtdecaixa_prod}`
    }).then(() =>{
        statusUpdate = "Registro atualizado com sucesso";
    }).catch((err) =>{
        statusUpdate = err.message;
    })

    /**
     * String h = "UPDATE public.cd_produto\n"
                                    + "   SET  custo_lista=" + d.getPrecocusto12() + ","
                                    + " margem_lista=" + pc + ","
                                    + " venda_lista=" + d.getPrecovenda12() + "\n"
                                    + " WHERE id_prod=" + pv + " "
                                    + " and  qtdecaixa_prod=" + d.getQtdCaixa() + " ;";
     */

    const estoque = await useDB({ 
        query:`select id_Estoquegeral,precocusto_Prod,precovenda_Prod,precoanterior_Prod from Es_Estoquegeral where produto_Fk=${idProd} and loja_fk=${idLoja}`  
    });
    
    /*
    String hqle = "select "
    + "vo.esEstoquegeralPK.idEstoquegeral,"
    + "vo.precocustoProd,"
    + "vo.precovendaProd,"
    + "vo.precoanteriorProd"
    + " from EsEstoquegeral vo"
    + " where vo.produtoFk=" + Integer.valueOf(c[1].toString()) + ""
    + " and vo.cfLoja=" + lojalogada.getIdLoja() + "";
    */

 return { code: 200, results: { produtos, codigoBarra, statusUpdate, estoque }}  

//  public void carregar(CdAtuaprecocab cab) {
    
};

const setarAtualizacao = async function({ idPrecoCab }){ 

    const grupoProduto = await useDB({ 
        query: "select * from Cd_Grupoproduto order by descricao_Grpprod asc"
    }); 
    /**
     * gp = new GrupoProdutoRN().listarGrupoProdutoHQL("select vo from CdGrupoproduto vo"
                + " order by descricaoGrpprod asc");
     */

    const atuaPrecoDet = await useDB({ 
        query:  `select * from Cd_Atuaprecodet where atuaprecocab_Fk=${idPrecoCab}`
    });

    /**
     * String hql = "select vo from CdAtuaprecodet vo"
                    + " where vo.atuaprecocabFk=" + cabecalho.getId() + " ";
     */

    const produtos = await useDB({ 
        query: "select count(id_Prod)  from Cd_Produto"
    });

    // produtoscadastro = (long) sessao.createQuery("select count(vo.idProd) from CdProduto vo").setMaxResults(1).uniqueResult();



 return { code: 200, results: { grupoProduto, atuaPrecoDet, produtos }}  

//  public void setarAtualizacao() {

};

const listarAtualizacoes = async function({ idLoja }){ 

    const atuaPrecoCab = await useDB({ 
        query: `select * from Cd_Atuaprecocab where loja_Fk=${idLoja} order by id desc`
    }); 

    /**
     * String hql = "select vo from CdAtuaprecocab vo "
                + "where vo.lojaFk=" + lojalogada.getIdLoja() + ""
                + "order by vo.id desc";
     */

 return { code: 200, results: { atuaPrecoCab }}  

//  public void listarAtualizacoes() {
    
};

const listarFabricantes = async function({  }){ 

    const lista = await useDB({ 
        query: "select * from Cd_Fabricante order by nome_Fab asc"
    }); 

    /**
     * String hql = "select vo from CdFabricante vo order by vo.nomeFab asc";
        fabricantes = new FabricanteRN().listarFabricanteHQL(hql);
     */

 return { code: 200, results: { lista }}

//  public void listarFabricantes() {
    
};

const listarLojas = async function({  }){ 

    const lista = await useDB({ 
        query: "select * from Cf_Loja order by nome_Loja asc" 
    }); 

    /**
     *  String hql = "select vo from CfLoja vo order by vo.nomeLoja asc";
     */

 return { code: 200, results: { lista }}

//  public void listarLojas() {
};

const listarGrupos = async function({  }){ 

    const lista = await useDB({ 
        query: "select * from Cd_Grupoproduto order by descricao_Grpprod asc"
    }); 

 return { code: 200, results: { lista }}  
    
};

const pesquisarPorColunaproduto = async function({ codBarra, colunaBusca, textoBusca }){ 

    const pesquisa1 = await useDB({ 
        query:`SELECT * FROM Cd_Codigobarras WHERE numero_Codbar LIKE '%${codBarra}%' AND ativo_Codbar='S'` 
    }); 

    /**
     *  String hqlc = "SELECT vo FROM CdCodigobarras vo"
                        + " WHERE vo.numeroCodbar LIKE '%" + codigo + "%'"
                        + " AND vo.ativoCodbar='S'";
     */

    const pesquisa2 = await useDB({ 
        query: `SELECT * FROM Cd_Produto  WHERE UPPER(CAST(${colunaBusca} as text))  like '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%'  ORDER BY ${colunaBusca} ASC` 
    });

    /**
     *String hql = "SELECT vo FROM CdProduto vo"
                    + " WHERE UPPER(CAST(vo." + this.colunaBuscaproduto + " as text)) "
                    + " like '%" + Util.removeAspa(this.textoBuscaproduto.toUpperCase()) + "%' "
                    + " ORDER BY vo." + this.colunaBuscaproduto + " ASC"; 
     */

 return { code: 200, results: { pesquisa1, pesquisa2 }}  

//  public void pesquisarPorColunaproduto() {

};

const listarProdutos = async function({ colunaBusca }){ 

    const lista = await useDB({ 
        query: `SELECT * FROM Cd_Produto ORDER BY ${colunaBusca} ASC`
    }); 

    /**
     *String hql = "SELECT vo FROM CdProduto vo"
                + " ORDER BY vo." + this.colunaBuscaproduto + " ASC"; 
     */

 return { code: 200, results: { lista }}  

//  public void listarprodutos() {
    
};

const pegarCodigoDeBarras = async function({ idProd }){ 

    const codBarra = await useDB({ 
        query: `SELECT numero_codbar FROM public.cd_codigobarras where ativo_codbar='S' and produto_fk=${idProd}`
    }); 

    /*
    String hql = "SELECT numero_codbar\n"
                + "  FROM public.cd_codigobarras\n"
                + "  where ativo_codbar='S' and produto_fk=" + produto.getIdProd() + " ";
    */
    
 return { code: 200, results: { codBarra }}  

//  public String pegarCodigoDeBarras(CdProduto produto) {
    
};

const setarProdutocodigobarra = async function({ codBarra, idProd, idLoja }){ 

    const codigoBarras = await useDB({ 
        query: `select * from Cd_Codigobarras where numero_Codbar='${codBarra}'` 
    }); 

    /**
     *  String hqlq = "select vo from CdCodigobarras vo"
                + " where vo.numeroCodbar='" + codbarra + "'";
     */

    const codigoBarras2 = await useDB({ 
        query: `select * from Cd_Codigobarras where produto_Fk=${idProd}` 
    });

    /**
     * String hql = "select vo from CdCodigobarras vo"
                        + " where vo.produtoFk=" + produto.getIdProd() + " ";
     */

    const estoque = await useDB({ 
        query: `select * from Es_Estoquegeral where produto_Fk=${idProd} and loja_fk=${idLoja}` 
    });

    /**
     *EsEstoquegeral es = ern.pegarEstoqueGeral("select vo from EsEstoquegeral vo"
                        + " where vo.produtoFk=" + cb.getProdutoFk().getIdProd() + ""
                        + " and vo.cfLoja=" + lojalogada.getIdLoja()); 
     */

 return { code: 200, results: { codigoBarras, codigoBarras2, estoque }}  

//  public void setarProdutocodigobarra() {
    
};

const histpv = async function({ idLoja, id, loja_fk, produto_fk, precovenda, precocusto, dataaltera, usuarioaltera, }){ 

    let statusInsert = "";

    const select = await useDB({ 
        query: `select max(id)+1 as idc from es_althist_preco where loja_fk=${idLoja}`
    }); 

    /**
     * SimpleDateFormat sdh = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Integer id = (Integer) sessao.createSQLQuery("select max(id)+1 as idc from es_althist_preco "
                        + " where loja_fk=" + l.getIdLoja() + " ")
                        .setMaxResults(1).uniqueResult();
     */

    const insert = await useDB({ 
        query: `INSERT INTO public.es_althist_preco(
           id, 
           loja_fk, 
           produto_fk, 
           precovenda, 
           precocusto, 
           dataaltera, 
           usuarioaltera,
           origem)
           VALUES ( 
            ${id},  
            ${loja_fk},
            ${produto_fk}, 
            ${precovenda},
            ${precocusto},
            '${dataaltera}', 
            ${usuarioaltera},
            'atualizacao de preco')`
    }).then(() => {
        statusInsert = "Registro inserido com sucesso"
    }).catch((err) => {
        statusInsert = err.message;
    })

 return { code: 200, results: { select, statusInsert}}  
    
};

module.exports = {
    processarp,
    pc,
    pv,
    run,
    pesquisarPrecosgp,
    pesquisarPrecos,
    limparPesquisa,
    excluirLista,
    atualizaqtd,
    atualizaEstoque,
    carregar,
    setarAtualizacao,
    listarAtualizacoes,
    listarFabricantes,
    listarLojas,
    listarGrupos,
    pesquisarPorColunaproduto,
    listarProdutos,
    pegarCodigoDeBarras,
    setarProdutocodigobarra,
    histpv
}