const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const salvarcontasareceber = async function ({ idLoja, insertContasReceberData }) {

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
                'P',
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

const salvarcontasapagar = async function ({ idLoja, insertContasReceberData }) {

    let statusInsert;

    const contasReceber = await useDB({
        query: `select * from Fn_Contasreceber where loja_fk=${idLoja} order by id_Contasreceber desc`
    });

    const insertContasReceber = await useDB({
        query: `INSERT INTO public.fn_contasreceber( 
            id_contasreceber, 
            loja_fk, 
            cliente_fk, 
            numdoc_contasreceber, 
            numparcela_contasreceber, 
            totalparcelas_contasreceber,  
            datalanc_contasreceber, 
            datavenc_contasreceber,  
            valorparcela_contasreceber, 
            valordesconto_contasreceber, 
            valormulta_contasreceber,  
            valorjuros_contasreceber,  
            valoradicional_contasreceber,  
            valorrestante_contasreceber, 
            valortotal_contasreceber, 
            obs_contasreceber,  
            statusreceb_contasreceber, 
            usuarioaltera,  
            dataaltera,  
            formapagto_contasreceber, 
            tipo,  
            tipodespesa_id)VALUES ( 
                ${insertContasReceberData.id_contasreceber},  
                ${insertContasReceberData.loja_fk}, 
                ${insertContasReceberData.cliente_fk}, 
                ${insertContasReceberData.numdoc_contasreceber},  
                ${insertContasReceberData.numparcela_contasreceber}, 
                ${insertContasReceberData.totalparcelas_contasreceber},  
                '${insertContasReceberData.datalanc_contasreceber}',  
                '${insertContasReceberData.datavenc_contasreceber}',   
                ${insertContasReceberData.valorparcela_contasreceber},   
                ${insertContasReceberData.valordesconto_contasreceber},   
                ${insertContasReceberData.valormulta_contasreceber},   
                ${insertContasReceberData.valorjuros_contasreceber},   
                ${insertContasReceberData.valoradicional_contasreceber},   
                ${insertContasReceberData.valorrestante_contasreceber},   
                ${insertContasReceberData.valortotal_contasreceber},   
                '${insertContasReceberData.obs_contasreceber}',    
                '${insertContasReceberData.statusreceb_contasreceber}',    
                ${insertContasReceberData.usuarioaltera},    
                '${insertContasReceberData.dataaltera}',    
                '${insertContasReceberData.formapagto_contasreceber}',   
                'D',  
                ${insertContasReceberData.tipodespesa_id});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { contasReceber, statusInsert } }

};

const verifica = async function ({ idContasPagar, idLoja}) {

    const nomeTransp = await useDB({
        query: `select tr.nome_transp from fn_contaspagar as cp inner join vd_conhecimento_transporte as vc on (cp.conhecimento_transporte_fk=vc.id and cp.loja_fk=vc.loja_fk) inner join cd_transportadora as tr on tr.id_transp = vc.transportadora_fk where (cp.id_contaspagar=${idContasPagar} and cp.loja_fk=${idLoja}) and  cp.conhecimento_transporte_fk is not null  `
    });

    return { code: 200, results: { nomeTransp } }

};

const verifica2 = async function({ idContasPagar, idLoja }){ 

    const conhecimentoTransporte = await useDB({ 
        query: `select cp.conhecimento_transporte_fk from fn_contaspagar as cp where (cp.id_contaspagar=${idContasPagar} and cp.loja_fk=${idLoja}) and  cp.conhecimento_transporte_fk is not null  `
    }); 

 return { code: 200, results: { conhecimentoTransporte }}  
    
};

const baixar = async function({ insertContasReceberRecData, idLoja }){ 

    let statusInsert;

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
             status, 
             valordesconto, 
             valormulta, 
             valorjuros, 
             valoradicional)values(
                 ${insertContasReceberRecData.id_contasreceber_rec},
                 ${insertContasReceberRecData.loja_fk},
                 ${insertContasReceberRecData.contasreceber_fk},
                 ${insertContasReceberRecData.numparcela},
                 ${insertContasReceberRecData.valorpago},
                 '${insertContasReceberRecData.datapagto}',
                 ${insertContasReceberRecData.usuarioaltera},
                 '${insertContasReceberRecData.dataaltera}',
                 'Q',
                 ${insertContasReceberRecData.valordesconto},
                 ${insertContasReceberRecData.valormulta},
                 ${insertContasReceberRecData.valorjuros},
                 ${insertContasReceberRecData.valoradicional})`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = {
            erro: err.message,
            detalhe: err.detail
        }
    });

    const contaReceberRec = await useDB({
        query:`SELECT * FROM Fn_Contasreceber_Rec WHERE loja_Fk=${idLoja} ORDER BY id_Contasreceber_Rec DESC`
    });

 return { code: 200, results: { statusInsert, contaReceberRec }}  
    
};

const cancelar = async function({ insertContasReceberRecData, idLoja }){ 

    let statusInsert;

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
             status, 
             valordesconto, 
             valormulta, 
             valorjuros, 
             valoradicional)values(
                 ${insertContasReceberRecData.id_contasreceber_rec},
                 ${insertContasReceberRecData.loja_fk},
                 ${insertContasReceberRecData.contasreceber_fk},
                 ${insertContasReceberRecData.numparcela},
                 ${insertContasReceberRecData.valorpago},
                 '${insertContasReceberRecData.datapagto}',
                 ${insertContasReceberRecData.usuarioaltera},
                 '${insertContasReceberRecData.dataaltera}',
                 'C',
                 ${insertContasReceberRecData.valordesconto},
                 ${insertContasReceberRecData.valormulta},
                 ${insertContasReceberRecData.valorjuros},
                 ${insertContasReceberRecData.valoradicional})`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = {
            erro: err.message,
            detalhe: err.detail
        }
    });

    const contaReceberRec = await useDB({
        query:`SELECT * FROM Fn_Contasreceber_Rec WHERE loja_Fk=${idLoja} ORDER BY id_Contasreceber_Rec DESC`
    });

 return { code: 200, results: { statusInsert, contaReceberRec }}  
    
};

const consultar = async function ({ tipoData, situacao, dataIncial, dataFinal, idLoja, idCliente, idTipoDespesa }) {

    const contasReceber = await useDB({
        query: `SELECT * FROM Fn_Contasreceber WHERE (${tipoData} BETWEEN '${dataIncial}' AND '${dataFinal}')  AND loja_Fk=${idLoja} and tipo='D' ORDER BY ${tipoData} ASC`
    });

   /*  if (tipoconta2.equals("1") || tipoconta2.equals("3")) {
        String tipo1 = "";

        if (!this.situacao.equals("A")) {
            tipo1 = " AND vo.statusContaspagar='" + this.situacao + "'";
        }

        String hql = "SELECT vo FROM FnContasreceber vo" + " WHERE (vo." + this.tipoData + "" + " BETWEEN '"
                + formatdataHQL.format(this.datainicial) + "'" + " AND '" + formatdataHQL.format(this.datafinal)
                + "')" + tipo1 + " AND vo.fnContasreceberPK.lojaFk=" + loja.getIdLoja() + "" + ""
                + " and vo.tipo='D'"
                + " ORDER BY vo."
                + this.tipoData + " ASC";
 */
    const contasReceber2 = await useDB({
        query:`SELECT * FROM Fn_Contasreceber WHERE (${tipoData} BETWEEN '${dataIncial}' AND '${dataFinal}') AND statusreceb_Contasreceber='${situacao}' and tipo='D' AND cliente_fk=${idCliente} ORDER BY ${tipoData} ASC`
    });

    /* if (tipoconta2.equals("2") || tipoconta2.equals("3")) {
        String tipo1 = "";
        String tipodata = "";

        if (this.tipoData.equals("datavencContasreceber")) {
            tipodata = "datavencContasreceber";
        } else if (this.tipoData.equals("datapagtoContasreceber")) {
            tipodata = "datapagtoContasreceber";
        } else if (this.tipoData.equals("datalancContasreceber")) {
            tipodata = "datalancContasreceber";
        }

        if (!this.situacao.equals("A")) {
            tipo1 = " AND vo.statusrecebContasreceber='" + this.situacao + "'";
        }

        String hql = "SELECT " + " vo"
                + "" + " FROM FnContasreceber vo"
                + " WHERE (vo." + tipodata + "" + " BETWEEN '" + formatdataHQL.format(this.datainicial)
                + "'" + " AND '" + formatdataHQL.format(this.datafinal) + "')" + tipo1
                + " and vo.tipo='D'"
                + " and clienteFk=" + cliente.getIdCli() + ""
                + "  ORDER BY vo." + tipodata + " ASC"; */

    const tipoDespesa = await useDB({
        query: `select id_Tpdesp, descricao_Tpdesp from Cd_Tipodespesa where id_Tpdesp=${idTipoDespesa} `
    });

    return { code: 200, results: { contasReceber, contasReceber2, tipoDespesa } }

};

module.exports = {
    salvarcontasareceber,
    salvarcontasapagar,
    verifica,
    verifica2,
    baixar,
    cancelar,
    consultar
}