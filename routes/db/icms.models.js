const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM cd_tributacaoicms WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 
 
    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_tributacaoicms WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
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

const pegarecfs = async function({ classFiscalId, idLoja, idImpr }){ 

    const classFiscalImpressora = await useDB({ 
        query: ` select * from Lf_Classfiscal_Impressora where classfiscal_Fk=${classFiscalId} and loja_Fk=${idLoja}`
    }); 

    /**
     * List<LfClassfiscalImpressora> s = new LfClassfiscalImpressoraRN().listarClassFiscalHQL(""
                + " select vo from LfClassfiscalImpressora vo "
                + " where vo.classfiscalFk.id=" + icms.getClassfiscalFk().getId() + ""
                + " and lfClassfiscalImpressoraPK.lojaFk=" + loja.getIdLoja() + " ");
     */

    const impressora = await useDB({ 
        query: `select * from Ecf_Impressora where id_Impr=${idImpr} and loja_Fk=${idLoja} and marcaecf_Impr!='NENHUMA' `
    });

    /**
     * EcfImpressora e = new EcfImpressoraRN().pegarEcfImpressora("select vo from EcfImpressora vo"
                    + " where ecfImpressoraPK.idImpr=" + l.getEcfImpressoraFk() + ""
                    + " and  ecfImpressoraPK.lojaFk=" + loja.getIdLoja() + ""
                    + " and marcaecfImpr!='NENHUMA' ");
     */

 return { code: 200, results: { classFiscalImpressora, impressora }}  
    
//  public void pegarecfs() {

};

const pesquisarPorColuna = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Tributacaoicms WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC` 
    }); 

 return { code: 200, results: { pesquisa }}  
    
};

module.exports = {
    processarFiltro,
    pegarecfs,
    pesquisarPorColuna
}