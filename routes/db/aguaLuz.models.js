const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const excluir = async function({ idLoja, idAguaLuzPag, idAguaLuzcontas, idAguaLuz }){ 

    let statusDelete1 = "", statusDelete2 = "", statusDelete3 = "";

    const excluir1 = await useDB({ 
        query: `DELETE FROM fn_contaspagar_pag where loja_fk=${idLoja} and contaspagar_fk=(select id_contaspagar from fn_contaspagar where agualuz_fk=${idAguaLuzPag} and loja_fk=${idLoja})`
    }).then(() =>{
        statusDelete1 = "Registro apagado com sucesso";
    }).catch((err)=>{
        statusDelete1 = err.message;
    });

    /**
     * String hqltcx = "DELETE FROM fn_contaspagar_pag where loja_fk=" + loja.getIdLoja() + " and\n"
                    + " contaspagar_fk=(select id_contaspagar from fn_contaspagar"
                    + " where agualuz_fk=" + aguaLuz.getFnAgualuzPK().getId() + ""
                    + " and loja_fk=" + loja.getIdLoja() + ")";
     */

    const excluir2 = await useDB({ 
        query: `delete from Fn_Contaspagar where agualuz_fk=${idAguaLuzcontas} and loja_Fk=${idLoja}`
    }).then(()=>{
        statusDelete2 = "Registro apagado com sucesso";
    }).catch((err)=>{
        statusDelete2 = err.message;
    })

    /**
     *  String hqltc = "delete from FnContaspagar vo"
                    + " where vo.fnAgualuz.fnAgualuzPK.id=" + aguaLuz.getFnAgualuzPK().getId() + ""
                    + " and vo.fnAgualuz.fnAgualuzPK.lojaFk=" + loja.getIdLoja() + "";
     */

    const excluir3 = await useDB({
        query: `delete from Fn_Agualuz where id=${idAguaLuz} and loja_Fk=${idLoja}`
    }).then(() => {
        statusDelete3 = "registro apagado com sucesso";
    }).catch((err) => {
        statusDelete3 = err.message;
    })

    /**
     * String hqlcab = "delete  from  FnAgualuz vo"
                    + " where vo.fnAgualuzPK.id=" + aguaLuz.getFnAgualuzPK().getId() + ""
                    + " and vo.fnAgualuzPK.lojaFk=" + loja.getIdLoja() + "";
     */


 return { code: 200, results: { statusDelete1, statusDelete2, statusDelete3 }}  

//  public void excluir() {

};

const popularListaconsumoAgua = async function({  }){ 

    const lista = await useDB({ 
        query: "SELECT * FROM Cd_Tabela_4_4_2 ORDER BY id ASC"
    });
    
    /**
     * String hql = "SELECT vo FROM CdTabela442 vo"
                + " ORDER BY vo.id ASC";
     */

 return { code: 200, results: { lista }}  

//  public void popularListacosumoAgua() {

    
};


const verificaTiponota = async function({ idLoja, idAguaLuz }){ 

    const aguaEsgoto = await useDB({ 
        query: "select * from Cd_Plano_Conta where nome='AGUA/ESGOTO'"
    }); 

    const energiaEletrica = await useDB({ 
        query: "select * from Cd_Plano_Conta where nome='ENERGIA ELETRICA'"
    });

    const gas = await useDB({ 
        query: "select * from Cd_Plano_Conta where nome='GAS'"  
    });

    /**
     *  if (this.aguaLuz.getCodModelodocfiscal().equals("29")) {
                    aguaLuz.setPlanoContaFk(new PlanoContaRN().pegarPlanoConta("select vo from CdPlanoConta vo"
                            + " where vo.nome='AGUA/ESGOTO'"));
                    popularListacosumoAgua();
                } else if (this.aguaLuz.getCodModelodocfiscal().equals("06") || this.aguaLuz.getCodModelodocfiscal().equals("66")) {
                    aguaLuz.setPlanoContaFk(new PlanoContaRN().pegarPlanoConta("select vo from CdPlanoConta vo"
                            + " where vo.nome='ENERGIA ELETRICA'"));

                } else if (this.aguaLuz.getCodModelodocfiscal().equals("28")) {
                    aguaLuz.setPlanoContaFk(new PlanoContaRN().pegarPlanoConta("select vo from CdPlanoConta vo"
                            + " where vo.nome='GAS'"));
                }
     */

    const contas = await useDB({ 
        query: `SELECT * FROM Fn_Contaspagar WHERE loja_Fk=${idLoja} and agualuz_fk=${idAguaLuz}`
    });

    /**
     *  String hqlc = "SELECT vo FROM FnContaspagar vo"
                        + " WHERE vo.fnContaspagarPK.lojaFk=" + l.getIdLoja() + ""
                        + " and vo.fnAgualuz.fnAgualuzPK.id=" + aguaLuz.getFnAgualuzPK().getId() + "";
     */

 return { code: 200, results: { aguaEsgoto, energiaEletrica, gas, contas }}  

//  public void verificaTiponota() {

};

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM fn_agualuz WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 
 
    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM fn_agualuz WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
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
        StringBuilder sb = new StringBuilder("SELECT vo FROM FnAgualuz vo");
 */

};

