const Utils = require('./use.js');
const { useDB, useQuery } = Utils;
/*
public void init() {
    this.textoBusca = "";
    this.fonte = new ArrayList<>(
            Arrays.asList("Codigo")
    );
    this.alvo = new ArrayList<>();
    //preenche os campos do filtro com campos da tabela
    this.campos = new HashMap<>();
    this.campos.put(this.fonte.get(0), "ecfCupomcabPK.idCupomcab");
    //inserir a lista de colunas(fonte) e a lista de colunas selecionadas(alvo)
    this.colunas = new DualListModel<>(this.fonte, this.alvo);
    this.disabled = true;
    this.ultimo = true;
    this.posicao = 0;
    this.insercao = false;
    this.ecfCupomCab = new EcfCupomcab();
    this.ecfCupomCabb = new EcfCupomcab();
    this.ecfCupomCabs = new EcfCupomcab();
    //coluna inicial de pesquisa
    this.colunaBusca = "cooCupom";
    //verifica a permisso do usuario nessa pagina
    this.permissao = Util.verificaPermissaoDaPagina("ecfCupomCabs");
    this.comparacoes = new ArrayList<>();
    this.filtrosAdicionados = new ArrayList<>();
    //this.ecfCupomCab = new EcfCupomCabRN().pegarUltimoEcfCupomCab();

    CfLoja l = (CfLoja) Util.pegarObjetoDaSessao("loja");

    String hql = "SELECT vo FROM EcfCupomcab vo"
            + " WHERE vo.cfLoja.idLoja=" + l.getIdLoja() + "";
    //  this.ecfCupomCab = new EcfCupomCabRN().pegarEcfCupomCab(hql);
    ecfCupomCab = new EcfCupomcab();

}
*/

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM ecf_cupomcab WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 
 
    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM ecf_cupomcab WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
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
        StringBuilder sb = new StringBuilder("SELECT vo FROM dcbs vo");
 */

};

const salvar = async function({ idLoja }){ 

    const cupomCab = await useDB({ 
        query: `SELECT * FROM Ecf_Cupomcab WHERE loja_fk=${idLoja} ORDER BY id_Cupomcab DESC` 
    }); 

 return { code: 200, results: { cupomCab }}  
    
};

const cancelar = async function({ idLoja }){ 

    const cupomCab = await useDB({ 
        query: `SELECT * FROM Ecf_Cupomcab WHERE loja_fk=${idLoja}`
    }); 

 return { code: 200, results: { cupomCab }}  
    
};

const pesquisarPorColuna = async function({ colunaBusca, textoBusca, idLoja }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Ecf_Cupomcab WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%'  and loja_fk=${idLoja}  and coo_Cupom!=0 ORDER BY ${colunaBusca} ASC` 
    }); 

 return { code: 200, results: { pesquisa }}  
    
};

const pesquisarPorColunav = async function({ colunaBusca, textoBusca, dataInicial, dataFinal, idLoja }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Ecf_Cupomcab WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\D", "")}%' and loja_fk=${idLoja} and status_Cupom in ('F','O','D') and tipo='V' AND (CAST(datahora_Cupom as date) between '${dataInicial}'  and '${dataFinal}') and coo_Cupom!=0 ORDER BY datahora_Cupom desc`
    }); 

 return { code: 200, results: { pesquisa }}  
    
};

const preencherListaBuscav = async function({ colunaBusca, textoBusca, dataInicial, dataFinal, idLoja }){ 

    const lista = await useDB({ 
        query: `SELECT * FROM Ecf_Cupomcab WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\D", "")}%' and loja_fk=${idLoja} and status_Cupom in ('F','O','D') and tipo='V' AND (CAST(datahora_Cupom as date) between '${dataInicial}'  and '${dataFinal}') and coo_Cupom!=0 ORDER BY datahora_Cupom desc`
    }); 

 return { code: 200, results: { lista }}  
    
};

const pesquisarPorColunav2 = async function({ colunaBusca, textoBusca, idLoja}){ 

    const pesquisa  = await useDB({ 
        query: `SELECT * FROM Ecf_Cupomcab WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\D", "")}%'  and loja_fk=${idLoja} and status_Cupom in ('F','O','D') and tipo='V' and coo_Cupom!=0 ORDER BY datahora_Cupom desc`
    }); 

 return { code: 200, results: { pesquisa }}  
    
};

const preencherListaBuscav2 = async function({ colunaBusca, textoBusca, idLoja}){ 

    const lista = await useDB({ 
        query: `SELECT * FROM Ecf_Cupomcab WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\D", "")}%' and loja_fk=${idLoja} and status_Cupom in ('F','O','D') and tipo='V' and coo_Cupom!=0 ORDER BY datahora_Cupom desc`
    }); 

 return { code: 200, results: { lista }}  
    
};

const preencherListaBusca = async function({ colunaBusca, textoBusca, idLoja}){ 

    const lista = await useDB({ 
        query: `SELECT * FROM Ecf_Cupomcab WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\D", "")}%'  and Loja_fk=${idLoja} and coo_Cupom!=0 ORDER BY ${colunaBusca} ASC`
    }); 

 return { code: 200, results: { lista }}  
    
};

module.exports = {
    processarFiltro,
    salvar,
    cancelar,
    pesquisarPorColuna,
    pesquisarPorColunav,
    preencherListaBuscav,
    pesquisarPorColunav2,
    preencherListaBuscav2,
    preencherListaBusca
}