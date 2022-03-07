const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

/*
public void init() {
    hoje = Calendar.getInstance().getTime();
    pos = 0;
    avisosv = 0;
    avisos = "";
    this.permissao = Util.verificaPermissaoDaPagina("alteracao estoque");

    h1 = 0;
    hv1 = 0;
    est = new Estoque();
    this.comparacoes = new ArrayList<>();
    this.filtrosAdicionados = new ArrayList<>();
    this.campos = new HashMap<>();
    this.campos.put("Codigo", "produtoFk.idProd");
    this.campos.put("Descricao", "produtoFk.descricaoProd");
    this.campos.put("Classe", "produtoFk.classeterapeuticaProd");
    this.campos.put("Unidade", "produtoFk.unidadeFk.siglaUnid");
    this.campos.put("Fracionado", "produtoFk.unidadeFk.fracUnid");
    this.campos.put("Estoque", "estoque");
    this.campos.put("Estoque Min", "estoquemin");
    this.campos.put("Estoque Max", "estoquemax");
    this.campos.put("Fabricante", "produtoFk.fabricanteFk.nomeFab");
    this.campos.put("Grupo", "produtoFk.grupoprodFk.descricaoGrpprod");
    loja = (CfLoja) Util.pegarObjetoDaSessao("loja");

    if (loja.getSegmentoFk().getIdSegmento() == 3 || loja.getSegmentoFk().getIdSegmento() == 4) {
        String lmci = "SELECT count(id_prod) FROM public.cd_produto as p\n"
                + "  where ((select sum(qtde_lote) from cd_lote where produto_fk=p.id_prod)!=(select sum(estoque) from es_estoquegeral as e\n"
                + "  where e.produto_fk=p.id_prod and e.loja_fk=" + loja.getIdLoja() + " )) "
                + "  and  classeterapeutica_prod!='0'"
                + " ";
        Object coui = new CargoRN().porSql2semcache(lmci);
        h1 = Integer.valueOf(coui.toString());

        String lmciv = "SELECT count(id_lote)\n"
                + "  FROM public.cd_lote\n"
                + "  where qtde_lote>0 and  validade_lote<cast(now() as date)\n"
                + "  and produto_fk in (select id_prod from cd_produto where classeterapeutica_prod in ('1','2'))\n"
                + "  and loja_fk=" + loja.getIdLoja() + "\n"
                + "  ";
        Object couiv = new CargoRN().porSql2semcache(lmciv);
        hv1 = Integer.valueOf(couiv.toString());

    }

    listar();
}
*/

const iniciarLote = async function({ idProd }){ 

    const pegarProduto = await useDB({ 
        query: `select * from Cd_Produto where id_Prod=${idProd}`
    }); 

 return { code: 200, results: { pegarProduto }}  

//  public void iniciarLote() {
//     lote = new CdLote();
//     lote.setCdLotePK(new CdLotePK());
//     CdProduto p = new ProdutoRN().pegarProduto("select vo from CdProduto vo where vo.idProd=" + est.getIdprod() + "");
//     lote.setProdutoFk(p);
//     lote.setCfLoja(loja);
//     lote.getCdLotePK().setLojaFk(loja.getIdLoja());
// }
    
};

