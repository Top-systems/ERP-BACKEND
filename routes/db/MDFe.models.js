const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const novo = async function ({ tipoAmbiente, idLoja }) {

    const mdfe = await useDB({
        query: `select * from Vd_Mdfe where tipoambiente='${tipoAmbiente}' and status in ('5','6','7','9','10') and loja_fk=${idLoja} order by id desc `
    });

    return { code: 200, results: { mdfe } }

};

const salvarmdfe = async function ({ idLoja, insertMdfeCidadesData, insertMdfeVeiculoData, insertMdfeEnvolvidoData, insertMdfeDocsData }) {

    let statusInsert, statusInsert2, statusInsert3, statusInsert4;

    const idMdfeCidade = await useDB({
        query: `select max(id) +1 as id from vd_mdfe_cidades  where loja_fk=${idLoja} `
    });

    const insertMdfeCidades = await useDB({
        query: `  INSERT INTO public.vd_mdfe_cidades(  
            id, 
            loja_fk, 
            mdfe_cab)  VALUES (
                ${idMdfeCidade[0].idc}, 
                ${insertMdfeCidadesData.loja_fk},  
                ${insertMdfeCidadesData.mdfe_cab}); `
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const idMfeVeiculo = await useDB({
        query: `select max(id) +1 as id from vd_mdfe_veiculos  where loja_fk=${idLoja} `
    });

    const insertMdfeVeiculo = await useDB({
        query: `  INSERT INTO public.vd_mdfe_veiculos( 
            id, 
            loja_fk, 
            mdfe_cab) VALUES (
                ${idMfeVeiculo[0].idc}, 
                ${insertMdfeVeiculoData.loja_fk},  
                ${insertMdfeVeiculoData.mdfe_cab}); `
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });

    const idMdfeEnvolvido = await useDB({
        query: `select max(id) +1 as id from vd_mdfe_envolvido  where loja_fk=${idLoja} `
    });

    const insertMdfeEnvolvido = await useDB({
        query: `  INSERT INTO public.vd_mdfe_envolvido(  
            id, 
            loja_fk, 
            mdfe_cab)  VALUES (
                ${idMdfeEnvolvido[0].idc}, 
                ${insertMdfeEnvolvidoData.loja_fk},  
                ${insertMdfeEnvolvidoData.mdfe_cab});`

    }).then(() => {
        statusInsert3 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert3 = err.message;
    });

    const idMdfeDocs = await useDB({
        query: `select max(id) +1 as id  from vd_mdfe_docs  where loja_fk=${idLoja} `
    });

    const insertMdfeDocs = await useDB({
        query: `  INSERT INTO public.vd_mdfe_docs(  
            id, 
            loja_fk, 
            mdfe_cab)  VALUES (
                ${idMdfeDocs[0].idc}, 
                ${insertMdfeDocsData.loja_fk},  
                ${insertMdfeDocsData.mdfe_cab});`
    }).then(() => {
        statusInsert4 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert4 = err.message;
    });

    return { code: 200, results: { idMdfeCidade, statusInsert, idMfeVeiculo, statusInsert, insertMdfeEnvolvido, statusInsert3, idMdfeDocs, statusInsert4 } }

};

const iniciaconf = async function ({ idLoja }) {

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk=${idLoja}`
    });

    return { code: 200, results: { configNfe } }

};

const selecionar = async function ({ idMdfe, idLoja, numero, segundoCodBarra }) {

    const mdfeCidades = await useDB({
        query: `select * from Vd_Mdfe_Cidades where mdfe_fk=${idMdfe} and loja_Fk=${idLoja} and tipo='1'`
    });

    const mdfeCidades2 = await useDB({
        query: `select * from Vd_Mdfe_Cidades where mdfe_fk=${idMdfe} and loja_Fk=${idLoja} and tipo='2'`
    });

    const mdfeEnvolvido = await useDB({
        query: `select * from Vd_Mdfe_Envolvido where mdfe_fk=${idMdfe} and loja_Fk=${idLoja} and tipo='condutor'`
    });

    const mdfeEnvolvido2 = await useDB({
        query: `select * from Vd_Mdfe_Envolvido where mdfe_fk=${idMdfe} and loja_Fk=${idLoja} and tipo='produto'`
    });

    const mdfeEnvolvido3 = await useDB({
        query: `select * from Vd_Mdfe_Envolvido where mdfe_fk=${idMdfe} and loja_Fk=${idLoja} and tipo='seguro'`
    });

    const mdfeDocs = await useDB({
        query: `select * from Vd_Mdfe_Docs where mdfe_fk=${idMdfe} and loja_Fk=${idLoja} and tipo='averbacao'  and numero='${numero}' and segundocodbarra='${segundoCodBarra}'`
    });

    const mdfeVeiculos = await useDB({
        query: `select * from Vd_Mdfe_Veiculos where mdfe_fk=${idMdfe} and loja_Fk=${idLoja} and tipo='tracao'`
    });

    const mdfeDocs2 = await useDB({
        query: `select * from Vd_Mdfe_Docs where mdfe_fk=${idMdfe} and loja_Fk=${idLoja} and tipo='doc' `
    });

    const mdfeDocs3 = await useDB({
        query: `select * from Vd_Mdfe_Docs where mdfe_fk=${idMdfe} and loja_Fk=${idLoja} and tipo='percuso' `
    });

    const mdfeDocs4 = await useDB({
        query: `select * from Vd_Mdfe_Docs where mdfe_fk=${idMdfe} and loja_Fk=${idLoja} and tipo='ciot' `
    });

    const mdfeDocs5 = await useDB({
        query: `select * from Vd_Mdfe_Docs where mdfe_fk=${idMdfe} and loja_Fk=${idLoja} and tipo='vale' `
    });

    const mdfeDocs6 = await useDB({
        query: `select * from Vd_Mdfe_Docs where mdfe_fk=${idMdfe} and loja_Fk=${idLoja} and tipo='contratante' `
    });

    const mdfeDocs7 = await useDB({
        query: `select * from Vd_Mdfe_Docs where mdfe_fk=${idMdfe} and loja_Fk=${idLoja} and tipo='lacre' `
    });

    const mdfeDocs8 = await useDB({
        query: `select * from Vd_Mdfe_Docs where mdfe_fk=${idMdfe} and loja_Fk=${idLoja} and tipo='autorizado' `
    });

    const mdfeDocs9 = await useDB({
        query: `select * from Vd_Mdfe_Docs where mdfe_fk=${idMdfe} and loja_Fk=${idLoja} and tipo='reboque' `
    });

    const mdfe = await useDB({
        query: `select * from Vd_Mdfe where tipoambiente='${tipoAmbiente}' and status in ('5','6','7','9','10') and loja_fk=${idLoja} order by id desc `
    });

    return { code: 200, results: { mdfeCidades, mdfeCidades2, mdfeEnvolvido, mdfeEnvolvido2, mdfeDocs, mdfeVeiculos, mdfeDocs2, mdfeDocs3, mdfeDocs4, mdfeDocs5, mdfeDocs6, mdfeDocs7, mdfeDocs8, mdfeDocs9, mdfe } }

};

const pesquisarPorColuna = async function ({ colunaBusca, textoBusca, idLoja, tipoAmbiente }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Vd_Mdfe WHERE ( UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase()}%')  and loja_fk=${idLoja}   and tipoambiente='${tipoAmbiente}'   ORDER BY ${colunaBusca} asc `
    });

    return { code: 200, results: { pesquisa } }

};