const excluirFiltro = async function({ idLoja }){ 

    const lista = await useDB({ 
        query: `select * from Fn_Agualuz where loja_Fk=${idLoja} order by id desc`
    });
    
    /**
     * String hql = "select vo from FnAgualuz vo "
                    + "where vo.fnAgualuzPK.lojaFk=" + loja.getIdLoja() + " "
                    + "order by vo.fnAgualuzPK.id desc";
     */

 return { code: 200, results: { lista }}  

//  public void excluirFiltro(Filtro filtro) {

    
};

const listaAlvo = async function({ idLoja }){ 

    const lista = await useDB({ 
        query: `select * from Fn_Agualuz where loja_Fk=${idLoja} order by id desc`
    }); 

    /**
     * String hql = "select vo from FnAgualuz vo "
                    + "where vo.fnAgualuzPK.lojaFk=" + loja.getIdLoja() + " "
                    + "order by vo.fnAgualuzPK.id desc";
     */

 return { code: 200, results: { lista }}  

//  public void listaAlvo() {

    
};

const salvar = async function({ idLoja, idForn, numNota, idAguaLuz, agualuz_fk, loja_fk, id_contaspagar }){ 

    let statusUpdate = "", statusUpdate2 = "";

    const salvar1 = await useDB({ 
        query: `SELECT id FROM public.fn_agualuz where loja_fk=${idLoja} and fornecedor_fk=${idForn} and numnota=${numNota}`
    }); 

    /**
     * if (this.aguaLuz.getDataaltera() == null && aguaLuz.getFornecedorFk() != null) {
            String j = "SELECT id\n"
                    + "  FROM public.fn_agualuz\n"
                    + "  where loja_fk=" + l.getIdLoja() + ""
                    + " and fornecedor_fk=" + aguaLuz.getFornecedorFk().getIdForn() + ""
                    + " and numnota=" + aguaLuz.getNumnota() + "";
            Integer num = (Integer) new CargoRN().porSql2semcache(j);
            if (num != null) {
                Util.abrirAvisos("numero de nota ja lancado para esse fornecedor!");
                ok = false;
            }
     */

    const salvar2 = await useDB({ 
        query: `SELECT id FROM public.fn_agualuz where loja_fk=${idLoja} and fornecedor_fk=${idForn} and numnota=${numNota} and id!=${idAguaLuz}`
    });

    /**
     * else {
            if (aguaLuz.getFornecedorFk() != null) {
                String j = "SELECT id\n"
                        + "  FROM public.fn_agualuz\n"
                        + "  where loja_fk=" + l.getIdLoja() + ""
                        + " and fornecedor_fk=" + aguaLuz.getFornecedorFk().getIdForn() + ""
                        + " and numnota=" + aguaLuz.getNumnota() + ""
                        + " and id!=" + aguaLuz.getFnAgualuzPK().getId() + "";
                Integer num = (Integer) new CargoRN().porSql2semcache(j);
                if (num != null) {
                    Util.abrirAvisos("numero de nota ja lancado para esse fornecedor!");
                    ok = false;
                }
     */

    const salvar3 = await useDB({ 
        query:  `SELECT max(id)+1 as idc FROM public.fn_agualuz where loja_fk=${idLoja}`
    });

    /**
     * if (this.aguaLuz.getDataaltera() == null) {
                    lancado = false;
                    String hqlc = "SELECT max(id)+1 as idc\n"
                            + "  FROM public.fn_agualuz\n"
                            + "  where loja_fk=" + l.getIdLoja() + " ";
     */

    const salvar4 = await useDB({ 
        query: `SELECT max(id_contaspagar)+1 as idc FROM public.fn_contaspagar where loja_fk=${idLoja}`
    });

    /**
     *  String hqlc = "SELECT max(id_contaspagar)+1 as idc\n"
                            + "  FROM public.fn_contaspagar\n"
                            + "  where loja_fk=" + l.getIdLoja() + " ";
     */

    const update = await useDB({ 
        query: `update fn_contaspagar set agualuz_fk=${agualuz_fk} where id_contaspagar=${id_contaspagar} and loja_fk=${loja_fk}` 
    }).then(() => {
        statusUpdate = "Registro atualizado com sucesso";
    }).catch((err) => {
        statusUpdate = err.message;
    })

    /**
     *   String sqlc = "update fn_contaspagar "
                + " set agualuz_fk=? "
                + " where id_contaspagar=?"
                + " and loja_fk=?";
     */

    const salvar5 = await useDB({ 
        query: `SELECT * FROM Fn_Contaspagar WHERE loja_Fk=${idLoja} and agualuz_fk=${idAguaLuz}`
    });

    /**
     * String hqlc = "SELECT vo FROM FnContaspagar vo"
                + " WHERE vo.fnContaspagarPK.lojaFk=" + l.getIdLoja() + ""
                + " and vo.fnAgualuz.fnAgualuzPK.id=" + aguaLuz.getFnAgualuzPK().getId() + "";
     */

    const salvar6 = await useDB({ 
        query: `SELECT max(id_contaspagar)+1 as idc FROM public.fn_contaspagar where loja_fk=${idLoja}`  
    });

    /**
     * String hqlc1 = "SELECT max(id_contaspagar)+1 as idc\n"
                + "  FROM public.fn_contaspagar\n"
                + "  where loja_fk=" + l.getIdLoja() + " ";
     */

    const update2 = await useDB({ 
        query: `update fn_contaspagar set agualuz_fk=${agualuz_fk} where id_contaspagar=${id_contaspagar} and loja_fk=${loja_fk}`  
    }).then(() => {
        statusUpdate2 = "Registro atualizado com sucesso";
    }).catch((err) => {
        statusUpdate2 = err.message;
    })

    /**
     * String sqlc = "update fn_contaspagar "
                + " set agualuz_fk=? "
                + " where id_contaspagar=?"
                + " and loja_fk=?"; 
     */

 return { code: 200, results: { salvar1, salvar2, salvar3, salvar4, statusUpdate, salvar5, salvar6, statusUpdate2 }}
 
//  public void salvar() {
    
};

