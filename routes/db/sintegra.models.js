const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const cancelarcuponsemaberto = async function ({ idLoja, dataHoraCupom }) {

    const updateCompraDetalhe = await useDB({
        query: `UPDATE public.fn_compra_detalhe SET fcpst=0 WHERE fcpst is null`
    });

    const updateCupomDetBico = await useDB({
        query: `update public.ecf_cupomdet_bico  set status_cupdetbic='C',abastecimento_fk=null where cupomcab_fk in (SELECT cupomcab_fk FROM public.ecf_cupomdet_bico as det inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk where det.loja_fk=${idLoja}  and cab.loja_fk=${idLoja}  and status_cupom='C' and status_cupdetbic!='C' and datahora_cupom='${dataHoraCupom}')  `
    });

    const updateCupomDetProd = await useDB({
        query: `update public.ecf_cupomdet_prod set status_cupitem='C' where cupomcab_fk in (SELECT cupomcab_fk   FROM public.ecf_cupomdet_prod  as det   inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk   where det.loja_fk=${idLoja}  and cab.loja_fk=${idLoja}  and status_cupom='C' and status_cupitem!='C' and datahora_cupom='${dataHoraCupom}' )  `
    });

    const updateCupomCab = await useDB({
        query: ` update ecf_cupomcab set status_cupom='C' where status_cupom in ('F') AND (protocolo IS  NULL OR protocolo ='')  AND tipoequip IN ('NFCE','SAT')  and loja_fk=${idLoja}`
    });

    return { code: 200, results: { updateCompraDetalhe, updateCupomDetBico, updateCupomDetProd, updateCupomCab } }

};

const gerarSintegra = async function ({ idLoja, dataInventario, insertFaturaData }) {

    let statusInsert;

    const inventarioCab = await useDB({
        query: `select * from Lf_Inventario_Cab where loja_fk=${idLoja} and data_Inventario='${dataInventario}'`
    });

    const updateCupomDetProd = await useDB({
        query: `update ecf_cupomdet_prod set valorfinal_cupitem=0 where valorfinal_cupitem is null and loja_fk=${idLoja}`
    })

    const updateCupomDetProd2 = await useDB({
        query: `update ecf_cupomdet_prod set valoracrescimo_cupitem=0 where valoracrescimo_cupitem is null and loja_fk=${idLoja}`
    });

    const updateCupomDetProd3 = await useDB({
        query: `update ecf_cupomdet_prod set descontoglobal_cupitem=0 where descontoglobal_cupitem is null and loja_fk=${idLoja}`
    });

    const loja = await useDB({
        query: `SELECT * FROM Cf_Loja WHERE id_Loja=${idLoja} AND id_Loja!=9999 `
    });

    const idNfeFatura = await useDB({
        query: `select max(id_nfefatura)+1 as idc from nfe_fatura where loja_fk=${idLoja} `
    });

    const insertFatura = await useDB({
        query: `INSERT INTO public.nfe_fatura(	
            id_nfefatura, 
            loja_fk,
            usuarioaltera, 
            dataaltera,  
            tipo,
            descricao,
            cnpj)	VALUES (
                ${idNfeFatura[0].idc},
                ${insertFaturaData.loja_fk}, 
                ${insertFaturaData.usuarioaltera}, 
                now(),
                'sintegra',
                'periodo ${insertFaturaData.dataInicio} - ${insertFaturaData.dataFim}', 
                '${insertFaturaData.cnpj}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { inventarioCab, updateCupomDetProd, updateCupomDetProd2, updateCupomDetProd3, loja, idNfeFatura, statusInsert } }

};

const lojas = async function ({ }) {

    const lista = await useDB({
        query: `SELECT * FROM Cf_Loja WHERE id_Loja!=9999  ORDER BY id_Loja ASC`
    });

    return { code: 200, results: { lista } }

};

module.exports = {
    cancelarcuponsemaberto,
    gerarSintegra,
    lojas
}