const salvar = async function({ idProd, idLoja, numLote }){ 

    const estoqueGeral = await useDB({ 
        query:  `select * from Es_Estoquegeral where produto_Fk=${idProd}and loja_fk=${idLoja}`
    }); 

    // EsEstoquegeral e = (EsEstoquegeral) sessao.createQuery("select vo from EsEstoquegeral vo"
    // + " where vo.produtoFk=" + est.getIdprod() + ""
    // + " and vo.cfLoja=" + loja.getIdLoja() + "").
    // setCacheable(true).setMaxResults(1).uniqueResult();

    const produto = await useDB({ 
        query: `select * from Cd_Produto where id_Prod=${idProd}`
    });

    // CdProduto p = (CdProduto) sessao.createQuery("select vo from CdProduto vo where " 
    // + "vo.idProd=" + est.getIdprod() + "").setMaxResults(1).uniqueResult();

    const estoqueGeral2 = await useDB({ 
        query: `select * from Es_Estoquegeral where loja_fk=${idLoja} order by id_Estoquegeral desc`
    });

    // String hql = "select vo from EsEstoquegeral vo" + ""
    // + " where vo.cfLoja=" + loja.getIdLoja()
    // + "" + " order by vo.esEstoquegeralPK.idEstoquegeral  desc";

    const maxAltesthist = await useDB({ 
        query: `SELECT max(id_altesthist) + 1 as idc FROM public.es_altesthist where loja_fk=${idLoja}`
    });

    // String hqlc1 = "SELECT max(id_altesthist) + 1 as idc\n"
    //         + "  FROM public.es_altesthist\n"
    //         + "  where loja_fk=" + loja.getIdLoja() + " ";

    const verificaLote = await useDB({ 
        query: `SELECT * FROM Cd_Lote WHERE loja_Fk=${idLoja}and produto_Fk=${idProd}and numero_Lote='${numLote}' ORDER BY id_Lote DESC`
    });

    // String hqlc = "SELECT vo FROM CdLote vo" + " WHERE vo.cdLotePK.lojaFk="
    //     + loja.getIdLoja() + ""
    //     + " and vo.produtoFk=" + est.getIdprod()
    //     + "" + " and vo.numeroLote='" + l.getNumeroLote() + "'"
    //     + " ORDER BY vo.cdLotePK.idLote DESC";

    const lote = await useDB({ 
        query:  `SELECT * FROM Cd_Lote WHERE loja_Fk=${idLoja} ORDER BY id_Lote DESC`
    })

    // String hqlcd = "SELECT vo FROM CdLote vo" + " WHERE vo.cdLotePK.lojaFk="
    // + loja.getIdLoja() + "" + " ORDER BY vo.cdLotePK.idLote DESC";


 return { code: 200, results: { estoqueGeral, produto, estoqueGeral2, maxAltesthist, verificaLote, lote }}  

//  public void salvar() {
    
};

const pegarLotes = async function({ idProd, idLoja }){ 

    const lote = await useDB({ 
    query: `SELECT * FROM Cd_Lote WHERE produto_Fk=${idProd} and loja_fk=${idLoja} ORDER BY id_Lote ASC`
 }); 

//  String hql = "SELECT vo FROM CdLote vo" + " WHERE vo.produtoFk=" + est.getIdprod() + ""
//  // + " and cast(vo.qtdeLote as double)>0.00" + " "
//  + " and vo.cfLoja=" + loja.getIdLoja() + " ORDER BY vo.cdLotePK.idLote ASC";

 return { code: 200, results: { lote }}  

//  public void pegarLotes() {
};

