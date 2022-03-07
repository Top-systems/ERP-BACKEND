const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

/* public void init() {
    this.textoBusca = "";

    this.fonte = new ArrayList<>(
            Arrays.asList("Codigo")
    );
    this.alvo = new ArrayList<>();
    //preenche os campos do filtro com campos da tabela
    this.campos = new HashMap<>();
    this.campos.put(this.fonte.get(0), "vdConhecimentoTransportePK.id");
    //inserir a lista de colunas(fonte) e a lista de colunas selecionadas(alvo)
    this.colunas = new DualListModel<>(this.fonte, this.alvo);
    this.disabled = true;
    this.ultimo = true;
    this.posicao = 0;
    this.insercao = false;
    this.conhecimentoTransporte = new VdConhecimentoTransporte();
    this.conhecimentoTransporteb = new VdConhecimentoTransporte();
    this.conhecimentoTransportes = new VdConhecimentoTransporte();
    //coluna inicial de pesquisa
    this.colunaBusca = "numnota";
    //verifica a permisso do usuario nessa pagina
    this.permissao = Util.verificaPermissaoDaPagina("conhecimento transportes");
    this.comparacoes = new ArrayList<>();
    this.filtrosAdicionados = new ArrayList<>();
    if (Util.pegarURI().equals("/ERP/restrito/administracao/conhecimentos_transporte.ip")) {

        CfLoja loja = (CfLoja) Util.pegarObjetoDaSessao("loja");

        String hql = "SELECT vo FROM VdConhecimentoTransporte vo"
                + " WHERE vo.cfLoja=" + loja.getIdLoja() + ""
                + " ORDER BY vo.vdConhecimentoTransportePK.id desc";

        VdConhecimentoTransporte a = new ConhecimentoTransporteRN().pegarConhecimentoTransporte(hql);
        this.conhecimentoTransporte = a;
        verificaTiponota();

    }
} */

const verificaTiponota = async function({ idLoja, idConhecimentoTransporte }){ 

    const contasPagar = await useDB({ 
        query: `SELECT * FROM Fn_Contaspagar WHERE loja_Fk=${idLoja} and conhecimento_transporte_fk=${idConhecimentoTransporte}`
    }); 

 return { code: 200, results: { contasPagar }}  
    
};

const excluir = async function({ idLoja, idConhecimentoTransporte }){ 

    let statusDelete, statusDelete2, statusDelete3;

    const deleteContaspagarPag = await useDB({ 
        query: `DELETE FROM fn_contaspagar_pag where loja_fk=${idLoja} and contaspagar_fk=(select id_contaspagar from fn_contaspagar where conhecimento_transporte_fk =${idConhecimentoTransporte} and loja_fk=${idLoja})`
    }).then(() => {
        statusDelete = 'Registro apagado com sucesso';
    }).catch((err) => {
        statusDelete = err.message;
    });

    const deleteContasPagar = await useDB({
        query:`delete from Fn_Contaspagar where conhecimento_transporte_fk=${idConhecimentoTransporte} and loja_Fk=${idLoja}`
    }).then(() => {
        statusDelete2 = 'Registro apagado com sucesso';
    }).catch((err) => {
        statusDelete2 = err.message;
    });

    const deleteConhecimentoTransporte = await useDB({
        query:`delete  from  Vd_Conhecimento_Transporte where id=${idConhecimentoTransporte} and loja_Fk=${idLoja}`
    }).then(() => {
        statusDelete3 = 'Registro apagado com sucesso';
    }).catch((err) => {
        statusDelete3 = err.message;
    });

 return { code: 200, results: { statusDelete, statusDelete2, statusDelete3 }}  
    
};

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM Vd_conhecimento_transporte WHERE ${filtro} like '${valor.toUpperCase()}%'`
    }); 
 
    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM Vd_conhecimento_transporte WHERE ${filtro} LIKE '%${valor.toUpperCase()}%'`
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
        StringBuilder sb = new StringBuilder("SELECT vo FROM VdAbastecimentos vo");
 */

};

const salvar = async function({ idLoja, idConhecimentoTransporte, idContasPagar }){ 

    let statusUpdate

    const conhecimentoTransporte = await useDB({ 
        query: `SELECT * FROM Vd_Conhecimento_Transporte WHERE loja_fk=${idLoja} ORDER BY id DESC`
    }); 

    const contasPagar = await useDB({
        query:`SELECT * FROM Fn_Contaspagar WHERE loja_Fk=${idLoja} ORDER BY id_Contaspagar DESC`
    });

    const update = await useDB({
        query:`update fn_contaspagar set conhecimento_transporte_fk=${idConhecimentoTransporte}  where id_contaspagar=${idContasPagar} and loja_fk=${idLoja}`
    }).then(() => {
        statusUpdate = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate = {
            erro: err.message,
            detalhe: err.detail
        };
    });

 return { code: 200, results: { conhecimentoTransporte, contasPagar, statusUpdate }}  
    
};

const primeiro = async function({ idLoja }){ 

    const conhecimentoTransporte = await useDB({ 
        query: `SELECT * FROM Vd_Conhecimento_Transporte WHERE loja_fk=${idLoja}`
    }); 

 return { code: 200, results: { conhecimentoTransporte }}  
    
};

const ultimo = async function({ idLoja }){ 

    const conhecimentoTransporte = await useDB({ 
        query: `SELECT * FROM Vd_Conhecimento_Transporte WHERE loja_fk=${idLoja}`
    }); 
 return { code: 200, results: { conhecimentoTransporte }}  
    
};

const anterior = async function({ idLoja }){ 

    const conhecimentoTransporte = await useDB({ 
        query: `SELECT * FROM Vd_Conhecimento_Transporte WHERE loja_fk=${idLoja}`
    }); 
 return { code: 200, results: { conhecimentoTransporte }}  
    
};

const proximo = async function({ idLoja }){ 

    const conhecimentoTransporte = await useDB({ 
        query: `SELECT * FROM Vd_Conhecimento_Transporte WHERE loja_fk=${idLoja}`
    }); 
 return { code: 200, results: { conhecimentoTransporte }}  
    
};

const cancelar = async function({ idLoja }){ 

    const conhecimentoTransporte = await useDB({ 
        query: `SELECT * FROM Vd_Conhecimento_Transporte WHERE loja_fk=${idLoja} ORDER BY id ASC`
    }); 
 return { code: 200, results: { conhecimentoTransporte }}  
    
};

const pesquisarPorColuna = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Vd_Conhecimento_Transporte WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase()}%' ORDER BY ${colunaBusca} ASC`
    }); 

 return { code: 200, results: {  pesquisa}}  
    
};

const preencherListaBusca = async function({ idLoja }){ 

    const lista = await useDB({ 
        query:`SELECT * FROM Vd_Conhecimento_Transporte WHERE loja_fk=${idLoja} ORDER BY data_Entrada  DESC`
    }); 

 return { code: 200, results: { lista }}  
    
};

module.exports = {
    verificaTiponota,
    excluir,
    processarFiltro,
    salvar,
    primeiro,
    ultimo,
    anterior,
    proximo,
    cancelar,
    pesquisarPorColuna,
    preencherListaBusca
}