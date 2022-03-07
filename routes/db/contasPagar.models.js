const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const presalvarcp = async function ({ idLoja, idCompracab, idConhecimentoTransporte, idTelecomunicacao, idAguaLuz, idServico, updateServicoFKData, updateAguaLuzFKData, updateCompraFKData, updateConhecimentoTransporteFKData, updateTelecomunicacaoFKData }) {

    let statusUpdate, statusUpdate2, statusUpdate3, statusUpdate4, statusUpdate5;

    const CompraFK = await useDB({
        query: `SELECT id_contaspagar FROM public.fn_contaspagar where loja_fk=${idLoja} AND status_contaspagar!='D' and compra_fk=${idCompracab} `
    });

    const ConhecimentoTransporteFK = await useDB({
        query: `SELECT id_contaspagar FROM public.fn_contaspagar where loja_fk=${idLoja} AND status_contaspagar!='D' and conhecimento_transporte_fk=${idConhecimentoTransporte} `
    });

    const TelecomunicacaoFK = await useDB({
        query: `SELECT id_contaspagar FROM public.fn_contaspagar where loja_fk=${idLoja} AND status_contaspagar!='D' and telecomunicacao_fk=${idTelecomunicacao} `
    });

    const aguaLuzFK = await useDB({
        query: `SELECT id_contaspagar FROM public.fn_contaspagar where loja_fk=${idLoja} AND status_contaspagar!='D' and agualuz_fk=${idAguaLuz} `
    });

    const servicoFK = await useDB({
        query: `SELECT id_contaspagar FROM public.fn_contaspagar where loja_fk=${idLoja} AND status_contaspagar!='D' and servico_fk=${idServico} `
    });

    const updateServicoFK = await useDB({
        query: `UPDATE public.fn_contaspagar SET agualuz_fk=null,compra_fk=null,conhecimento_transporte_fk=null, telecomunicacao_fk=null,fornecedor_fk=null, servico_fk=${updateServicoFKData.servico_fk} WHERE id_contaspagar=${updateServicoFKData.condicao.id_contaspagar}  and loja_fk=${updateServicoFKData.condicao.loja_fk} `
    }).then(() => {
        statusUpdate = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate = {
            erro: err.message,
            detalhe: err.detail
        }
    });

    const updateAguaLuzFK = await useDB({
        query: `UPDATE public.fn_contaspagar SET servico_fk=null,compra_fk=null,conhecimento_transporte_fk=null, telecomunicacao_fk=null,fornecedor_fk=null, agualuz_fk=${updateAguaLuzFKData.agualuz_fk} WHERE id_contaspagar=${updateAguaLuzFKData.condicao.id_contaspagar}  and loja_fk=${updateAguaLuzFKData.condicao.loja_fk} `
    }).then(() => {
        statusUpdate2 = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate2 = {
            erro: err.message,
            detalhe: err.detail
        }
    });

    const updateCompraFK = await useDB({
        query: `UPDATE public.fn_contaspagar SET servico_fk=null,conhecimento_transporte_fk=null, agualuz_fk=null, telecomunicacao_fk=null,fornecedor_fk=null, compra_fk=${updateCompraFKData.compra_fk} WHERE id_contaspagar=${updateCompraFKData.condicao.id_contaspagar} and loja_fk=${updateCompraFKData.condicao.loja_fk} `
    }).then(() => {
        statusUpdate3 = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate3 = {
            erro: err.message,
            detalhe: err.detail
        }
    });

    const updateConhecimentoTransporteFK = await useDB({
        query: `UPDATE public.fn_contaspagar SET servico_fk=null,compra_fk=null, agualuz_fk=null, telecomunicacao_fk=null,fornecedor_fk=null, conhecimento_transporte_fk=${updateConhecimentoTransporteFKData.conhecimento_transporte_fk} WHERE id_contaspagar=${updateConhecimentoTransporteFKData.condicao.id_contaspagar} and loja_fk=${updateConhecimentoTransporteFKData.condicao.loja_fk} `
    }).then(() => {
        statusUpdate4 = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate4 = {
            erro: err.message,
            detalhe: err.detail
        }
    });

    const updateTelecomunicacaoFK = await useDB({
        query: `UPDATE public.fn_contaspagar SET servico_fk=null,compra_fk=null,conhecimento_transporte_fk=null, agualuz_fk=null,fornecedor_fk=null, telecomunicacao_fk=${updateTelecomunicacaoFKData.telecomunicacao_fk} WHERE id_contaspagar=${updateTelecomunicacaoFKData.condicao.id_contaspagar} and loja_fk=${updateTelecomunicacaoFKData.condicao.loja_fk} `
    }).then(() => {
        statusUpdate5 = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate5 = {
            erro: err.message,
            detalhe: err.detail
        }
    });

    return { code: 200, results: { CompraFK, ConhecimentoTransporteFK, TelecomunicacaoFK, aguaLuzFK, servicoFK, statusUpdate, statusUpdate2, statusUpdate3, statusUpdate4, statusUpdate5 } }

};