const listarli = async function({ idLoja, idProd }){ 

    const lmci = await useDB({ 
        query: `SELECT id_prod,descricao_prod, (select sum(qtde_lote) from cd_lote where produto_fk=p.id_prod) as lote, (select sum(estoque) from es_estoquegeral as e where e.produto_fk=p.id_prod and e.loja_fk=${idLoja}) as estoque FROM public.cd_produto as p  where ((select sum(qtde_lote) from cd_lote where produto_fk=p.id_prod)!=(select sum(estoque) from es_estoquegeral as e where e.produto_fk=p.id_prod and e.loja_fk=${idLoja} )) and classeterapeutica_prod!='0' order by descricao_prod asc`
    }); 

    /*
    String lmci = "SELECT id_prod,descricao_prod,"
    + "(select sum(qtde_lote) from cd_lote where produto_fk=p.id_prod) as lote,\n"
    + "(select sum(estoque) from es_estoquegeral as e\n"
    + "where e.produto_fk=p.id_prod and e.loja_fk=" + loja.getIdLoja() + ") as estoque\n"
    + "  FROM public.cd_produto as p\n"
    + "  where ((select sum(qtde_lote) from cd_lote where produto_fk=p.id_prod)!=(select sum(estoque) from es_estoquegeral as e\n"
    + "  where e.produto_fk=p.id_prod and e.loja_fk=" + loja.getIdLoja() + " )) "
    + "  and  classeterapeutica_prod!='0'"
    + " order by descricao_prod asc";
    */

    
    const estoque = await useDB({ 
        query: `select 
                    vo.estoque,vo.estoquemin,vo.estoquemax,
                    vo.id_Estoquegeral,
                    cd_produto.id_Prod,
                    cd_produto.descricao_Prod,
                    cd_produto.classeterapeutica_Prod,
                    cd_unidade.sigla_Unid,
                    cd_unidade.frac_Unid,
                    cd_fabricante.nome_Fab,
                    cd_grupoproduto.descricao_Grpprod,
                    cd_produto.registroms_Prod
                from 
                    Es_Estoquegeral vo,
                    cd_produto, 
                    cd_grupoproduto, 
                    cd_fabricante, 
                    cd_unidade
                where 
                    cd_produto.unidade_fk = cd_unidade.id_unid 
                and 
                    cd_Produto.fabricante_fk = cd_fabricante.id_fab
                and
                    cd_produto.grupoprod_fk = cd_grupoproduto.id_grpprod
                and
                    cd_produto.id_prod = vo.produto_fk
                and
                    vo.loja_fk=${idLoja}
                order by cd_produto.id_Prod  asc`
    });

    /*
    String hh = "";
    if (!h.isEmpty()) {
        hh = " and vo.produtoFk.idProd in (" + h + ") ";
    }

    String hql = "select vo.estoque,vo.estoquemin,vo.estoquemax,"
                    + " vo.esEstoquegeralPK.idEstoquegeral,"
                    + " vo.produtoFk.idProd,"
                    + " vo.produtoFk.descricaoProd,"
                    + "  vo.produtoFk.classeterapeuticaProd,"
                    + " vo.produtoFk.unidadeFk.siglaUnid,"
                    + " vo.produtoFk.unidadeFk.fracUnid,"
                    + "vo.produtoFk.fabricanteFk.nomeFab,"
                    + "vo.produtoFk.grupoprodFk.descricaoGrpprod,"
                    + "vo.produtoFk.registromsProd"
                    + "  from EsEstoquegeral vo"
                    + " where vo.cfLoja=" + loja.getIdLoja() + ""
                    + " " + hh + " "
                    + " order by vo.produtoFk.descricaoProd  asc";
    */
 

    const lo = await useDB({ 
        query: `SELECT sum(qtde_lote) FROM public.cd_lote as l inner join cd_produto as p on p.id_prod=l.produto_fk where loja_fk=${idLoja}and produto_fk=${idProd}and classeterapeutica_prod!='0'`
    });

    

    /*
    String lo = "SELECT sum(qtde_lote)\n"
            + "  FROM public.cd_lote as l\n"
            + "  inner join cd_produto as p on p.id_prod=l.produto_fk\n"
            + "  where loja_fk=" + loja.getIdLoja() + "\n"
            + "  and produto_fk=" + e.getIdprod() + "\n"
            + "  and classeterapeutica_prod!='0'";
    */

 return { code: 200, results: { lmci, estoque, lo }}  

//  public void listarli() {

};

