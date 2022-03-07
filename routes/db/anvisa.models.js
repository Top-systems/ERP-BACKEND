const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const entradaMedicamento = async function({ dataInicio, dataFim, idLoja }){ 

    const entrada = await useDB({ 
        query: `SELECT Fn_Compra_Medicamentodet.* FROM Fn_Compra_Medicamentodet, cd_produto, fn_compra_cabecalho, fn_compra_detalhe  WHERE Fn_Compra_Medicamentodet.loja_Fk = ${idLoja} AND (cd_produto.classeterapeutica_Prod = '1' OR cd_produto.classeterapeutica_Prod = '2' )  AND fn_compra_cabecalho.dataentradasaida_Compracab BETWEEN '${dataInicio}'  AND '${dataFim}' AND Fn_Compra_Medicamentodet.compradet_fk = fn_compra_detalhe.id_compradet AND fn_compra_detalhe.produto_fk = cd_produto.id_prod  ORDER BY fn_Compra_Cabecalho.dataentradasaida_Compracab ` 
    }); 


    /**
     *  String hql = "SELECT vo FROM FnCompraMedicamentodet vo"
                + " WHERE vo.lojaFk = " + loja.getIdLoja() + ""
                + " AND (vo.compradetFk.produtoFk.classeterapeuticaProd = '1' OR vo.compradetFk.produtoFk.classeterapeuticaProd = '2' ) "
                + " AND vo.compradetFk.fnCompraCabecalho.dataentradasaidaCompracab BETWEEN '" + format.format(this.dataInicio) + "' "
                + " AND '" + format.format(this.dataFim) + "' "
                + " ORDER BY vo.compradetFk.fnCompraCabecalho.dataentradasaidaCompracab ";
     */


 return { code: 200, results: { entrada }}  

//  public void entradaMedicamento() {

    
};

const entradaMedicamentoInventario = async function({ idLoja }){ 

    const entrada = await useDB({ 
        query: `SELECT Fn_Compra_Medicamentodet.* FROM Fn_Compra_Medicamentodet, cd_produto, fn_compra_cabecalho, fn_compra_detalhe WHERE Fn_Compra_Medicamentodet.loja_Fk = ${idLoja} AND (cd_produto.classeterapeutica_Prod = '1' OR cd_produto.classeterapeutica_Prod = '2' ) AND Fn_Compra_Medicamentodet.compradet_fk = fn_compra_detalhe.id_compradet AND fn_compra_detalhe.produto_fk = cd_produto.id_prod  ORDER BY fn_Compra_Cabecalho.dataentradasaida_Compracab `
    }); 

    /**
     * String hql = "SELECT vo FROM FnCompraMedicamentodet vo"
                + " WHERE vo.lojaFk = " + loja.getIdLoja() + ""
                + " AND (vo.compradetFk.produtoFk.classeterapeuticaProd = '1' OR vo.compradetFk.produtoFk.classeterapeuticaProd = '2' ) "
                + " ORDER BY vo.compradetFk.fnCompraCabecalho.dataentradasaidaCompracab ";
     */

 return { code: 200, results: { entrada }}  

//  public void entradaMedicamentoInventario() {

    
};

const saidaMedicamento = async function({ idLoja, dataInicio, dataFim }){ 

    const saida = await useDB({ 
        query: `SELECT Ecf_Cupomdet_Prod.* FROM Ecf_Cupomdet_Prod, cd_produto, ecf_cupomcab WHERE ecf_Cupomdet_Prod.loja_Fk = ${idLoja} AND (cd_produto.classeterapeutica_Prod = '1' OR cd_produto.classeterapeutica_Prod = '2' ) AND ecf_Cupomcab.datahora_Cupom BETWEEN '${dataInicio}'  AND '${dataFim}' and Ecf_Cupomdet_Prod.status_Cupitem='F' and cd_produto.id_prod = ecf_cupomdet_prod.produto_fk and ecf_cupomcab.id_cupomcab = Ecf_Cupomdet_Prod.cupomcab_fk`
    }); 

    /**
     *  String hql = "SELECT vo FROM EcfCupomdetProd vo"
                + " WHERE vo.ecfCupomdetProdPK.lojaFk = " + loja.getIdLoja() + ""
                + " AND (vo.produtoFk.classeterapeuticaProd = '1' OR vo.produtoFk.classeterapeuticaProd = '2' )"
                + " AND vo.ecfCupomcab.datahoraCupom BETWEEN '" + format.format(this.dataInicio) + "' "
                + " AND '" + format.format(this.dataFim) + "' and vo.statusCupitem='F' ";
     */

 return { code: 200, results: { saida }}  

//  public void saidaMedicamento() {

};

