const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const listar = async function ({ idLoja, dataInicial, dataFinal, numSerie }) {

    const reducaoCab = await useDB({
        query: `select * from Ecf_Reducaozcab_R02 where loja_fk=${idLoja} and (cast(datamovimento_Docr02 as date) between '${dataInicial}' and '${dataFinal}')  and numserieecf_Docr02='${numSerie}'  order by datamovimento_Docr02 asc`
    });

    /* String imp = "";
    if (!impressora.equals("todas")) {
        imp = " and vo.numserieecfDocr02='" + impressora + "' ";
    }

        String h = "select vo from EcfReducaozcabR02 vo "
        + " where vo.cfLoja.idLoja=" + loja.getIdLoja() + ""
        + " and (cast(vo.datamovimentoDocr02 as date) between '" + sd.format(datai) + "'"
        + " and '" + sd.format(dataf) + "')"
        + "  " + imp + " "
        + " order by vo.datamovimentoDocr02 asc"; */

    return { code: 200, results: { reducaoCab } }

};

const verhoje = async function ({ dataEmissao, serieEcf, idLoja }) {

    const sintegra60i = await useDB({
        query: `select * from Ecf_Sintegra60i where dataemissao_Sint60i='${dataEmissao}' and serieecf_Sint60i='${serieEcf}' and loja_fk=${idLoja} `
    });

    const sintegra60d = await useDB({
        query: `select * from Ecf_Sintegra60d where dataemissao_Sint60d='${dataEmissao}'  and serieecf_Sint60d='${serieEcf}' and loja_fk=${idLoja} `
    });

    return { code: 200, results: { sintegra60i, sintegra60d } }

};

const ver = async function ({ idLoja, idDocr02, dataEmissao, serieEcf }) {

    const reducao = await useDB({
        query: `select * from Ecf_Reducaozdet_R03 where loja_fk=${idLoja}  and docr02_fk=${idDocr02}`
    });

    const sintegra60i = await useDB({
        query: `select * from Ecf_Sintegra60i where dataemissao_Sint60i='${dataEmissao}' and serieecf_Sint60i='${serieEcf}' and loja_fk=${idLoja} `
    });

    const sintegra60d = await useDB({
        query: `select * from Ecf_Sintegra60d where dataemissao_Sint60d='${dataEmissao}'  and serieecf_Sint60d='${serieEcf}' and loja_fk=${idLoja} `
    });
    return { code: 200, results: { reducao, sintegra60d, sintegra60i } }

};

const criticarselecao = async function ({ idLoja, idDocr02, dataEmissao, serieEcf }) {

    const reducao = await useDB({
        query: `select * from Ecf_Reducaozdet_R03 where loja_fk=${idLoja}  and docr02_fk=${idDocr02}`
    });

    const sintegra60i = await useDB({
        query: `select * from Ecf_Sintegra60i where dataemissao_Sint60i='${dataEmissao}' and serieecf_Sint60i='${serieEcf}' and loja_fk=${idLoja} `
    });

    const sintegra60d = await useDB({
        query: `select * from Ecf_Sintegra60d where dataemissao_Sint60d='${dataEmissao}'  and serieecf_Sint60d='${serieEcf}' and loja_fk=${idLoja} `
    });
    return { code: 200, results: { reducao, sintegra60d, sintegra60i } }

};
module.exports = {
    listar,
    verhoje,
    ver,
    criticarselecao
}
