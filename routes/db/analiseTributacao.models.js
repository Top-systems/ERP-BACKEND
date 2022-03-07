const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const atualizar = async function({ ncmCompleto, tipoRegimento, cest }){ 

    const tribNcm = await useDB({ 
        query: `select * from Trib_Ncm where ncm_Completo='${ncmCompleto}' and tiporegimento=${tipoRegimento}`
    }); 

    /**
     * TribNcm ncm = new NcmRN().pegarNcm("select vo from TribNcm vo"
             + " where vo.ncmCompleto='" + p.getNcmws() + "'"
            + " and vo.tiporegimento=" + loja.getTipocrtLoja() + " ");
     */

    const PegarCest = await useDB({ 
        query:`select * from Cd_Cest where cest='${cest}'`
    });

    /**
     *  CdCest cest = new CestRN().pegarCest(""
                + " select vo from CdCest vo"
                + " where vo.cest='" + p.getCestws() + "'");
     */

 return { code: 200, results: { tribNcm, PegarCest }}  

//  public void atualizar() {
    
};

const atualizarl = async function({ descListaPositivo }){ 

    const listaPositivo = await useDB({ 
        query:`select * from Cd_Listapositivo where descricao_Listpositivo='${descListaPositivo}'`
    }); 

    /**
     * CdListapositivo ncm = new ListaPositivoRN().pegarListaPositivo(""
                                    + " select vo from CdListapositivo vo"
                                    + " where vo.descricaoListpositivo='" + p.getListapositivo() + "'"
                                    + "  ");
     */

 return { code: 200, results: { listaPositivo }}
 
//  public void atualizarl() {
    
};

const listar = async function({ idLoja, dataInicial, dataFinal, idProd }){ 

    const lista = await useDB({ 
        query: `select Ecf_Cupomdet_Prod.* from Ecf_Cupomdet_Prod, ecf_cupomcab where status_Cupitem='F' and (cast(ecf_Cupomcab.datahora_Cupom as date)  between '${dataInicial}' and '${dataFinal}') and ecf_Cupomcab.status_Cupom in ('F','O') and Ecf_Cupomdet_Prod.loja_fk=${idLoja} and ecf_Cupomcab.loja_fk=${idLoja}`
    }); 

    /**
     * List<EcfCupomdetProd> itens = new EcfDetProdRN().listarCargoHQL(""
                    + "select vo"
                    + " from EcfCupomdetProd vo"
                    + " where vo.statusCupitem='F'"
                    + " and (cast(vo.ecfCupomcab.datahoraCupom as date) "
                    + " between '" + sd.format(datai) + "' and '" + sd.format(dataf) + "')"
                    + " and vo.ecfCupomcab.statusCupom in ('F','O')"
                    + " and vo.cfLoja.idLoja=" + loja.getIdLoja() + " "
                    + " and vo.ecfCupomcab.cfLoja.idLoja=" + loja.getIdLoja() + " ");
     */

    const codBarra = await useDB({ 
        query:" SELECT numero_codbar FROM public.cd_codigobarras  where produto_fk=" + idProd + " and ativo_codbar='S'"
    });

    /**
     *  String codbarra = (String) new CargoRN().porSql2semcache(""
                            + " SELECT numero_codbar\n"
                            + "  FROM public.cd_codigobarras\n"
                            + "  where produto_fk=" + iten.getProdutoFk().getIdProd() + ""
                            + " and ativo_codbar='S'");
     */

    const listaCompraDetalhe = await useDB({ 
        query: `select Fn_Compra_Detalhe.* from Fn_Compra_Detalhe, fn_Compra_Cabecalho  where (cast(fn_Compra_Cabecalho.dataentradasaida_Compracab as date)  between '${dataInicial}' and '${dataFinal}') and Fn_Compra_Detalhe.loja_Fk=${idLoja}  and fn_Compra_Cabecalho.loja_fk=${idLoja} and produto_Fk is not null ` 
    });  

    /**
     *List<FnCompraDetalhe> itensc = new CompraDetalheRN().listarCompradetalheHQL(""
                    + "select vo"
                    + " from FnCompraDetalhe vo"
                    + " where (cast(vo.fnCompraCabecalho.dataentradasaidaCompracab as date) "
                    + " between '" + sd.format(datai) + "' and '" + sd.format(dataf) + "')"
                    + " and vo.lojaFk.idLoja=" + loja.getIdLoja() + " "
                    + " and vo.fnCompraCabecalho.cfLoja.idLoja=" + loja.getIdLoja() + ""
                    + " and produtoFk is not null "); 
     */

    const nfeDetalhe = await useDB({ 
        query: `select Nfe_Detalhe.* from Nfe_Detalhe, nfe_Cabecalho where (cast(nfe_Cabecalho.dataentradasaida_Nfecab as date)  between '${dataInicial}' and '${dataFinal}') and Nfe_Detalhe.Loja_fk=${idLoja}  and nfe_Cabecalho.loja_fk=${idLoja}  and produto_Fk is not null` 
    });

    /**
     * List<NfeDetalhe> itensn = new NfeDetalheRN().listarNfeDetalheHQL(""
                    + "select vo"
                    + " from NfeDetalhe vo"
                    + " where (cast(vo.nfeCabecalho.dataentradasaidaNfecab as date) "
                    + " between '" + sd.format(datai) + "' and '" + sd.format(dataf) + "')"
                    + " and vo.cfLoja.idLoja=" + loja.getIdLoja() + " "
                    + " and vo.nfeCabecalho.cfLoja.idLoja=" + loja.getIdLoja() + " "
                    + " and produtoFk is not null");
     */

 return { code: 200, results: { lista, codBarra, listaCompraDetalhe, nfeDetalhe }}  

//  public void listar() {
    
};


module.exports = {
    atualizar,
    atualizarl,
    listar
}