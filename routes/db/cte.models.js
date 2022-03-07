const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const iniciaconf = async function ({ idLoja }) {

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    return { code: 200, results: { configNfe } }

};

const novo = async function ({ tipoAmbiente, idLoja }) {

    const cte = await useDB({
        query: `select * from Vd_Cte where tipoambiente='${tipoAmbiente}' and status in ('5','6','7','9') and lopja_fk=${idLoja} order by id desc `
    });

    return { code: 200, results: { cte } }

};

const salvarcte = async function ({ idLoja, insertCteEnvolvidoData, insertCteComponenteData, insertCteCargaData, insertCteDocData }) {

    let statusInsert, statusInsert2, statusInsert3, statusInsert4;

    const idCte = await useDB({
        query: `select max(id) +1 as id from vd_cte  where loja_fk=${idLoja} `
    });

    const idCteEnvolvido = await useDB({
        query: `select max(id) +1 as id from vd_cte_envolvido  where loja_fk=${idLoja} `
    });

    const insertCteEnvolvido = await useDB({
        query: `  INSERT INTO public.vd_cte_envolvido(  
            id, 
            loja_fk, 
            cte_cab)  VALUES (
                ${idCteEnvolvido[0].idc}, 
                ${insertCteEnvolvidoData.loja_fk},  
                ${insertCteEnvolvidoData.cte_cab});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const idCteComponente = await useDB({
        query: `select max(id) +1 as id from vd_cte_componente  where loja_fk=${idLoja} `
    });

    const insertCteComponente = await useDB({
        query: `  INSERT INTO public.vd_cte_componente(  
            id, 
            loja_fk, 
            cte_cab)  VALUES (
                ${idCteComponente[0].idc}, 
                ${insertCteComponenteData.loja_fk},  
                ${insertCteComponenteData.cte_cab});`
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });

    const idCteCarga = await useDB({
        query: `select max(id) +1 as id from vd_cte_carga  where loja_fk=${idLoja} `
    });

    const insertCteCarga = await useDB({
        query: `  INSERT INTO public.vd_cte_carga( 
            id, 
            loja_fk, 
            cte_cab) VALUES (
                ${idCteCarga[0].idc},
                ${insertCteCargaData.loja_fk},  
                ${insertCteCargaData.cte_cab});`
    }).then(() => {
        statusInsert3 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert3 = err.message;
    });

    const idCteDoc = await useDB({
        query: `select max(id) +1 as id from vd_cte_doc  where loja_fk=${idLoja} `
    });

    const insertCteDoc = await useDB({
        query: `  INSERT INTO public.vd_cte_doc(  
            id, 
            loja_fk, 
            cte_cab)  VALUES (
                ${idCteDoc[0].idc}, 
                ${insertCteDocData.loja_fk}, 
                ${insertCteDocData.cte_cab});`
    }).then(() => {
        statusInsert4 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert4 = err.message;
    });

    return { code: 200, results: { idCte, idCteEnvolvido, statusInsert, idCteComponente, statusInsert2, idCteCarga, statusInsert3, idCteDoc, statusInsert4 } }

};

const salvarenvolvido = async function ({ insertCteEnvolvidoData }) {

    let statusInsert

    const insertCteEnvolvido = await useDB({
        query: `  INSERT INTO public.vd_cte_envolvido(  
            id, 
            loja_fk, 
            cte_cab)  VALUES (
                ${insertCteEnvolvidoData.id}, 
                ${insertCteEnvolvidoData.loja_fk},  
                ${insertCteEnvolvidoData.cte_cab});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { statusInsert } }

};

const pesquisarPorColunacidade = async function ({ colunaBuscacep, textoBuscacep }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Cd_Cep WHERE UPPER(CAST(${colunaBuscacep} as text))   LIKE '%${textoBuscacep.toUpperCase()}%' ORDER BY ${colunaBuscacep} ASC`
    });

    return { code: 200, results: { pesquisa } }

};

const preencherListaBuscanfe = async function ({ }) {

    const listaJ = await useDB({
        query: `SELECT * FROM Cd_Cliente WHERE fisjur_Cli='J' and nome_Cli!=''  ORDER BY nome_Cli`
    });

    const listaF = await useDB({
        query: `SELECT * FROM Cd_Cliente WHERE fisjur_Cli='F' and nome_Cli!=''  ORDER BY nome_Cli`
    });

    const lista = await useDB({
        query: `SELECT * FROM Cd_Cliente WHERE  nome_Cli!=''  ORDER BY nome_Cli`
    });

    return { code: 200, results: { listaJ, listaF, lista } }

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

    return { code: 200, results: { clienteJ, clienteF, cliente } }

};

const salvarcomponente = async function ({ idLoja, insertCteComponenteData }) {

    let statusInsert;

    const maxIdCteComponente = await useDB({
        query: `select max(id) +1 as id from vd_cte_componente  where loja_fk=${idLoja} `
    });

    const insertCteComponente = await useDB({
        query: `  INSERT INTO public.vd_cte_componente(  
            id, 
            loja_fk, 
            cte_cab)  VALUES (
                ${maxIdCteComponente[0].id}, 
                ${insertCteComponenteData.loja_fk},  
                ${insertCteComponenteData.cte_cab});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { maxIdCteComponente, statusInsert } }

};

