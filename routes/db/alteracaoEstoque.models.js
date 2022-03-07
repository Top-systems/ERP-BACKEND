const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const atualiza = async function({ idProd, idLoja }){ 

    const atualiza1 = await useDB({ 
        query: `SELECT estoque FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
        
    }); 

    /**
     *String hqles = "SELECT vo.estoque FROM EsEstoquegeral vo" + " WHERE vo.produtoFk="
                        + estoque.getProdutoFk().getIdProd() + "" + " AND vo.cfLoja=" + estoque.getCfLoja().getIdLoja()
                        + ""; 
     */

    const atualiza2 = await useDB({ 
        query: `SELECT max(id_altesthist) + 1 as idc FROM public.es_altesthist where loja_fk=${idLoja}` 
    });

    /**
     * String hqlc1 = "SELECT max(id_altesthist) + 1 as idc\n"
                        + "  FROM public.es_altesthist\n"
                        + "  where loja_fk=" + estoque.getCfLoja().getIdLoja() + " ";
     */

 return { code: 200, results: { atualiza1, atualiza2}}  

//  public void atualiza(CellEditEvent event) {
    
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

const salvar = async function({ idProd, idLoja, numeroLote }){ 

    const estoque = await useDB({ 
        query: `SELECT estoque FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    }); 

    /**
     * String hqles = "SELECT vo.estoque FROM EsEstoquegeral vo" + " WHERE vo.produtoFk="
                + estoque.getProdutoFk().getIdProd() + "" + " AND vo.cfLoja=" + estoque.getCfLoja().getIdLoja()
                + "";
     */

    const lote = await useDB({ 
        query:  `SELECT * FROM Cd_Lote  WHERE loja_Fk=${idLoja}and produto_Fk=${idProd} and numero_Lote='${numeroLote}' ORDER BY id_Lote DESC`
    });

    /**
     * String hqlc = "SELECT vo FROM CdLote vo" + " WHERE vo.cdLotePK.lojaFk="
                            + estoque.getCfLoja().getIdLoja() + "" + " and vo.produtoFk=" + l.getProdutoFk().getIdProd()
                            + "" + " and vo.numeroLote='" + l.getNumeroLote() + "'"
                            + " ORDER BY vo.cdLotePK.idLote DESC";
     */

    const lote2 = await useDB({ 
        query:`SELECT * FROM Cd_Lote WHERE loja_Fk=${idLoja} ORDER BY id_Lote DESC`  
    });

    /**
     *   String hqlcd = "SELECT vo FROM CdLote vo" + " WHERE vo.cdLotePK.lojaFk="
                                + estoque.getCfLoja().getIdLoja() + "" + " ORDER BY vo.cdLotePK.idLote DESC";
     */

    const idAltesthist = await useDB({ 
        query:`SELECT max(id_altesthist) + 1 as idc FROM public.es_altesthist where loja_fk=${idLoja}`  
    });

    /**
     * String hqlc1 = "SELECT max(id_altesthist) + 1 as idc\n"
                        + "  FROM public.es_altesthist\n"
                        + "  where loja_fk=" + estoque.getCfLoja().getIdLoja() + " ";

     */


 return { code: 200, results: { estoque, lote, lote2, idAltesthist }}  

//  public void salvar() {
    
};

const listarProdutos = async function({  }){ 


    const lista = await useDB({ 
        query: "select * from Cd_Produto order by descricao_Prod asc"
    }); 

    // listarp = new ProdutoRN().listarQ("select vo from CdProduto vo order by vo.descricaoProd asc", 100);

 return { code: 200, results: { lista }}  
    
//  public void listarProdutos() {

};

const pegarEstoqueLoja = async function({ idLoja, idProd }){ 

    const estoque = await useDB({ 
        query: `SELECT * FROM Es_Estoquegeral  WHERE loja_Fk=${idLoja} AND produto_Fk=${idProd}`
    }); 

    /**
     *String hql = "SELECT vo FROM EsEstoquegeral vo" + " WHERE vo.esEstoquegeralPK.lojaFk="
                    + this.loja.getIdLoja() + "" + " AND vo.produtoFk=" + this.produto.getIdProd() + ""; 
     */

 return { code: 200, results: { estoque}}  
//  public void pegarEstoqueloja() {
    
};

const pegarLotes = async function({ idProd }){ 

    const lote = await useDB({ 
        query: `SELECT * FROM Cd_Lote WHERE produto_Fk=${idProd} and cast(qtde_Lote as double precision)>0.00 ORDER BY loja_Fk ASC`
    }); 

    /**
     * String hql = "SELECT vo FROM CdLote vo" + " WHERE vo.produtoFk=" + this.estoque.getProdutoFk().getIdProd() + ""
                + " and cast(vo.qtdeLote as double)>0.00" + " ORDER BY vo.cdLotePK.lojaFk ASC";
     */

 return { code: 200, results: { lote }} 
 
//  public void pegarLotes() {
   
};

