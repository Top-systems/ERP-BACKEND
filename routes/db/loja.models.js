const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const retornaFoto = async function ({ idLoja }) {

    const logo = await useDB({
        query: `select logo_loja from cf_loja where id_loja=${idLoja}`
    });

    /**
     * porSql2semcache("select logo_loja from cf_loja where id_loja=" + this.loja.getIdLoja() + " ");
     */

    return { code: 200, results: { logo } }

    //  public String retornaFoto() {

};

const recebeFoto = async function ({ File, idLoja }) {

    let statusUpdate = "";

    const foto = await useDB({
        query: `update cf_loja set logo_loja='${File}' where id_loja=${idLoja}`
    }).then(() => {
        statusUpdate = "Registro atualizado com sucesso"
    }).catch((err) => {
        statusUpdate = err.message;
    })
    /**
     *  new CargoRN().executarSQL(
                        "update cf_loja set logo_loja=?"
                        + " where id_loja=? ", parametrosc);
     */

    return { code: 200, results: { foto, statusUpdate } }

    // public void recebeFoto(FileUploadEvent event) {

};

const removerFoto = async function ({ idLoja }) {

    let statusUpdate = "";

    const foto = await useDB({
        query: `update cf_loja set logo_loja=null where id_loja=${idLoja}`
    }).then(() => {
        statusUpdate = "Registro atualizado com sucesso";
    }).catch((err) => {
        statusUpdate = err.message;
    })

    /**
     * new CargoRN().executarSQL(
                    "update cf_loja set logo_loja=?"
                    + " where id_loja=? ", parametrosc);
     */

    return { code: 200, results: { foto, statusUpdate } }

    //  public void removerFoto() {

};

const carregarSequencias = async function ({ idLoja }) {

    const sequencia = await useDB({
        query: `SELECT * FROM Nfe_Seqdoc WHERE loja_Fk=${idLoja}`
    });

    /**
     *  String hql = "SELECT vo FROM NfeSeqdoc vo"
                + " WHERE vo.lojaFk=" + this.loja.getIdLoja() + "";

     */

    return { code: 200, results: { sequencia } }

    //  public void carregarSequencias() {


};

const salvarSequencia = async function ({ idLoja }) {

    const sequencia = await useDB({
        query: `SELECT * FROM Nfe_Seqdoc WHERE loja_Fk=${idLoja} ORDER BY id DESC`
    });

    /**
     * String hqlb = "SELECT vo FROM NfeSeqdoc vo"
                + " WHERE vo.lojaFk=" + loja.getIdLoja() + ""
                + " ORDER BY vo.nfeSeqdocPK.id DESC";
     */

    return { code: 200, results: { sequencia } }

    //  public void salvarSequencia() {

};