const salvarcarga = async function ({ idLoja, insertCteCargaData }) {

    let statusInsert;

    const maxIdCteCarga = await useDB({
        query: `select max(id) +1 as id from vd_cte_carga  where loja_fk=${idLoja} `
    });

    const insertCteCarga = await useDB({
        query: `  INSERT INTO public.vd_cte_carga( 
            id, 
            loja_fk, 
            cte_cab) VALUES (
                ${maxIdCteCarga[0].id}, 
                ${insertCteCargaData.loja_fk},  
                ${insertCteCargaData.cte_cab});`

    }).then(() => {
        statusInsert = 'Registro inserido com suceshso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { maxIdCteCarga, statusInsert } }

};

const salvaroutro = async function ({ idLoja, insertCteDocData }) {

    let statusInsert;

    const maxIdCteDoc = await useDB({
        query: `select max(id) +1 as id from vd_cte_doc  where loja_fk=${idLoja} `
    });

    const insertCteDoc = await useDB({
        query: `  INSERT INTO public.vd_cte_doc(  
            id, 
            loja_fk, 
            cte_cab)  VALUES (
                ${maxIdCteDoc[0].id}, 
                ${insertCteDocData.loja_fk},  
                ${insertCteDocData.cte_cab});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { maxIdCteDoc, statusInsert } }

};

const salvarnf = async function ({ idLoja, insertCteDocData }) {

    let statusInsert;

    const maxIdCtedoc = await useDB({
        query: `select max(id) +1 as id from vd_cte_doc  where loja_fk=${idLoja} `
    });

    const insertCteDoc = await useDB({
        query: `  INSERT INTO public.vd_cte_doc(  
            id, 
            loja_fk, 
            cte_cab)  VALUES (
                ${maxIdCtedoc[0].idc}, 
                ${insertCteDocData.loja_fk},  
                ${insertCteDocData.cte_cab});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { maxIdCtedoc, statusInsert } }

};

const salvardoc = async function ({ idLoja, insertCteDocData }) {

    let statusInsert;

    const maxIdCtedoc = await useDB({
        query: `select max(id) +1 as id from vd_cte_doc  where loja_fk=${idLoja} `
    });

    const insertCteDoc = await useDB({
        query: `  INSERT INTO public.vd_cte_doc(  
            id, 
            loja_fk, 
            cte_cab)  VALUES (
                ${maxIdCtedoc[0].idc}, 
                ${insertCteDocData.loja_fk},  
                ${insertCteDocData.cte_cab});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { maxIdCtedoc, statusInsert } }

};

const selecionar = async function ({ idCte, idLoja }) {

    const envolvidoRemetente = await useDB({
        query: `select * from Vd_Cte_Envolvido where tipo='remetente' and cte_fk=${idCte} and loja_Fk=${idLoja}`
    });

    const envolvidoDestinatario = await useDB({
        query: `select * from Vd_Cte_Envolvido where tipo='destinatario' and cte_fk=${idCte} and loja_Fk=${idLoja}`
    });

    const envolvidoExpedidor = await useDB({
        query: `select * from Vd_Cte_Envolvido where tipo='expedidor' and cte_fk=${idCte} and loja_Fk=${idLoja}`
    });

    const envolvidoRecebedor = await useDB({
        query: `select * from Vd_Cte_Envolvido where tipo='recebedor' and cte_fk=${idCte} and loja_Fk=${idLoja}`
    });

    const envolvidoTomador = await useDB({
        query: `select * from Vd_Cte_Envolvido where tipo='tomador' and cte_fk=${idCte} and loja_Fk=${idLoja}`
    });

    const envolvidoFluxo = await useDB({
        query: `select * from Vd_Cte_Envolvido where tipo='fluxo' and cte_fk=${idCte} and loja_Fk=${idLoja}`
    });

    const envolvidoEntrega = await useDB({
        query: `select * from Vd_Cte_Envolvido where tipo='entrega' and cte_fk=${idCte} and loja_Fk=${idLoja}`
    });

    const cteComponente = await useDB({
        query: `select * from Vd_Cte_Componente where cte_fk=${idCte} and loja_Fk=${idLoja}`
    });

    const cteCarga = await useDB({
        query: `select * from Vd_Cte_Carga where cte_fk=${idCte} and loja_Fk=${idLoja}`
    });

    const cteDoc1 = await useDB({
        query: `select * from Vd_Cte_Doc where  cte_fk=${idCte} and loja_Fk=${idLoja} and tipo='1'`
    });

    const cteDoc0 = await useDB({
        query: `select * from Vd_Cte_Doc where  cte_fk=${idCte} and loja_Fk=${idLoja} and tipo='0'`
    });

    const cteDoc2 = await useDB({
        query: `select * from Vd_Cte_Doc where  cte_fk=${idCte} and loja_Fk=${idLoja} and tipo='2'`
    });

    const envolvidoPassagem = await useDB({
        query: `select * from Vd_Cte_Envolvido where tipo='passagem' and cte_fk=${idCte} and loja_Fk=${idLoja}`
    });

    const envolvidoOcc = await useDB({
        query: `select * from Vd_Cte_Envolvido where tipo='occ' and cte_fk=${idCte} and loja_Fk=${idLoja}`
    });

    const cteDocObsf = await useDB({
        query: `select * from Vd_Cte_Doc where  cte_fk=${idCte} and loja_Fk=${idLoja} and tipo='obsf'`
    });

    const cteDocObsc = await useDB({
        query: `select * from Vd_Cte_Doc where  cte_fk=${idCte} and loja_Fk=${idLoja} and tipo='obsc'`
    });

    const cteDocVeiculo = await useDB({
        query: `select * from Vd_Cte_Doc where  cte_fk=${idCte} and loja_Fk=${idLoja} and tipo='veiculo'`
    });

    const cteDocDuplicata = await useDB({
        query: `select * from Vd_Cte_Doc where  cte_fk=${idCte} and loja_Fk=${idLoja} and tipo='duplicata'`
    });

    const cteDocAutorizado = await useDB({
        query: `select * from Vd_Cte_Doc where  cte_fk=${idCte} and loja_Fk=${idLoja} and tipo='autorizado'`
    });

    const cteDocDoca = await useDB({
        query: `select * from Vd_Cte_Doc where  cte_fk=${idCte} and loja_Fk=${idLoja} and tipo='doca'`
    });

    const cte = await useDB({
        query: `select * from Vd_Cte where tipoambiente='${tipoAmbiente}' and status in ('5','6','7','9') and loja_fk=${idLoja} order by id desc `
    });

    return { code: 200, results: { envolvidoRemetente, envolvidoDestinatario, envolvidoExpedidor, envolvidoRecebedor, envolvidoTomador, envolvidoFluxo, envolvidoEntrega, cteComponente, cteCarga, cteDoc1, cteDoc0, cteDoc2, envolvidoPassagem, envolvidoOcc, cteDocObsf, cteDocObsc, cteDocVeiculo, cteDocDuplicata, cteDocAutorizado, cteDocDoca, cte } }

};

const pegareventos = async function ({ chave, idLoja, idCte, pedido }) {

    const evento = await useDB({
        query: `select * from Vd_Evento where  chave='${chave}' and loja_fk=${idLoja} order by dataaltera desc`
    });

    const cteDoc = await useDB({
        query: `select * from Vd_Cte_Doc where cte_fk=${idCte} and loja_Fk=${idLoja} and pedido='${pedido}'`
    });

    return { code: 200, results: { evento, cteDoc } }

};

const pesquisarPorColuna = async function ({ colunaBusca, idLoja, tipoAmbiente, textoBusca }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Vd_Cte WHERE ( UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase()}%')  and loja_fk=${idLoja}   and tipoambiente='${tipoAmbiente}'   ORDER BY ${colunaBusca} asc `
    });

    return { code: 200, results: { pesquisa } }

};

const preencherListaBusca = async function ({ idLoja, tipoAmbiente }) {

    const lista = await useDB({
        query: `SELECT * FROM Vd_Cte WHERE loja_fk=${idLoja}   and tipoambiente='${tipoAmbiente}'  ORDER BY dataemissao desc `
    });

    return { code: 200, results: {} }

};

const xmlpdf = async function ({ idLoja }) {

    const logo = await useDB({
        query: `select logo_loja from cf_loja where id_loja=${idLoja} `
    });

    return { code: 200, results: { logo } }

};

const cancelarcomprovantecte = async function ({ idLoja, insertEventoData }) {

    let statusInsert;

    const maxIdEvento = await useDB({
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
            chave,
            nfe,
            doc,
            nome )  VALUES (
                ${maxIdEvento[0].idc}, 
                ${insertEventoData.loja_fk},
                '${insertEventoData.protocolo}', 
                '', 
                '${insertEventoData.motivo_retorno}', 
                'cancelamento compro.', 
                ${insertEventoData.usuarioaltera},  
                '${insertEventoData.dataaltera}', 
                '${insertEventoData.chave}', 
                '${insertEventoData.nfe}', 
                '${insertEventoData.doc}', 
                '${insertEventoData.nome}' );`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const maxIdCteDoc = await useDB({
        query: `select max(id) +1 as id from vd_cte_doc  where loja_fk=${idLoja} `
    });

    return { code: 200, results: { maxIdEvento, statusInsert, maxIdCteDoc } }

};

const comprovantecte = async function ({ idLoja, insertEventoData }) {

    let statusInsert;

    const maxIdEvento = await useDB({
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
            chave,
            datahoraentrega,  
            doc,  
            nome,   
            hash, 
            datahorahash,  
            nfe )  VALUES (
                ${maxIdEvento[0].id}, 
                ${insertEventoData.loja_fk},
                '${insertEventoData.protocolo}', 
                '', 
                '${insertEventoData.motivo_retorno}', 
                'comprovante', 
                ${insertEventoData.usuarioaltera},  
                '${insertEventoData.dataaltera}', 
                '${insertEventoData.chave}',
                '${insertEventoData.datahoraentrega}',
                '${insertEventoData.doc}',
                '${insertEventoData.nome}',
                '${insertEventoData.hash}',
                '${insertEventoData.datahorahash}',
                '${insertEventoData.nfe}');`
    }).then(() => {
        statusInsert = 'Registro  com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const maxIdCteDoc = await useDB({
        query: `select max(id) +1 as id from vd_cte_doc  where loja_fk=${idLoja} `
    });

    return { code: 200, results: { maxIdEvento, statusInsert, maxIdCteDoc } }

};

const ccecte = async function ({ idLoja, insertEventoData, insertCteDocData }) {

    let statusInsert, statusInsert2;

    const maxIdEvento = await useDB({
        query: `select max(id)+1 as id  from vd_evento where loja_fk=${idLoja}`
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
                ${maxIdEvento[0].id}, 
                ${insertEventoData.loja_fk},
                '${insertEventoData.protocolo}', 
                '', 
                '${insertEventoData.motivo_retorno}', 
                'carta correcao', 
                ${insertEventoData.usuarioaltera},  
                '${insertEventoData.dataaltera}', 
                '${insertEventoData.chave}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const maxIdCteDoc = await useDB({
        query: `select max(id) +1 as id from vd_cte_doc  where loja_fk=${idLoja} `
    });

    const insertCteDoc = await useDB({
        query: `  INSERT INTO public.vd_cte_doc(  
            id, 
            loja_fk, 
            cte_cab)  VALUES (
                ${maxIdCteDoc[0].id}, 
                ${insertCteDocData.loja_fk},  
                ${insertCteDocData.cte_cab});`
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });

    return { code: 200, results: { maxIdEvento, statusInsert, maxIdCteDoc, statusInsert2 } }

};

const inutilizarcte = async function ({ idLoja }) {

    const maxIdCte = await useDB({
        query: `select max(id) +1 as id from vd_cte  where loja_fk=${idLoja} `
    });

    const maxIdEvento = await useDB({
        query: `select max(id)+1 as id  from vd_evento where loja_fk=${idLoja}`
    });

    return { code: 200, results: { maxIdCte, maxIdEvento } }

};

const cancelarcte = async function ({ idLoja }) {

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
                ${maxIdEvento[0].id}, 
                ${insertEventoData.loja_fk},
                '${insertEventoData.protocolo}', 
                '', 
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

    return { code: 200, results: { idEvento } }

};

const desacordocte = async function ({ idLoja, insertEventoData }) {

    let statusInsert;

    const maxIdEvento = await useDB({
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
            ${maxIdEvento[0].id}, 
            ${insertEventoData.loja_fk},
            '${insertEventoData.protocolo}', 
            '${insertEventoData.motivo_evento}', 
            '${insertEventoData.motivo_retorno}', 
            'desacordo', 
            ${insertEventoData.usuarioaltera},  
            '${insertEventoData.dataaltera}', 
            '${insertEventoData.chave}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { maxIdEvento, statusInsert } }

};

const salvarocc = async function ({ idLoja, insertCteEnvolvidoData }) {

    let statusInsert;

    const maxIdEnvolvido = await useDB({
        query: `select max(id) +1 as id from vd_cte_envolvido  where loja_fk=${idLoja} `
    });

    const insertCteEnvolvido = await useDB({
        query: `  INSERT INTO public.vd_cte_envolvido(  
            id, 
            loja_fk, 
            cte_cab)  VALUES (
                ${maxIdEnvolvido[0].idc}, 
                ${insertCteEnvolvidoData.loja_fk},  
                ${insertCteEnvolvidoData.cte_cab});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { maxIdEnvolvido, statusInsert } }

};

const salvarpassagem = async function ({ idLoja, insertCteEnvolvidoData }) {

    let statusInsert;

    const maxIdEnvolvido = await useDB({
        query: `select max(id) +1 as id from vd_cte_envolvido  where loja_fk=${idLoja} `
    });

    const insertCteEnvolvido = await useDB({
        query: `  INSERT INTO public.vd_cte_envolvido(  
            id, 
            loja_fk, 
            cte_cab)  VALUES (
                ${maxIdEnvolvido[0].idc}, 
                ${insertCteEnvolvidoData.loja_fk},  
                ${insertCteEnvolvidoData.cte_cab});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { maxIdEnvolvido, statusInsert } }

};

const salvarobsc = async function ({ idLoja, insertCetDocData }) {

    let statusInsert;

    const maxIdCteDoc = await useDB({
        query: `select max(id) +1 as id from vd_cte_doc  where loja_fk=${idLoja} `
    });

    const insertCetDoc = await useDB({
        query: `  INSERT INTO public.vd_cte_doc(  
            id, 
            loja_fk, 
            cte_cab)  VALUES (
                ${maxIdCteDoc[0].id}, 
                ${insertCetDocData.loja_fk},  
                ${insertCetDocData.cte_cab});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { maxIdCteDoc, statusInsert } }

};

const salvarobscf = async function ({ idLoja, insertCetDocData }) {

    let statusInsert;

    const maxIdCteDoc = await useDB({
        query: `select max(id) +1 as id from vd_cte_doc  where loja_fk=${idLoja} `
    });

    const insertCteDoc = await useDB({
        query: `  INSERT INTO public.vd_cte_doc(  
            id, 
            loja_fk, 
            cte_cab)  VALUES (
                ${maxIdCteDoc[0].id}, 
                ${insertCetDocData.loja_fk},  
                ${insertCetDocData.cte_cab});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { maxIdCteDoc, statusInsert } }

};

const salvarveiculo = async function ({ idLoja, insertCetDocData }) {

    let statusInsert;

    const maxIdCteDoc = await useDB({
        query: `select max(id) +1 as id from vd_cte_doc  where loja_fk=${idLoja} `
    });

    const insertCteDoc = await useDB({
        query: `  INSERT INTO public.vd_cte_doc(  
            id, 
            loja_fk, 
            cte_cab)  VALUES (
                ${maxIdCteDoc[0].id}, 
                ${insertCetDocData.loja_fk},  
                ${insertCetDocData.cte_cab});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { maxIdCteDoc, statusInsert } }

};

const salvarduplicata = async function ({ idLoja, insertCetDocData }) {

    let statusInsert;

    const maxIdCteDoc = await useDB({
        query: `select max(id) +1 as id from vd_cte_doc  where loja_fk=${idLoja} `
    });

    const insertCteDoc = await useDB({
        query: `  INSERT INTO public.vd_cte_doc(  
            id, 
            loja_fk, 
            cte_cab)  VALUES (
                ${maxIdCteDoc[0].id}, 
                ${insertCetDocData.loja_fk},  
                ${insertCetDocData.cte_cab});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { maxIdCteDoc, statusInsert } }

};

const salvarautorizado = async function ({ idLoja, insertCetDocData }) {

    let statusInsert;

    const maxIdCteDoc = await useDB({
        query: `select max(id) +1 as id from vd_cte_doc  where loja_fk=${idLoja} `
    });

    const insertCteDoc = await useDB({
        query: `  INSERT INTO public.vd_cte_doc(  
            id, 
            loja_fk, 
            cte_cab)  VALUES (
                ${maxIdCteDoc[0].id}, 
                ${insertCetDocData.loja_fk},  
                ${insertCetDocData.cte_cab});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { maxIdCteDoc, statusInsert } }

};

const salvardoca = async function ({ idLoja, insertCetDocData }) {

    let statusInsert;

    const maxIdCteDoc = await useDB({
        query: `select max(id) +1 as id from vd_cte_doc  where loja_fk=${idLoja} `
    });

    const insertCteDoc = await useDB({
        query: `  INSERT INTO public.vd_cte_doc(  
            id, 
            loja_fk, 
            cte_cab)  VALUES (
                ${maxIdCteDoc[0].id}, 
                ${insertCetDocData.loja_fk},  
                ${insertCetDocData.cte_cab});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { maxIdCteDoc, statusInsert } }

};

const enviaremail = async function ({ idLoja }) {

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    return { code: 200, results: { configNfe } }

};

const mailnfe = async function ({ insertEmailData }) {

    let statusInsert;

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

    return { code: 200, results: { statusInsert } }

};

const iniciardfe = async function ({ doc }) {

    const evento = await useDB({
        query: `select * from Vd_Evento where tipo='dfecte'  and doc='${doc}' order by id desc`
    });

    return { code: 200, results: { evento } }

};

const buscareventos = async function ({ doc, idLoja, chave, protocolo }) {

    const evento = await useDB({
        query: `select * from Vd_Evento where tipo='ultimocte'  and doc='${doc}'`
    });

    const maxIdEvento = await useDB({
        query: `select max(id)+1 as id  from vd_evento where loja_fk=${idLoja}`
    });

    const eventos2 = await useDB({
        query: "select * from Vd_Evento where tipo='ultimocte'"
    });

    const evento3 = await useDB({
        query: `select * from Vd_Evento  where tipo='dfecte'  and doc='${doc}' and chave='${chave}' and protocolo='${protocolo}' `
    });

    const evento4 = await useDB({
        query: `select * from Vd_Evento where tipo='dfecte'  and doc='${doc}' order by id desc`
    });

    return { code: 200, results: { evento, maxIdEvento, eventos2, evento3, evento4 } }

};

const validarxml = async function ({ idCte, idLoja }) {

    const cteRetorno = await useDB({
        query: `select xml_retorno from vd_cte  where id=${idCte} and loja_fk=${idLoja} `
    });

    return { code: 200, results: { cteRetorno } }

};

const consultar = async function ({ dataInicial, dataFinal, idLoja, idCte, tipo }) {

    const cte = await useDB({
        query: `select numero, modelo, totalservico, serie, tipocte, dataemissao, status, id, indtomador  from Vd_Cte  where (cast(dataemissao as date)  between '${dataInicial}'  and '${dataFinal}')  and loja_fk=${idLoja}  and status in ('4','5','6','7','9')  order by numero asc`
    });

    const envolvido = await useDB({
        query: `SELECT nome FROM public.vd_cte_envolvido where loja_fk=${idLoja} and cte_cab=${idCte} and tipo='${tipo}' `
    });

    return { code: 200, results: { cte, envolvido } }

};

const gerarzip = async function ({ idLoja, dataInicial, dataFinal, idCte }) {

    const cte = await useDB({
        query: `select * from Vd_Cte where (cast(dataemissao as date)  between '${dataInicial}'  and '${dataFinal}')  and loja_fk=${idLoja}  and vo.status in ('5')  order by vo.numero asc`
    });

    const xmlRetorno = await useDB({
        query: `select xml_retorno from vd_cte  where id=${idCte} and loja_fk=${idLoja} `
    });

    return { code: 200, results: { cte, xmlRetorno } }

};

const consultarf = async function ({ dataInicial, dataFinal, idLoja, idCte }) {

    const cte = await useDB({
        query: `select * from Vd_Cte where (cast(dataemissao as date)  between '${dataInicial}'  and '${dataFinal}')  and loja_fk=${idLoja}  and vo.status in ('5')  order by vo.numero asc`
    });

    const xmlRetorno = await useDB({
        query: `select xml_retorno from vd_cte  where id=${idCte} and loja_fk=${idLoja} `
    });


    return { code: 200, results: { cte, xmlRetorno } }

};

const gerarf = async function ({ idCte, idLoja }) {

    const cte = await useDB({
        query: `select * from Vd_Cte where id=${idCte} and loja_Fk=${idLoja} order by numero asc `
    });

    const xmlRetorno = await useDB({
        query: `select xml_retorno from vd_cte  where id=${idCte} and loja_fk=${idLoja} `
    });

    return { code: 200, results: { cte, xmlRetorno } }

};

const xmlpdf2 = async function ({ idCte, idLoja }) {

    const cte = await useDB({
        query: `select xml_retorno from vd_cte  where id=${idCte} and loja_fk=${idLoja} `
    });

    const logo = await useDB({
        query:`select logo_loja from cf_loja where id_loja=${idLoja} `
    });

    return { code: 200, results: { cte, logo } }

};

const pxmlv = async function({ newXmlRetorno, idCte, idLoja }){ 

    const updateCte = await useDB({ 
    query: `update vd_cte set xml_retorno=${newXmlRetorno} where id=${idCte} and loja_fk=${idLoja}`
 }); 

 return { code: 200, results: { updateCte }}  
    
};

const LerNoProtv = async function({ chave }){ 

    const cte = await useDB({ 
    query: `SELECT * FROM Vd_Cte WHERE chave='CTe${chave}' and status in ('5','6','7','9') `
 }); 

 return { code: 200, results: { cte }}  
    
};

module.exports = {
    iniciaconf,
    novo,
    salvarcte,
    salvarenvolvido,
    pesquisarPorColunacidade,
    preencherListaBuscanfe,
    pesquisarPorColunanfe,
    salvarcomponente,
    salvarcarga,
    salvaroutro,
    salvarnf,
    salvardoc,
    pegareventos,
    pesquisarPorColuna,
    preencherListaBusca,
    xmlpdf,
    cancelarcomprovantecte,
    cancelarcte,
    desacordocte,
    salvarocc,
    salvarpassagem,
    salvarobsc,
    salvarobscf,
    salvarveiculo,
    salvarduplicata,
    salvarautorizado,
    salvardoca,
    enviaremail,
    mailnfe,
    iniciardfe,
    buscareventos,
    validarxml,
    consultar,
    gerarzip,
    consultarf,
    gerarf,
    xmlpdf2,
    pxmlv,
    LerNoProtv
}