const filtrar = async function({ idLoja, idProd }){ 

    
    const estoque = await useDB({ 
        query: `select 
                    vo.estoque,vo.estoquemin,vo.estoquemax,
                    vo.id_Estoquegeral,
                    cd_produto.id_Prod,
                    cd_produto.descricao_Prod,
                    cd_produto.classeterapeutica_Prod,
                    cd_unidade.sigla_Unid,
                    cd_unidade.frac_Unid,
                    cd_fabricante.nome_Fab,
                    cd_grupoproduto.descricao_Grpprod,
                    cd_produto.registroms_Prod
                from 
                    Es_Estoquegeral vo,
                    cd_produto, 
                    cd_grupoproduto, 
                    cd_fabricante, 
                    cd_unidade
                where 
                    cd_produto.unidade_fk = cd_unidade.id_unid 
                and 
                    cd_Produto.fabricante_fk = cd_fabricante.id_fab
                and
                    cd_produto.grupoprod_fk = cd_grupoproduto.id_grpprod
                and
                    cd_produto.id_prod = vo.produto_fk
                and
                    vo.loja_fk=${idLoja}
                order by cd_produto.id_Prod  asc`
    }); 
    
    /*
    String hh = "";
    if (!hv.isEmpty()) {
         hh = " and vo.produtoFk.idProd in (" + hv + ") ";
    }

    String hql = "select vo.estoque,vo.estoquemin,vo.estoquemax,"
            + " vo.esEstoquegeralPK.idEstoquegeral,"
            + " vo.produtoFk.idProd,"
            + " vo.produtoFk.descricaoProd,"
            + "  vo.produtoFk.classeterapeuticaProd,"
            + " vo.produtoFk.unidadeFk.siglaUnid,"
            + " vo.produtoFk.unidadeFk.fracUnid,"
            + "vo.produtoFk.fabricanteFk.nomeFab,"
            + "vo.produtoFk.grupoprodFk.descricaoGrpprod,"
            + "vo.produtoFk.registromsProd"
            + "  from EsEstoquegeral vo"
            + " where vo.cfLoja=" + loja.getIdLoja() + ""
            + " " + hh + " "
            + " order by vo.produtoFk.idProd  asc";
    */

    const lo = await useDB({ 
        query: `SELECT sum(qtde_lote) FROM public.cd_lote as l inner join cd_produto as p on p.id_prod=l.produto_fk where loja_fk=${idLoja}and produto_fk=${idProd}and classeterapeutica_prod!='0'`
    
    })

    /*
    String lo = "SELECT sum(qtde_lote)\n"
            + "  FROM public.cd_lote as l\n"
            + "  inner join cd_produto as p on p.id_prod=l.produto_fk\n"
            + "  where loja_fk=" + loja.getIdLoja() + "\n"
            + "  and produto_fk=" + e.getIdprod() + "\n"
            + "  and classeterapeutica_prod!='0'";
    */

 return { code: 200, results: { estoque, lo }}  

 //public void filtrar(List<Integer> ids) {
    
};

const listarliv = async function({ idProd, idLoja }){ 

    const lmciv = await useDB({ 
        query: `SELECT distinct(produto_fk) FROM public.cd_lote where qtde_lote>0 and  validade_lote<cast(now() as date) and produto_fk in (select id_prod from cd_produto where classeterapeutica_prod in ('1','2')) and loja_fk=${idLoja}order by produto_fk asc`
    }); 

    /*
      String lmciv = "SELECT distinct(produto_fk)\n"
               + "  FROM public.cd_lote\n"
               + "  where qtde_lote>0 and  validade_lote<cast(now() as date)\n"
               + "  and produto_fk in (select id_prod from cd_produto where classeterapeutica_prod in ('1','2'))\n"
               + "  and loja_fk=" + loja.getIdLoja() + "\n"
               + "  order by produto_fk asc";
    */

    
   
    const hql = await useDB({ 
        query: `select 
                    vo.estoque,vo.estoquemin,vo.estoquemax,
                    vo.id_Estoquegeral,
                    cd_produto.id_Prod,
                    cd_produto.descricao_Prod,
                    cd_produto.classeterapeutica_Prod,
                    cd_unidade.sigla_Unid,
                    cd_unidade.frac_Unid,
                    cd_fabricante.nome_Fab,
                    cd_grupoproduto.descricao_Grpprod,
                    cd_produto.registroms_Prod
                from 
                    Es_Estoquegeral vo,
                    cd_produto, 
                    cd_grupoproduto, 
                    cd_fabricante, 
                    cd_unidade
                where 
                    cd_produto.unidade_fk = cd_unidade.id_unid 
                and 
                    cd_Produto.fabricante_fk = cd_fabricante.id_fab
                and
                    cd_produto.grupoprod_fk = cd_grupoproduto.id_grpprod
                and
                    cd_produto.id_prod = vo.produto_fk
                and
                    vo.loja_fk=${idLoja}
                order by cd_produto.descricao_prod  asc`
    })

    
    /*
     String hh = "";
    if (!hv.isEmpty()) {
        hh = " and vo.produtoFk.idProd in (" + hv + ") ";
    }

    String hql = "select vo.estoque,vo.estoquemin,vo.estoquemax,"
            + " vo.esEstoquegeralPK.idEstoquegeral,"
            + " vo.produtoFk.idProd,"
            + " vo.produtoFk.descricaoProd,"
            + "  vo.produtoFk.classeterapeuticaProd,"
            + " vo.produtoFk.unidadeFk.siglaUnid,"
            + " vo.produtoFk.unidadeFk.fracUnid,"
            + "vo.produtoFk.fabricanteFk.nomeFab,"
            + "vo.produtoFk.grupoprodFk.descricaoGrpprod,"
            + "vo.produtoFk.registromsProd"
            + "  from EsEstoquegeral vo"
            + " where vo.cfLoja=" + loja.getIdLoja() + ""
            + " " + hh + " "
            + " order by vo.produtoFk.descricaoProd  asc";
    */

    const lo = await useDB({ 
        query: `SELECT sum(qtde_lote) FROM public.cd_lote as l inner join cd_produto as p on p.id_prod=l.produto_fk where loja_fk=${idLoja}and produto_fk=${idProd}and classeterapeutica_prod!='0'`
    })

 return { code: 200, results: { lmciv, hql, lo }}  

//  public void listarliv() {
   
    
};

