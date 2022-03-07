const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const alertas = async function ({ idLoja, dataInicial, dataFinal, anoEntradaSaida, dataMovimentoLmcCab }) {

    const countManifesto = await useDB({
        query: `SELECT count(id)  FROM public.nfe_manifesto  where loja_fk=${idLoja} and evento_realizado='N'  and (data_emissao between '${dataInicial}' and '${dataFinal}')`
    });

    const chaveManifesto = await useDB({
        query: `SELECT distinct chave  FROM public.nfe_manifesto as n  inner join fn_compra_cabecalho as cab on cab.chaveacesso_compracab=n.chave  where n.loja_fk=${idLoja}   and cab.loja_fk=${idLoja}  and situacao_nota='3' and to_char(dataentradasaida_compracab,'YYYY') ='${anoEntradaSaida}'`
    });

    const arquivoAnvisa = await useDB({
        query: `SELECT datafinal FROM public.cd_arquivosanvisa where loja_fk=${idLoja}  and  situacao !='N' order by  datafinal desc `
    });

    const countIdLote = await useDB({
        query: `SELECT count(id_lote)  FROM public.cd_lote  where qtde_lote>0 and  validade_lote<cast(now() as date)  and produto_fk in (select id_prod from cd_produto where classeterapeutica_prod in ('1','2'))  and loja_fk=${idLoja} `
    });

    const countIdProduto = await useDB({
        query: `SELECT count(id_prod)  FROM public.cd_produto as p  where ((select sum(qtde_lote) from cd_lote where produto_fk=p.id_prod)!=(select sum(estoque) from es_estoquegeral as e  where e.produto_fk=p.id_prod and e.loja_fk=${idLoja} ))   and  classeterapeutica_prod!='0'`
    });

    const countIdSituacao = await useDB({
        query: `SELECT count(id_lmcsituacao)  FROM public.cd_lmcsituacao as s  inner join cd_lmccab as cab on cab.id_lmccab=s.lmccab_fk  where s.loja_fk=${idLoja} and cab.loja_fk=${idLoja}  and  s.situacao='P'  and datamovimento_lmccab<'${dataMovimentoLmcCab}'`
    });

    const countIdDet = await useDB({
        query: `SELECT count(id_lmcdet)  FROM public.cd_lmcdet as s  where s.loja_fk=${idLoja}   and  s.encerranteinicial>s.encerrantefinal`
    });

    return { code: 200, results: { countManifesto, chaveManifesto, arquivoAnvisa, countIdLote, countIdProduto, countIdProduto, countIdSituacao, countIdDet } }

};

const pesquisar = async function ({ recebidoPor, enviadoPor, coluna, valor }) {

    const mensagem = await useDB({
        query: `select * from Mensagem where recebido_Por=${recebidoPor} and  enviado_Por!=${enviadoPor} and (UPPER(CAST(${coluna} as text)) like '%${valor.toUpperCase()}%') order by id desc`
    });

    const mensagem2 = await useDB({
        query: `select * from Mensagem where  enviado_Por=${enviadoPor} and (UPPER(CAST(${coluna} as text)) like '%${valor.toUpperCase()}%') order by id desc`
    });

    return { code: 200, results: { mensagem, mensagem2 } }

};

const enviarmsgres = async function ({ textoCrypt, idMensagem }) {

    const updateMensagem = await useDB({
        query: `update mensagem set textocrypt=${textoCrypt} where id=${idMensagem} `
    });

    return { code: 200, results: { updateMensagem } }

};

const listar = async function ({ recebidoPor, enviadoPor }) {

    const countIdMensagem = await useDB({
        query: `select count(id) from Mensagem where (lido=false and recebido_Por=${recebidoPor}) and enviado_Por!=${enviadoPor}`
    });

    const mensagem = await useDB({
        query: `select * from Mensagem where recebido_Por=${recebidoPor} and  enviado_Por!=${enviadoPor} order by id desc`
    });

    return { code: 200, results: { countIdMensagem, mensagem } }

};


const listar2 = async function ({ recebidoPor, enviadoPor }) {

    const countIdMensagem = await useDB({
        query: `select count(id) from Mensagem where (lido=false and recebido_Por=${recebidoPor}) and enviado_Por!=${enviadoPor}`
    });

    return { code: 200, results: { countIdMensagem } }

};

const listarenviadas = async function ({ enviadoPor }) {

    const mensagem = await useDB({
        query: `select * from Mensagem where enviado_Por=${enviadoPor} order by id desc`
    });

    return { code: 200, results: { mensagem } }

};

const ler = async function ({ idMensagem }) {

    const textoCrypt = await useDB({
        query: `select textocrypt from mensagem where id=${idMensagem} `
    });

    return { code: 200, results: { textoCrypt } }

};

