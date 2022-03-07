const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const listar = async function ({ idLoja, status }) {

    const boletoWs = await useDB({
        query: `SELECT * FROM boleto_ws WHERE loja_fk=${idLoja} AND status='${status}' order by id desc, datavencimento desc`
    });

    return { code: 200, results: { boletoWs } }

};

const listarp = async function ({ idLoja, dataVencimento, campo, valor, status, tipodata }) {

    const boletoWsR = await useDB({
        query: `SELECT * FROM boleto_ws WHERE status='R' AND loja_fk=${idLoja} AND datavencimento<'${dataVencimento}' AND upper(cast(${campo} as text)) like '%${valor.toUpperCase()}%' order by datavencimento desc`
    });

    const boletoWs = await useDB({
        query: `SELECT * FROM boleto_ws WHERE 1=1 AND loja_fk=${idLoja} AND status='${status}' AND (${tipodata} BETWEEN '${dataInicial}' AND '${dataFinal}') AND upper(cast(${campo} as text)) like '%${valor.toUpperCase()}%' order by ${tipodata} desc`
    });

    return { code: 200, results: { boletoWsR } }

};

const setarconfig = async function ({ codigoBanco, idLoja, ambiente, banco }) {

    const configBoleto = await useDB({
        query: `SELECT config_boleto.* FROM config_boleto, cd_banco WHERE cd_banco.codigo_banco='${codigoBanco.toUpperCase()}' AND cd_banco.codigo_banco is not null and loja_fk=${idLoja} order by id desc`
    });

    const numeroBoletoWs = await useDB({
        query: `SELECT max(numero)+1 AS idc FROM boleto_ws WHERE status!='E' AND ambiente='${ambiente}' AND banco='${banco}'`
    });

    return { code: 200, results: { configBoleto, numeroBoletoWs } }

};

const pesquisarPorColuna = async function ({ colunaBusca, textoBusca }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM boleto_ws WHERE UPPER(CAST(${colunaBusca})) LIKE '${textoBusca.toUpperCase()}%' ORDER BY ${colunaBusca}`
    });

    return { code: 200, results: { pesquisa } }

};

const ver = async function ({ numeroNfefatura, idLoja }) {

    const fatura = await useDB({
        query: `SELECT nfe_cabecalho.* FROM nfe_fatura, nfe_cabecalho WHERE numero_nfefatura=${numeroNfefatura} AND tipo='boleto' and nfe_cabecalho.statusnota_nfecab in ('5') and loja_fk=${idLoja} and nfe_fatura.nfecab_fk = nfe_cabecalho.id_nfe_cabecalho`
    });

    return { code: 200, results: { fatura } }

};

const gerarbradesco = async function ({ idLoja }) {

    const configNfe = await useDB({
        query: `SELECT * FROM cf_config_nfe WHERE loja_fk=${idLoja}`
    });

    return { code: 200, results: { configNfe } }

};

const enviaremailx = async function ({ codigoBanco, idLoja }) {

    const configBoleto = await useDB({
        query: `SELECT config_boleto.* FROM config_boleto, cd_banco WHERE cd_banco.codigo_banco='${codigoBanco.toUpperCase()}' AND cd_banco.codigo_banco is not null and loja_fk=${idLoja} order by id desc`
    });


    return { code: 200, results: { configBoleto } }

};

const mailnfe = async function ({ codigoBanco, idLoja, insertEmailData }) {

    let statusInsert;

    const configBoleto = await useDB({
        query: `SELECT config_boleto.* FROM config_boleto, cd_banco WHERE cd_banco.codigo_banco='${codigoBanco.toUpperCase()}' AND cd_banco.codigo_banco is not null and loja_fk=${idLoja} order by id desc`
    });

    const insertEmail = await useDB({
        query: `INSERT INTO public.emails(
             remetente, 
             destinatario, 
             assunto, 
             mensagem, 
             usuarioenvio,   
             loja, 
             dataenvio, 
             situacao) VALUES (
                 '${insertEmailData.remetente}', 
                 '${insertEmailData.destinatario}', 
                 '${insertEmailData.assunto}', 
                 '${insertEmailData.mensagem}', 
                 ${insertEmailData.usuarioenvio},  
                 ${insertEmailData.loja}, 
                 '${insertEmailData.dataenvio}',
                '${insertEmailData.situacao}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });


    return { code: 200, results: { configBoleto, statusInsert } }

};

const mailnfe2 = async function ({ codigoBanco, idLoja, insertEmailData }) {

    let statusInsert;

    const configBoleto = await useDB({
        query: `SELECT config_boleto.* FROM config_boleto, cd_banco WHERE cd_banco.codigo_banco='${codigoBanco.toUpperCase()}' AND cd_banco.codigo_banco is not null and loja_fk=${idLoja} order by id desc`
    });

    const insertEmail = await useDB({
        query: `INSERT INTO public.emails(
             remetente, 
             destinatario, 
             assunto, 
             mensagem, 
             usuarioenvio,   
             loja, 
             dataenvio, 
             situacao) VALUES (
                 '${insertEmailData.remetente}', 
                 '${insertEmailData.destinatario}', 
                 '${insertEmailData.assunto}', 
                 '${insertEmailData.mensagem}', 
                 ${insertEmailData.usuarioenvio},  
                 ${insertEmailData.loja}, 
                 '${insertEmailData.dataenvio}',
                '${insertEmailData.situacao}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });


    return { code: 200, results: { configBoleto, statusInsert } }

};

const listaremails = async function ({ idLoja, campo, valor }) {

    const emails = await useDB({
        query: `select * from Emails vo where tipo='boleto' and loja=${idLoja}  order by id desc`
    });

    const emails2 = await useDB({
        query: `select * from Emails where tipo='boleto'  and upper(${campo}) like '%${valor.toUpperCase()}%'  and loja=${idLoja}  order by ${campo} asc`
    });

    return { code: 200, results: { emails, emails2 } }

};

const listarboletositau = async function ({ cnpj }) {

    const loja = await useDB({
        query: `select * from Cf_Loja  where cnpj_Loja='${cnpj}' `
    });

    return { code: 200, results: {} }

};

const processarretornobancodobrasil = async function ({ idBoleto, dataVencimento, valor, convenio, updateBoletoWsData, id }) {

    const boletoWs = await useDB({
        query: `select id from boleto_ws  where id=${idBoleto}  and datavencimento='${dataVencimento}' and valor=${valor}  and banco='BANCO DO BRASIL'  and convenio=${convenio}  and status='R' `
    });

    const updateBoletoWs = await useDB({
        query:`update boleto_ws set status='P',valorpago=${updateBoletoWsData.valorpago},valorrecebido=${updateBoletoWsData.valorrecebido},datapagamento='${updateBoletoWsData.datapagamento}',databaixa='${updateBoletoWsData.databaixa}' where id=${id} `
    });

    return { code: 200, results: { boletoWs, updateBoletoWs } }

};

const retorno = async function({ codigoBanco, idLoja }){ 

    const configBoleto = await useDB({ 
    query: `select Config_Boleto.* from Config_Boleto, cd_banco where cd_banco.codigo_Banco ='${codigoBanco}'  and cd_banco.codigo_Banco is not null and loja_Fk=${idLoja}  order by id desc `
 }); 

 return { code: 200, results: { configBoleto }}  
    
};

module.exports = {
    listar,
    listarp,
    setarconfig,
    pesquisarPorColuna,
    ver,
    gerarbradesco,
    enviaremailx,
    mailnfe,
    mailnfe2,
    listaremails,
    listarboletositau,
    processarretornobancodobrasil,
    retorno
}