const salvarcontasapagar = async function ({ idLoja, updateServicoFKData, updateAguaLuzFKData, updateCompraFKData, updateConhecimentoTransporteFKData, updateTelecomunicacaoFKData }) {

    let statusUpdate, statusUpdate2, statusUpdate3, statusUpdate4, statusUpdate5;

    const idContasPagar = await useDB({
        query: `SELECT max(id_contaspagar)+1 as idc FROM public.fn_contaspagar where loja_fk=${idLoja} `
    });

    const updateServicoFK = await useDB({
        query: `UPDATE public.fn_contaspagar SET agualuz_fk=null,compra_fk=null,conhecimento_transporte_fk=null, telecomunicacao_fk=null,fornecedor_fk=null, servico_fk=${updateServicoFKData.servico_fk} WHERE id_contaspagar=${updateServicoFKData.condicao.id_contaspagar}  and loja_fk=${updateServicoFKData.condicao.loja_fk} `
    }).then(() => {
        statusUpdate = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate = {
            erro: err.message,
            detalhe: err.detail
        }
    });

    const updateAguaLuzFK = await useDB({
        query: `UPDATE public.fn_contaspagar SET servico_fk=null,compra_fk=null,conhecimento_transporte_fk=null, telecomunicacao_fk=null,fornecedor_fk=null, agualuz_fk=${updateAguaLuzFKData.agualuz_fk} WHERE id_contaspagar=${updateAguaLuzFKData.condicao.id_contaspagar}  and loja_fk=${updateAguaLuzFKData.condicao.loja_fk} `
    }).then(() => {
        statusUpdate2 = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate2 = {
            erro: err.message,
            detalhe: err.detail
        }
    });

    const updateCompraFK = await useDB({
        query: `UPDATE public.fn_contaspagar SET servico_fk=null,conhecimento_transporte_fk=null, agualuz_fk=null, telecomunicacao_fk=null,fornecedor_fk=null, compra_fk=${updateCompraFKData.compra_fk} WHERE id_contaspagar=${updateCompraFKData.condicao.id_contaspagar} and loja_fk=${updateCompraFKData.condicao.loja_fk} `
    }).then(() => {
        statusUpdate3 = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate3 = {
            erro: err.message,
            detalhe: err.detail
        }
    });

    const updateConhecimentoTransporteFK = await useDB({
        query: `UPDATE public.fn_contaspagar SET servico_fk=null,compra_fk=null, agualuz_fk=null, telecomunicacao_fk=null,fornecedor_fk=null, conhecimento_transporte_fk=${updateConhecimentoTransporteFKData.conhecimento_transporte_fk} WHERE id_contaspagar=${updateConhecimentoTransporteFKData.condicao.id_contaspagar} and loja_fk=${updateConhecimentoTransporteFKData.condicao.loja_fk} `
    }).then(() => {
        statusUpdate4 = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate4 = {
            erro: err.message,
            detalhe: err.detail
        }
    });

    const updateTelecomunicacaoFK = await useDB({
        query: `UPDATE public.fn_contaspagar SET servico_fk=null,compra_fk=null,conhecimento_transporte_fk=null, agualuz_fk=null,fornecedor_fk=null, telecomunicacao_fk=${updateTelecomunicacaoFKData.telecomunicacao_fk} WHERE id_contaspagar=${updateTelecomunicacaoFKData.condicao.id_contaspagar} and loja_fk=${updateTelecomunicacaoFKData.condicao.loja_fk} `
    }).then(() => {
        statusUpdate5 = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate5 = {
            erro: err.message,
            detalhe: err.detail
        }
    });


    return { code: 200, results: { idContasPagar, statusUpdate, statusUpdate2, statusUpdate3, statusUpdate4, statusUpdate5 } }

};

const verifica = async function ({ idContasPagar, idLoja }) {

    const nomeTransp = await useDB({
        query: `select tr.nome_transp from fn_contaspagar as cp inner join vd_conhecimento_transporte as vc on (cp.conhecimento_transporte_fk=vc.id and cp.loja_fk=vc.loja_fk) inner join cd_transportadora as tr on tr.id_transp = vc.transportadora_fk where (cp.id_contaspagar=${idContasPagar} and cp.loja_fk=${idLoja}) and  cp.conhecimento_transporte_fk is not null `
    });


    return { code: 200, results: { nomeTransp } }

};

const verifica2 = async function ({ idContasPagar, idLoja }) {

    const ConhecimentoTransporteFK = await useDB({
        query: `select cp.conhecimento_transporte_fk from fn_contaspagar as cp where (cp.id_contaspagar=${idContasPagar} and cp.loja_fk=${idLoja}) and  cp.conhecimento_transporte_fk is not null `
    });

    return { code: 200, results: { ConhecimentoTransporteFK } }

};