const preencherListaBusca = async function ({ idLoja, tipoAmbiente }) {

    const lista = await useDB({
        query: `SELECT * FROM Vd_Mdfe WHERE loja_fk=${idLoja} and tipoambiente='${tipoAmbiente}'   ORDER BY datahoraemissao desc `
    });

    return { code: 200, results: { lista } }

};

const pesquisarPorColunacidade = async function ({ colunaBuscacidade, textoBuscacidade, sigla }) {

    const pesquisa = await useDB({
        query: `SELECT Cd_Cidade.* FROM Cd_Cidade, cd_estado WHERE (UPPER(CAST(Cd_Cidade.${colunaBuscacidade} as text)) LIKE '%${textoBuscacidade.toUpperCase()}%' )   and cd_estado.sigla='${sigla}' and cd_cidade.estado_fk = cd_estado.id_estado ORDER BY Cd_Cidade.${colunaBuscacidade} ASC`
    });

    return { code: 200, results: { pesquisa } }

};

const preencherListabuscacidade = async function ({ uf }) {

    const lista = await useDB({
        query: `select Cd_Cidade.* from Cd_Cidade, cd_estado where codibge_Cid!='' and codibge_Cid is not null and cd_estado.sigla='${uf}' and cd_cidade.estado_fk = cd_estado.id_estado`
    });

    return { code: 200, results: { lista } }

};