const perdaMedicamento = async function({ idLoja, dataInicio, dataFim }){ 

    const perda = await useDB({ 
        query: `SELECT Ecf_Cupomdet_Prod.* FROM Ecf_Cupomdet_Prod, cd_produto, ecf_cupomcab WHERE ecf_Cupomdet_Prod.loja_Fk = ${idLoja} AND (cd_produto.classeterapeutica_Prod = '1' OR cd_produto.classeterapeutica_Prod = '2' ) AND ecf_Cupomcab.datahora_Cupom BETWEEN '${dataInicio}'  AND '${dataFim}' and Ecf_Cupomdet_Prod.status_Cupitem='F' and cd_produto.id_prod = ecf_cupomdet_prod.produto_fk and ecf_cupomcab.id_cupomcab = Ecf_Cupomdet_Prod.cupomcab_fk` 
    }); 

    /**
     *   String hql = "SELECT vo FROM EcfCupomdetProd vo"
                + " WHERE vo.ecfCupomdetProdPK.lojaFk = " + loja.getIdLoja() + ""
                + " AND (vo.produtoFk.classeterapeuticaProd = '1' OR vo.produtoFk.classeterapeuticaProd = '2' )"
                + " AND vo.ecfCupomcab.datahoraCupom BETWEEN '" + format.format(this.dataInicio) + "' "
                + " AND '" + format.format(this.dataFim) + "' and vo.statusCupitem='F' ";
     */

 return { code: 200, results: { perda }}  

//  public void perdaMedicamento() {
    
};

const dataIni = async function({ idLoja }){ 

    const data = await useDB({ 
        query:`SELECT datafinal FROM Cd_Arquivosanvisa  WHERE situacao = 'M' AND loja_fk = ${idLoja}  ORDER BY datafinal DESC` 
    }); 

    /**
     *  String hql = "SELECT vo.datafinal FROM CdArquivosanvisa vo"
                + " WHERE vo.situacao = 'M'"
                + " AND vo.cfLoja = " + loja.getIdLoja() + " "
                + " OREDER BY vo.datafinal DESC";
     */

 return { code: 200, results: { data }}  

//  public void dataIni() {

};

const listaXml = async function({ idLoja }){ 

    const lista = await useDB({ 
        query: `SELECT * FROM Cd_Arquivosanvisa WHERE situacao = 'E'  AND loja_fk= ${idLoja}`
    }); 

    /**
     *  String hql = "SELECT vo FROM CdArquivosanvisa vo"
                + " WHERE vo.situacao = 'E' "
                + " AND vo.cfLoja = " + loja.getIdLoja() + " ";
     */

 return { code: 200, results: { lista }}  

//  public void listaXml() {
    
};

const movimentacaoAnvisa = async function({ idLoja }){ 

    const movimentacao = await useDB({ 
        query: `SELECT * FROM Cd_Arquivosanvisa  WHERE loja_Fk=${idLoja} ORDER BY id DESC`
    }); 

    /**
     *String hql = "SELECT usu FROM CdArquivosanvisa usu"
                        + " WHERE usu.cdArquivosanvisaPK.lojaFk=" + loja.getIdLoja() + ""
                        + " ORDER BY usu.cdArquivosanvisaPK.id DESC"; 
     */

 return { code: 200, results: { movimentacao }}  

//  public void movimentacaoAnvisa() {
 
};

module.exports = {
    entradaMedicamento,
    entradaMedicamentoInventario,
    saidaMedicamento,
    perdaMedicamento,
    dataIni,
    listaXml,
    movimentacaoAnvisa
}