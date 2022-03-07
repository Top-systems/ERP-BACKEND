const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const enviarlog3 = async function ({ codHexaBico, idLoja, encerranteDepois, qtd, mes, idBico, insertAbastecimentoData }) {

    let statusInsert;

    const bico = await useDB({
        query: `SELECT id_bico, milhoes_encerrante  FROM public.cd_bico  where codhexa_bic='${codHexaBico}'  and loja_fk='${idLoja}'`
    });

    const abastecimento = await useDB({
        query: `SELECT id_abastecimentos FROM public.vd_abastecimentos where loja_fk=${idLoja} and bico_fk=${idBico} and  encerrantedepois=${encerranteDepois}  and qtd=${qtd}  and to_char(datahora, 'MM')='${mes}'`
    });

    const idAbastecimento = await useDB({
        query: `SELECT max(id_abastecimentos)+1 as idc  FROM public.vd_abastecimentos  where loja_fk=${idLoja} `
    });

    const insertAbastecimento = await useDB({
        query: `INSERT INTO public.vd_abastecimentos(
            id_abastecimentos, 
            loja_fk, 
            bico_fk,
            datahora, 
            encerranteantes,  
            qtd, 
            encerrantedepois, 
            valorunit, 
            valorfinal, 
            status_abastecimento,  
            coo, 
            numnota, 
            numserieecf, 
            estacaosel, 
            hash_abastecimento)  VALUES (
                ${idAbastecimento[0].idc}, 
                ${insertAbastecimentoData.loja_fk},
                ${insertAbastecimentoData.bico_fk},  
                '${insertAbastecimentoData.datahora}',  
                ${insertAbastecimentoData.encerranteantes}, 
                ${insertAbastecimentoData.qtd},
                ${insertAbastecimentoData.encerrantedepois},    
                ${insertAbastecimentoData.valorunit}, 
                ${insertAbastecimentoData.valorfinal}, 
                'P', 
                0, 
                0,  
                '', 
                0, 
                '');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { bico, abastecimento, idAbastecimento, statusInsert } }

};

const enviarlog = async function ({ idLoja, encerranteDepois, datahora, idBico, insertAbastecimentoData }) {

    let statusInsert;

    const abastecimento = await useDB({
        query: `SELECT id_abastecimentos FROM public.vd_abastecimentos where loja_fk=${idLoja} and bico_fk=${idBico} and  encerrantedepois=${encerranteDepois}  and datahora='${datahora}'`
    });

    const idAbastecimento = await useDB({
        query: `SELECT max(id_abastecimentos)+1 as idc  FROM public.vd_abastecimentos  where loja_fk=${idLoja} `
    });

    const insertAbastecimento = await useDB({
        query: `INSERT INTO public.vd_abastecimentos(
            id_abastecimentos, 
            loja_fk, 
            bico_fk,
            datahora, 
            encerranteantes,  
            qtd, 
            encerrantedepois, 
            valorunit, 
            valorfinal, 
            status_abastecimento,  
            coo, 
            numnota, 
            numserieecf, 
            estacaosel, 
            hash_abastecimento)  VALUES (
                ${idAbastecimento[0].idc}, 
                ${insertAbastecimentoData.loja_fk},
                ${insertAbastecimentoData.bico_fk},  
                '${insertAbastecimentoData.datahora}',  
                ${insertAbastecimentoData.encerranteantes}, 
                ${insertAbastecimentoData.qtd},
                ${insertAbastecimentoData.encerrantedepois},    
                ${insertAbastecimentoData.valorunit}, 
                ${insertAbastecimentoData.valorfinal}, 
                'P', 
                0, 
                0,  
                '', 
                0, 
                '');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { abastecimento, idAbastecimento, statusInsert } }

};

const enviarlogcsv = async function ({ idLoja, codBarra, dataMov, encerranteInicial, encerranteFinal, afericao, idBico, idLmcCab }) {

    const bicoFk = await useDB({
        query: `select bico_fk from codigobarras_bico where loja_fk=${idLoja} and  codigobarras='${codBarra}' `
    });
    
    const lmcCab = await useDB({
        query:`select  id_lmccab from cd_lmccab  where loja_fk=${idLoja} and  datamovimento_lmccab='${dataMov}' `
    });

    const updateLmcdet = await useDB({
        query:`UPDATE public.cd_lmcdet  SET encerranteinicial=${encerranteInicial}, encerrantefinal=${encerranteFinal}, afericao=${afericao}  WHERE  bico_fk=${idBico} and lmccab_fk=${idLmcCab} and loja_fk=${idLoja} `
    });

    return { code: 200, results: { bicoFk, lmcCab, updateLmcdet } }

};

module.exports = {
    enviarlog3,
    enviarlog,
    enviarlogcsv
}