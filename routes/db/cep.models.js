const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

/*
public void init() {
    ufs = new EstadoRN().listarHQL("select vo from CdEstado vo order by nome asc");
    this.textoBusca = "";
    Util.atualizasequencia("id_cep", "cd_cep", "cd_cep_id_cep_seq");
    this.fonte = new ArrayList<>(
            Arrays.asList("Codigo", "Cep", "Cidade", "IBGE")
    );
    this.alvo = new ArrayList<>();
    //preenche os campos do filtro com campos da tabela
    this.campos = new HashMap<>();
    this.campos.put(this.fonte.get(0), "idCep");
    this.campos.put(this.fonte.get(1), "cep");
    this.campos.put(this.fonte.get(2), "cidadeFk.nomeCid");
    this.campos.put(this.fonte.get(3), "cidadeFk.codibgeCid");
    //inserir a lista de colunas(fonte) e a lista de colunas selecionadas(alvo)
    this.colunas = new DualListModel<>(this.fonte, this.alvo);
    this.disabled = true;
    this.ultimo = true;
    this.posicao = 0;
    this.insercao = false;
    this.cep = new CdCep();
    this.cepb = new CdCep();
    this.ceps = new CdCep();
    this.escolha = "1";
    //coluna inicial de pesquisa
    this.colunaBusca = "cep";
    //verifica a permisso do usuario nessa pagina
    this.permissao = Util.verificaPermissaoDaPagina("ceps");
    this.comparacoes = new ArrayList<>();
    this.filtrosAdicionados = new ArrayList<>();
    if (Util.pegarURI().equals("/ERP/restrito/sistema/ceps.ip")) {
        this.cep = new CepRN().pegarUltimoCep();
    }
}
*/

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM cd_Cep WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 
 
    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_Cep WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
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
        StringBuilder sb = new StringBuilder("SELECT vo FROM CdCep vo");
 */

};

const salvar = async function({ nomeCid, sigla }){ 

    const cidade = await useDB({ 
        query: `select * from Cd_Cidade where nome_Cid='${nomeCid}'`
    }); 

    /**
     * 
            String cidade = "select vo from CdCidade vo where vo.nomeCid='" + cep.getCidadeFk().getNomeCid() + "'";
     */

    const estado = await useDB({
        query: `select * from Cd_Estado where sigla='${sigla}'`
    })
    /**
     * String uf = "select vo from CdEstado vo where vo.sigla='" + cep.getCidadeFk().getEstadoFk().getSigla() + "'";
     */

 return { code: 200, results: { cidade, estado }}  
//  public void salvar() {
};

const atualizacep = async function({ codIbge, sigla }){ 

    const atualiza = await useDB({ 
        query: `select * from Cd_Cidade where codibge_Cid='${codIbge}'`
    }); 

    /**
     * CdCidade ci = new CidadeRN().pegarCidade("select vo from CdCidade vo where codibgeCid='" + r.getIbge() + "'");
     */

    const atualiza2 = await useDB({ 
        query: `select * from Cd_Estado where sigla='${sigla}'`
    });

    /**
     * ci.setEstadoFk(new EstadoRN().pegarEstado("select vo from CdEstado vo where sigla='" + r.getUf() + "'"));
     */

 return { code: 200, results: { atualiza, atualiza2 }}  
    // public void atualizacep() {
        
};

const pesquisarPorColuna = async function({ textoBusca, colunaBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Cep WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\d", "")}%' ORDER BY ${colunaBusca} ASC`
    }); 

 return { code: 200, results: { pesquisa }}  
    
};

const preencherListaBuscaCidade = async function({  }){ 

    const lista = await useDB({ 
        query: "select distinct cidade_Fk from Cd_Cep order by cidade_Fk" 
    });
    
    /**
     * this.listab = new CepRN().listarCepHQL("select distinct vo.cidadeFk from CdCep vo"
                    + " order by cidadeFk.nomeCid");
     */

 return { code: 200, results: { lista }}  

//  public void preencherListaBuscacidade() {
    
};

const pesquisarPorColunaCidade = async function({ textoBusca, colunaBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT distinct cidade_fk FROM Cd_Cep WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\d", "")}%' ORDER BY ${colunaBusca} ASC`
    }); 

    /**
     * String hql = "SELECT distinct vo.cidadeFk  FROM CdCep vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' "
                + " ORDER BY vo." + this.colunaBusca + " ASC";
     */

 return { code: 200, results: { pesquisa }}

//  public void pesquisarPorColunacidade() {
};

const logo = async function({ idLoja }){ 

    const foto = await useDB({ 
        query: `select logo_loja from cf_loja where id_loja=${idLoja}`
    }); 
    /**
        byte[] foto = (byte[]) new CargoRN().porSql2semcache("select logo_loja from cf_loja where id_loja=" + loja.getIdLoja() + " ");
     * 
     */
 return { code: 200, results: { foto }}  

//  public String logo() {

    
};

module.exports = {
    processarFiltro,
    salvar,
    atualizacep,
    pesquisarPorColuna,
    preencherListaBuscaCidade,
    pesquisarPorColunaCidade,
    logo
}