const processarFiltro = async function ({ valor, filtro }) {

    const comecandoCom = await useDB({
        query: `SELECT * FROM cf_loja WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    });

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cf_loja WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
    })

    /**
     * if (filtro.getComparacao().equals("Contendo")) {
            comparacaoLike = " LIKE '%" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    return { code: 200, results: { comecandoCom, contendo } }

    //  public void processarFiltro() {

    /**
     * //string da consulta
            StringBuilder sb = new StringBuilder("SELECT vo FROM Cf_loja vo");
     */

}

const salvar = async function ({ idLoja, id_estoquegeral, loja_fk, produto_fk, estoque, precocusto_prod, margem_prod, precovenda_prod, precocustocaixa_prod, precovendacaixa_prod, usuarioaltera, dataaltera, estoquemin, estoquemax, estoquenegativo, abc, precoultimacompra, desconto_prod, precopromo_prod, precoanterior_prod, precomediocompra_prod, descontomax_prod, acrescimo, precoatacado1_prod, precoatacado2_prod, margematacado1_prod, margematacado2_prod, hash_estoquegeral, id_loja, segmento_fk, cnpj_loja }) {

    let statusInsert = "", statusInsert2;

    const insertLoja = await useDB({
        query: `INSERT INTO public.cf_loja(
           id_loja, 
           segmento_fk, 
           cnpj_loja,  
           endereco_loja, 
           ie_loja, 
           razaosocial_loja, 
           uf_loja, 
           im_loja, 
           matrizfilial_loja, 
           numeroendereco_loja,  
           bairro_loja, 
           cidade_loja, 
           codibgecidade_loja,
           codibgeuf_loja, 
           cep_loja, 
           fone_loja,  
           email_loja, 
           cnae_loja, 
           crt_loja, 
           tipocrt_loja, 
           aliquotapis_loja,
           aliquotacofins_loja,  
           nome_responsavel_loja, 
           cpf_responsavel_loja,  
           cnpjmatriz_loja,  
           statusregistro_loja, 
           tiporegistro_loja,  
           piscofins_entrada)
           VALUES (${id_loja},
             ${segmento_fk},'${cnpj_loja}',
             '',
             '',
             '',
             '',
             '',
             '',
             '',
             '',
             '',
             0,
             '',
             '',
             '',
             '',
             0,
             '',
             '',
             0,
             0,
             '',
             '',
             '',
             true,
             '',
             '');`
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });

    const salvar1 = await useDB({
        query: "SELECT * FROM Cf_Config_Sped ORDER BY id_Config_Sped DESC"
    });

    /**
     *  String hql = "SELECT vo FROM CfConfigSped vo"
                    + " ORDER BY vo.cfConfigSpedPK.idConfigSped DESC";
     */

    const salvar2 = await useDB({
        query: `SELECT * FROM Cf_Periodo_Contabilista WHERE loja_Fk=${idLoja} AND final IS NULL`
    })
    /**
     * String hql = "SELECT vo FROM CfPeriodoContabilista vo"
                   + " WHERE vo.cfPeriodoContabilistaPK.lojaFk=" + this.loja.getIdLoja() + ""
                   + " AND vo.final1 IS NULL";
     */

    const salvar3 = await useDB({
        query: "SELECT * FROM Cf_Periodo_Contabilista ORDER BY id DESC"
    })

    /**
     * String hql2 = "SELECT vo FROM CfPeriodoContabilista vo"
                   + " ORDER BY vo.cfPeriodoContabilistaPK.id DESC";

     */

    const salvar4 = await useDB({
        query: "SELECT * FROM Cf_Periodo_Contabilista ORDER BY id DESC"
    })

    /**
      * String hql = "SELECT vo FROM CfPeriodoContabilista vo"
                    + " ORDER BY vo.cfPeriodoContabilistaPK.id DESC";

      */

    const salvar5 = await useDB({
        query: `SELECT * FROM  Cf_Config_Servidor  WHERE loja_Fk=${idLoja} ORDER BY id_Config_Servidor DESC`
    })

    /**
     *  String hqlb = "SELECT vo FROM  CfConfigServidor vo"
                    + " WHERE vo.lojaFk=" + l.getIdLoja() + ""
                    + " ORDER BY vo.cfConfigServidorPK.idConfigServidor DESC";
     */

    /* QUERY MUITO PESADA
    const salvar6 = await useDB({ 
        query: "select id_Prod, vo.id_Estoquegeral,vo.estoque,vo.precocusto_Prod,vo.precovenda_Prod,vo.precocustocaixa_Prod,vo.precovendacaixa_Prod,vo.margem_Prod,vo.estoquemin,vo.estoquemax,vo.estoquenegativo,vo.abc,vo.precoultimacompra,vo.desconto_Prod,vo.precopromo_Prod,vo.precoanterior_Prod,vo.precomediocompra_Prod,vo.descontomax_Prod,vo.acrescimo,vo.precoatacado1_Prod,vo.precoatacado2_Prod,vo.margematacado1_Prod,vo.margematacado2_Prod from Es_Estoquegeral vo, cd_produto where vo.loja_fk=1"
    })
    */

    /**
     * "select "
         + "vo.produtoFk.idProd,"
         + " vo.esEstoquegeralPK.idEstoquegeral,"
         + "vo.estoque,"
         + "vo.precocustoProd,"
         + "vo.precovendaProd,"
         + "vo.precocustocaixaProd,"
         + "vo.precovendacaixaProd,"
         + "vo.margemProd,"
         + "vo.estoquemin,"
         + "vo.estoquemax,"
         + "vo.estoquenegativo,"
         + "vo.abc,"
         + "vo.precoultimacompra,"
         + "vo.descontoProd,"
         + "vo.precopromoProd,"
         + "vo.precoanteriorProd,"
         + "vo.precomediocompraProd,"
         + "vo.descontomaxProd,"
         + "vo.acrescimo,"
         + "vo.precoatacado1Prod,"
         + "vo.precoatacado2Prod,"
         + "vo.margematacado1Prod,"
         +"vo.margematacado2Prod"
         + " from EsEstoquegeral vo"
         + " where vo.cfLoja=1";
     */


    const salvar7 = await useDB({
        query: `INSERT INTO es_estoquegeral(
            id_estoquegeral, 
            loja_fk, 
            produto_fk, 
            estoque, 
            precocusto_prod,
            margem_prod, 
            precovenda_prod, 
            precocustocaixa_prod, 
            precovendacaixa_prod,
            usuarioaltera, 
            dataaltera,
            estoquemin,
            estoquemax,
            estoquenegativo,
            abc,
            precoultimacompra,
            desconto_prod,
            precopromo_prod,
            precoanterior_prod,
            precomediocompra_prod,
            descontomax_prod,
            acrescimo,
            precoatacado1_prod,
            precoatacado2_prod,
            margematacado1_prod,
            margematacado2_prod,
            hash_estoquegeral
            ) VALUES (
                ${id_estoquegeral},
                ${loja_fk},
                ${produto_fk}, 
                ${estoque},
                ${precocusto_prod},
                ${margem_prod},
                ${precovenda_prod},
                ${precocustocaixa_prod},
                ${precovendacaixa_prod},
                ${usuarioaltera},
                '${dataaltera}',
                ${estoquemin},
                ${estoquemax},
                '${estoquenegativo}',
                '${abc}',
                ${precoultimacompra},
                ${desconto_prod},
                ${precopromo_prod},
                ${precoanterior_prod},
                ${precomediocompra_prod},
                ${descontomax_prod},
                ${acrescimo},
                ${precoatacado1_prod},
                ${precoatacado2_prod},
                ${margematacado1_prod},
                ${margematacado2_prod},
                '${hash_estoquegeral}' 
                )`
    }).then(() => {
        statusInsert = "Registro inserido com sucesso";
    }).catch((err) => {
        statusInsert = err.message
    })


    return { code: 200, results: { salvar1, salvar2, salvar3, salvar4, salvar5, statusInsert, statusInsert2 } }

    //  public void salvar() {

};

const pesquisarPorColuna = async function ({ colunaBusca, textoBusca }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Cf_Loja WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC`
    });

    /**
     *  String hql = "SELECT vo FROM CfLoja vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' ORDER BY vo." + this.colunaBusca + " ASC";
     */

    return { code: 200, results: { pesquisa } }

    //  public void pesquisarPorColuna() 

};

