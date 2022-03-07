const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const adicionarPlano2 = async function ({ codConta }) {

    const codigo = await useDB({
        query: `select * from Cd_Plano_Conta where niveis=2 and codigo_Conta='${codConta}' order by codigo_Conta desc`
    });

    /**
     *  String hql = "select vo from CdPlanoConta vo"
                + " where vo.niveis=2"
                + " and vo.plano.codigoConta='" + planoConta.getCodigoConta() + "' "
                + " order by vo.codigoConta desc";
     */

    return { code: 200, results: { codigo } }

    //  public void adicionarplano2() {

};

const listarPlanos2 = async function ({ idPlano }) {

    const lista = await useDB({
        query: `select * from Cd_Plano_Conta where id=${idPlano} and niveis=2 order by codigo_Conta asc`
    });

    /**
     * if (planoConta != null) {
            String hql = "select vo from CdPlanoConta vo "
                    + " where vo.plano=" + planoConta.getId() + " "
                    + " and vo.niveis=2 "
                    + " order by vo.codigoConta asc";
     */

    const lista2 = await useDB({
        query: `select * from Cd_Plano_Conta where id=${idPlano} and niveis=3 order by codigo_Conta asc`
    });

    /**
     * for (CdPlanoConta c : r) {
            hql = "select vo from CdPlanoConta vo "
                + " where vo.plano=" + c.getId() + " "
                + " and vo.niveis=3 "
                + " order by vo.codigoConta asc";
     */

    const lista3 = await useDB({
        query: `select * from Cd_Plano_Conta where id=${idPlano} and niveis=4 order by codigo_Conta asc`
    });

    /**
     * for (CdPlanoConta c3 : r3) {
                hql = "select vo from CdPlanoConta vo "
                    + " where vo.plano=" + c3.getId() + " "
                    + " and vo.niveis=4 "
                    + " order by vo.codigoConta asc";
     */

    const lista4 = await useDB({
        query: `select * from Cd_Plano_Conta where id=${idPlano} and niveis=5 order by codigo_Conta asc`
    });

    /**
     * for (CdPlanoConta c4 : r4) {
                hql = "select vo from CdPlanoConta vo "
                        + " where vo.plano=" + c4.getId() + " "
                        + " and vo.niveis=5 "
                        + " order by vo.codigoConta asc";
     */

    const lista5 = await useDB({
        query: `select * from Cd_Plano_Conta where id=${idPlano} and niveis=6 order by codigo_Conta asc`
    });

    /**
     *  for (CdPlanoConta c5 : r5) {
                hql = "select vo from CdPlanoConta vo "
                        + " where vo.plano=" + c5.getId() + " "
                        + " and vo.niveis=6 "
                        + " order by vo.codigoConta asc";
     */

    const lista6 = await useDB({
        query: `select * from Cd_Plano_Conta where id=${idPlano} and niveis=6 order by codigo_Conta asc`
    });

    /**
     * for (CdPlanoConta c6 : r6) {
            hql = "select vo from CdPlanoConta vo "
                    + " where vo.plano=" + c6.getId() + " "
                    + " and vo.niveis=6 "
                    + " order by vo.codigoConta asc";
     */



    return { code: 200, results: { lista, lista2, lista3, lista4, lista5, lista6 } }

    //  public void listarplanos2() {

};

const adicionarPlano3 = async function ({ codConta }) {

    const plano = await useDB({
        query: `select * from Cd_Plano_Conta where niveis=3 and codigo_Conta='${codConta}' order by codigo_Conta desc`
    });

    /**
     * String hql = "select vo from CdPlanoConta vo"
                + " where vo.niveis=3"
                + " and vo.plano.codigoConta='" + c.getCodigoConta() + "' "
                + " order by vo.codigoConta desc";
     */

    return { code: 200, results: { plano } }

    //  public void adicionarplano3(CdPlanoConta c) {

};

const listarPlanos3 = async function ({ idPlano }) {

    const lista = await useDB({
        query: `select * from Cd_Plano_Conta where id=${idPlano} and niveis=3 order by codigo_Conta asc`
    });

    /**
     * String hql = "select vo from CdPlanoConta vo "
                + " where vo.plano=" + c.getId() + " "
                + " and vo.niveis=3 "
                + " order by vo.codigoConta asc";
     */

    return { code: 200, results: { lista } }

    //  public List<CdPlanoConta> listarplanos3(CdPlanoConta c) {

};