const listar = async function({ idLoja, idProd }){ 
 
    const hql = await useDB({ 
        query: `select 
                    vo.estoque,vo.estoquemin,vo.estoquemax,
                    vo.id_Estoquegeral,
                    cd_produto.id_Prod,
                    cd_produto.descricao_Prod,
                    cd_produto.classeterapeutica_Prod,
                    cd_unidade.sigla_Unid,
                    cd_unidade.frac_Unid,
                    cd_fabricante.nome_Fab,
                    cd_grupoproduto.descricao_Grpprod,
                    cd_produto.registroms_Prod
                from 
                    Es_Estoquegeral vo,
                    cd_produto, 
                    cd_grupoproduto, 
                    cd_fabricante, 
                    cd_unidade
                where 
                    cd_produto.unidade_fk = cd_unidade.id_unid 
                and 
                    cd_Produto.fabricante_fk = cd_fabricante.id_fab
                and
                    cd_produto.grupoprod_fk = cd_grupoproduto.id_grpprod
                and
                    cd_produto.id_prod = vo.produto_fk
                and
                    vo.loja_fk=${idLoja}
                order by cd_produto.id_Prod  asc`
    }); 

    

    /**
     *  String hql = "select vo.estoque,vo.estoquemin,vo.estoquemax,"
                    + " vo.esEstoquegeralPK.idEstoquegeral,"
                    + " vo.produtoFk.idProd,"
                    + " vo.produtoFk.descricaoProd,"
                    + "  vo.produtoFk.classeterapeuticaProd,"
                    + " vo.produtoFk.unidadeFk.siglaUnid,"
                    + " vo.produtoFk.unidadeFk.fracUnid,"
                    + "vo.produtoFk.fabricanteFk.nomeFab,"
                    + "vo.produtoFk.grupoprodFk.descricaoGrpprod,"
                    + "vo.produtoFk.registromsProd"
                    + "  from EsEstoquegeral vo"
                    + " where vo.cfLoja=" + loja.getIdLoja() + ""
                    + " order by vo.produtoFk.idProd asc ";
     */


    const lo = await useDB({ 
        query: `SELECT sum(qtde_lote) FROM public.cd_lote as l inner join cd_produto as p on p.id_prod=l.produto_fk where loja_fk=${idLoja}and produto_fk=${idProd}and classeterapeutica_prod!='0'`  
    })

 return { code: 200, results: { hql, lo }}  

//  public void listar() {

    
};