const baixar = async function ({ idLoja, insertContasPagarPagData, insertMovContaHistData }) {

    let statusInsert, statusInsert2;

    const idContasPagarPag = await useDB({
        query: `SELECT max(id_contaspagar_pag)+1 as idc FROM public.fn_contaspagar_pag where loja_fk=${idLoja} `
    });

    const insertContasPagarPag = await useDB({
        query: `insert into fn_contaspagar_pag  (
            id_contaspagar_pag,
            loja_fk,
            contaspagar_fk,
            numparcela,
            valorpago,
            datapagto,
            usuarioaltera,
            dataaltera,
            status)values(
                ${idContasPagarPag[0].idc},
                ${insertContasPagarPagData.loja_fk},
                ${insertContasPagarPagData.contaspagar_fk},
                ${insertContasPagarPagData.numparcela},
                ${insertContasPagarPagData.valorpago},
                '${insertContasPagarPagData.datapagto}',
                ${insertContasPagarPagData.usuarioaltera},
                '${insertContasPagarPagData.dataaltera}',
                'Q')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = {
            erro: err.message,
            detalhe: err.detail
        }
    });

    const idMovContaHist = await useDB({
        query: `select max(id_movcontahist)+1 as idc from fn_movcontahist where loja_fk=${idLoja} `
    });

    const insertMovContaHist = await useDB({
        query: `INSERT INTO public.fn_movcontahist( 
            id_movcontahist, 
            loja_fk, 
            conta_fk, 
            tipomov_mvcont, 
            descrmov_mvcont,  
            numdoc_mvcont, 
            datamov_mvcont, 
            valormov_mvcont, 
            valordinheiro,  
            valorcheque, 
            valorcartao_mvcont, 
            codcontadestino_mvcont, 
            baixado_mvcont,  
            usuarioaltera,
            dataaltera,
            saldo)   VALUES (
                ${idMovContaHist[0].idc},  
                ${insertMovContaHistData.loja_fk}, 
                ${insertMovContaHistData.conta_fk},  
                'D', 
                'BAIXA CONTAS PAGAR',  
                ${insertMovContaHistData.numdoc_mvcont}, 
                '${insertMovContaHistData.datamov_mvcont}',    
                ${insertMovContaHistData.valormov_mvcont}, 
                0,   
                0, 
                0, 
                ${insertMovContaHistData.codcontadestino_mvcont}, 
                'N',  
                ${insertMovContaHistData.usuarioaltera},
                '${insertMovContaHistData.dataaltera}' ,
                ${insertMovContaHistData.saldo})`
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = {
            erro: err.message,
            detalhe: err.detail
        }
    });

    return { code: 200, results: { idContasPagarPag, statusInsert, idMovContaHist, statusInsert2 } }

};

const cancelar = async function ({ idLoja, insertContasPagarPagData }) {

    let statusInsert;

    const idContasPagarPag = await useDB({
        query: `SELECT max(id_contaspagar_pag)+1 as idc FROM public.fn_contaspagar_pag where loja_fk=${idLoja} `
    });

    const insertContasPagarPag = await useDB({
        query: `insert into fn_contaspagar_pag  (
            id_contaspagar_pag,
            loja_fk,
            contaspagar_fk,
            numparcela,
            valorpago,
            datapagto,
            usuarioaltera,
            dataaltera,
            status)values(
                ${idContasPagarPag[0].idc},
                ${insertContasPagarPagData.loja_fk},
                ${insertContasPagarPagData.contaspagar_fk},
                ${insertContasPagarPagData.numparcela},
                ${insertContasPagarPagData.valorpago},
                '${insertContasPagarPagData.datapagto}',
                ${insertContasPagarPagData.usuarioaltera},
                '${insertContasPagarPagData.dataaltera}',
                'Q')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = {
            erro: err.message,
            detalhe: err.detail
        }
    });

    return { code: 200, results: { idContasPagarPag, statusInsert } }

};

// public void consultar() {
// contapagar = new FnContaspagar();
// contapagar.setFnContaspagarPK(new FnContaspagarPK());
// despesa = new CdTipodespesa();
// this.lista = new ArrayList<>();
// this.contapagars = new ArrayList<>();
// boolean ok = true;
// totalSelecionado = BigDecimal.ZERO;
// if (this.datafinal.before(this.datainicial)) {
//     ok = false;
//     Util.criarMensagemErro("Data Final não pode ser menor que a Data Inicial!");
// }

// if (ok) {

//     CfLoja loja = (CfLoja) Util.pegarObjetoDaSessao("loja");

//     String tipo1 = "";

//     if (!this.situacao.equals("A")) {
//         tipo1 = " AND vo.statusContaspagar='" + this.situacao + "'";
//     }

//     String vd = "";
//     String lef = "";
//     if (transportadora3 != null) {
//         lef = " left join fetch  vo.vdConhecimentoTransporte as t ";
//         vd = " and (t.transportadoraFk.idTransp=" + transportadora3.getIdTransp() + " ) ";
//     }

//     if (fornecedor3 != null) {
//         vd = "";
//         lef = "";

//         lef += " left join fetch  vo.fornecedor as f1 ";
//         lef += " left join fetch vo.fnAgualuz as f2 ";
//         lef += " left join fetch   vo.fnCompraCabecalho as f3 ";
//         lef += " left join fetch  vo.fnTelecomunicacao as f4 ";
//         lef += " left join fetch  vo.servicoFk as f5 ";

//         vd += " and ( f1.idForn=" + fornecedor3.getIdForn() + "  ";
//         vd += " or f2.fornecedorFk.idForn=" + fornecedor3.getIdForn() + "  ";
//         vd += " or f3.fornecedorFk.idForn=" + fornecedor3.getIdForn() + "  ";
//         vd += " or f4.fornecedorFk.idForn=" + fornecedor3.getIdForn() + " ) ";
//         vd += " or f5.fornecedorFk.idForn=" + fornecedor3.getIdForn() + " ) ";
//     }