const adicionarPlano7 = async function ({ codConta }) {

    const plano = await useDB({
        query: `select * from Cd_Plano_Conta  where niveis=6 and codigo_Conta='${codConta}' order by codigo_Conta desc`
    });

    /**
     *  String hql = "select vo from CdPlanoConta vo"
                + " where vo.niveis=6"
                + " and vo.plano.codigoConta='" + c.getCodigoConta() + "' "
                + " order by vo.codigoConta desc";
     */

    return { code: 200, results: { plano } }

    //  public void adicionarplano7(CdPlanoConta c) {

};

const listarPlanos7 = async function ({ idPlano }) {

    const lista = await useDB({
        query: `select * from Cd_Plano_Conta where id=${idPlano} and niveis=7 order by codigo_Conta asc`
    });

    /**
     *  String hql = "select vo from CdPlanoConta vo "
                + " where vo.plano=" + c.getId() + " "
                + " and vo.niveis=7 "
                + " order by vo.codigoConta asc";
     */

    return { code: 200, results: { lista } }

    //  public List<CdPlanoConta> listarplanos7(CdPlanoConta c) {

};

const adicionarPlano6 = async function ({ codConta }) {

    const plano = await useDB({
        query: `select * from Cd_Plano_Conta where niveis=5 and codigo_Conta='${codConta}' order by codigo_Conta desc`
    });

    /**
     * String hql = "select vo from CdPlanoConta vo"
                + " where vo.niveis=5"
                + " and vo.plano.codigoConta='" + c.getCodigoConta() + "' "
                + " order by vo.codigoConta desc";
     */

    return { code: 200, results: { plano } }

    //  public void adicionarplano6(CdPlanoConta c) {

};

const listarPlanos6 = async function ({ idPlano }) {

    const lista = await useDB({
        query: `select * from Cd_Plano_Conta where id=${idPlano} and niveis=6 order by codigo_Conta asc`
    });

    /**
     * String hql = "select vo from CdPlanoConta vo "
                + " where vo.plano=" + c.getId() + " "
                + " and vo.niveis=6 "
                + " order by vo.codigoConta asc";
     */

    return { code: 200, results: { lista } }

    //  public List<CdPlanoConta> listarplanos6(CdPlanoConta c) {

};

const adicionarPlano4 = async function ({ codConta }) {

    const plano = await useDB({
        query: `select * from Cd_Plano_Conta where niveis=3 and codigo_Conta='${codConta}' order by codigo_Conta desc`
    });

    /**
     *  String hql = "select vo from CdPlanoConta vo"
                + " where vo.niveis=3"
                + " and vo.plano.codigoConta='" + c.getCodigoConta() + "' "
                + " order by vo.codigoConta desc";
     */

    return { code: 200, results: { plano } }

    //  public void adicionarplano4(CdPlanoConta c) {

};

const listarPlanos4 = async function ({ idPlano }) {

    const lista = await useDB({
        query: `select * from Cd_Plano_Conta where id=${idPlano} and niveis=4 order by codigo_Conta asc`
    });

    /**
     *  String hql = "select vo from CdPlanoConta vo "
                    + " where vo.plano=" + c.getId() + " "
                    + " and vo.niveis=4 "
                    + " order by vo.codigoConta asc";
     */

    return { code: 200, results: { lista } }

    //  public List<CdPlanoConta> listarplanos4(CdPlanoConta c) {

};

const adicionarPlano5 = async function ({ codConta }) {

    const plano = await useDB({
        query: `select * from Cd_Plano_Conta where niveis=4 and codigo_Conta='${codConta}' order by codigo_Conta desc`
    });

    /**
     * String hql = "select vo from CdPlanoConta vo"
                + " where vo.niveis=4"
                + " and vo.plano.codigoConta='" + c.getCodigoConta() + "' "
                + " order by vo.codigoConta desc";
     */

    return { code: 200, results: { plano } }

    //  public void adicionarplano5(CdPlanoConta c) {

};

const listarPlanos5 = async function ({ idPlano }) {

    const lista = await useDB({
        query: `select * from Cd_Plano_Conta where id=${idPlano}and niveis=5 order by codigo_Conta asc`
    });

    return { code: 200, results: { lista } }

};