const salvarcidadecarregamento = async function ({ idLoja, insertMdfeCidadesData }) {

    let statusInsert

    const idMdfeCidade = await useDB({
        query: `select max(id) +1 as id from vd_mdfe_cidades  where loja_fk=${idLoja} `
    });

    const insertMdfeCidades = await useDB({
        query: `  INSERT INTO public.vd_mdfe_cidades(  
            id, 
            loja_fk, 
            mdfe_cab)  VALUES (
                ${idMdfeCidade[0].idc}, 
                ${insertMdfeCidadesData.loja_fk},  
                ${insertMdfeCidadesData.mdfe_cab}); `
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });
    return { code: 200, results: { idMdfeCidade, statusInsert } }

};

const salvarcondutor = async function ({ idLoja, insertMdfeEnvolvidoData }) {

    let statusInsert

    const idMdfeEnvolvido = await useDB({
        query: `select max(id) +1 as id from vd_mdfe_Envolvido  where loja_fk=${idLoja} `
    });

    const insertMdfeEnvolvido = await useDB({
        query: `  INSERT INTO public.vd_mdfe_Envolvido(  
            id, 
            loja_fk, 
            mdfe_cab)  VALUES (
                ${idMdfeEnvolvido[0].idc}, 
                ${insertMdfeEnvolvidoData.loja_fk},  
                ${insertMdfeEnvolvidoData.mdfe_cab}); `
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });
    return { code: 200, results: { idMdfeEnvolvido, statusInsert } }

};

const salvarcidadecarregamentod = async function ({ idLoja, insertMdfeCidadesData }) {

    let statusInsert

    const idMdfeCidade = await useDB({
        query: `select max(id) +1 as id from vd_mdfe_cidades  where loja_fk=${idLoja} `
    });

    const insertMdfeCidades = await useDB({
        query: `  INSERT INTO public.vd_mdfe_cidades(  
            id, 
            loja_fk, 
            mdfe_cab)  VALUES (
                ${idMdfeCidade[0].idc}, 
                ${insertMdfeCidadesData.loja_fk},  
                ${insertMdfeCidadesData.mdfe_cab}); `
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });
    return { code: 200, results: { idMdfeCidade, statusInsert } }

};

