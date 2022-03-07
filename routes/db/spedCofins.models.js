const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const cancelarcuponsemaberto = async function ({ idLoja, dataHoraCupom }) {

    const updateCupomDetProd = await useDB({
        query: `update public.ecf_cupomdet_prod set valorfinal_cupitem=round(valorfinal_cupitem,2) where cast(SUBSTR(cast(valorfinal_cupitem as text), LENGTH(cast(valorfinal_cupitem  as text)), 1) as integer)>0; `
    });

    const updateCupomDetBico = await useDB({
        query: `update public.ecf_cupomdet_bico set valorfinal_cupdetbic=round(valorfinal_cupdetbic,2)where cast(SUBSTR(cast(valorfinal_cupdetbic as text), LENGTH(cast(valorfinal_cupdetbic  as text)), 1) as integer)>0; `
    });

    const updateCupomCab = await useDB({
        query: `UPDATE public.ecf_cupomcab  SET  status_cupom='C'  WHERE status_cupom='A' and loja_fk=${idLoja}  and cast(datahora_cupom as date)<'${dataHoraCupom}';`
    });

    const updateCupomDetProd2 = await useDB({
        query: `update ecf_cupomdet_prod set descontoglobal_cupitem=0 where loja_fk=${idLoja}  and id_cupomdet_prod in (SELECT id_cupomdet_prod   FROM public.ecf_cupomdet_prod AS d   inner join ecf_cupomcab as cab on cab.id_cupomcab=d.cupomcab_fk   where descontoglobal_cupitem=valordesconto_cupitem   and valordesconto_cupitem=desconto_cupomcab   and d.loja_fk=${idLoja}  and totalitens_cupom=1 and cab.loja_fk=${idLoja}  and status_cupom in ('F','O','D') and descontoglobal_cupitem>0 and valordesconto_cupitem>0);`
    });

    const updateCupomDetProd3 = await useDB({
        query: `  UPDATE public.ecf_cupomdet_prod    SET valorfinal_cupitem=(qtde_cupitem*valorunit_cupitem)  WHERE id_cupomdet_prod in (  SELECT id_cupomdet_prod   FROM public.ecf_cupomdet_prod as det inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk   where valordesconto_cupitem>0   and desconto_cupomcab=0   AND status_cupitem='F'   and status_cupom in ('F','O')   AND totalliquido_cupom!=totalbruto_cupom   and det.loja_fk=${idLoja}    and cab.loja_fk=${idLoja}    and totalitens_cupom=1   and  valorfinal_cupitem>(qtde_cupitem*valorunit_cupitem))   and loja_fk=${idLoja}; `
    });

    const updateCupomDetBico2 = await useDB({
        query: `update public.ecf_cupomdet_bico  set status_cupdetbic='C',abastecimento_fk=null where cupomcab_fk in (SELECT cupomcab_fk   FROM public.ecf_cupomdet_bico as det   inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk   where det.loja_fk=${idLoja}  and cab.loja_fk=${idLoja}  and status_cupom='C' and status_cupdetbic!='C' and datahora_cupom='${dataHoraCupom}')  `
    });

    const updateCupomDetProd4 = await useDB({
        query: `update public.ecf_cupomdet_prod set status_cupitem='C' where cupomcab_fk in (SELECT cupomcab_fk   FROM public.ecf_cupomdet_prod  as det   inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk   where det.loja_fk=${idLoja}  and cab.loja_fk=${idLoja}  and status_cupom='C' and status_cupitem!='C' and datahora_cupom='${dataHoraCupom}' )  `
    });

    const updateCupomCab2 = await useDB({
        query: ` update ecf_cupomcab set status_cupom='C'  where status_cupom in ('F') AND (protocolo IS  NULL OR protocolo ='')  AND tipoequip IN ('NFCE','SAT')  and loja_fk=${idLoja}`
    });

    return { code: 200, results: { updateCupomDetProd, updateCupomDetBico, updateCupomCab, updateCupomDetProd2, updateCupomDetProd3, updateCupomDetBico2, updateCupomDetProd4, updateCupomCab2 } }

};

const gerarsped = async function ({ idLoja, insertNfeFaturaData }) {

    let statusInsert

    const updateCupomDetProd1 = await useDB({
        query: `update ecf_cupomdet_prod set valorfinal_cupitem=0 where valorfinal_cupitem is null and loja_fk=${idLoja}`
    });

    const updateCupomDetProd2 = await useDB({
        query: `update ecf_cupomdet_prod set valorfinal_cupitem=0 where valoracrescimo_cupitem is null and loja_fk=${idLoja}`
    });

    const updateCupomDetProd3 = await useDB({
        query: `update ecf_cupomdet_prod set valorfinal_cupitem=0 where descontoglobal_cupitem is null and loja_fk=${idLoja}`
    });

    const loja = await useDB({
        query: `SELECT * FROM Cf_Loja WHERE id_Loja=${idLoja} AND id_Loja!=9999 `
    });

    const idNfeFatura = await useDB({
        query: `select max(id_nfefatura)+1 as idc from nfe_fatura where loja_fk=${idLoja} `
    });

    const insertNfeFatura = await useDB({
        query: `INSERT INTO public.nfe_fatura(	
            id_nfefatura, 
            loja_fk ,
            usuarioaltera, 
            dataaltera,  
            tipo,
            descricao,
            cnpj)	VALUES (
                ${idNfeFatura[0].idc},
                ${insertNfeFaturaData.loja_fk}, 
                ${insertNfeFaturaData.usuarioaltera}, 
                now(),
                'sped pis/cofins',
                'periodo ${insertNfeFaturaData.dataInicio} - ${insertNfeFaturaData.dataFim}', 
                '${insertNfeFaturaData.cnpj}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { updateCupomDetProd1, updateCupomDetProd2, updateCupomDetProd3, loja, idNfeFatura, statusInsert } }

};

const lojas = async function ({ }) {

    const lista = await useDB({
        query: `SELECT * FROM Cf_Loja WHERE id_Loja!=9999  ORDER BY id_Loja ASC`
    });

    return { code: 200, results: { lista } }

};

const listarpis = async function ({ }) {

    const piscoFins = await useDB({
        query: `select * from Cd_Cstpiscofins  where cod_Cstpiscofins<=49 order by cod_Cstpiscofins asc `
    });

    return { code: 200, results: { piscoFins } }

};

const listarpiss = async function ({ }) {

    const piscoFins = await useDB({
        query: `select * from Cd_Cstpiscofins  where cod_Cstpiscofins>49 order by cod_Cstpiscofins asc `
    });

    return { code: 200, results: { piscoFins } }

};

const listarnat = async function ({ }) {

    const tribNatureza = await useDB({
        query: ` select * from Cd_Trib_Naturezareceita order by codigo_Natrec asc `
    });

    return { code: 200, results: { tribNatureza } }

};

module.exports = {
    cancelarcuponsemaberto,
    gerarsped,
    lojas,
    listarpis,
    listarpiss,
    listarnat
}