const processarFiltro = async function ({ valor, filtro }) {

    const comecandoCom = await useDB({
        query: `SELECT * FROM cd_plano_conta  WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    });

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_plano_conta  WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
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
            StringBuilder sb = new StringBuilder("SELECT vo FROM CdCargofunc vo");
     */

};

const inserir = async function ({ }) {

    const lista = await useDB({
        query: "select * from Cd_Plano_Conta where niveis=1 order by codigo_Conta desc"
    });

    /**
     *  String hql = "select vo from CdPlanoConta vo"
                + " where vo.niveis=1 "
                + " order by vo.codigoConta desc";
     */

    return { code: 200, results: { lista } }

    //  public void inserir() {

};

const pesquisarPorTexto = async function ({ colunaBusca, textoBusca }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Cd_Plano_Conta WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' and niveis=1 ORDER BY ${colunaBusca} ASC`
    });

    /**
     * String hql = "SELECT vo FROM CdPlanoConta vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' "
                + " and vo.niveis=1 "
                + "ORDER BY vo." + this.colunaBusca + " ASC";
     */

    return { code: 200, results: { pesquisa } }

    //  public void pesquisarPorTexto(String texto) {

};

const pesquisarPorInteiro = async function ({ colunaBusca, textoBusca }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Cd_Plano_Conta WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' and niveis=1 ORDER BY ${colunaBusca} ASC`
    });

    /*
    String hql = "SELECT vo FROM CdPlanoConta vo"
    + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
    + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' "
    + " and vo.niveis=1 "
    + " ORDER BY vo." + this.colunaBusca + " ASC";
    */

    return { code: 200, results: { pesquisa } }

    //  public void pesquisarPorInteiro(String texto) {

};

const preencherListaBusca = async function ({ }) {

    const lista = await useDB({
        query: "select * from Cd_Plano_Conta where niveis=1 order by cast(codigo_Conta as integer) asc"
    });

    /**
     * this.listab = new PlanoContaRN().listarPlanoContaHQL("select vo from CdPlanoConta vo "
                + " where vo.niveis=1 order by cast(vo.codigoConta as integer) asc"); 
     */

    return { code: 200, results: { lista } }

    //  public void preencherListaBusca() {

}

const preencherListaBusca2 = async function ({ }) {

    const lista = await useDB({
        query: "select * from Cd_Plano_Conta where niveis=3 order by codigo_Conta,niveis desc"
    });

    /** 
     *  this.listab = new PlanoContaRN().listarPlanoContaHQL("select vo from CdPlanoConta vo "
                + " where vo.niveis=3"
                + " order by vo.codigoConta,vo.niveis desc");
    */

    return { code: 200, results: { lista } }

    //  public void preencherListaBusca2() {

};

const pesquisarPorTexto2 = async function ({ colunaBusca, textoBusca }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Cd_Plano_Conta WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' and niveis=3 ORDER BY ${colunaBusca} ASC`
    });

    /**
     * String hql = "SELECT vo FROM CdPlanoConta vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' "
                + " and vo.niveis=3 "
                + "ORDER BY vo." + this.colunaBusca + " ASC";
     */

    return { code: 200, results: { pesquisa } }

    //  public void pesquisarPorTexto(String texto) {

};

const pesquisarPorInteiro2 = async function ({ colunaBusca, textoBusca }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Cd_Plano_Conta WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' and niveis=3 ORDER BY ${colunaBusca} ASC`
    });

    /**
     * String hql = "SELECT vo FROM CdPlanoConta vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' "
                + " and vo.niveis=3 "
                + "ORDER BY vo." + this.colunaBusca + " ASC";
     */

    return { code: 200, results: { pesquisa } }

    //  public void pesquisarPorInteiro2(String texto) {

};



module.exports = {
    adicionarPlano2,
    listarPlanos2,
    adicionarPlano3,
    listarPlanos3,
    adicionarPlano7,
    listarPlanos7,
    adicionarPlano6,
    listarPlanos6,
    adicionarPlano4,
    listarPlanos4,
    adicionarPlano5,
    listarPlanos5,
    processarFiltro,
    inserir,
    pesquisarPorTexto,
    pesquisarPorInteiro,
    preencherListaBusca,
    preencherListaBusca2,
    pesquisarPorTexto2,
    pesquisarPorInteiro2
}