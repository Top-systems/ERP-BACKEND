const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

/**
 *  public void init() {this.textoBusca="";
        this.fonte = new ArrayList<>(
                Arrays.asList("Codigo")
        );
        this.alvo = new ArrayList<>();
        //preenche os campos do filtro com campos da tabela
        this.campos = new HashMap<>();
        this.campos.put(this.fonte.get(0), "vdContascontabeisPK.id");
        //inserir a lista de colunas(fonte) e a lista de colunas selecionadas(alvo)
        this.colunas = new DualListModel<>(this.fonte, this.alvo);
        this.disabled = true;
        this.ultimo = true;
        this.posicao = 0;
        this.insercao = false;
        this.contaContabil = new VdContascontabeis();
        this.contaContabilb = new VdContascontabeis();
        this.contaContabils = new VdContascontabeis();
        //coluna inicial de pesquisa
        this.colunaBusca = "vdContascontabeisPK.id";
        //verifica a permisso do usuario nessa pagina
        this.permissao = Util.verificaPermissaoDaPagina("contaContabils");
        this.comparacoes = new ArrayList<>();
        this.filtrosAdicionados = new ArrayList<>();

        CfLoja loja = (CfLoja) Util.pegarObjetoDaSessao("loja");

        String hql = "SELECT vo FROM VdContascontabeis vo"
                + " WHERE vo.vdContascontabeisPK.lojaFk=" + loja.getIdLoja() + ""
                + "ORDER BY vo.vdContascontabeisPK.id ASC";
        this.contaContabil = new ContaContabilRN().pegarContaContabil(hql);
    }

*/

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM vd_contascontabeis WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 
 
    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM vd_contascontabeis WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
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
        StringBuilder sb = new StringBuilder("SELECT vo FROM VdContascontabeis vo");
 */

};

const listaAlvo = async function({ idLoja }){ 

    const lista = await useDB({ 
        query: `SELECT * FROM Vd_Contascontabeis WHERE loja_Fk=${idLoja} ORDER BY id ASC` 
    }); 

    /**
     * String hql = "SELECT vo FROM VdContascontabeis vo"
                    + " WHERE vo.vdContascontabeisPK.lojaFk=" + loja.getIdLoja() + ""
                    + "ORDER BY vo.vdContascontabeisPK.id ASC";
     */

 return { code: 200, results: { lista }}  

//  public void listaAlvo() {
    
};

const salvar = async function({ idLoja }){ 

    const salvar1 = await useDB({ 
        query: `SELECT * FROM Vd_Contascontabeis WHERE loja_fk=${idLoja} ORDER BY id DESC`
    }); 

    /**
     * String hql = "SELECT vo FROM VdContascontabeis vo"
                    + " WHERE vo.cfLoja=" + l.getIdLoja() + ""
                    + " ORDER BY vo.vdContascontabeisPK.id DESC";
     */

 return { code: 200, results: { salvar1 }}  

//  public void salvar() {
    
};

const pesquisarPorColuna = async function({ textoBusca, colunaBusca, idLoja }){ 

    const pesquisa = await useDB({ 
        query:`SELECT * FROM Vd_Contascontabeis WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' AND loja_Fk=${idLoja} ORDER BY ${colunaBusca} ASC` 
    }); 

 return { code: 200, results: { pesquisa }}  
    
};

const preencherListaBusca = async function({ idLoja }){ 

    const lista = await useDB({ 
        query: `SELECT * FROM Vd_Contascontabeis WHERE  loja_Fk=${idLoja}` 
    }); 

 return { code: 200, results: { lista }}  
    
};

module.exports = {
    processarFiltro,
    listaAlvo,
    salvar,
    pesquisarPorColuna,
    preencherListaBusca
}