const pesquisarPorColunaLOJA = async function ({ colunaBusca, textoBusca, idLoja }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Cf_Loja WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' AND id_Loja!=${idLoja}`
    });

    /**
     * String hql = "SELECT vo FROM CfLoja vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' "
                + " AND vo.idLoja!=" + l.getIdLoja() + "";
     */

    return { code: 200, results: { pesquisa } }

    //  public void pesquisarPorColunaLOJA() {

};

const preencherListaBuscaLOJA = async function ({ idLoja }) {

    const lista = await useDB({
        query: `SELECT * FROM Cf_Loja WHERE  id_Loja!=${idLoja}`
    });

    /**
     * String hql = "SELECT vo FROM CfLoja vo"
                + " WHERE  vo.idLoja!=" + l.getIdLoja() + "";
     */

    return { code: 200, results: { lista } }

    //  public void preencherListaBuscaLOJA() {

};

const PegaPeriodo = async function ({ idLoja }) {

    const periodo = await useDB({
        query: `SELECT * FROM Cf_Periodo_Contabilista  WHERE loja_fk=${idLoja} AND final IS NULL`
    });

    /**
     *  String hql = "SELECT vo FROM CfPeriodoContabilista vo"
                    + " WHERE vo.cfLoja.idLoja=" + this.loja.getIdLoja() + ""
                    + " AND vo.final1 IS NULL";
     */

    return { code: 200, results: { periodo } }

    //  public void PegaPeriodo() {

};