//     String hql = "SELECT vo FROM FnContaspagar vo "
//             + lef
//             + " WHERE (vo." + this.tipoData + "" + " BETWEEN '"
//             + formatdataHQL.format(this.datainicial) + "'" + " AND '" + formatdataHQL.format(this.datafinal)
//             + "')"
//             + tipo1 + ""
//             + " and vo.tipo is null"
//             + " AND vo.fnContaspagarPK.lojaFk=" + loja.getIdLoja() + "" + ""
//             + " AND vo.statusContaspagar !='D'"
//             + "  " + vd
//             + " ORDER BY vo."
//             + this.tipoData + " ASC";

//     this.listab = new ContasaPagarRN().listarContasaPagarHQL(hql);
//     Util.executarJavascript("PF('dlgopcoes').hide();");
//     atualizarTotais();
// } else {

//     Util.atualizarForm("erros");
//     Util.executarJavascript("PF('erros').show();");
// }

// }

const gerarf = async function ({ idLoja, idPlano, idForn, obsBusca, inicio, fim, idDespesa }) {

    /* String forr = "";
    if (!idfornecedor.equals("0")) {
        forr = " and r.fornecedor_fk=" + idfornecedor + " ";
    }

    String plano = "";
    String plano2 = "";
    if (!idplano.equals("0")) {
        plano = " and r.plano_conta_fk=" + idplano + " ";
        plano2 = " and 1!=1 ";
    }

    String desp = "";
    String desp2 = "";
    if (!iddespesa.equals("0")) {
        desp = " and r.tiposdespesa_fk=" + iddespesa + " ";
        desp2 = " and 1!=1 ";
    }

    String obs = "";
    String obs2 = "";
    if (obsbusca == null) {
        obsbusca = "";
    }
    if (!obsbusca.isEmpty()) {
        obs = " and upper(r.obs_contaspagar ) like '%" + obsbusca.toUpperCase() + "%' ";
        obs2 = " and 1!=1 ";
    } */

    const Fornecedor = await useDB({
        query: `SELECT  f.id_forn,f.nome_forn,c.numerodocfiscal_compracab, numdoc_contaspagar, status_contaspagar, cast(c.dataentradasaida_compracab as date), datavencimento_contaspagar, datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar, valortotal_contaspagar FROM public.fn_contaspagar as r inner join fn_compra_cabecalho as c on  c.id_compracab=r.compra_fk inner join cd_fornecedor as f on  f.id_forn=c.fornecedor_fk where r.loja_fk=${idLoja} and c.loja_fk=${idLoja}  and (cast(c.dataentradasaida_compracab as date) between '${inicio}' and '${fim}')   and r.compra_fk is not null and r.status_contaspagar!='D'  and r.plano_conta_fk=${idPlano} and 1!=1 and upper(r.obs_contaspagar ) like '%${obsBusca.toUpperCase()}%' and r.fornecedor_fk=${idForn} order by c.dataentradasaida_compracab asc`
    });

    /* hql = "SELECT  f.id_forn,f.nome_forn,c.numerodocfiscal_compracab, "
    + "numdoc_contaspagar, "
    + "status_contaspagar, cast(c.dataentradasaida_compracab as date), datavencimento_contaspagar, \n"
    + "datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar,"
    + " valortotal_contaspagar\n"
    + " FROM public.fn_contaspagar as r\n"
    + " inner join fn_compra_cabecalho as c on  c.id_compracab=r.compra_fk\n"
    + " inner join cd_fornecedor as f on  f.id_forn=c.fornecedor_fk\n"
    + " where r.loja_fk=" + loja.getIdLoja() + " and c.loja_fk=" + loja.getIdLoja() + " \n"
    + " and (cast(c.dataentradasaida_compracab as date) between '" + formatdataHQL.format(this.datai) + "' "
    + "and '" + formatdataHQL.format(this.dataf) + "')  \n"
    + " and r.compra_fk is not null"
    + " and r.status_contaspagar!='D' "
    + "" + plano
    + "" + desp2
    + "" + obs
    + "" + forr
    + " order by c.dataentradasaida_compracab asc"; */

    const Vencimento = await useDB({
        query: `SELECT  f.id_forn,f.nome_forn,c.numerodocfiscal_compracab, numdoc_contaspagar, status_contaspagar, datalanc_contaspagar, datavencimento_contaspagar, datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar, valortotal_contaspagar FROM public.fn_contaspagar as r inner join fn_compra_cabecalho as c on  c.id_compracab=r.compra_fk inner join cd_fornecedor as f on  f.id_forn=c.fornecedor_fk where r.loja_fk=${idLoja} and c.loja_fk=${idLoja}   and (r.datavencimento_contaspagar between '${inicio}'  and '${fim}')   and r.status_contaspagar!='D'  and r.compra_fk is not null  and r.plano_conta_fk=${idPlano}and 1!=1 and upper(r.obs_contaspagar ) like '%${obsBusca.toUpperCase()}%'  and r.fornecedor_fk=${idForn} order by datavencimento_contaspagar asc`
    });

    /* String k = "datavencimento_contaspagar";
    if (agrupar.equals("3")) {
        k = "datalanc_contaspagar";
    }

    hql = "SELECT  f.id_forn,f.nome_forn,c.numerodocfiscal_compracab, "
        + "numdoc_contaspagar, \n"
        + "status_contaspagar, datalanc_contaspagar, datavencimento_contaspagar, \n"
        + "datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar,"
        + " valortotal_contaspagar\n"
        + " FROM public.fn_contaspagar as r\n"
        + " inner join fn_compra_cabecalho as c on  c.id_compracab=r.compra_fk\n"
        + " inner join cd_fornecedor as f on  f.id_forn=c.fornecedor_fk\n"
        + " where r.loja_fk=" + loja.getIdLoja() + " and c.loja_fk=" + loja.getIdLoja() + "  \n"
        + " and (r.datavencimento_contaspagar between '" + formatdataHQL.format(this.datai) + "' "
        + " and '" + formatdataHQL.format(this.dataf) + "')  \n"
        + " and r.status_contaspagar!='D' "
        + " and r.compra_fk is not null "
        + "" + plano
        + "" + desp2
        + "" + obs
        + "" + forr
        + " order by " + k + " asc"; */

    const fornecedor2 = await useDB({
        query: `SELECT  f.id_forn,f.nome_forn,numdoc_contaspagar as tt, numdoc_contaspagar, status_contaspagar, datalanc_contaspagar, datavencimento_contaspagar, datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar, valortotal_contaspagar FROM public.fn_contaspagar as r inner join cd_fornecedor as f on  f.id_forn=r.fornecedor_fk where r.loja_fk=${idLoja}   and ( datalanc_contaspagar between '${inicio}' and '${fim}')   and r.status_contaspagar!='D' and r.plano_conta_fk=${idPlano} and r.tiposdespesa_fk=${idDespesa} and upper(r.obs_contaspagar ) like '%${obsBusca.toUpperCase()}%' and r.fornecedor_fk=${idForn} order by  datalanc_contaspagar asc`
    });

    /* hql = "SELECT  f.id_forn,f.nome_forn,numdoc_contaspagar as tt, "
    + "numdoc_contaspagar, \n"
    + "status_contaspagar, datalanc_contaspagar, datavencimento_contaspagar, \n"
    + "datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar,"
    + " valortotal_contaspagar\n"
    + " FROM public.fn_contaspagar as r\n"
    + " inner join cd_fornecedor as f on  f.id_forn=r.fornecedor_fk\n"
    + " where r.loja_fk=" + loja.getIdLoja() + "  \n"
    + " and ( datalanc_contaspagar between '" + formatdataHQL.format(this.datai) + "' "
    + "and '" + formatdataHQL.format(this.dataf) + "')  \n"
    + " and r.status_contaspagar!='D' "
    + "" + plano
    + "" + desp
    + "" + obs
    + "" + forr
    + " order by  datalanc_contaspagar asc"; */


    const vencimento2 = await useDB({
        query: `SELECT  f.id_forn,f.nome_forn,numdoc_contaspagar as tt, numdoc_contaspagar, status_contaspagar, datalanc_contaspagar, datavencimento_contaspagar, datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar, valortotal_contaspagar FROM public.fn_contaspagar as r inner join cd_fornecedor as f on  f.id_forn=r.fornecedor_fk where r.loja_fk=${idLoja} and (r.datavencimento_contaspagar between '${inicio}'  and '${fim}')   and r.status_contaspagar!='D' and r.plano_conta_fk= ${idPlano} and r.tiposdespesa_fk=${idDespesa} and upper(r.obs_contaspagar ) like '%${obsBusca.toUpperCase()}%' and r.fornecedor_fk=${idForn} order by datavencimento_contaspagar asc`
    });


    /* String k = "datavencimento_contaspagar";
    if (agrupar.equals("3")) {
        k = "datalanc_contaspagar";
    }

    hql = "SELECT  f.id_forn,f.nome_forn,numdoc_contaspagar as tt, "
            + "numdoc_contaspagar, \n"
            + "status_contaspagar, datalanc_contaspagar, datavencimento_contaspagar, \n"
            + "datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar,"
            + " valortotal_contaspagar\n"
            + " FROM public.fn_contaspagar as r\n"
            + " inner join cd_fornecedor as f on  f.id_forn=r.fornecedor_fk\n"
            + " where r.loja_fk=" + loja.getIdLoja() + "   \n"
            + " and (r.datavencimento_contaspagar between '" + formatdataHQL.format(this.datai) + "' "
            + " and '" + formatdataHQL.format(this.dataf) + "')  \n"
            + " and r.status_contaspagar!='D' "
            + "" + plano
            + "" + desp
            + "" + obs
            + "" + forr
            + " order by " + k + " asc";
 */

    const fornecedor3 = await useDB({
        query: `SELECT  f.id_forn,f.nome_forn,c.numnota, numdoc_contaspagar, status_contaspagar, data_entrada, datavencimento_contaspagar, datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar, valortotal_contaspagar FROM public.fn_contaspagar as r inner join fn_telecomunicacao as c on  c.id=r.telecomunicacao_fk inner join cd_fornecedor as f on  f.id_forn=c.fornecedor_fk where r.loja_fk=${idLoja} and c.loja_fk=${idLoja}   and (data_entrada between '${inicio}' and '${fim}')   and r.telecomunicacao_fk is not null and r.plano_conta_fk=${idPlano} and 1!=1 and r.fornecedor_fk=${idForn} order by c.data_entrada asc`
    });

    /* hqlt = "SELECT  f.id_forn,f.nome_forn,c.numnota, "
    + "numdoc_contaspagar, \n"
    + "status_contaspagar, data_entrada, datavencimento_contaspagar, \n"
    + "datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar,"
    + " valortotal_contaspagar\n"
    + " FROM public.fn_contaspagar as r\n"
    + " inner join fn_telecomunicacao as c on  c.id=r.telecomunicacao_fk\n"
    + " inner join cd_fornecedor as f on  f.id_forn=c.fornecedor_fk\n"
    + " where r.loja_fk=" + loja.getIdLoja() + " and c.loja_fk=" + loja.getIdLoja() + "  \n"
    + " and (data_entrada between '" + formatdataHQL.format(this.datai) + "' "
    + "and '" + formatdataHQL.format(this.dataf) + "')  \n"
    + " and r.telecomunicacao_fk is not null "
    + "" + plano
    + "" + desp2
    + "" + obs2
    + "" + forr
    + " order by c.data_entrada asc"; */

    const vencimento3 = await useDB({
        query: `SELECT  f.id_forn,f.nome_forn,c.numnota, numdoc_contaspagar, status_contaspagar, datalanc_contaspagar, datavencimento_contaspagar, datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar, valortotal_contaspagar FROM public.fn_contaspagar as r inner join fn_telecomunicacao as c on  c.id=r.telecomunicacao_fk inner join cd_fornecedor as f on  f.id_forn=c.fornecedor_fk where r.loja_fk=${idLoja} and c.loja_fk=${idLoja} and (r.datavencimento_contaspagar between '${inicio}' and '${fim}')  and r.plano_conta_fk=${idPlano}  and 1!=1 and r.fornecedor_fk=${idForn} and r.telecomunicacao_fk is not null order by datavencimento_contaspagar asc`
    });

    /* String k = "datavencimento_contaspagar";
    if (agrupar.equals("3")) {
        k = "datalanc_contaspagar";
    }

    hqlt = "SELECT  f.id_forn,f.nome_forn,c.numnota, "
        + "numdoc_contaspagar, \n"
        + "status_contaspagar, datalanc_contaspagar, datavencimento_contaspagar, \n"
        + "datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar,"
        + " valortotal_contaspagar\n"
        + " FROM public.fn_contaspagar as r\n"
        + " inner join fn_telecomunicacao as c on  c.id=r.telecomunicacao_fk\n"
        + " inner join cd_fornecedor as f on  f.id_forn=c.fornecedor_fk\n"
        + " where r.loja_fk=" + loja.getIdLoja() + " and c.loja_fk=" + loja.getIdLoja() + "  \n"
        + " and (r.datavencimento_contaspagar between '" + formatdataHQL.format(this.datai) + "' "
        + "and '" + formatdataHQL.format(this.dataf) + "')  \n"
        + "" + plano
        + "" + desp2
        + "" + obs2
        + "" + forr
        + " and r.telecomunicacao_fk is not null order by " + k + " asc";
 */

    const fornecedor4 = await useDB({
        query: `SELECT  f.id_forn,f.nome_forn,c.numnota, numdoc_contaspagar, status_contaspagar, data_entrada, datavencimento_contaspagar, datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar, valortotal_contaspagar,cod_modelodocfiscal FROM public.fn_contaspagar as r inner join fn_agualuz as c on  c.id=r.agualuz_fk inner join cd_fornecedor as f on  f.id_forn=c.fornecedor_fk where r.loja_fk=${idLoja} and c.loja_fk=${idLoja}   and (data_entrada between '${inicio}' and '${fim}')   and r.agualuz_fk is not null and r.plano_conta_fk=${idPlano}  and 1!=1 and r.fornecedor_fk=${idForn} order by c.data_entrada asc`
    });

    /* hqlta = "SELECT  f.id_forn,f.nome_forn,c.numnota, "
    + "numdoc_contaspagar, \n"
    + "status_contaspagar, data_entrada, datavencimento_contaspagar, \n"
    + "datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar,"
    + " valortotal_contaspagar,cod_modelodocfiscal\n"
    + " FROM public.fn_contaspagar as r\n"
    + " inner join fn_agualuz as c on  c.id=r.agualuz_fk\n"
    + " inner join cd_fornecedor as f on  f.id_forn=c.fornecedor_fk\n"
    + " where r.loja_fk=" + loja.getIdLoja() + " and c.loja_fk=" + loja.getIdLoja() + "  \n"
    + " and (data_entrada between '" + formatdataHQL.format(this.datai) + "' "
    + "and '" + formatdataHQL.format(this.dataf) + "')  \n"
    + " and r.agualuz_fk is not null "
    + "" + plano
    + "" + desp2
    + "" + obs2
    + "" + forr
    + " order by c.data_entrada asc";
 */
    const vencimento4 = await useDB({
        query: `SELECT  f.id_forn,f.nome_forn,c.numnota, numdoc_contaspagar, status_contaspagar, datalanc_contaspagar, datavencimento_contaspagar, datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar, valortotal_contaspagar,cod_modelodocfiscal FROM public.fn_contaspagar as r inner join fn_agualuz as c on  c.id=r.agualuz_fk inner join cd_fornecedor as f on  f.id_forn=c.fornecedor_fk where r.loja_fk=${idLoja} and c.loja_fk=${idLoja}   and (r.datavencimento_contaspagar between '${inicio}' and '${fim}') AND r.plano_conta_fk=${idPlano}  and 1!=1 and r.fornecedor_fk=${idForn} and r.agualuz_fk is not null order by datavencimento_contaspagar asc`
    });

    /* String k = "datavencimento_contaspagar";
    if (agrupar.equals("3")) {
        k = "datalanc_contaspagar";
    }

    hqlta = "SELECT  f.id_forn,f.nome_forn,c.numnota, "
        + "numdoc_contaspagar, \n"
        + "status_contaspagar, datalanc_contaspagar, datavencimento_contaspagar, \n"
        + "datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar,"
        + " valortotal_contaspagar,cod_modelodocfiscal\n"
        + " FROM public.fn_contaspagar as r\n"
        + " inner join fn_agualuz as c on  c.id=r.agualuz_fk\n"
        + " inner join cd_fornecedor as f on  f.id_forn=c.fornecedor_fk\n"
        + " where r.loja_fk=" + loja.getIdLoja() + " and c.loja_fk=" + loja.getIdLoja() + "  \n"
        + " and (r.datavencimento_contaspagar between '" + formatdataHQL.format(this.datai) + "' "
        + "and '" + formatdataHQL.format(this.dataf) + "')  \n"
        + "" + plano
        + "" + desp2
        + "" + obs2
        + "" + forr
        + " and r.agualuz_fk is not null order by " + k + " asc"; */

    const fornecedor5 = await useDB({
        query: `SELECT  f.id_forn,f.nome_forn,c.numdoc, numdoc_contaspagar, status_contaspagar, data_entrada, datavencimento_contaspagar, datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar, valortotal_contaspagar FROM public.fn_contaspagar as r inner join vd_servico_cab as c on  c.id=r.servico_fk inner join cd_fornecedor as f on  f.id_forn=c.fornecedor_fk where r.loja_fk=${idLoja} and c.loja_fk=${idLoja}   and (data_entrada between '${inicio}' and '${fim}')   and r.servico_fk is not null AND r.plano_conta_fk=${idPlano}  and 1!=1 and r.fornecedor_fk=${idForn} order by c.data_entrada asc`
    });

    /* hqltacs = "SELECT  f.id_forn,f.nome_forn,c.numdoc, "
        + "numdoc_contaspagar, \n"
        + "status_contaspagar, data_entrada, datavencimento_contaspagar, \n"
        + "datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar,"
        + " valortotal_contaspagar\n"
        + " FROM public.fn_contaspagar as r\n"
        + " inner join vd_servico_cab as c on  c.id=r.servico_fk\n"
        + " inner join cd_fornecedor as f on  f.id_forn=c.fornecedor_fk\n"
        + " where r.loja_fk=" + loja.getIdLoja() + " and c.loja_fk=" + loja.getIdLoja() + "  \n"
        + " and (data_entrada between '" + formatdataHQL.format(this.datai) + "' "
        + "and '" + formatdataHQL.format(this.dataf) + "')  \n"
        + " and r.servico_fk is not null "
        + "" + plano
        + "" + desp2
        + "" + obs2
        + "" + forr
        + " order by c.data_entrada asc"; */

    const vencimento5 = await useDB({
        query: `SELECT f.id_forn,f.nome_forn,c.numdoc, numdoc_contaspagar, status_contaspagar, datalanc_contaspagar, datavencimento_contaspagar, datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar, valortotal_contaspagar FROM public.fn_contaspagar as r inner join vd_servico_cab as c on  c.id=r.servico_fk inner join cd_fornecedor as f on  f.id_forn=c.fornecedor_fk where r.loja_fk=${idLoja} and c.loja_fk=${idLoja}   and (r.datavencimento_contaspagar between '${inicio}' and '${fim}') AND r.plano_conta_fk=${idPlano}  and 1!=1 and r.fornecedor_fk=${idForn}  and r.servico_fk is not null  order by datavencimento_contaspagar asc`
    });
    /* 
            String k = "datavencimento_contaspagar";
        if (agrupar.equals("3")) {
            k = "datalanc_contaspagar";
        }
    
        hqltacs = "SELECT f.id_forn,f.nome_forn,c.numdoc, "
            + "numdoc_contaspagar, \n"
            + "status_contaspagar, datalanc_contaspagar, datavencimento_contaspagar, \n"
            + "datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar,"
            + " valortotal_contaspagar\n"
            + " FROM public.fn_contaspagar as r\n"
            + " inner join vd_servico_cab as c on  c.id=r.servico_fk\n"
            + " inner join cd_fornecedor as f on  f.id_forn=c.fornecedor_fk\n"
            + " where r.loja_fk=" + loja.getIdLoja() + " and c.loja_fk=" + loja.getIdLoja() + "  \n"
            + " and (r.datavencimento_contaspagar between '" + formatdataHQL.format(this.datai) + "' "
            + "and '" + formatdataHQL.format(this.dataf) + "')  \n"
            + "" + plano
            + "" + desp2
            + "" + obs2
            + "" + forr
            + " and r.servico_fk is not null "
            + " order by " + k + " asc"; */

    const fornecedor6 = await useDB({
        query: `SELECT  f.id_transp,f.nome_transp,c.numnota, numdoc_contaspagar, status_contaspagar, data_entrada, datavencimento_contaspagar, datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar, valortotal_contaspagar FROM public.fn_contaspagar as r inner join vd_conhecimento_transporte as c on  c.id=r.conhecimento_transporte_fk inner join cd_transportadora as f on  f.id_transp=c.transportadora_fk where r.loja_fk=${idLoja} and c.loja_fk=${idLoja}   and (data_entrada between '${inicio}' and '${fim}')   and r.conhecimento_transporte_fk is not null AND r.plano_conta_fk=${idPlano}  and 1!=1 and r.fornecedor_fk=${idForn} order by c.data_entrada asc`
    });

    /* hqltac = "SELECT  f.id_transp,f.nome_transp,c.numnota, "
        + "numdoc_contaspagar, \n"
        + "status_contaspagar, data_entrada, datavencimento_contaspagar, \n"
        + "datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar,"
        + " valortotal_contaspagar\n"
        + " FROM public.fn_contaspagar as r\n"
        + " inner join vd_conhecimento_transporte as c on  c.id=r.conhecimento_transporte_fk\n"
        + " inner join cd_transportadora as f on  f.id_transp=c.transportadora_fk\n"
        + " where r.loja_fk=" + loja.getIdLoja() + " and c.loja_fk=" + loja.getIdLoja() + "  \n"
        + " and (data_entrada between '" + formatdataHQL.format(this.datai) + "' "
        + "and '" + formatdataHQL.format(this.dataf) + "')  \n"
        + " and r.conhecimento_transporte_fk is not null "
        + "" + plano
        + "" + desp2
        + "" + obs2
        + "" + forr
        + " order by c.data_entrada asc";
 */

    const vencimento6 = await useDB({
        query: `SELECT  f.id_transp,f.nome_transp,c.numnota, numdoc_contaspagar, status_contaspagar, datalanc_contaspagar, datavencimento_contaspagar, datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar, valortotal_contaspagar FROM public.fn_contaspagar as r inner join vd_conhecimento_transporte as c on  c.id=r.conhecimento_transporte_fk inner join cd_transportadora as f on  f.id_transp=c.transportadora_fk where r.loja_fk=${idLoja} and c.loja_fk=${idLoja}   and (r.datavencimento_contaspagar between '${inicio}' and '${fim}')  AND r.plano_conta_fk=${idPlano}  and 1!=1 and r.fornecedor_fk=${idForn}  and r.conhecimento_transporte_fk is not null  order by datavencimento_contaspagar asc`
    });

    /* tring k = "datavencimento_contaspagar";
    if (agrupar.equals("3")) {
        k = "datalanc_contaspagar";
    }

    hqltac = "SELECT  f.id_transp,f.nome_transp,c.numnota, "
        + "numdoc_contaspagar, \n"
        + "status_contaspagar, datalanc_contaspagar, datavencimento_contaspagar, \n"
        + "datapagto_contaspagar,valor_contaspagar,valorjuros_contaspagar,"
        + " valortotal_contaspagar\n"
        + " FROM public.fn_contaspagar as r\n"
        + " inner join vd_conhecimento_transporte as c on  c.id=r.conhecimento_transporte_fk\n"
        + " inner join cd_transportadora as f on  f.id_transp=c.transportadora_fk\n"
        + " where r.loja_fk=" + loja.getIdLoja() + " and c.loja_fk=" + loja.getIdLoja() + "  \n"
        + " and (r.datavencimento_contaspagar between '" + formatdataHQL.format(this.datai) + "' "
        + "and '" + formatdataHQL.format(this.dataf) + "')  \n"
        + "" + plano
        + "" + desp2
        + "" + obs2
        + "" + forr
        + " and r.conhecimento_transporte_fk is not null "
        + " order by " + k + " asc"; */


    return { code: 200, results: { Fornecedor, Vencimento, fornecedor2, vencimento2, fornecedor3, vencimento3, fornecedor4, vencimento4, fornecedor5, vencimento5, fornecedor6, vencimento6 } }

};

const tp = async function ({ }) {

    const tipoDespesa = await useDB({
        query: "select * from Cd_Tipodespesa order by descricao_Tpdesp desc"
    });

    return { code: 200, results: { tipoDespesa } }

};

const pc = async function ({ }) {

    const planoConta = await useDB({
        query: "select * from Cd_Plano_Conta where niveis=3"
    });

    return { code: 200, results: { planoConta } }

};

const fo = async function ({ }) {

    const fornecedor = await useDB({
        query: "select * from Cd_Fornecedor order by nome_Forn asc"
    });

    return { code: 200, results: { fornecedor } }

};


module.exports = {
    presalvarcp,
    salvarcontasapagar,
    verifica,
    verifica2,
    baixar,
    cancelar,
    gerarf,
    tp,
    pc,
    fo
}