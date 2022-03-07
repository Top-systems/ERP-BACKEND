const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const consultar = async function ({ idLoja, dataInicial, dataFinal, idPbm, campo, valor, idPbmCab }) {

    const pbmCab = await useDB({
        query: `select * from Ecf_Pbmcab where loja_fk=${idLoja} and (cast(dataaut_Pbmcab as date) between '${dataInicial}' and '${dataFinal}') and pbm_Fk=${idPbm} and (upper(cast( ${campo} as text)) like '%${valor.toUpperCase()}%' ) order by ${campo} desc `
    });

    const pbmCab2 = await useDB({
        query: `select c.serieecf_cupom,status_cupom from  ecf_pbmcab as cab inner join ecf_cupomcab as c on (c.coo_cupom=cab.coocupom_pbm   AND  cast(c.datahora_cupom as date)=dataaut_pbmcab) where cab.loja_fk =${idLoja}  and id_pbmcab=${idPbmCab} `
    });

    return { code: 200, results: { pbmCab, pbmCab2 } }

};

const listaritens = async function({ idLoja, idPbmCab }){ 

    const pbmDet = await useDB({ 
    query: `select * from Ecf_Pbmdet where loja_Fk=${idLoja} and pbmcab_fk=${idPbmCab}  order by seqitem_Pbmdet asc`
 }); 

 return { code: 200, results: { pbmDet }}  
    
};

const run = async function({ idImgReceita }){ 

    const updateReceitas = await useDB({ 
    query: `UPDATE public.vd_img_receitas   SET salvows=1 WHERE id=${idImgReceita}`
 }); 

 return { code: 200, results: { updateReceitas }}  
    
};

const listarimgx = async function({ idReceita, obs, idLoja }){ 

    const imgReceita = await useDB({ 
    query: `select * from Vd_Img_Receitas where receita_Fk=${idReceita} and obs='${obs}'  and loja_Fk=${idLoja}  `
 }); 

 return { code: 200, results: { imgReceita }}  
    
};

const listarimg = async function({ idReceita, obs, idLoja }){ 

    const imgReceita = await useDB({ 
    query: `select * from Vd_Img_Receitas where receita_Fk=${idReceita} and obs='${obs}'  and loja_Fk=${idLoja}  `
 }); 

 return { code: 200, results: { imgReceita }}  
    
};



module.exports = {
    consultar,
    listaritens,
    run,
    listarimgx,
    listarimg
}