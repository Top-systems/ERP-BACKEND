const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const salvarcontasreceber = async function ({ idLoja, insertContasReceberData }) {

    let statusInsert;

    const contasReceber = await useDB({
        query: `select * from Fn_Contasreceber where loja_fk=${idLoja} order by id_Contasreceber desc`
    });

    const insertContasReceber = await useDB({
        query: `INSERT INTO fn_contasreceber(
            id_contasreceber, 
            loja_fk, 
            cliente_fk, 
            numdoc_contasreceber, 
            numparcela_contasreceber, 
            totalparcelas_contasreceber, 
            datalanc_contasreceber, 
            datavenc_contasreceber, 
            valorparcela_contasreceber,
            valortotal_contasreceber, 
            statusreceb_contasreceber,  
            usuarioaltera, 
            dataaltera, 
            valorrestante_contasreceber )  VALUES (
                ${insertContasReceberData.id_contasreceber},
                ${insertContasReceberData.loja_fk},
                ${insertContasReceberData.cliente_fk},
                ${insertContasReceberData.numdoc_contasreceber},
                ${insertContasReceberData.numparcela_contasreceber},
                ${insertContasReceberData.totalparcelas_contasreceber},
                '${insertContasReceberData.datalanc_contasreceber}',
                '${insertContasReceberData.datavenc_contasreceber}',
                ${insertContasReceberData.valorparcela_contasreceber},
                ${insertContasReceberData.valortotal_contasreceber},
                ${insertContasReceberData.statusreceb_contasreceber},
                ${insertContasReceberData.usuarioaltera},
                '${insertContasReceberData.dataaltera}',
                ${insertContasReceberData.valorrestante_contasreceber});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { contasReceber, statusInsert } }

};

const salvarcontasapagar = async function ({ idLoja }) {

    const contasPagar = await useDB({
        query: `select * from Fn_Contaspagar where loja_fk=${idLoja} order by id_Contaspagar desc`
    });

    return { code: 200, results: { contasPagar } }

};

const verifica = async function ({ idContasPagar, idLoja }) {

    const contasPagar = await useDB({
        query: `select tr.nome_transp from fn_contaspagar as cp inner join vd_conhecimento_transporte as vc on (cp.conhecimento_transporte_fk=vc.id and cp.loja_fk=vc.loja_fk) inner join cd_transportadora as tr on tr.id_transp = vc.transportadora_fk where (cp.id_contaspagar=${idContasPagar} and cp.loja_fk=${idLoja}) and  cp.conhecimento_transporte_fk is not null  `
    });

    return { code: 200, results: { contasPagar } }

};

const verifica2 = async function ({ idContasPagar, idLoja }) {

    const contasPagar = await useDB({
        query: `select cp.conhecimento_transporte_fk from fn_contaspagar as cp where (cp.id_contaspagar=${idContasPagar} and cp.loja_fk=${idLoja}) and  cp.conhecimento_transporte_fk is not null  `
    });

    return { code: 200, results: { contasPagar } }

};

const baixar = async function ({ insertContasPagarPagData, idLoja, insertMovContaHistData, saldoAtual, saldoAnterior, idConta }) {

    let statusInsert, statusInsert2, statusUpdate;

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
                ${insertContasPagarPagData.id_contaspagar_pag},
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

    const contasPagarPag = await useDB({
        query: `SELECT * FROM Fn_Contaspagar_Pag WHERE loja_Fk=${idLoja} ORDER BY id_Contaspagar_Pag DESC`
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
            saldo)VALUES (
                ${idMovContaHist[0].idc}, 
                ${insertMovContaHistData.loja_fk}, 
                ${insertMovContaHistData.conta_fk},  
                'D', 
                'BAIXA CONTA DIVERSA',    
                ${insertMovContaHistData.numdoc_mvcont}, 
                '${insertMovContaHistData.datamov_mvcont}',    
                ${insertMovContaHistData.valormov_mvcont}, 
                0,    
                0, 
                0, 
                ${insertMovContaHistData.codcontadestino_mvcont}, 
                'N', 
                 ${insertMovContaHistData.usuarioaltera},
                 '${insertMovContaHistData.dataaltera}', 
                 ${insertMovContaHistData.saldo})`
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = {
            erro: err.message,
            detalhe: err.detail
        }
    });

    const updateConta = await useDB({
        query: `UPDATE public.fn_conta SET saldoatual_conta=${saldoAtual}, saldoanterior_conta=${saldoAnterior} WHERE id_conta=${idConta}  and loja_fk=${idLoja} `
    }).then(() => {
        statusUpdate = 'Registro atualiado com sucesso';
    }).catch((err) => {
        statusUpdate = err.message;
    });

    return { code: 200, results: { statusInsert, contasPagarPag, idMovContaHist, statusInsert2, statusUpdate } }

};