const codbarra = async function({ idProd }){ 

    const codBarra = await useDB({ 
        query: `SELECT numero_codbar FROM public.cd_codigobarras where ativo_codbar='S' and produto_fk=${idProd}`
    }); 

    /*
    String hql = "SELECT numero_codbar\n"
    + "  FROM public.cd_codigobarras\n"
    + "  where ativo_codbar='S' and produto_fk=" + idprod + " ";
    */

 return { code: 200, results: { codBarra }}  
//  public String codbarra(int idprod) {
    
};

const processarFiltro = async function({ idLoja, idProd }){ 
    
    const hql = await useDB({ 
        query: `select 
                    vo.estoque,vo.estoquemin,vo.estoquemax,
                    vo.id_Estoquegeral,
                    cd_produto.id_Prod,
                    cd_produto.descricao_Prod,
                    cd_produto.classeterapeutica_Prod,
                    cd_unidade.sigla_Unid,
                    cd_unidade.frac_Unid,
                    cd_fabricante.nome_Fab,
                    cd_grupoproduto.descricao_Grpprod,
                    cd_produto.registroms_Prod
                from 
                    Es_Estoquegeral vo,
                    cd_produto, 
                    cd_grupoproduto, 
                    cd_fabricante, 
                    cd_unidade
                where 
                    cd_produto.unidade_fk = cd_unidade.id_unid 
                and 
                    cd_Produto.fabricante_fk = cd_fabricante.id_fab
                and
                    cd_produto.grupoprod_fk = cd_grupoproduto.id_grpprod
                and
                    cd_produto.id_prod = vo.produto_fk
                `
    }); 
    

    /**
     * String hql = "select vo.estoque,vo.estoquemin,vo.estoquemax,"
                    + " vo.esEstoquegeralPK.idEstoquegeral,"
                    + " vo.produtoFk.idProd,"
                    + " vo.produtoFk.descricaoProd,"
                    + "  vo.produtoFk.classeterapeuticaProd,"
                    + " vo.produtoFk.unidadeFk.siglaUnid,"
                    + " vo.produtoFk.unidadeFk.fracUnid,"
                    + "vo.produtoFk.fabricanteFk.nomeFab,"
                    + "vo.produtoFk.grupoprodFk.descricaoGrpprod,"
                    + "vo.produtoFk.registromsProd"
                    + "  from EsEstoquegeral vo"
                    + " ";
     */

    const lo = await useDB({ 
        query: `SELECT sum(qtde_lote) FROM public.cd_lote as l inner join cd_produto as p on p.id_prod=l.produto_fk where loja_fk=${idLoja}and produto_fk=${idProd}and classeterapeutica_prod!='0'` 
    })

    /*
    String lo = "SELECT sum(qtde_lote)\n"
            + "  FROM public.cd_lote as l\n"
            + "  inner join cd_produto as p on p.id_prod=l.produto_fk\n"
            + "  where loja_fk=" + loja.getIdLoja() + "\n"
            + "  and produto_fk=" + e.getIdprod() + "\n"
            + "  and classeterapeutica_prod!='0'";
    */
 return { code: 200, results: { lo, hql }}  
//  public void processarFiltro() {
};