const cancelar = async function({ idLoja, idAguaLuz }){ 

    const cancelar1 = await useDB({ 
        query: `SELECT * FROM Fn_Contaspagar WHERE loja_Fk=${idLoja} and agualuz_fk=${idAguaLuz}`
    }); 

    /**
     * if (aguaLuz != null) {
                CfLoja l = (CfLoja) Util.pegarObjetoDaSessao("loja");
                String hqlc = "SELECT vo FROM FnContaspagar vo"
                        + " WHERE vo.fnContaspagarPK.lojaFk=" + l.getIdLoja() + ""
                        + " and vo.fnAgualuz.fnAgualuzPK.id=" + aguaLuz.getFnAgualuzPK().getId() + "";

     */

 return { code: 200, results: { cancelar1 }}  

//  public void cancelar() {
    
};

const inserir = async function({  }){ 

    const planoConta = await useDB({ 
        query: "select * from Cd_Plano_Conta where nome='ENERGIA ELETRICA'"
    }); 

    /**
     * aguaLuz.setPlanoContaFk(new PlanoContaRN().pegarPlanoConta("select vo from CdPlanoConta vo"
                + " where vo.nome='ENERGIA ELETRICA'"));
     */

 return { code: 200, results: { planoConta }}  

//  public void inserir() {
    
};

const pesquisarPorColuna = async function({ textoBusca, colunaBusca, idLoja }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Fn_Agualuz WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' and loja_Fk=${idLoja} ORDER BY ${colunaBusca} ASC`
    }); 

    /**
     *  String hql = "SELECT vo FROM FnAgualuz vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + " LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%'"
                + " and vo.fnAgualuzPK.lojaFk=" + loja.getIdLoja() + " ORDER BY vo." + this.colunaBusca + " ASC";
     */

 return { code: 200, results: { pesquisa }}     

//  public void pesquisarPorColuna() {
    
};

const preencherListaBusca = async function({ idLoja }){ 

    const lista = await useDB({ 
        query: `select * from Fn_Agualuz where loja_Fk=${idLoja} order by id desc`
    }); 

    /**
     * String hql = "select vo from FnAgualuz vo "
                    + "where vo.fnAgualuzPK.lojaFk=" + loja.getIdLoja() + " "
                    + "order by vo.fnAgualuzPK.id desc";
     */

 return { code: 200, results: { lista }}  

//  public void preencherListaBusca() {
    
};

module.exports = {
    excluir,
    popularListaconsumoAgua,
    verificaTiponota,
    processarFiltro,
    excluirFiltro,
    listaAlvo,
    salvar,
    cancelar,
    inserir,
    pesquisarPorColuna,
    preencherListaBusca
}