const baixarr = async function ({ idLoja, idContasreceber, insertContasReceberRecData, insertMovContaHistData, saldoAtual, saldoAnterior, idConta }) {

    let statusInsert, statusInsert2, statusUpdate;

    const contasReceber = await useDB({
        query: `SELECT * FROM Fn_Contasreceber where loja_Fk=${idLoja}  and id_Contasreceber=${idContasreceber}`
    });

    const insertContasReceberRec = await useDB({
        query: `insert into fn_contasreceber_rec  (
             id_contasreceber_rec,
             loja_fk,
             contasreceber_fk,
             numparcela,
             valorpago,
             datapagto,
             usuarioaltera,
             dataaltera,
             status)values(
                 ${insertContasReceberRecData.id_contasreceber_rec},
                 ${insertContasReceberRecData.loja_fk},
                 ${insertContasReceberRecData.contasreceber_fk},
                 ${insertContasReceberRecData.numparcela},
                 ${insertContasReceberRecData.valorpago},
                 '${insertContasReceberRecData.datapagto}',
                 ${insertContasReceberRecData.usuarioaltera},
                 '${insertContasReceberRecData.dataaltera}',
                 'Q')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = {
            erro: err.message,
            detalhe: err.detail
        }
    });

    const contasReceberRec = await useDB({
        query: `SELECT * FROM Fn_Contasreceber_Rec WHERE loja_Fk=${idLoja}  ORDER BY id_Contasreceber_Rec DESC`
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
            saldo)VALUES (
                ${idMovContaHist[0].idc}, 
                ${insertMovContaHistData.loja_fk}, 
                ${insertMovContaHistData.conta_fk},  
                'C', 
                'BAIXA CONTA DIVERSA',    
                ${insertMovContaHistData.numdoc_mvcont}, 
                '${insertMovContaHistData.datamov_mvcont}',    
                ${insertMovContaHistData.valormov_mvcont}, 
                0,    
                0, 
                0, 
                ${insertMovContaHistData.codcontadestino_mvcont}, 
                'N', 
                 ${insertMovContaHistData.usuarioaltera},
                 '${insertMovContaHistData.dataaltera}', 
                 ${insertMovContaHistData.saldo})`
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = {
            erro: err.message,
            detalhe: err.detail
        }
    });

    const updateConta = await useDB({
        query: `UPDATE public.fn_conta SET saldoatual_conta=${saldoAtual}, saldoanterior_conta=${saldoAnterior} WHERE id_conta=${idConta}  and loja_fk=${idLoja} `
    }).then(() => {
        statusUpdate = 'Registro atualiado com sucesso';
    }).catch((err) => {
        statusUpdate = err.message;
    });


    return { code: 200, results: { contasReceber, statusInsert, contasReceberRec, statusInsert2, idMovContaHist, statusUpdate } }

};

const cancelar = async function ({ insertContasPagarPagData, idLoja }) {

    let statusInsert;

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
                ${insertContasPagarPagData.id_contaspagar_pag},
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

    const contasPagarPag = await useDB({
        query: `SELECT * FROM Fn_Contaspagar_Pag WHERE loja_Fk=${idLoja} ORDER BY id_Contaspagar_Pag DESC`
    });

    return { code: 200, results: { statusInsert, contasPagarPag } }

};