const salvardoc = async function ({ idLoja, insertMdfeDocsData }) {

    let statusInsert

    const idMdfeDocs = await useDB({
        query: `select max(id) +1 as id  from vd_mdfe_docs  where loja_fk=${idLoja} `
    });

    const insertMdfeDocs = await useDB({
        query: `  INSERT INTO public.vd_mdfe_docs(  
            id, 
            loja_fk, 
            mdfe_cab)  VALUES (
                ${idMdfeDocs[0].idc}, 
                ${insertMdfeDocsData.loja_fk},  
                ${insertMdfeDocsData.mdfe_cab});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idMdfeDocs, statusInsert } }

};

const salvarsegurador = async function ({ idLoja, insertMdfeEnvolvidoData }) {

    let statusInsert

    const idMdfeEnvolvido = await useDB({
        query: `select max(id) +1 as id from vd_mdfe_Envolvido  where loja_fk=${idLoja} `
    });

    const insertMdfeEnvolvido = await useDB({
        query: `  INSERT INTO public.vd_mdfe_Envolvido(  
            id, 
            loja_fk, 
            mdfe_cab)  VALUES (
                ${idMdfeEnvolvido[0].idc}, 
                ${insertMdfeEnvolvidoData.loja_fk},  
                ${insertMdfeEnvolvidoData.mdfe_cab}); `
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });
    return { code: 200, results: { idMdfeEnvolvido, statusInsert } }

};

const xmlpdf = async function ({ idLoja }) {

    const logo = await useDB({
        query: `select logo_loja from cf_loja where id_loja=${idLoja} `
    });

    return { code: 200, results: { logo } }

};

const salvarpercuso = async function ({ idLoja, insertMdfeDocsData }) {

    let statusInsert

    const idMdfeDocs = await useDB({
        query: `select max(id) +1 as id  from vd_mdfe_docs  where loja_fk=${idLoja} `
    });

    const insertMdfeDocs = await useDB({
        query: `  INSERT INTO public.vd_mdfe_docs(  
            id, 
            loja_fk, 
            mdfe_cab)  VALUES (
                ${idMdfeDocs[0].idc}, 
                ${insertMdfeDocsData.loja_fk},  
                ${insertMdfeDocsData.mdfe_cab});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idMdfeDocs, statusInsert } }

};

const salvarciot = async function ({ idLoja, insertMdfeDocsData }) {

    let statusInsert

    const idMdfeDocs = await useDB({
        query: `select max(id) +1 as id  from vd_mdfe_docs  where loja_fk=${idLoja} `
    });

    const insertMdfeDocs = await useDB({
        query: `  INSERT INTO public.vd_mdfe_docs(  
            id, 
            loja_fk, 
            mdfe_cab)  VALUES (
                ${idMdfeDocs[0].idc}, 
                ${insertMdfeDocsData.loja_fk},  
                ${insertMdfeDocsData.mdfe_cab});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idMdfeDocs, statusInsert } }

};

const salvarvale = async function ({ idLoja, insertMdfeDocsData }) {

    let statusInsert

    const idMdfeDocs = await useDB({
        query: `select max(id) +1 as id  from vd_mdfe_docs  where loja_fk=${idLoja} `
    });

    const insertMdfeDocs = await useDB({
        query: `  INSERT INTO public.vd_mdfe_docs(  
            id, 
            loja_fk, 
            mdfe_cab)  VALUES (
                ${idMdfeDocs[0].idc}, 
                ${insertMdfeDocsData.loja_fk},  
                ${insertMdfeDocsData.mdfe_cab});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idMdfeDocs, statusInsert } }

};

const salvarcontratante = async function ({ idLoja, insertMdfeDocsData }) {

    let statusInsert

    const idMdfeDocs = await useDB({
        query: `select max(id) +1 as id  from vd_mdfe_docs  where loja_fk=${idLoja} `
    });

    const insertMdfeDocs = await useDB({
        query: `  INSERT INTO public.vd_mdfe_docs(  
            id, 
            loja_fk, 
            mdfe_cab)  VALUES (
                ${idMdfeDocs[0].idc}, 
                ${insertMdfeDocsData.loja_fk},  
                ${insertMdfeDocsData.mdfe_cab});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idMdfeDocs, statusInsert } }

};

const salvarreboque = async function ({ idLoja, insertMdfeVeiculoData }) {

    let statusInsert;

    const idMfeVeiculo = await useDB({
        query: `select max(id) +1 as id from vd_mdfe_veiculos  where loja_fk=${idLoja} `
    });

    const insertMdfeVeiculo = await useDB({
        query: `  INSERT INTO public.vd_mdfe_veiculos( 
            id, 
            loja_fk, 
            mdfe_cab) VALUES (
                ${idMfeVeiculo[0].idc}, 
                ${insertMdfeVeiculoData.loja_fk},  
                ${insertMdfeVeiculoData.mdfe_cab}); `
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idMfeVeiculo, statusInsert } }

};

const salvarlacre = async function ({ idLoja, insertMdfeDocsData }) {

    let statusInsert

    const idMdfeDocs = await useDB({
        query: `select max(id) +1 as id  from vd_mdfe_docs  where loja_fk=${idLoja} `
    });

    const insertMdfeDocs = await useDB({
        query: `  INSERT INTO public.vd_mdfe_docs(  
            id, 
            loja_fk, 
            mdfe_cab)  VALUES (
                ${idMdfeDocs[0].idc}, 
                ${insertMdfeDocsData.loja_fk},  
                ${insertMdfeDocsData.mdfe_cab});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idMdfeDocs, statusInsert } }

};

