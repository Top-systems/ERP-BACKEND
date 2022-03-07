const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const setar = async function ({ idLoja, idPrevenda }) {

    const prevendaItem = await useDB({
        query: `select * from Vd_Prevendaitem where loja_Fk=${idLoja} and prevenda_fk=${idPrevenda}  order by seqitem asc`
    });

    const prevendaLotemed = await useDB({
        query: `select Vd_Prevenda_Lotemed.* from Vd_Prevenda_Lotemed, vd_prevendaitem where Vd_Prevenda_Lotemed.loja_fk=${idLoja} and vd_prevendaitem.prevenda_fk=${idPrevenda} and vd_prevenda_lotemed.prevendaitem_fk = vd_prevendaitem.prevenda_fk  order by vd_Prevendaitem.seqitem asc`
    });

    const cupomCab = await useDB({
        query: `select * from Ecf_Cupomcab where loja_fk=${idLoja} and prevenda_fk=${idPrevenda} and status_Cupom in('F','O','D') `
    });

    return { code: 200, results: { prevendaItem, prevendaLotemed, cupomCab } }

};

const filtrar = async function ({ idLoja, campo, valor, dataFinal, dataInicial }) {

    const prevendaCampo = await useDB({
        query: `select * from Vd_Prevenda where loja_Fk=${idLoja} and upper(cast(${campo} as text)) like '%${valor.toUpperCase()}%'   order by ${campo} asc `
    });

    const prevendaData = await useDB({
        query:`select * from Vd_Prevenda where loja_Fk=${idLoja} and (cast(datahora_Prevnd as date) between '${dataInicial}' and '${dataFinal}')   order by datahora_Prevnd asc `
    });

    return { code: 200, results: { prevendaCampo, prevendaData } }

};

module.exports = {
    setar,
    filtrar
}