const cancelarr = async function ({ idLoja, idContasreceber, insertContasReceberRecData }) {

    let statusInsert

    const contasReceber = await useDB({
        query: `SELECT * FROM Fn_Contasreceber where loja_Fk=${idLoja}  and id_Contasreceber=${idContasreceber}`
    });

    const contasReceberRec = await useDB({
        query: `SELECT * FROM Fn_Contasreceber_Rec WHERE loja_Fk=${idLoja}  and contasreceber_fk=${idContasreceber} and status='Q'`
    });

    const insertContasReceberRec = await useDB({
        query: `insert into fn_contasreceber_rec  (
            id_contasreceber_rec,
            loja_fk,
            contasreceber_fk,
            numparcela,
            valorpago,
            datapagto,
            usuarioaltera,
            dataaltera,
            status)values(
                ${insertContasReceberRecData.id_contasreceber_rec},
                ${insertContasReceberRecData.loja_fk},
                ${insertContasReceberRecData.contasreceber_fk},
                ${insertContasReceberRecData.numparcela},
                ${insertContasReceberRecData.valorpago},
                '${insertContasReceberRecData.datapagto}',
                ${insertContasReceberRecData.usuarioaltera},
                '${insertContasReceberRecData.dataaltera}',
                'C')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = {
            erro: err.message,
            detalhe: err.detail
        }
    });

    const contasReceberRec2 = await useDB({
        query: `SELECT * FROM Fn_Contasreceber_Rec WHERE loja_Fk=${idLoja}  ORDER BY id_Contasreceber_Rec DESC`
    });


    return { code: 200, results: { contasReceber, contasReceberRec, statusInsert, contasReceberRec2 } }

};

const consultar = async function ({ tipoData, situacao, dataIncial, dataFinal, idLoja }) {

    const contasPagar = await useDB({
        query: `SELECT * FROM Fn_Contaspagar WHERE (${tipoData} BETWEEN '${dataIncial}' AND '${dataFinal}') AND status_Contaspagar='${situacao}' AND loja_Fk=${idLoja} and tipo='D' and status_Contaspagar!='D'  ORDER BY ${tipoData} ASC`
    });

    /* if (!this.situacao.equals("A")) {
        tipo1 = " AND vo.statusContaspagar='" + this.situacao + "'";
    }
    
    String hql = "SELECT vo FROM FnContaspagar vo" + " WHERE (vo." + this.tipoData + "" + " BETWEEN '"
            + formatdataHQL.format(this.datainicial) + "'" + " AND '" + formatdataHQL.format(this.datafinal)
            + "')" + tipo1 + " AND vo.fnContaspagarPK.lojaFk=" + loja.getIdLoja() + "" + ""
            + " and vo.tipo='D'"
            + " and vo.statusContaspagar!='D' "
            + " ORDER BY vo."
            + this.tipoData + " ASC"; */

    const contasReceber = await useDB({
        query:`SELECT * FROM Fn_Contasreceber WHERE (${tipoData} BETWEEN '${dataIncial}' AND '${dataFinal}') AND statusreceb_Contasreceber='${situacao}' and tipo='D' and statusreceb_Contasreceber!='D' ORDER BY ${tipoData} ASC`
    });

    /* if (!this.situacao.equals("A")) {
        tipo1 = " AND vo.statusrecebContasreceber='" + this.situacao + "'";
    }
    
    String hql = "SELECT " + " vo"
            + "" + " FROM FnContasreceber vo"
            + " WHERE (vo." + tipodata + "" + " BETWEEN '" + formatdataHQL.format(this.datainicial)
            + "'" + " AND '" + formatdataHQL.format(this.datafinal) + "')" + tipo1
            + " and vo.tipo='D' "
            + "  and vo.statusrecebContasreceber!='D' "
            + " ORDER BY vo." + tipodata + " ASC"; */

    return { code: 200, results: { contasPagar, contasReceber } }

};

module.exports = {
    salvarcontasreceber,
    salvarcontasapagar,
    verifica,
    verifica2,
    baixar,
    baixarr,
    cancelar,
    cancelarr,
    consultar
}