const cancelarmdfe = async function ({ idLoja, insertEventoData }) {

    let statusInsert;

    const idEvento = await useDB({
        query: `select max(id)+1 as id  from vd_evento where loja_fk=${idLoja} `
    });

    const insertEvento = await useDB({
        query: `INSERT INTO public.vd_evento(  
            id, 
            loja_fk, 
            protocolo, 
            motivo_evento, 
            motivo_retorno, 
            tipo,   
            usuarioaltera, 
            dataaltera,
            chave)  VALUES (
                ${idEvento[0].id}, 
                ${insertEventoData.loja_fk},
                '${insertEventoData.protocolo}', 
                '${insertEventoData.motivo_evento}', 
                '${insertEventoData.motivo_retorno}', 
                'cancelamento', 
                ${insertEventoData.usuarioaltera},  
                '${insertEventoData.dataaltera}', 
                '${insertEventoData.chave}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idEvento, statusInsert } }

};

const pegareventos = async function ({ chave, idLoja, protocolo }) {

    const evento = await useDB({
        query: `select * from Vd_Evento where  chave='${chave}' and loja_fk=${idLoja} and tipo!='dfenfe' and tipo!='nao encerrado'  order by dataaltera desc`
    });

    const evento2 = await useDB({
        query: `select * from Vd_Evento where chave='${chave}' and loja_fk=${idLoja} and tipo='dfenfe' and protocolo='${protocolo}'  order by dataaltera desc`
    });

    return { code: 200, results: { evento, evento2 } }

};

const encerrarrmdfe = async function ({ idLoja, insertEventoData }) {

    let statusInsert;

    const idEvento = await useDB({
        query: `select max(id)+1 as id  from vd_evento where loja_fk=${idLoja} `
    });

    const insertEvento = await useDB({
        query: `INSERT INTO public.vd_evento(  
            id, 
            loja_fk, 
            protocolo, 
            motivo_evento, 
            motivo_retorno, 
            tipo,   
            usuarioaltera, 
            dataaltera,
            chave)  VALUES (
                ${idEvento[0].id}, 
                ${insertEventoData.loja_fk},
                '${insertEventoData.protocolo}', 
                '${insertEventoData.motivo_evento}', 
                '${insertEventoData.motivo_retorno}', 
                'encerramento', 
                ${insertEventoData.usuarioaltera},  
                '${insertEventoData.dataaltera}', 
                '${insertEventoData.chave}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idEvento, statusInsert } }

};

const condutoemdfe = async function ({ idLoja, insertEventoData }) {

    let statusInsert;

    const idEvento = await useDB({
        query: `select max(id)+1 as id  from vd_evento where loja_fk=${idLoja} `
    });

    const insertEvento = await useDB({
        query: `INSERT INTO public.vd_evento(  
            id, 
            loja_fk, 
            protocolo, 
            motivo_evento, 
            motivo_retorno, 
            tipo,   
            usuarioaltera, 
            dataaltera,
            chave)  VALUES (
                ${idEvento[0].id}, 
                ${insertEventoData.loja_fk},
                '${insertEventoData.protocolo}', 
                '${insertEventoData.motivo_evento}', 
                '${insertEventoData.motivo_retorno}', 
                'condutor', 
                ${insertEventoData.usuarioaltera},  
                '${insertEventoData.dataaltera}', 
                '${insertEventoData.chave}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idEvento, statusInsert } }

};

const dfemdfe = async function ({ idLoja, insertEventoData }) {

    let statusInsert, statusInsert2;

    const idEvento = await useDB({
        query: `select max(id)+1 as id  from vd_evento where loja_fk=${idLoja} `
    });

    const insertEvento = await useDB({
        query: `INSERT INTO public.vd_evento(  
            id, 
            loja_fk, 
            protocolo, 
            motivo_evento, 
            motivo_retorno, 
            tipo,   
            usuarioaltera, 
            dataaltera,
            chave)  VALUES (
                ${idEvento[0].id}, 
                ${insertEventoData.loja_fk},
                '${insertEventoData.protocolo}', 
                '${insertEventoData.motivo_evento}', 
                '${insertEventoData.motivo_retorno}', 
                'dfe', 
                ${insertEventoData.usuarioaltera},  
                '${insertEventoData.dataaltera}', 
                '${insertEventoData.chave}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const insertEvento2 = await useDB({
        query: `INSERT INTO public.vd_evento(  
            id, 
            loja_fk, 
            protocolo, 
            motivo_evento, 
            motivo_retorno, 
            tipo,   
            usuarioaltera, 
            dataaltera,
            chave)  VALUES (
                ${idEvento[0].id}, 
                ${insertEventoData.loja_fk},
                '${insertEventoData.protocolo}', 
                '${insertEventoData.motivo_evento}', 
                '${insertEventoData.motivo_retorno}', 
                'dfenfe', 
                ${insertEventoData.usuarioaltera},  
                '${insertEventoData.dataaltera}', 
                '${insertEventoData.chave}');`
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });

    return { code: 200, results: { idEvento, statusInsert, statusInsert2 } }

};

const salvarautorizado = async function ({ idLoja, insertMdfeDocsData }) {

    let statusInsert

    const idMdfeDocs = await useDB({
        query: `select max(id) +1 as id  from vd_mdfe_docs  where loja_fk=${idLoja} `
    });

    const insertMdfeDocs = await useDB({
        query: `  INSERT INTO public.vd_mdfe_docs(  
            id, 
            loja_fk, 
            mdfe_cab)  VALUES (
                ${idMdfeDocs[0].idc}, 
                ${insertMdfeDocsData.loja_fk},  
                ${insertMdfeDocsData.mdfe_cab});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idMdfeDocs, statusInsert } }

};

const consultarnaoenc = async function ({ idLoja, insertEventoData }) {

    let statusInsert;

    const idEvento = await useDB({
        query: `select max(id)+1 as id  from vd_evento where loja_fk=${idLoja} `
    });

    const insertEvento = await useDB({
        query: `INSERT INTO public.vd_evento(  
            id, 
            loja_fk, 
            protocolo, 
            motivo_evento, 
            motivo_retorno, 
            tipo,   
            usuarioaltera, 
            dataaltera,
            chave)  VALUES (
                ${idEvento[0].id}, 
                ${insertEventoData.loja_fk},
                '${insertEventoData.protocolo}', 
                'consulta nao encerrados', 
                '${insertEventoData.motivo_retorno}', 
                'condutor', 
                ${insertEventoData.usuarioaltera},  
                '${insertEventoData.dataaltera}', 
                '${insertEventoData.chave}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idEvento, statusInsert } }

};

const pegareventosnaoenc = async function ({ idLoja }) {

    const evento = await useDB({
        query: `select * from Vd_Evento where loja_fk=${idLoja} and tipo='nao encerrado'  order by dataaltera desc`
    });

    return { code: 200, results: { evento } }

};

const enviaremail = async function ({ idLoja, insertEmailData }) {

    let statusInsert;

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk=${idLoja}`
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

    return { code: 200, results: { configNfe, statusI } }

};

const preencherListaBuscanfe = async function ({ }) {

    const clienteJ = await useDB({
        query: `SELECT * FROM Cd_Cliente WHERE fisjur_Cli='J' and nome_Cli!=''  ORDER BY nome_Cli`
    });

    const clienteF = await useDB({
        query: `SELECT * FROM Cd_Cliente WHERE fisjur_Cli='F' and nome_Cli!=''  ORDER BY nome_Cli`
    });

    const cliente = await useDB({
        query: `SELECT * FROM Cd_Cliente WHERE  nome_Cli!=''  ORDER BY nome_Cli`
    });

    return { code: 200, results: { clienteJ, clienteF, cliente } }

};

const pesquisarPorColunanfe = async function ({ colunaBuscacliente, textoBuscacliente }) {

    const clienteJ = await useDB({
        query: `SELECT * FROM Cd_Cliente WHERE fisjur_Cli='J' and UPPER(CAST(${colunaBuscacliente} as text))   LIKE '%${textoBuscacliente.toUpperCase()}%' and nome_Cli!='' ORDER BY ${colunaBuscacliente} ASC`
    });

    const clienteF = await useDB({
        query: `SELECT * FROM Cd_Cliente WHERE fisjur_Cli='F' and UPPER(CAST(${colunaBuscacliente} as text))   LIKE '%${textoBuscacliente.toUpperCase()}%' and nome_Cli!='' ORDER BY ${colunaBuscacliente} ASC`
    });

    const cliente = await useDB({
        query: `SELECT * FROM Cd_Cliente WHERE UPPER(CAST(${colunaBuscacliente} as text))   LIKE '%${textoBuscacliente.toUpperCase()}%' and nome_Cli!='' ORDER BY ${colunaBuscacliente} ASC`
    });

    return { code: 200, results: { clienteJ, cliente, clienteF } }

};

const salvaraverbacao = async function ({ idLoja, insertMdfeDocsData }) {

    let statusInsert

    const idMdfeDocs = await useDB({
        query: `select max(id) +1 as id  from vd_mdfe_docs  where loja_fk=${idLoja} `
    });

    const insertMdfeDocs = await useDB({
        query: `  INSERT INTO public.vd_mdfe_docs(  
            id, 
            loja_fk, 
            mdfe_cab)  VALUES (
                ${idMdfeDocs[0].idc}, 
                ${insertMdfeDocsData.loja_fk},  
                ${insertMdfeDocsData.mdfe_cab});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idMdfeDocs, statusInsert } }

};

const pxmlv = async function({ xmlRetorno, id, idLoja }){ 

    const updateMdfe = await useDB({ 
    query: `update vd_mdfe set xmlretorno=${xmlRetorno} where id=${id} and loja_fk=${idLoja}`
 }); 

 return { code: 200, results: { updateMdfe }}  
    
};

const LerNoProtv = async function({ chave }){ 

    const mdfe = await useDB({ 
    query: `SELECT * FROM Vd_Mdfe WHERE chave='MDFe${chave}' and status in ('5','6','7','9','10') `
 }); 

 return { code: 200, results: { mdfe }}  
    
};

module.exports = {
    novo,
    salvarmdfe,
    iniciaconf,
    selecionar,
    pesquisarPorColuna,
    preencherListaBusca,
    pesquisarPorColunacidade,
    preencherListaBusca,
    preencherListabuscacidade,
    salvarcidadecarregamento,
    salvarcondutor,
    salvarcidadecarregamentod,
    salvardoc,
    salvarsegurador,
    xmlpdf,
    salvarpercuso,
    salvarciot,
    salvarvale,
    salvarcontratante,
    salvarreboque,
    salvarlacre,
    cancelarmdfe,
    encerrarrmdfe,
    condutoemdfe,
    salvarautorizado,
    consultarnaoenc,
    pegareventosnaoenc,
    preencherListaBuscanfe,
    pesquisarPorColunanfe,
    salvaraverbacao,
    pxmlv,
    LerNoProtv
}