const pegarEstoques = async function({ idProd }){ 

    const estoque = await useDB({ 
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} ORDER BY loja_fk ASC`
    });
    
    /**
     *  String hql = "SELECT vo FROM EsEstoquegeral vo" + " WHERE vo.produtoFk=" + this.produto.getIdProd() + ""
                    + " ORDER BY vo.esEstoquegeralPK.lojaFk ASC";
     */

 return { code: 200, results: { estoque }}  

//  public void pegarEstoques() {
    
};

const setarEstoque2 = async function({ idProd, idLoja }){ 

    const estoque = await useDB({ 
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} and loja_fk=${idLoja}`
    });
    
    /**
     * String hql = "SELECT vo FROM EsEstoquegeral vo" + " WHERE vo.produtoFk=" + this.produto.getIdProd() + ""
                + " and vo.cfLoja=" + loja.getIdLoja() + "";
     */

 return { code: 200, results: { estoque }}  

//  public void setarEstoque2() {

};

const buscarProdutos  = async function({ idLoja }){ 

    const busca = await useDB({ 
        query: `select * from Es_Estoquegeral where loja_fk = ${idLoja}` 
    });
    
    /**
     *  String consulta = "select est from EsEstoquegeral est " + "where est.cfLoja = " + loja1.getIdLoja()
                + " order by est.produtoFk.descricaoProd";
     */

 return { code: 200, results: { busca }}  
  
//  public void buscarProdutos() {
 
};

const selecionarProduto = async function({ idProd, idLoja }){ 

    const seleciona = await useDB({ 
        query: `select * from Es_Estoquegeral where produto_Fk = ${idProd} and loja_fk = ${idLoja}`
    }); 

    /**
     * String consulta = "select est from EsEstoquegeral est " + " where est.produtoFk = "
                + produtoSelecionado.getProdutoFk().getIdProd() + " " + "and est.cfLoja = " + loja1.getIdLoja();
     */

 return { code: 200, results: { seleciona }}  
    
//  public void selecionarProduto() {

};

const selecionarProduto2 = async function({ idProd, idLoja }){ 

    const seleciona = await useDB({ 
        query:  `select * from Es_Estoquegeral where produto_Fk = ${idProd} and loja_fk = ${idLoja}`
    }); 

    /**
     * String consulta = "select est from EsEstoquegeral est " + " where est.produtoFk = " + produto.getIdProd() + " "
                    + "and est.cfLoja = " + loja1.getIdLoja();
     */

 return { code: 200, results: { seleciona }}  

//  public void selecionarProduto2() {
    
};


/**
 * public void confirmarFiltro() {

        boolean ok = true;
        if (listaFiltro.isEmpty()) {
            ok = false;
            Util.abrirAvisos("Inclua um filtro para confirmar!");
        }

        if (ok) {

            StringBuilder consulta = new StringBuilder();
            consulta.append("select vo from EsEstoquegeral vo where (");
            for (Filtro f : listaFiltro) {
                // ////System.out.println(f);
                String comAspas;
                if (f.getCampoNovo().getTipo().equals("string")) {
                    comAspas = "'" + f.getValor() + "'";
                } else {
                    comAspas = f.getValor().replaceAll("\\D", "");
                }

                if (f.getOperador() == null) {
                    consulta.append("vo.").append(f.getCampoNovo().getColuna()).append(" ").append(f.getComparacao())
                            .append(" ").append(comAspas).append(" ");
                } else {
                    consulta.append(f.getOperador()).append(" ").append("vo.").append(f.getCampoNovo().getColuna())
                            .append(" ").append(f.getComparacao()).append(" ").append(comAspas).append(" ");
                }
            }
            CfLoja loja1 = (CfLoja) Util.pegarObjetoDaSessao("loja");
            consulta.append(") and (vo.cfLoja = ").append(loja1.getIdLoja()).append(")");
            System.out.println(consulta.toString());

            listaProd = new EstoqueGeralRN().listarEstoqueGeralHQL(consulta.toString());
            Util.atualizarForm("form");
            Util.executarJavascript("PF('filtraProduto').hide();");

        }
    }
 */

module.exports = {
    atualiza,
    pegarCodigoDeBarras,
    salvar,
    listarProdutos,
    pegarEstoqueLoja,
    pegarLotes,
    pegarEstoques,
    setarEstoque2,
    buscarProdutos,
    selecionarProduto,
    selecionarProduto2
}