const lerenviada = async function ({ idMensagem }) {

    const textoCrypt = await useDB({
        query: `select textocrypt from mensagem where id=${idMensagem} `
    });

    return { code: 200, results: { textoCrypt } }

};

const listaruser = async function ({ idUsuario }) {

    const usuario = await useDB({
        query: `select * from Cd_Usuario where id_Usuario!=${idUsuario} and status_Usu='A' order by id_Usuario asc`
    });

    return { code: 200, results: { usuario } }

};

const user = async function ({ idUsuario }) {

    const usuario = await useDB({
        query: `select * from Cd_Usuario where id_Usuario!=${idUsuario} and status_Usu='A' order by id_Usuario asc`
    });

    return { code: 200, results: { usuario } }

};

const enviarmsg = async function ({ textoCrypt, idMensagem }) {

    const updateMensagem = await useDB({
        query: `update mensagem set textocrypt=${textoCrypt} where id=${idMensagem} `
    });

    return { code: 200, results: { updateMensagem } }

};

const atualizarncm = async function ({ ncmCompleto, insertTribNcmData, aliqEstadual, aliqMunicipal, aliqNacional, codigo, insertIbptData, cest, descricao, ncm, insertCestData }) {

    let statusInsert, statusInsert2, statusInsert3;

    const tribNcm = await useDB({
        query: `select from trib_ncm where ncm_completo='${ncmCompleto}' limit 1`
    });

    const updateTribNcm = await useDB({
        query: `update trib_ncm set inexistente='S' where ncm_completo='${ncmCompleto}' and inexistente!='S'`
    });

    const insertTribNcm = await useDB({
        query:`INSERT INTO public.trib_ncm( 
            ncm_completo, 
            descricao, 
            aliquotaipi, 
            cstpis_entrada, 
            cstpis_saida, 
            cstcofins_entrada, 
            cstcofins_saida, 
            base_imposto,  
            tiporegimento, 
            inexistente)    VALUES (
                '${insertTribNcmData.ncm_completo}', 
                '${insertTribNcmData.descricao}', 
                0, 
                26, 
                10, 
                26, 
                10, 
                0, 
                0,
                '${insertTribNcmData.inexistente}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const idIbpt = await useDB({
        query:`select from cd_ibpt where codigo='${codigo}' limit 1`
    });

    const updateIbpt = await useDB({
        query:`update cd_ibpt set aliqnacional=${aliqNacional},aliqestadual=${aliqEstadual},aliqmunicipal=${aliqMunicipal} where codigo='${codigo}'`
    });

    const insertIbpt = await useDB({
        query:`INSERT INTO public.cd_ibpt(
            codigo,  
            aliqnacional, 
            aliqestadual, 
            aliqmunicipal) VALUES (
                '${insertIbptData.codigo}', 
                ${insertIbptData.aliqnacional}, 
                ${insertIbptData.aliqestadual}, 
                ${insertIbptData.aliqmunicipal});`
    }).then(() => {
        statusInsert2 = 'Registro  com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });

    const cdCest = await useDB({
        query:`select from cd_cest where cest='${cest}' limit 1`
    });

    const updateCest = await useDB({
        query:`update cd_cest set descricao='${descricao}',ncm='${ncm}' where cest='${cest}'`
    });

    const insertCest = await useDB({
        query:`INSERT INTO public.cd_cest( 
            cest, 
            ncm, 
            descricao)    VALUES (
            '${insertCestData.cest}',
            '${insertCestData.ncm}',
            '${insertCestData.descricao}');`
    }).then(() => {
        statusInsert3 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert3 = err.message;
    });

    const updateTribNcm2 = await useDB({
        query:`UPDATE public.trib_ncm   SET ncm_completo='00000000',inexistente='S' WHERE ncm_completo='' OR ncm_completo IS NULL;
        UPDATE public.trib_ncm   SET ncm_completo='00000000',inexistente='S' WHERE id=0;`
    });

    const updateProduto = await useDB({
        query:`update cd_produto set cest_fk=(select c.id from cd_cest as c inner join trib_ncm as n on n.ncm_completo=c.ncm where n.id=ncm_fk limit 1) where ncm_fk is not null;`
    });

    const atualizacao = await useDB({
        query:`select * from Atualizacao where descricao='ATUALIZAR NCM/CST/IBPT 2017'`
    });

    return { code: 200, results: { tribNcm, updateTribNcm, statusInsert, idIbpt,updateIbpt, statusInsert2, cdCest, updateCest, statusInsert3, updateTribNcm, updateProduto, atualizacao } }

};


module.exports = {
    alertas,
    pesquisar,
    enviarmsgres,
    listar,
    listar2,
    listarenviadas,
    ler,
    lerenviada,
    listaruser,
    user,
    enviarmsg,
    atualizarncm
}