const excluirFiltro = async function({ idLoja }){ 

    
    const hql = await useDB({ 
        query:`select 
                    vo.estoque,vo.estoquemin,vo.estoquemax,
                    vo.id_Estoquegeral,
                    cd_produto.id_Prod,
                    cd_produto.descricao_Prod,
                    cd_produto.classeterapeutica_Prod,
                    cd_unidade.sigla_Unid,
                    cd_unidade.frac_Unid,
                    cd_fabricante.nome_Fab,
                    cd_grupoproduto.descricao_Grpprod,
                    cd_produto.registroms_Prod
                from 
                    Es_Estoquegeral vo,
                    cd_produto, 
                    cd_grupoproduto, 
                    cd_fabricante, 
                    cd_unidade
                where 
                    cd_produto.unidade_fk = cd_unidade.id_unid 
                and 
                    cd_Produto.fabricante_fk = cd_fabricante.id_fab
                and
                    cd_produto.grupoprod_fk = cd_grupoproduto.id_grpprod
                and
                    cd_produto.id_prod = vo.produto_fk
                and
                    vo.loja_fk=${idLoja}
                `
    }); 

    

    /*
    String hql = "select vo.estoque,vo.estoquemin,vo.estoquemax,"
            + " vo.esEstoquegeralPK.idEstoquegeral,"
            + " vo.produtoFk.idProd,"
            + " vo.produtoFk.descricaoProd,"
            + "  vo.produtoFk.classeterapeuticaProd,"
            + " vo.produtoFk.unidadeFk.siglaUnid,"
            + " vo.produtoFk.unidadeFk.fracUnid,"
            + "vo.produtoFk.fabricanteFk.nomeFab,"
            + "vo.produtoFk.grupoprodFk.descricaoGrpprod,"
            + "vo.produtoFk.registromsProd"
            + "  from EsEstoquegeral vo"
            + " where vo.cfLoja=" + loja.getIdLoja() + "";

    */
     

 return { code: 200, results: { hql }}  

//  public void excluirFiltro(Filtro filtro) {
    
};

const selecionarProduto2 = async function({ idLoja, idProd }){ 

    //query não funcionando
    const hql = await useDB({ 
        query:  `select 
                    vo.estoque,vo.estoquemin,vo.estoquemax,
                    vo.id_Estoquegeral,
                    cd_produto.id_Prod,
                    cd_produto.descricao_Prod,
                    cd_produto.classeterapeutica_Prod,
                    cd_unidade.sigla_Unid,
                    cd_unidade.frac_Unid,
                    cd_fabricante.nome_Fab,
                    cd_grupoproduto.descricao_Grpprod,
                    cd_produto.registroms_Prod
                from 
                    Es_Estoquegeral vo,
                    cd_produto, 
                    cd_grupoproduto, 
                    cd_fabricante, 
                    cd_unidade
                where 
                    cd_produto.unidade_fk = cd_unidade.id_unid 
                and 
                    cd_Produto.fabricante_fk = cd_fabricante.id_fab
                and
                    cd_produto.grupoprod_fk = cd_grupoproduto.id_grpprod
                and
                    cd_produto.id_prod = vo.produto_fk
                and
                    vo.loja_fk=${idLoja}
                and
                    vo.produto_fk=${idProd}
                `
    }); 
    
    /*
     String hql = "select vo.estoque,vo.estoquemin,vo.estoquemax,"
            + " vo.esEstoquegeralPK.idEstoquegeral,"
            + " vo.produtoFk.idProd,"
            + " vo.produtoFk.descricaoProd,"
            + "  vo.produtoFk.classeterapeuticaProd,"
            + " vo.produtoFk.unidadeFk.siglaUnid,"
            + " vo.produtoFk.unidadeFk.fracUnid,"
            + "vo.produtoFk.fabricanteFk.nomeFab,"
            + "vo.produtoFk.grupoprodFk.descricaoGrpprod,"
            + "vo.produtoFk.registromsProd"
            + "  from EsEstoquegeral vo"
            + " where vo.cfLoja=" + loja.getIdLoja() + ""
            + " and vo.produtoFk=" + produto.getIdProd() + "";
    */

 return { code: 200, results: { hql }}  

//  public void selecionarProduto2() {

};

const onCellEdit = async function({ idLoja }){ 

    const hqlc1 = await useDB({ 
        query: `SELECT max(id_altesthist) + 1 as idc FROM public.es_altesthist where loja_fk=${idLoja}`
    }); 

    /*
     String hqlc1 = "SELECT max(id_altesthist) + 1 as idc\n"
            + "  FROM public.es_altesthist\n"
            + "  where loja_fk=" + loja.getIdLoja() + " ";
    */

 return { code: 200, results: { hqlc1 }}  
 
//  public void onCellEdit(CellEditEvent event) {

};

module.exports = {
    iniciarLote,
    salvar,
    pegarLotes,
    listarli,
    filtrar,
    listarliv,
    listar,
    codbarra,
    processarFiltro,
    excluirFiltro,
    selecionarProduto2,
    onCellEdit
}