const PegaConf = async function ({ idLoja }) {

    const conf = await useDB({
        query: `SELECT * FROM Cf_Config_Geral WHERE loja_fk=${idLoja}`
    });

    /**
     * String hql = "SELECT vo FROM CfConfigGeral vo"
                    + " WHERE vo.cfLoja.idLoja=" + this.loja.getIdLoja() + "";

     */

    return { code: 200, results: { conf } }
    //  public void PegaConf() {

};

const PegaConfVenda = async function ({ idLoja }) {

    const venda = await useDB({
        query: `SELECT * FROM Cf_Config_Venda WHERE loja_fk=${idLoja}`
    });

    return { code: 200, results: { venda } }

};

const pegaSped = async function ({ idLoja }) {

    const sped = await useDB({
        query: `SELECT * FROM Cf_Config_Sped WHERE loja_fk=${idLoja}`
    });

    /**
     * String hql = "SELECT vo FROM CfConfigSped vo"
                    + " WHERE vo.cfLoja.idLoja=" + this.loja.getIdLoja() + "";
     */

    return { code: 200, results: { sped } }

    //  private void pegaSped() {

};

const PegaConfNfe = async function ({ idLoja }) {

    const nfe = await useDB({
        query: `SELECT * FROM Cf_Config_Nfe WHERE loja_fk=${idLoja}`
    });

    /**
     * String hql = "SELECT vo FROM CfConfigNfe vo"
                    + " WHERE vo.cfLoja.idLoja=" + this.loja.getIdLoja() + "";
     */

    return { code: 200, results: { nfe } }

    //  public void PegaConfNfe() {

};

const PegarAutomacao = async function ({ idLoja }) {

    const automacao = await useDB({
        query: `SELECT * FROM Cf_Config_Automacao WHERE loja_fk=${idLoja}`
    });
    /**
     *  String hql = "SELECT vo FROM CfConfigAutomacao vo"
                    + " WHERE vo.cfLoja.idLoja=" + this.loja.getIdLoja() + "";
     */

    return { code: 200, results: { automacao } }

    //  public void PegarAutomacao() {

};

const PegaServidor = async function ({ idLoja }) {

    const servidor = await useDB({
        query: `SELECT * FROM Cf_Config_Servidor WHERE loja_Fk=${idLoja}`
    });

    /**
     *  String hql = "SELECT vo FROM CfConfigServidor vo"
                    + " WHERE vo.lojaFk.idLoja=" + this.loja.getIdLoja() + "";
     */

    return { code: 200, results: { servidor } }

    // public void PegaServidor() {


};

const getLojasNivel = async function ({ idUsuario }) {

    const nivel = await useDB({
        query: "select * from Cf_Loja order by id_Loja desc"
    });

    /**
     * if (usuario.getNomeUsu().equals("inforerp")) {
            lojasNivel = new LojaRN().listarLojaHQL("select vo from CfLoja vo order by idLoja desc");
     */

    const nivelAcesso = await useDB({
        query: `SELECT * FROM Cd_Nivelacesso WHERE usuario_Fk=${idUsuario}`
    })

    /**
     * else {
            String hqlNivelAcesso = "SELECT nivel FROM CdNivelacesso nivel"
                    + " WHERE nivel.usuarioFk=" + usuario.getIdUsuario() + "";

     */

    return { code: 200, results: { nivel, nivelAcesso } }

    //  public List<CfLoja> getLojasNivel() {

};

module.exports = {
    retornaFoto,
    recebeFoto,
    removerFoto,
    carregarSequencias,
    salvarSequencia,
    processarFiltro,
    salvar,
    pesquisarPorColuna,
    pesquisarPorColunaLOJA,
    preencherListaBuscaLOJA,
    PegaPeriodo,
    PegaConf,
    PegaConfVenda,
    pegaSped,
    PegaConfNfe,
    PegarAutomacao,
    PegaServidor,
    getLojasNivel
};
