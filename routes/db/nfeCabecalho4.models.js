const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const ex = async function ({ idLoja, idNfeCab }) {

    const deleteNfeFatura = await useDB({
        query: `DELETE FROM public.nfe_fatura WHERE loja_fk=${idLoja} and nfecab_fk=${idNfeCab} `
    });

    const deleteDestinatario = await useDB({
        query: `DELETE FROM public.nfe_destinatario WHERE loja_fk=${idLoja} and nfecab_fk=${idNfeCab} `
    });

    const deleteNfeMedicamentoDet = await useDB({
        query: `DELETE FROM public.nfe_medicamentodet WHERE loja_fk=${idLoja}  and nfedet_fk in (SELECT id_nfedetalhe  FROM public.nfe_detalhe  where  loja_fk=${idLoja} and nfecab_fk=${idNfeCab})`
    });

    const deleteNfeDet = await useDB({
        query: `DELETE FROM public.nfe_detalhe WHERE loja_fk=${idLoja} and nfecab_fk=${idNfeCab} `
    });

    const deleteDocReferenciado = await useDB({
        query: `DELETE FROM public.nfe_docreferenciado WHERE loja_fk=${idLoja} and nfe_cabecalho_fk=${idNfeCab} `
    });

    const deleteEmitente = await useDB({
        query: `DELETE FROM public.nfe_emitente WHERE loja_fk=${idLoja} and nfecab_fk=${idNfeCab} `
    });

    const deleteLocalEntrega = await useDB({
        query: `DELETE FROM public.nfe_localentrega WHERE loja_fk=${idLoja} and nfecab_fk=${idNfeCab} `
    });

    const deleteLocalRetirada = await useDB({
        query: `DELETE FROM public.nfe_localretirada WHERE loja_fk=${idLoja} and nfecab_fk=${idNfeCab} `
    });

    const deleteTransporte = await useDB({
        query: `DELETE FROM public.nfe_transporte WHERE loja_fk=${idLoja} and nfecab_fk=${idNfeCab} `
    });

    const deleteNfeCab = await useDB({
        query: `DELETE FROM public.nfe_cabecalho WHERE loja_fk=${idLoja} and id_nfe_cabecalho=${idNfeCab} `
    });

    return { code: 200, results: { deleteNfeFatura, deleteNfeFatura, deleteNfeMedicamentoDet, deleteNfeDet, deleteDocReferenciado, deleteEmitente, deleteLocalEntrega, deleteLocalRetirada, deleteTransporte, deleteNfeCab } }

};

const listareventos = async function ({ idLoja, idNfeCab }) {

    const evento = await useDB({
        query: `select * from Nfe_Evento where loja_fk=${idLoja} and nfecab_fk=${idNfeCab} order by id desc`
    });

    return { code: 200, results: { evento } }

};

const listarnotasmanifestadas = async function ({ idLoja }) {

    const manifesto = await useDB({
        query: `select vo from Nfe_Manifesto where loja_fk= ${idLoja} order by evento_Realizado asc`
    });

    return { code: 200, results: { manifesto } }

};

const salvarNota2 = async function ({ idLoja, numeroTanque, idTipoComb, idNfeCab, numeroDocFiscal, serie }) {

    const tanque = await useDB({
        query: `select * from Cd_Tanque where loja_Fk=${idLoja}  and numero_Tanque=${numeroTanque} and tipocombustivel_Fk=${idTipoComb} `
    });

    const loja = await useDB({
        query: `select * from Cf_Loja where id_Loja=${idLoja} `
    });

    const nfeCab = await useDB({
        query: `select * from Nfe_Cabecalho where id_Nfe_Cabecalho='${idNfeCab}' and loja_fk=${idLoja}`
    });

    const nfeCab2 = await useDB({
        query: `select * from Nfe_Cabecalho where numerodocfiscal_Nfecab='${numeroDocFiscal}' and serie_Nfecab='${serie}' and loja_fk=${idLoja} and (statusnota_Nfecab='4' or statusnota_Nfecab='5'  or statusnota_Nfecab='6'  or statusnota_Nfecab='7' or statusnota_Nfecab='9' )`
    });

    const medicamentoDet = await useDB({
        query: `SELECT Nfe_Medicamentodet.* FROM  Nfe_Medicamentodet, nfe_detalhe WHERE Nfe_detalhe.nfecab_fk= ${idNfeCab} and Nfe_Medicamentodet.loja_Fk = ${idLoja} and Nfe_Medicamentodet.nfedet_fk = nfe_detalhe.id_nfedetalhe`
    });

    return { code: 200, results: { tanque, loja, nfeCab, nfeCab2, medicamentoDet } }

};

const salvarNota = async function ({ idLoja, idTipoComb, numTanque, idNfeCab, numeroDocFiscal, serie, xmlRetorno }) {

    let statusUpdate;

    const tanque = await useDB({
        query: `select * from Cd_Tanque where loja_Fk=${idLoja}  and numero_Tanque=${numTanque} and tipocombustivel_Fk=${idTipoComb} `
    });

    const loja = await useDB({
        query: `select * from Cf_Loja where id_Loja=${idLoja} `
    });

    const nfeCab = await useDB({
        query: `select * from Nfe_Cabecalho where id_Nfe_Cabecalho='${idNfeCab}' and loja_fk=${idLoja}`
    });


    const nfeCab2 = await useDB({
        query: `select * from Nfe_Cabecalho where numerodocfiscal_Nfecab='${numeroDocFiscal}' and serie_Nfecab='${serie}' and loja_fk=${idLoja} and (statusnota_Nfecab='4' or statusnota_Nfecab='5'  or statusnota_Nfecab='6'  or statusnota_Nfecab='7' or statusnota_Nfecab='9' )`
    });

    const medicamentoDet = await useDB({
        query: `SELECT Nfe_Medicamentodet.* FROM  Nfe_Medicamentodet, nfe_detalhe WHERE Nfe_detalhe.nfecab_fk= ${idNfeCab} and Nfe_Medicamentodet.loja_Fk = ${idLoja} and Nfe_Medicamentodet.nfedet_fk = nfe_detalhe.id_nfedetalhe`
    });

    const updteNfeCab = await useDB({
        query: `update nfe_cabecalho set xml_retorno='${xmlRetorno}'where id_nfe_cabecalho=${idNfeCab} and loja_fk=${idLoja}`
    }).then(() => {
        statusUpdate = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate = err.message;
    });

    return { code: 200, results: { tanque, loja, nfeCab, nfeCab2, medicamentoDet, statusUpdate } }

};

const salvarEntrega = async function ({ idLoja, insertLocalEntregaData }) {

    let statusInsert;

    const localEntrega = await useDB({
        query: `select * from Nfe_Localentrega where loja_Fk=${idLoja} order by id_Nfelocalentrega desc `
    });

    const insertLocalEntrega = await useDB({
        query: `insert into nfe_localentrega  (
            id_nfelocalentrega,
            loja_fk,
            nfecab_fk,
            usuarioaltera,
            dataaltera) values(
                ${insertLocalEntregaData.id_nfelocalentrega},
                ${insertLocalEntregaData.loja_fk},
                ${insertLocalEntregaData.nfecab_fk},
                ${insertLocalEntregaData.usuarioaltera},
                '${insertLocalEntregaData.dataaltera}')`

    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { localEntrega, statusInsert } }

};

const salvarDestinatario = async function ({ idLoja, insertDestinatarioData }) {

    let statusInsert;

    const idDestinatario = await useDB({
        query: `SELECT max(id_nfedestinatario)+1 as idc FROM public.nfe_destinatario where loja_fk=${idLoja} `
    });

    const insertDestinatario = await useDB({
        query: `insert into nfe_destinatario  (
            id_nfedestinatario,
            loja_fk,
            nfecab_fk,
            cpfcnpj_nfedest,
            usuarioaltera,
            dataaltera) values(
                ${idDestinatario[0].idc},
                ${insertDestinatarioData.loja_fk},
                ${insertDestinatarioData.nfecab_fk},
                ${insertDestinatarioData.cpfcnpj_nfedest},
                ${insertDestinatarioData.usuarioaltera},
                '${insertDestinatarioData.dataaltera}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idDestinatario, statusInsert } }

};

const salvarfaturapagamento = async function ({ idLoja, insertFaturaData }) {

    let statusInsert

    const idFatura = await useDB({
        query: `SELECT max(id_nfefatura)+1 as idc  FROM public.nfe_fatura  where loja_fk=${idLoja} `
    });

    const insertFatura = await useDB({
        query: `insert into nfe_fatura  (
            id_nfefatura,
            loja_fk,
            nfecab_fk,
            usuarioaltera,
            dataaltera) values(
                ${idFatura[0].idc},
                ${insertFaturaData.loja_fk},
                ${insertFaturaData.nfecab_fk},
                ${insertFaturaData.usuarioaltera},
                '${insertFaturaData.dataaltera}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idFatura, statusInsert } }

};

const salvarcabnfe = async function ({ idLoja }) {

    const idNfeCab = await useDB({
        query: `SELECT max(id_nfe_cabecalho)+1 as idc  FROM public.nfe_cabecalho\ where loja_fk=${idLoja} `
    });

    return { code: 200, results: { idNfeCab } }

};

const salvarloteitemnfe = async function ({ insertMedicamentoDetData, idLoja }) {

    let statusInsert;

    const insertMedicamentoDet = await useDB({
        query: `insert into nfe_medicamentodet  (
            id_nfe_medicamentodet,
            loja_fk,
            lote_fk,
            nfedet_fk,
            qtdelote,
            datafabricacao,
            datavalidade,
            usuarioaltera,
            dataaltera) values(
                ${insertMedicamentoDetData.id_nfe_medicamentodet},
                ${insertMedicamentoDetData.loja_fk},
                ${insertMedicamentoDetData.lote_fk},
                ${insertMedicamentoDetData.nfedet_fk},
                ${insertMedicamentoDetData.qtdelote},
                '${insertMedicamentoDetData.datafabricacao}',
                '${insertMedicamentoDetData.datavalidade}',
                ${insertMedicamentoDetData.usuarioaltera},
                '${insertMedicamentoDetData.dataaltera}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const medicamentoDet = await useDB({
        query: `SELECT * FROM Nfe_Medicamentodet WHERE loja_Fk=${idLoja} ORDER BY id_Nfe_Medicamentodet DESC`
    });

    return { code: 200, results: { statusInsert, medicamentoDet } }

};

const salvaritemnfe = async function ({ idLoja, insertNfeDetData }) {

    let statusInsert

    const idNfeDet = await useDB({
        query: `SELECT max(id_nfedetalhe)+1 as idc  FROM public.nfe_detalhe where loja_fk=${idLoja} `
    });

    const insertNfeDet = await useDB({
        query: `insert into nfe_detalhe  (
            id_nfedetalhe,
            loja_fk,
            nfecab_fk,
            usuarioaltera,
            dataaltera) values(
                ${idNfeDet[0].idc},
                ${insertNfeDetData.loja_fk},
                ${insertNfeDetData.nfecab_fk},
                ${insertNfeDetData.usuarioaltera},
                '${insertNfeDetData.dataaltera}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idNfeDet, statusInsert } }

};

const salvarnaturezaeinfo = async function ({ idTribNatureza }) {

    const tribNatureza = await useDB({
        query: `select * from Cd_Trib_Naturezaoper where id='${idTribNatureza}' order by id asc`
    });

    return { code: 200, results: { tribNatureza } }

};

const salvaritemnfe2 = async function ({ idLoja, insertNfeDetData }) {

    let statusInsert

    const idNfeDet = await useDB({
        query: `SELECT max(id_nfedetalhe)+1 as idc  FROM public.nfe_detalhe where loja_fk=${idLoja} `
    });

    const insertNfeDet = await useDB({
        query: `insert into nfe_detalhe  (
            id_nfedetalhe,
            loja_fk,
            nfecab_fk,
            usuarioaltera,
            dataaltera) values(
                ${idNfeDet[0].idc},
                ${insertNfeDetData.loja_fk},
                ${insertNfeDetData.nfecab_fk},
                ${insertNfeDetData.usuarioaltera},
                '${insertNfeDetData.dataaltera}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idNfeDet, statusInsert } }

};

const salvarnfecab2 = async function ({ idLoja }) {

    const idNfeCab = await useDB({
        query: `SELECT max(id_nfe_cabecalho)+1 as idc  FROM public.nfe_cabecalho\ where loja_fk=${idLoja} `
    });

    return { code: 200, results: { idNfeCab } }

};

const salvarlotesitemnfe3 = async function ({ insertMedicamentoDetData, idLoja, idLote }) {

    let statusInsert;

    const insertMedicamentoDet = await useDB({
        query: `insert into nfe_medicamentodet  (
            id_nfe_medicamentodet,
            loja_fk,
            lote_fk,
            nfedet_fk,
            qtdelote,
            datafabricacao,
            datavalidade,
            usuarioaltera,
            dataaltera) values(
                ${insertMedicamentoDetData.id_nfe_medicamentodet},
                ${insertMedicamentoDetData.loja_fk},
                ${insertMedicamentoDetData.lote_fk},
                ${insertMedicamentoDetData.nfedet_fk},
                ${insertMedicamentoDetData.qtdelote},
                '${insertMedicamentoDetData.datafabricacao}',
                '${insertMedicamentoDetData.datavalidade}',
                ${insertMedicamentoDetData.usuarioaltera},
                '${insertMedicamentoDetData.dataaltera}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const medicamentoDet = await useDB({
        query: `SELECT * FROM Nfe_Medicamentodet WHERE loja_Fk=${idLoja} ORDER BY id_Nfe_Medicamentodet DESC`
    });

    const lote = await useDB({
        query: `select * from Cd_Lote where id_Lote=${idLote} and loja_Fk=${idLoja}`
    });

    return { code: 200, results: { statusInsert, medicamentoDet, lote } }

};

const salvaritensnfe3 = async function ({ idLoja, insertNfeDetData }) {

    let statusInsert

    const idNfeDet = await useDB({
        query: `SELECT max(id_nfedetalhe)+1 as idc  FROM public.nfe_detalhe where loja_fk=${idLoja} `
    });

    const insertNfeDet = await useDB({
        query: `insert into nfe_detalhe  (
            id_nfedetalhe,
            loja_fk,
            nfecab_fk,
            usuarioaltera,
            dataaltera) values(
                ${idNfeDet[0].idc},
                ${insertNfeDetData.loja_fk},
                ${insertNfeDetData.nfecab_fk},
                ${insertNfeDetData.usuarioaltera},
                '${insertNfeDetData.dataaltera}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idNfeDet, statusInsert } }

};

const salvarnfecab3 = async function ({ idLoja }) {

    const idNfeCab = await useDB({
        query: `SELECT max(id_nfe_cabecalho)+1 as idc  FROM public.nfe_cabecalho\ where loja_fk=${idLoja} `
    });

    return { code: 200, results: { idNfeCab } }

};

const salvarcuponsnfe4 = async function ({ idLoja, insertDocReferenciadoData }) {

    let statusInsert;

    const docReferenciado = await useDB({
        query: `select * from Nfe_Docreferenciado where loja_Fk=${idLoja} order by id desc `
    });

    const idDocReferenciado = await useDB({
        query: `SELECT max(id)+1 as idc FROM public.nfe_docreferenciado where loja_fk=${idLoja} `
    });

    const insertDocReferenciado = await useDB({
        query: `insert into nfe_docreferenciado (
            id,
            loja_fk,
            nfe_cabecalho_fk,
            cod_modelo,
            num_doc,
            usuarioaltera,
            dataaltera,
            dataemissao_doc,
            ecf_cupomcab_fk)values(
                ${idDocReferenciado[0].idc},
                ${insertDocReferenciadoData.loja_fk},
                ${insertDocReferenciadoData.nfe_cabecalho_fk},
                '${insertDocReferenciadoData.cod_modelo}',
                ${insertDocReferenciadoData.num_doc},
                ${insertDocReferenciadoData.usuarioaltera},
                '${insertDocReferenciadoData.dataaltera}',
                '${insertDocReferenciadoData.dataemissao_doc}',
                ${insertDocReferenciadoData.ecf_cupomcab_fk})`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { docReferenciado, idDocReferenciado, statusInsert } }

};

const salvaritensnfe4 = async function ({ idLoja, insertNfeDetData }) {

    let statusInsert

    const idNfeDet = await useDB({
        query: `SELECT max(id_nfedetalhe)+1 as idc  FROM public.nfe_detalhe where loja_fk=${idLoja} `
    });

    const insertNfeDet = await useDB({
        query: `insert into nfe_detalhe  (
            id_nfedetalhe,
            loja_fk,
            nfecab_fk,
            usuarioaltera,
            dataaltera) values(
                ${idNfeDet[0].idc},
                ${insertNfeDetData.loja_fk},
                ${insertNfeDetData.nfecab_fk},
                ${insertNfeDetData.usuarioaltera},
                '${insertNfeDetData.dataaltera}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idNfeDet, statusInsert } }

};

const salvarnotasnfe5a = async function ({ idLoja, insertDocReferenciadoData }) {

    let statusInsert;


    const idDocReferenciado = await useDB({
        query: `SELECT max(id)+1 as idc FROM public.nfe_docreferenciado where loja_fk=${idLoja} `
    });

    const insertDocReferenciado = await useDB({
        query: `insert into nfe_docreferenciado (
            id,
            loja_fk,
            nfe_cabecalho_fk,
            cod_modelo,
            num_doc,
            usuarioaltera,
            dataaltera,
            dataemissao_doc)values(
                ${idDocReferenciado[0].idc},
                ${insertDocReferenciadoData.loja_fk},
                ${insertDocReferenciadoData.nfe_cabecalho_fk},
                '${insertDocReferenciadoData.cod_modelo}',
                ${insertDocReferenciadoData.num_doc},
                ${insertDocReferenciadoData.usuarioaltera},
                '${insertDocReferenciadoData.dataaltera}',
                '${insertDocReferenciadoData.dataemissao_doc}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idDocReferenciado, statusInsert } }

};

const salvarnotasnfe5 = async function ({ idLoja, insertDocReferenciadoData }) {

    let statusInsert;


    const idDocReferenciado = await useDB({
        query: `SELECT max(id)+1 as idc FROM public.nfe_docreferenciado where loja_fk=${idLoja} `
    });

    const insertDocReferenciado = await useDB({
        query: `insert into nfe_docreferenciado (
            id,
            loja_fk,
            nfe_cabecalho_fk,
            cod_modelo,
            num_doc,
            usuarioaltera,
            dataaltera,
            dataemissao_doc, 
            compracab_fk)values(
                ${idDocReferenciado[0].idc},
                ${insertDocReferenciadoData.loja_fk},
                ${insertDocReferenciadoData.nfe_cabecalho_fk},
                '${insertDocReferenciadoData.cod_modelo}',
                ${insertDocReferenciadoData.num_doc},
                ${insertDocReferenciadoData.usuarioaltera},
                '${insertDocReferenciadoData.dataaltera}',
                '${insertDocReferenciadoData.dataemissao_doc}',
                ${insertDocReferenciadoData.compracab_fk})`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idDocReferenciado, statusInsert } }

};

const salvarnotasnfe4s = async function ({ idLoja, insertDocReferenciadoData }) {

    let statusInsert;


    const idDocReferenciado = await useDB({
        query: `SELECT max(id)+1 as idc FROM public.nfe_docreferenciado where loja_fk=${idLoja} `
    });

    const insertDocReferenciado = await useDB({
        query: `insert into nfe_docreferenciado (
            id,
            loja_fk,
            nfe_cabecalho_fk,
            cod_modelo,
            num_doc,
            usuarioaltera,
            dataaltera,
            dataemissao_doc, 
            nfe_cabecalho_ref_fk)values(
                ${idDocReferenciado[0].idc},
                ${insertDocReferenciadoData.loja_fk},
                ${insertDocReferenciadoData.nfe_cabecalho_fk},
                '${insertDocReferenciadoData.cod_modelo}',
                ${insertDocReferenciadoData.num_doc},
                ${insertDocReferenciadoData.usuarioaltera},
                '${insertDocReferenciadoData.dataaltera}',
                '${insertDocReferenciadoData.dataemissao_doc}',
                ${insertDocReferenciadoData.nfe_cabecalho_ref_fk})`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idDocReferenciado, statusInsert } }

};

const salvarcuponsnfe7 = async function ({ idLoja, insertDocReferenciadoData }) {

    let statusInsert;

    const idDocReferenciado = await useDB({
        query: `SELECT max(id)+1 as idc FROM public.nfe_docreferenciado where loja_fk=${idLoja} `
    });

    const insertDocReferenciado = await useDB({
        query: `insert into nfe_docreferenciado (
            id,
            loja_fk,
            nfe_cabecalho_fk,
            cod_modelo,
            num_doc,
            usuarioaltera,
            dataaltera,
            dataemissao_doc,
            ecf_cupomcab_fk)values(
                ${idDocReferenciado[0].idc},
                ${insertDocReferenciadoData.loja_fk},
                ${insertDocReferenciadoData.nfe_cabecalho_fk},
                '${insertDocReferenciadoData.cod_modelo}',
                ${insertDocReferenciadoData.num_doc},
                ${insertDocReferenciadoData.usuarioaltera},
                '${insertDocReferenciadoData.dataaltera}',
                '${insertDocReferenciadoData.dataemissao_doc}',
                ${insertDocReferenciadoData.ecf_cupomcab_fk})`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idDocReferenciado, statusInsert } }

};

const salvaritensnfe7 = async function ({ idLoja, insertNfeDetData }) {

    let statusInsert

    const idNfeDet = await useDB({
        query: `SELECT max(id_nfedetalhe)+1 as idc  FROM public.nfe_detalhe where loja_fk=${idLoja} `
    });

    const insertNfeDet = await useDB({
        query: `insert into nfe_detalhe  (
            id_nfedetalhe,
            loja_fk,
            nfecab_fk,
            usuarioaltera,
            dataaltera) values(
                ${idNfeDet[0].idc},
                ${insertNfeDetData.loja_fk},
                ${insertNfeDetData.nfecab_fk},
                ${insertNfeDetData.usuarioaltera},
                '${insertNfeDetData.dataaltera}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idNfeDet, statusInsert } }

};

const atualizaSequenciador = async function ({ idLoja }) {

    const seqDoc = await useDB({
        query: `SELECT * FROM Nfe_Seqdoc WHERE loja_Fk=${idLoja} AND padrao=true AND modelo='55'`
    });

    return { code: 200, results: { seqDoc } }

};

const salvarEmitente = async function ({ idLoja, insertEmitenteData }) {

    let statusInsert

    const emitente = await useDB({
        query: `select * from Nfe_Emitente where loja_Fk=${idLoja} order by id_Nfeemitente desc `
    });

    const insertEmitente = await useDB({
        query: `insert into nfe_emitente  (
            id_nfeemitente,
            loja_fk,
            nfecab_fk,
            usuarioaltera,
            dataaltera) values(
                ${insertEmitenteData.id_nfeemitente},
                ${insertEmitenteData.loja_fk},
                ${insertEmitenteData.nfecab_fk},
                ${insertEmitenteData.usuarioaltera},
                '${insertEmitenteData.dataaltera}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { emitente, statusInsert } }

};

const salvarRetirada = async function ({ idLoja, insertLocalRetiradaData }) {

    let statusInsert

    const localRetirada = await useDB({
        query: `select * from Nfe_Localretirada where loja_Fk=${idLoja} order by id_Nfelocalretirada desc `
    });

    const insertlocalretirada = await useDB({
        query: `insert into nfe_localretirada  (
            id_nfelocalretirada,
            loja_fk,
            nfecab_fk,
            usuarioaltera,
            dataaltera) values(
                ${insertLocalRetiradaData.id_nfelocalretirada},
                ${insertLocalRetiradaData.loja_fk},
                ${insertLocalRetiradaData.nfecab_fk},
                ${insertLocalRetiradaData.usuarioaltera},
                '${insertLocalRetiradaData.dataaltera}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { localRetirada, statusInsert } }

};

const preencherListaBuscaNormal = async function ({ idLoja }) {

    const lista = await useDB({
        query: `SELECT * FROM  Nfe_Cabecalho WHERE loja_fk=${idLoja} AND statusnota_Nfecab='1'  ORDER BY id_Nfe_Cabecalho DESC`
    });

    return { code: 200, results: { lista } }

};

const preencherListaBusca = async function ({ idLoja, ambiente }) {

    const lista = await useDB({
        query: `SELECT * FROM  Nfe_Cabecalho WHERE loja_fk=${idLoja} and ambiente_Nfecab='${ambiente}' ORDER BY dataentradasaida_Nfecab DESC`
    });

    return { code: 200, results: { lista } }

};

const pegardestinatario = async function ({ idLoja, idNfeCab }) {

    const destinatario = await useDB({
        query: `SELECT razaosocial_nfedest from nfe_destinatario  where loja_fk=${idLoja} and nfecab_fk=${idNfeCab} `
    });

    return { code: 200, results: { destinatario } }

};

const pesquisarNotasNormais2 = async function ({ idLoja, dataInicio, dataFim, ambiente, statusNota, numeroDocFiscal, nomePesquisa }) {

    /*  String st = "";
         if (!statusf.equals("T")) {
             st = " and vo.statusnotaNfecab ='" + statusf + "' ";
         }
 
         String st2 = "";
         if (!statusf.equals("T")) {
             st2 = " and vo.nfeCabecalho.statusnotaNfecab ='" + statusf + "' ";
         } */

    const nfeCabDataEmissao = await useDB({
        query: `SELECT * FROM  Nfe_Cabecalho WHERE loja_fk=${idLoja} AND (cast(dataemissao_Nfecab as date) BETWEEN '${dataInicio}' AND '${dataFim}') and ambiente_Nfecab='${ambiente}' and statusnota_Nfecab ='${statusNota}' ORDER BY dataentradasaida_Nfecab desc`
    });

    /*  if (tipopesquisa.equals("periodo")) {
         hql = "SELECT vo FROM  NfeCabecalho vo"
                 + " WHERE vo.cfLoja=" + lojaLogada.getIdLoja() + ""
                 // + " AND vo.situacao=1 "
                 + " AND (cast(vo.dataemissaoNfecab as date) BETWEEN '" + sdn.format(iniciopesquisa) + "'"
                 + " AND '" + sdn.format(fimpesquisa) + "')"
                 + " and vo.ambienteNfecab='" + nfeConfig.getAmbiente() + "'"
                 + "" + st
                 + ""
                 + " ORDER BY vo.dataentradasaidaNfecab desc"; */

    const nfeCabNumeroDoc = await useDB({
        query: `SELECT * FROM  Nfe_Cabecalho WHERE loja_fk=${idLoja} AND CAST(numerodocfiscal_Nfecab as text) LIKE '%${numeroDocFiscal}%' and ambiente_Nfecab='${ambiente}' and statusnota_Nfecab ='${statusNota}' ORDER BY  dataentradasaida_Nfecab desc`
    });

    /* else if (tipopesquisa.equals("numero")) {
       hql = "SELECT vo FROM  NfeCabecalho vo"
               + " WHERE vo.cfLoja=" + lojaLogada.getIdLoja() + ""
               // + " AND vo.situacao=1 "
               + " AND CAST(vo.numerodocfiscalNfecab as text) LIKE '%" + numeropesquisa + "%'"
               + " and vo.ambienteNfecab='" + nfeConfig.getAmbiente() + "'"
               + "" + st
               + ""
               + " ORDER BY  vo.dataentradasaidaNfecab desc"; */

    const destinatario = await useDB({
        query: `SELECT Nfe_Destinatario.* FROM  Nfe_Destinatario, nfe_cabecalho WHERE Nfe_Destinatario.loja_fk=${idLoja} AND (razaosocial_Nfedest LIKE '%${nomePesquisa}%' or nomefantasia_Nfedest LIKE '%${nomePesquisa}%' ) and nfe_Cabecalho.ambiente_Nfecab='${ambiente}' and nfe_Cabecalho.statusnota_Nfecab = '${statusNota}' AND Nfe_Destinatario.nfecab_fk = nfe_cabecalho.id_nfe_cabecalho ORDER BY  nfe_Cabecalho.dataentradasaida_Nfecab desc`
    });

    return { code: 200, results: { nfeCabDataEmissao, nfeCabNumeroDoc, destinatario } }

};

const consultaLotesNota = async function ({ idLoja, idProd, idCompraCab }) {

    const lote = await useDB({
        query: ` select * from Cd_Lote where loja_fk=${idLoja}  and produto_fk=${idProd}`
    });

    const compraMedicamentoDet = await useDB({
        query: `select Fn_Compra_Medicamentodet.* from Fn_Compra_Medicamentodet, cd_lote, fn_compra_detalhe where Fn_Compra_Medicamentodet.loja_Fk=${idLoja} and cd_Lote.produto_Fk=${idProd} and fn_compra_detalhe.compracab_fk=${idCompraCab} and Fn_Compra_Medicamentodet.lote_fk = cd_lote.id_lote and Fn_Compra_Medicamentodet.compradet_fk = fn_compra_detalhe.id_compradet`
    });

    return { code: 200, results: { lote, compraMedicamentoDet } }

};

const consultarLotesNotaTransferencia = async function ({ idLoja, idProd }) {

    const lote = await useDB({
        query: `select * from Cd_Lote where loja_Fk=${idLoja} and produto_Fk=${idProd}`
    });

    return { code: 200, results: { lote } }

};

const consultarNotas = async function ({ idForn, idLoja, numeroDoc, dataInicio, dataFim }) {

    const compraCabNumero = await useDB({
        query: `select * from Fn_Compra_Cabecalho where fornecedor_Fk=${idForn} and loja_fk=${idLoja} and cast(numerodocfiscal_Compracab as text) like '%${numeroDoc}%' order by numerodocfiscal_Compracab desc`
    });

    const compraCabData = await useDB({
        query: `select * from Fn_Compra_Cabecalho where fornecedor_Fk=${idForn} and loja_fk=${idLoja} and (cast(dataemissao_Compracab as date) between '${dataInicio}' and '${dataFim}') order by dataemissao_Compracab desc`
    });

    return { code: 200, results: { compraCabNumero, compraCabData } }

};

const consultarNotass2 = async function ({ idLoja, numeroDoc, tipoOperacao, dataInicio, dataFim }) {

    const nfeCabNumDoc = await useDB({
        query: `select * from Nfe_Cabecalho where loja_fk=${idLoja} and cast(numerodocfiscal_Nfecab as text) like '%${numeroDoc}%' and statusnota_Nfecab in ('4','5')  and tipooperacao_Nfecab='${tipoOperacao}'  order by numerodocfiscal_Nfecab desc`
    });

    const nfeCabData = await useDB({
        query: `select * from Nfe_Cabecalho where loja_fk=${idLoja} and (cast(dataentradasaida_Nfecab as date) between '${dataInicio}' and '${dataFim}') and statusnota_Nfecab in ('4','5') and tipooperacao_Nfecab='${tipoOperacao}'  order by dataentradasaida_Nfecab desc`
    });

    return { code: 200, results: { nfeCabNumDoc, nfeCabData } }

};

const consultarNotass = async function ({ idLoja, numeroDoc, dataInicio, dataFim }) {

    const nfeCabNumDoc = await useDB({
        query: `select * from Nfe_Cabecalho where loja_fk=${idLoja} and cast(numerodocfiscal_Nfecab as text) like '%${numeroDoc}%' and statusnota_Nfecab in ('4','5')  and tipooperacao_Nfecab='2'  order by numerodocfiscal_Nfecab desc`
    });

    const nfeCabData = await useDB({
        query: `select * from Nfe_Cabecalho where loja_fk=${idLoja} and (cast(dataentradasaida_Nfecab as date) between '${dataInicio}' and '${dataFim}') and statusnota_Nfecab in ('4','5') and tipooperacao_Nfecab='2'  order by dataentradasaida_Nfecab desc`
    });

    return { code: 200, results: { nfeCabNumDoc, nfeCabData } }

};

const consultarDetalhes = async function ({ idCompraCab, idLoja }) {

    const M1Docreferenciado = await useDB({
        query: `select fn_Compra_Cabecalho.numerodocfiscal_Compracab from Vd_M1_Docreferenciado, fn_compra_cabecalho, vd_m1 where compracab_fk=${idCompraCab} and vd_m1_docreferenciado.loja_Fk=${idLoja} and compracab_fk is not null and vd_M1.situacao!=2`
    });

    const DocReferenciado = await useDB({
        query: `select fn_Compra_Cabecalho.numerodocfiscal_Compracab from Nfe_Docreferenciado, fn_compra_cabecalho, nfe_cabecalho  where compracab_fk=${idCompraCab} and nfe_docreferenciado.loja_Fk=${idLoja} and compracab_fk is not null and (nfe_Cabecalho.statusnota_Nfecab='4' or nfe_Cabecalho.statusnota_Nfecab='5') AND nfe_docreferenciado.compracab_fk = fn_compra_cabecalho.id_compracab and nfe_docreferenciado.nfe_cabecalho_fk = nfe_cabecalho.id_nfe_cabecalho`
    });

    const compraDetProd = await useDB({
        query: `select * from Fn_Compra_Detalhe where compracab_fk=${idCompraCab} and loja_Fk=${idLoja} and produto_Fk is not null`
    });

    const compraDetTipoComb = await useDB({
        query: `select * from Fn_Compra_Detalhe where compracab_fk=${idCompraCab} and loja_Fk=${idLoja} and tipocombustivel_Fk is not null`
    });

    return { code: 200, results: { M1Docreferenciado, DocReferenciado, compraDetProd, compraDetTipoComb } }

};

const consultarDetalhess = async function ({ idNfeCab, idLoja }) {

    const docReferenciado = await useDB({
        query: `select nfe_Cabecalho.numerodocfiscal_Nfecab from Nfe_Docreferenciado, nfe_Cabecalho where nfe_cabecalho_fk=${idNfeCab} and nfe_docreferenciado.loja_Fk=${idLoja} and nfe_cabecalho_fk is not null and (nfe_Cabecalho.statusnota_Nfecab='4' or nfe_Cabecalho.statusnota_Nfecab='5')`
    });

    const nfeDet = await useDB({
        query: `select * from Nfe_Detalhe where nfecab_fk=${idNfeCab} and loja_Fk=${idLoja} and produto_Fk is not null`
    });

    return { code: 200, results: { docReferenciado, nfeDet } }

};

const selecionaNatureza = async function ({ idTribNatureza }) {

    const tribNatureza = await useDB({
        query: `select * from Cd_Trib_Naturezaoper where id=${idTribNatureza} order by id asc`
    });

    return { code: 200, results: { tribNatureza } }

};

const listaOperacao = async function ({ tipoOperacao }) {

    const tribNatureza = await useDB({
        query: `select * from Cd_Trib_Naturezaoper where tipooperacao='${tipoOperacao}' order by id asc`
    });

    return { code: 200, results: { tribNatureza } }

};

const listaOperacao2 = async function ({ tipoOperacao }) {

    const tribNatureza = await useDB({
        query: `select * from Cd_Trib_Naturezaoper where tipooperacao='${tipoOperacao}' order by id asc`
    });

    return { code: 200, results: { tribNatureza } }

};

const pegarCodigoDeBarras = async function ({ idProd }) {

    const numCodBarra = await useDB({
        query: `SELECT numero_codbar FROM public.cd_codigobarras where ativo_codbar='S' and produto_fk=${idProd} `
    });

    return { code: 200, results: { numCodBarra } }

};

const adicionarProduto3 = async function ({ idProd, idLoja, idCompraDet, idTipoComb }) {

    const estoqueGeral = await useDB({
        query: `SELECT * FROM es_estoquegeral WHERE produto_fk=${idProd} AND loja_fk=${idLoja}`
    });

    const medicamentoDet = await useDB({
        query: `select * from Fn_Compra_Medicamentodet where loja_Fk=${idLoja} and compradet_Fk=${idCompraDet}`
    });

    const tanque = await useDB({
        query: `select * from Cd_Tanque where loja_Fk=${idLoja} and tipocombustivel_Fk=${idTipoComb} `
    });

    return { code: 200, results: { estoqueGeral, medicamentoDet, tanque } }

};

const adicionarProduto3s = async function ({ idProd, idLoja }) {

    const estoqueGeral = await useDB({
        query: `SELECT * FROM es_estoquegeral WHERE produto_fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { estoqueGeral } }

};

const verificaritens2 = async function ({ idLoja, idCupomCab }) {

    const docReferenciado = await useDB({
        query: `SELECT ecf_cupomcab_fk FROM nfe_docreferenciado AS det  INNER JOIN nfe_cabecalho AS cab ON cab.id_nfe_cabecalho=det.nfe_cabecalho_fk WHERE cab.loja_fk=${idLoja} AND statusnota_nfecab='5' AND tipooperacao_nfecab='4' AND det.loja_fk=${idLoja} AND ecf_cupomcab_fk=${idCupomCab}`
    });

    return { code: 200, results: { docReferenciado } }

};

const inseriritenscupons2 = async function ({ idProd, idLoja, idCupomCab }) {

    const estoqueGeral = await useDB({
        query: `SELECT * FROM es_estoquegeral WHERE produto_fk=${idProd} AND loja_fk=${idLoja}`
    });

    const cupomDetLoteMed = await useDB({
        query: `select Ecf_Cupomdet_Lotemed.* from Ecf_Cupomdet_Lotemed, ecf_Cupomdet_Prod where ecf_Cupomdet_Prod.cupomcab_fk=${idCupomCab} and ecf_Cupomdet_Prod.loja_Fk=${idLoja}   and ecf_Cupomdet_Prod.produto_Fk=${idProd} AND Ecf_Cupomdet_Lotemed.cupomdet_fk = ecf_cupomdet_prod.id_cupomdet_prod`
    });

    return { code: 200, results: { estoqueGeral, cupomDetLoteMed } }

};

const adicionarProduto2 = async function ({ idProd, idLoja }) {

    const estoqueGeral = await useDB({
        query: `SELECT * FROM es_estoquegeral WHERE produto_fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { estoqueGeral } }

};

const listaCupom = async function ({ idLoja, dataInicio, dataFim, cupom }) {

    const cupomCab = await useDB({
        query: `SELECT * FROM Ecf_Cupomcab * WHERE loja_fk=${idLoja} AND (cast(datahora_Cupom as date) BETWEEN '${dataInicio}' AND '${dataFim}') AND status_Cupom in('F','O','D')  and coo_Cupom!=0 ORDER BY datahora_Cupom`
    });

    const cupomCab2 = await useDB({
        query: `SELECT * FROM Ecf_Cupomcab WHERE loja_fk= ${idLoja} AND cast(coo_Cupom as text) LIKE  '${cupom}%'  AND status_Cupom in ('F','O','D')  and coo_Cupom!=0 ORDER BY coo_Cupom asc`
    });

    return { code: 200, results: { cupomCab, cupomCab2 } }

};

const listaCupom22 = async function ({ idLoja, dataFim, dataInicio, codCli, descProd, idCupomCab, totalLiquido, cooCupom }) {

    const cupomCabCliente = await useDB({
        query: `SELECT ecf_cupomcab_cliente.cupomcab_fk FROM Ecf_Cupomcab_Cliente, ecf_cupomcab WHERE ecf_Cupomcab.loja_fk=${idLoja} AND (cast(ecf_Cupomcab.datahora_Cupom as date) BETWEEN '${dataInicio}' AND '${dataFim}') AND ecf_Cupomcab.status_Cupom in ('F','O','D')  AND ecf_Cupomcab.coo_Cupom!=0  AND ecf_Cupomcab.tipo='P'  AND cod_Cliente=${codCli} and ecf_cupomcab_cliente.cupomcab_fk = ecf_cupomcab.id_cupomcab ORDER BY ecf_Cupomcab.datahora_Cupom asc`
    });

    const cupomDetProd = await useDB({
        query: `SELECT Ecf_Cupomdet_Prod.* FROM Ecf_Cupomdet_Prod, cd_produto, ecf_cupomcab WHERE Ecf_Cupomdet_Prod.loja_fk = ${idLoja} AND upper(cd_produto.descricao_Prod) like '${descProd}%'  AND ecf_Cupomcab.status_Cupom in('F','O','D')  AND ecf_Cupomcab.tipo='P'  AND (cast(ecf_Cupomcab.datahora_Cupom as date) BETWEEN '${dataInicio}' AND '${dataFim}') and status_Cupitem='F'  and ecf_Cupomcab.coo_Cupom!=0  AND ecf_Cupomcab.id_Cupomcab=${idCupomCab} and Ecf_Cupomdet_Prod.produto_fk = cd_produto.id_prod and ecf_cupomcab.id_cupomcab = Ecf_Cupomdet_Prod.cupomcab_fk ORDER BY ecf_Cupomcab.datahora_Cupom asc`
    });

    const cupomCabCliente2 = await useDB({
        query: `SELECT ecf_cupomcab_cliente.cupomcab_fk FROM Ecf_Cupomcab_Cliente, ecf_cupomcab WHERE ecf_Cupomcab.loja_fk=${idLoja} AND (cast(ecf_Cupomcab.datahora_Cupom as date) BETWEEN '${dataInicio}' AND '${dataFim}') AND ecf_Cupomcab.status_Cupom in ('F','O','D')  AND ecf_Cupomcab.coo_Cupom!=0 and (cast(ecf_Cupomcab.totalliquido_Cupom as text) like '% ${totalLiquido}%' ) AND ecf_Cupomcab.tipo='P'  AND cod_Cliente=${codCli} and ecf_cupomcab_cliente.cupomcab_fk = ecf_cupomcab.id_cupomcab ORDER BY ecf_Cupomcab.datahora_Cupom asc`
    });

    const cupomCab = await useDB({
        query: `SELECT * FROM Ecf_Cupomcab WHERE loja_fk=${idLoja} AND cast(coo_Cupom as text) LIKE  '${cooCupom}%'  AND status_Cupom in ('F','O','D')  AND coo_Cupom!=0  AND tipo='P'  ORDER BY coo_Cupom asc`
    });

    const cupomCabCliente3 = await useDB({
        query: `SELECT ecf_cupomcab_cliente.cupomcab_fk FROM Ecf_Cupomcab_Cliente, ecf_cupomcab WHERE ecf_Cupomcab.loja_fk=${idLoja}AND cast(ecf_Cupomcab.coo_Cupom as text) in ('${cooCupom}') AND ecf_Cupomcab.status_Cupom in ('F','O','D')  AND ecf_Cupomcab.coo_Cupom!=0  AND ecf_Cupomcab.tipo='P'  AND cod_Cliente=${codCli} and ecf_cupomcab_cliente.cupomcab_fk = ecf_cupomcab.id_cupomcab ORDER BY ecf_Cupomcab.datahora_Cupom asc`
    });


    return { code: 200, results: { cupomCabCliente, cupomDetProd, cupomCabCliente2, cupomCab, cupomCabCliente3 } }

};

const pegaritensusandocupom = async function ({ idLoja, idCupomCab }) {

    const cupomDetProd = await useDB({
        query: `SELECT Ecf_Cupomdet_Prod.* FROM Ecf_Cupomdet_Prod, ecf_cupomcab WHERE Ecf_Cupomdet_Prod.loja_fk=${idLoja} AND cupomcab_fk=${idCupomCab}  AND ecf_Cupomcab.status_Cupom in('F','O','D')  and status_Cupitem='F'  and ecf_Cupomcab.coo_Cupom!=0 and ecf_cupomdet_prod.cupomcab_fk = ecf_cupomcab.id_cupomcab ORDER BY ecf_Cupomcab.datahora_Cupom asc`
    });

    const cupomDetBico = await useDB({
        query: `SELECT Ecf_Cupomdet_Bico.* FROM Ecf_Cupomdet_Bico, cd_bico, cd_tanque, ecf_cupomcab WHERE ecf_Cupomcab.loja_fk=${idLoja} and cd_bico.loja_fk=${idLoja} and cd_tanque.loja_fk=${idLoja} AND ecf_cupomdet_bico.cupomcab_fk=${idCupomCab}  AND ecf_Cupomcab.status_Cupom in('F','O','D')  and status_Cupdetbic='F'  and ecf_Cupomcab.coo_Cupom!=0 and ecf_cupomdet_bico.bico_fk = cd_bico.id_bico AND cd_bico.tanque_fk = cd_tanque.id_tanque AND ecf_cupomdet_bico.cupomcab_fk = ecf_cupomcab.id_cupomcab ORDER BY ecf_Cupomcab.datahora_Cupom asc`
    });

    return { code: 200, results: { cupomDetProd, cupomDetBico } }

};

const pesquisarCuponsAvista = async function ({ idLoja, dataInicio, dataFim, cooCupom }) {

    const cupomCab = await useDB({
        query: `SELECT * FROM Ecf_Cupomcab WHERE loja_fk= ${idLoja} AND (cast(datahora_Cupom as date) BETWEEN '${dataInicio}'  AND '${dataFim}') AND status_Cupom in('F','O','D')  AND tipo='V'  and coo_Cupom!=0 ORDER BY datahora_Cupom asc`
    });

    const cupomCab2 = await useDB({
        query: `SELECT * FROM Ecf_Cupomcab WHERE loja_fk=${idLoja} AND cast(coo_Cupom as text) LIKE  '${cooCupom}%'  AND status_Cupom in ('F','O','D')  AND tipo='V'  and coo_Cupom!=0 ORDER BY coo_Cupom asc`
    });

    return { code: 200, results: { cupomCab, cupomCab2 } }

};

const pesquisarCuponsAvista2 = async function ({ idLoja, dataInicio, dataFim, descProd, idCupomCab, idProd, totalLiquido, cooCupom, cpfCli }) {

    const cupomDetProd = await useDB({
        query: `SELECT Ecf_Cupomdet_Prod.* FROM Ecf_Cupomdet_Prod, cd_produto, ecf_cupomcab WHERE Ecf_Cupomdet_Prod.loja_fk = ${idLoja} AND upper(cd_produto.descricao_Prod) like '${descProd}%'  AND ecf_Cupomcab.status_Cupom in('F','O','D')  AND ecf_Cupomcab.tipo='V'  AND (cast(ecf_Cupomcab.datahora_Cupom as date) BETWEEN '${dataInicio}' AND '${dataFim}') and status_Cupitem='F'  and ecf_Cupomcab.coo_Cupom!=0  AND ecf_Cupomcab.id_Cupomcab=${idCupomCab} and Ecf_Cupomdet_Prod.produto_fk = cd_produto.id_prod and ecf_cupomcab.id_cupomcab = Ecf_Cupomdet_Prod.cupomcab_fk ORDER BY ecf_Cupomcab.datahora_Cupom asc`
    });

    const cupomDetProd2 = await useDB({
        query: `SELECT Ecf_Cupomdet_Prod.* FROM Ecf_Cupomdet_Prod, ecf_cupomcab WHERE ecf_Cupomcab.loja_fk= ${idLoja} AND ecf_cupomdet_prod.produto_fk=${idProd}  AND ecf_Cupomcab.status_Cupom in('F','O','D')  AND ecf_Cupomcab.tipo='V'  AND (cast(ecf_Cupomcab.datahora_Cupom as date) BETWEEN '${dataInicio}' AND '${dataFim}') and status_Cupitem='F'  and ecf_Cupomcab.coo_Cupom!=0  and ecf_cupomcab.id_cupomcab = Ecf_Cupomdet_Prod.cupomcab_fk ORDER BY ecf_Cupomcab.datahora_Cupom asc`
    });

    const cupomDetProd3 = await useDB({
        query: `SELECT Ecf_Cupomdet_Prod.* FROM Ecf_Cupomdet_Prod, ecf_cupomcab WHERE ecf_Cupomcab.loja_fk= ${idLoja} AND ecf_Cupomcab.status_Cupom in('F','O','D')  AND ecf_Cupomcab.tipo='V'  AND (cast(ecf_Cupomcab.datahora_Cupom as date) BETWEEN '${dataInicio}' AND '${dataFim}') and status_Cupitem='F'  and ecf_Cupomcab.coo_Cupom!=0 and ecf_cupomcab.id_cupomcab = Ecf_Cupomdet_Prod.cupomcab_fk ORDER BY ecf_Cupomcab.datahora_Cupom asc`
    });

    const cupomDetBico = await useDB({
        query: `SELECT Ecf_Cupomdet_Bico.* FROM Ecf_Cupomdet_Bico, cd_bico, cd_tanque, ecf_cupomcab WHERE ecf_Cupomcab.loja_fk=${idLoja} and cd_bico.loja_fk=${idLoja} and cd_tanque.loja_fk=${idLoja} AND (cast(ecf_Cupomcab.datahora_Cupom as date) BETWEEN '${dataInicio}' AND '${dataFim}') AND ecf_Cupomcab.status_Cupom in('F','O','D')  and status_Cupdetbic='F'  and ecf_Cupomcab.coo_Cupom!=0 and ecf_cupomdet_bico.bico_fk = cd_bico.id_bico AND cd_bico.tanque_fk = cd_tanque.id_tanque AND ecf_cupomdet_bico.cupomcab_fk = ecf_cupomcab.id_cupomcab ORDER BY ecf_Cupomcab.datahora_Cupom asc`
    });

    const cupomDetProd4 = await useDB({
        query: `SELECT Ecf_Cupomdet_Prod.* FROM Ecf_Cupomdet_Prod, ecf_cupomcab WHERE ecf_Cupomcab.loja_fk= ${idLoja} AND ecf_Cupomcab.status_Cupom in('F','O','D')  AND ecf_Cupomcab.tipo='V'  AND (cast(ecf_Cupomcab.datahora_Cupom as date) BETWEEN '${dataInicio}' AND '${dataFim}') and status_Cupitem='F' and (cast(ecf_Cupomcab.totalliquido_Cupom as text) like '% ${totalLiquido}%' )  and ecf_Cupomcab.coo_Cupom!=0 and ecf_cupomcab.id_cupomcab = Ecf_Cupomdet_Prod.cupomcab_fk ORDER BY ecf_Cupomcab.datahora_Cupom asc`
    });

    const cupomDetBico2 = await useDB({
        query: `SELECT Ecf_Cupomdet_Bico.* FROM Ecf_Cupomdet_Bico, cd_bico, cd_tanque, ecf_cupomcab WHERE ecf_Cupomcab.loja_fk=${idLoja} and cd_bico.loja_fk=${idLoja} and cd_tanque.loja_fk=${idLoja} AND (cast(ecf_Cupomcab.datahora_Cupom as date) BETWEEN '${dataInicio}' AND '${dataFim}') AND ecf_Cupomcab.status_Cupom in('F','O','D')  and status_Cupdetbic='F'  and ecf_Cupomcab.coo_Cupom!=0 and ecf_cupomcab.tipo = 'V' and (cast(ecf_Cupomcab.totalliquido_Cupom as text) like '% ${totalLiquido}%' ) and ecf_cupomdet_bico.bico_fk = cd_bico.id_bico AND cd_bico.tanque_fk = cd_tanque.id_tanque AND ecf_cupomdet_bico.cupomcab_fk = ecf_cupomcab.id_cupomcab ORDER BY ecf_Cupomcab.datahora_Cupom asc`
    });

    const cupomDetProd5 = await useDB({
        query: `SELECT Ecf_Cupomdet_Prod.* FROM Ecf_Cupomdet_Prod, ecf_cupomcab WHERE ecf_Cupomcab.loja_fk= ${idLoja} and cast(ecf_cupomcab.coo_cupom as text) LIKE '${cooCupom}%' AND ecf_Cupomcab.status_Cupom in('F','O','D')  AND ecf_Cupomcab.tipo='V'  AND  status_Cupitem='F' and ecf_Cupomcab.coo_Cupom!=0 and ecf_cupomcab.id_cupomcab = Ecf_Cupomdet_Prod.cupomcab_fk ORDER BY ecf_Cupomcab.datahora_Cupom asc`
    });

    const cupomDetBico3 = await useDB({
        query: `SELECT Ecf_Cupomdet_Bico.* FROM Ecf_Cupomdet_Bico, cd_bico, cd_tanque, ecf_cupomcab WHERE ecf_Cupomcab.loja_fk=${idLoja} and cd_bico.loja_fk=${idLoja} and cd_tanque.loja_fk=${idLoja} and cast(ecf_cupomcab.coo_cupom as text) LIKE '${cooCupom}%' AND ecf_Cupomcab.status_Cupom in('F','O','D')  and status_Cupdetbic='F'  and ecf_Cupomcab.coo_Cupom!=0 and ecf_cupomdet_bico.bico_fk = cd_bico.id_bico AND cd_bico.tanque_fk = cd_tanque.id_tanque AND ecf_cupomdet_bico.cupomcab_fk = ecf_cupomcab.id_cupomcab ORDER BY ecf_Cupomcab.datahora_Cupom asc`
    });

    const cupomCabCliente = await useDB({
        query: `SELECT cupomcab_fk FROM ecf_cupomcab_cliente AS c INNER JOIN ecf_cupomcab AS cab ON cab.id_cupomcab=c.cupomcab_fk  WHERE status_cupom IN ('F','O') AND tipo='V' AND cpfcnpj='${cpfCli}'  AND cab.loja_fk=${idLoja}  AND c.loja_fk=${idLoja}`
    });

    const cupomDetProd6 = await useDB({
        query: `SELECT Ecf_Cupomdet_Prod.* FROM Ecf_Cupomdet_Prod, ecf_cupomcab WHERE ecf_Cupomcab.loja_fk= ${idLoja} and cast(ecf_cupomcab.id_cupomcab as text) in (${idCupomCab}) AND ecf_Cupomcab.status_Cupom in('F','O','D')  AND ecf_Cupomcab.tipo='V'  AND  status_Cupitem='F' and ecf_Cupomcab.coo_Cupom!=0 and ecf_cupomcab.id_cupomcab = Ecf_Cupomdet_Prod.cupomcab_fk ORDER BY ecf_Cupomcab.datahora_Cupom asc`
    });

    const cupomDetBico4 = await useDB({
        query: `SELECT Ecf_Cupomdet_Bico.* FROM Ecf_Cupomdet_Bico, cd_bico, cd_tanque, ecf_cupomcab WHERE ecf_Cupomcab.loja_fk=${idLoja} and cd_bico.loja_fk=${idLoja} and cd_tanque.loja_fk=${idLoja} and cast(ecf_cupomcab.id_cupomcab as text) in (${idCupomCab})  AND ecf_Cupomcab.status_Cupom in('F','O','D')  and status_Cupdetbic='F'  and ecf_Cupomcab.coo_Cupom!=0 and ecf_cupomdet_bico.bico_fk = cd_bico.id_bico AND cd_bico.tanque_fk = cd_tanque.id_tanque AND ecf_cupomdet_bico.cupomcab_fk = ecf_cupomcab.id_cupomcab ORDER BY ecf_Cupomcab.datahora_Cupom asc`
    });



    return { code: 200, results: { cupomDetProd, cupomDetProd2, cupomDetProd3, cupomDetBico, cupomDetProd4, cupomDetBico2, cupomDetProd5, cupomDetBico3, cupomCabCliente, cupomDetProd6, cupomDetBico4 } }

};

const verificadocref = async function ({ idCupomCab, idLoja, tipoOperacao }) {

    const docReferenciado = await useDB({
        query: `select nfe_Cabecalho.numerodocfiscal_Nfecab from Nfe_Docreferenciado, nfe_Cabecalho, ecf_cupomcab where ecf_cupomcab.id_cupomcab = ${idCupomCab} and nfe_docreferenciado.loja_Fk=${idLoja} and ecf_cupomcab_fk is not null and (nfe_Cabecalho.statusnota_Nfecab='4' or nfe_Cabecalho.statusnota_Nfecab='5') and nfe_cabecalho.tipooperacao_nfecab = '${tipoOperacao}'`
    });

    return { code: 200, results: { docReferenciado } }

};

const verificadocref2 = async function ({ idCompraCab, idLoja, tipoOperacao }) {

    const docReferenciado = await useDB({
        query: `select ecf_cupomcab.coo_cupom from Nfe_Docreferenciado, nfe_Cabecalho, ecf_cupomcab, fn_compra_cabecalho where fn_compra_cabecalho.id_Compracab= ${idCompraCab} and fn_compra_cabecalho.loja_Fk=${idLoja} and compracab_fk is not null and (nfe_Cabecalho.statusnota_Nfecab='4' or nfe_Cabecalho.statusnota_Nfecab='5') and nfe_cabecalho.tipooperacao_nfecab = '${tipoOperacao}'`
    });

    return { code: 200, results: { docReferenciado } }

};

const verificadocref3 = async function ({ idNfeCab, idLoja }) {

    const docReferenciado = await useDB({
        query: `select nfe_Cabecalho.numerodocfiscal_Nfecab from Nfe_Docreferenciado, nfe_Cabecalho where nfe_cabecalho.id_nfe_cabecalho = ${idNfeCab} and nfe_docreferenciado.loja_Fk=${idLoja} and nfe_cabecalho_fk is not null and (nfe_Cabecalho.statusnota_Nfecab='4' or nfe_Cabecalho.statusnota_Nfecab='5')`
    });

    return { code: 200, results: { docReferenciado } }

};

const jaReferenciado = async function ({ idCompraCab, idLoja }) {

    const M1Docreferenciado = await useDB({
        query: `select fn_Compra_Cabecalho.numerodocfiscal_Compracab from Vd_M1_Docreferenciado, fn_compra_cabecalho, vd_m1 where fn_Compra_Cabecalho.id_Compracab=${idCompraCab} and fn_Compra_Cabecalho.loja_Fk=${idLoja} and compracab_fk is not null and vd_M1.situacao!=2`
    });

    const docReferenciado = await useDB({
        query: `select ecf_cupomcab.coo_cupom from Nfe_Docreferenciado, nfe_Cabecalho, ecf_cupomcab, fn_compra_cabecalho where fn_compra_cabecalho.id_Compracab= ${idCompraCab} and fn_compra_cabecalho.loja_Fk=${idLoja} and compracab_fk is not null and (nfe_Cabecalho.statusnota_Nfecab='4' or nfe_Cabecalho.statusnota_Nfecab='5') and nfe_docreferenciado.nfe_cabecalho_fk = nfe_cabecalho.id_nfe_cabecalho and nfe_docreferenciado.ecf_cupomcab_fk = ecf_cupomcab.id_cupomcab and nfe_docreferenciado.compracab_fk = fn_compra_cabecalho.id_compracab`
    });


    return { code: 200, results: { M1Docreferenciado, docReferenciado } }

};

const jaReferenciado2 = async function ({ idCupomCab, idLoja, tipoOperacao }) {

    const M1Docreferenciado = await useDB({
        query: `select ecf_cupomcab.coo_cupom from Vd_M1_Docreferenciado, ecf_cupomcab, vd_m1 where ecf_cupomcab.id_cupomcab=${idCupomCab} and ecf_cupomcab.loja_Fk=${idLoja} and ecf_cupomcab_fk is not null and vd_M1.situacao!=2`
    });

    const docReferenciado = await useDB({
        query: `select ecf_cupomcab.coo_cupom from Nfe_Docreferenciado, nfe_Cabecalho, ecf_cupomcab where ecf_cupomcab.id_cupomcab=${idCupomCab} and ecf_cupomcab.loja_Fk=${idLoja} and compracab_fk is not null and (nfe_Cabecalho.statusnota_Nfecab='4' or nfe_Cabecalho.statusnota_Nfecab='5')  and nfe_cabecalho.tipooperacao_nfecab = '${tipoOperacao}' and nfe_docreferenciado.nfe_cabecalho_fk = nfe_cabecalho.id_nfe_cabecalho and nfe_docreferenciado.ecf_cupomcab_fk = ecf_cupomcab.id_cupomcab`
    });

    return { code: 200, results: { M1Docreferenciado, docReferenciado } }

};

const setarModeloSeriexml = async function ({ tipoOperacao }) {

    const tribNatureza = await useDB({
        query: `select * from Cd_Trib_Naturezaoper where tipooperacao='${tipoOperacao}' order by id asc`
    });

    const produto = await useDB({
        query: `select * from Cd_Produto where descricao_Prod='ANTECIPACAO DO ICMS-AQUISICAO/RECEBIMENTO DE ARROZ'`
    });

    return { code: 200, results: { tribNatureza, produto } }

};

const setaplanoconta = async function ({ }) {

    const nfeEntrada = await useDB({
        query: `select * from Cd_Plano_Conta where nome='NFE ENTRADA'`
    });

    const nfeSaida = await useDB({
        query: `select * from Cd_Plano_Conta where nome='NFE SAIDA'`
    });

    const nfeTransferencia = await useDB({
        query: `select * from Cd_Plano_Conta where nome='NFE TRANSFERENCIA'`
    });

    const nfeDevolucaoCliente = await useDB({
        query: `select * from Cd_Plano_Conta where nome='NFE DEVOLUCAO CLIENTE'`
    });

    const nfeDevolucaoFornecedor = await useDB({
        query: `select * from Cd_Plano_Conta where nome='NFE DEVOLUCAO FORNECEDOR'`
    });

    const nfeSimplesFatura = await useDB({
        query: `select * from Cd_Plano_Conta where nome='NFE SIMPLES FATURA'`
    });

    const nfePerecimento = await useDB({
        query: `select * from Cd_Plano_Conta where nome='NFE PERECIMENTO'`
    });

    const nfeAntecipacao = await useDB({
        query: `select * from Cd_Plano_Conta where nome='NFE ANTECIPACAO DO ICMS-ARROZ'`
    });

    return { code: 200, results: { nfeEntrada, nfeSaida, nfeTransferencia, nfeDevolucaoCliente, nfeDevolucaoFornecedor, nfeSimplesFatura, nfePerecimento, nfeAntecipacao } }

};

const setarModeloSerie = async function ({ tipoOperacao, idLoja }) {

    const tribNatureza = await useDB({
        query: `select * from Cd_Trib_Naturezaoper where tipooperacao='${tipoOperacao}' order by id asc`
    });

    const seqDoc = await useDB({
        query: `SELECT * FROM Nfe_Seqdoc WHERE loja_Fk=${idLoja} AND padrao=true AND modelo='55'`
    });

    const seqDoc2 = await useDB({
        query: `SELECT * FROM Nfe_Seqdoc WHERE loja_Fk=${idLoja} ORDER BY id DESC`
    });

    const produto = await useDB({
        query: `select * from Cd_Produto where descricao_Prod='ANTECIPACAO DO ICMS-AQUISICAO/RECEBIMENTO DE ARROZ'`
    });

    return { code: 200, results: { tribNatureza, seqDoc, seqDoc2, produto } }

};

const adicionarCupons = async function ({ idCupomCab }) {

    const cupomDetProd = await useDB({
        query: `SELECT * FROM Ecf_Cupomdet_Prod WHERE cupomcab_fk=${idCupomCab} and status_Cupitem='F' `
    });

    return { code: 200, results: { cupomDetProd } }

};

const verificaListaCupons = async function ({ dataHoraCupom, idCliente, idEmpresa }) {

    const cupomCab = await useDB({
        query: `SELECT * FROM Ecf_Cupomcab WHERE datahora_Cupom <= '${dataHoraCupom}' and coo_Cupom!=0 AND status_Cupom='C'`
    });

    const cupomCab2 = await useDB({
        query: `SELECT Ecf_Cupomcab.* FROM Ecf_Cupomcab, ecf_cupomcab_cliente WHERE datahora_Cupom <= '${dataHoraCupom}' AND ecf_cupomcab_cliente.cod_cliente=${idCliente} and coo_Cupom!=0 AND status_Cupom='C' AND ecf_cupomcab.id_cupomcab = ecf_cupomcab_cliente.cupomcab_fk`
    });

    const cupomCab3 = await useDB({
        query: `SELECT * FROM Ecf_Cupomcab, cd_cliente, ecf_cupomcab_cliente WHERE datahora_Cupom <= '${dataHoraCupom}' AND cd_cliente.empresa_Fk=${idEmpresa} and coo_Cupom!=0 AND status_Cupom='C' AND ecf_cupomcab.id_cupomcab = ecf_cupomcab_cliente.cupomcab_fk and ecf_cupomcab_cliente.cod_cliente = cd_cliente.id_cli`
    });

    return { code: 200, results: { cupomCab, cupomCab2, cupomCab3 } }

};

const setarProduto = async function ({ idProd, idLoja }) {

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND Loja_fk=${idLoja}`
    });

    return { code: 200, results: { estoqueGeral } }

};

const pesquisarPorColunaDescricao = async function ({ colunaBuscaproduto, textoBuscaproduto, numCodBar }) {

    const pesquisaProduto = await useDB({
        query: `SELECT * FROM Cd_Produto WHERE CAST(${colunaBuscaproduto} as text)  = '${textoBuscaproduto.toUpperCase()}' ORDER BY ${colunaBuscaproduto} ASC`
    });

    const pesquisaProduto2 = await useDB({
        query: `SELECT * FROM Cd_Produto WHERE CAST(${colunaBuscaproduto} as text)  like '%${textoBuscaproduto.toUpperCase()}%' ORDER BY ${colunaBuscaproduto} ASC`
    });

    const codigoBarras = await useDB({
        query: `SELECT * FROM Cd_Codigobarras WHERE numero_Codbar LIKE '%${numCodBar}%' AND ativo_Codbar='S'`
    });

    return { code: 200, results: { pesquisaProduto, pesquisaProduto2, codigoBarras } }

};

const pesquisarCodigoProduto = async function ({ idProd }) {

    const produto = await useDB({
        query: `SELECT * FROM Cd_Produto WHERE id_Prod = ${idProd}`
    });

    return { code: 200, results: { produto } }

};

const pesquisarCodigoServico = async function ({ idServico }) {

    const servico = await useDB({
        query: `SELECT * FROM Cd_Servico WHERE id = ${idServico}`
    });

    return { code: 200, results: { servico } }

};

const pegaibpt = async function ({ codigo }) {

    const ibpt = await useDB({
        query: `select * from Cd_Ibpt where codigo='${codigo}'`
    });

    return { code: 200, results: { ibpt } }

};

const pegarEstoque = async function ({ idProd, idLoja }) {

    const estoque = await useDB({
        query: `SELECT estoque FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { estoque } }

};

const pegarVenda = async function ({ idProd, idLoja }) {

    const pv = await useDB({
        query: `SELECT precovenda_Prod FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { pv } }

};

const pegarCusto = async function ({ idProd, idLoja }) {

    const pc = await useDB({
        query: `SELECT precocusto_Prod FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { pc } }

};

const onCellEdit = async function ({ idProd, idLoja }) {

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { estoqueGeral } }

};

const confirmarBusca = async function ({ idNfeCab, idLoja, numDocFiscal, descricao, idTipoComb, idBoleto }) {

    const nfeCab = await useDB({
        query: `select xml_retorno from nfe_cabecalho  where id_nfe_cabecalho=${idNfeCab} and loja_fk=${idLoja} `
    });

    const nfeCab2 = await useDB({
        query: `SELECT * FROM Nfe_Cabecalho WHERE numerodocfiscal_Nfecab ='${numDocFiscal}' and loja_fk= ${idLoja} and id_nfe_cabecalho=${idNfeCab} `
    });

    const seqDoc = await useDB({
        query: `SELECT * FROM Nfe_Seqdoc WHERE loja_Fk=${idLoja} AND padrao=true AND modelo='55'`
    });

    const nfeDet = await useDB({
        query: `SELECT * FROM Nfe_Detalhe WHERE nfecab_fk=${idNfeCab} and loja_fk= ${idLoja}  order by sequencia asc`
    });

    const nfeFatura = await useDB({
        query: `SELECT * FROM Nfe_Fatura WHERE tipo='tanque' and descricao='${descricao}' and nfecab_fk= ${idNfeCab} and loja_Fk = ${idLoja}`
    });

    const numTanque = await useDB({
        query: `select numero_tanque from cd_tanque where loja_fk=${idLoja}  and tipocombustivel_fk=${idTipoComb} order  by numero_tanque asc `
    });

    const nfeDest = await useDB({
        query: `SELECT * FROM Nfe_Destinatario WHERE nfecab_fk=${idNfeCab} and loja_fk=${idLoja}`
    });

    const nfeFatu = await useDB({
        query: `SELECT * FROM Nfe_Fatura WHERE tipo='fatura' and nfecab_fk= ${idNfeCab} and loja_Fk = ${idLoja}`
    });

    const nfeFatu2 = await useDB({
        query: `SELECT * FROM Nfe_Fatura WHERE tipo='duplicata' and nfecab_fk= ${idNfeCab} and loja_Fk = ${idLoja}`
    });

    const nfeFatu3 = await useDB({
        query: `SELECT * FROM Nfe_Fatura WHERE tipo='pagamento' and nfecab_fk= ${idNfeCab} and loja_Fk = ${idLoja}`
    });

    const nfeFatu4 = await useDB({
        query: `SELECT * FROM Nfe_Fatura WHERE tipo='boleto' and nfecab_fk= ${idNfeCab} and loja_Fk = ${idLoja}`
    });

    const nfeTransp = await useDB({
        query: `SELECT * FROM Nfe_Transporte WHERE nfecab_fk= ${idNfeCab} and loja_fk= ${idLoja}`
    });

    const medicamentoDet = await useDB({
        query: `SELECT * FROM  Nfe_Medicamentodet, nfe_detalhe WHERE nfe_Detalhe.nfecab_fk=${idNfeCab} and Nfe_Medicamentodet.loja_Fk = ${idLoja}`
    });

    const docReferenciado = await useDB({
        query: `SELECT fn_Compra_Cabecalho.modelo_Compracab,fn_Compra_Cabecalho.numerodocfiscal_Compracab,fn_Compra_Cabecalho.dataemissao_Compracab,fn_Compra_Cabecalho.serie_Compracab, cd_fornecedor.cpfcnpj_Forn, cd_fornecedor.uf_Forn, fn_Compra_Cabecalho.chaveacesso_Compracab,nfe_Docreferenciado.id FROM Nfe_Docreferenciado, cd_fornecedor, fn_compra_cabecalho WHERE nfe_docreferenciado.nfe_cabecalho_fk= ${idNfeCab} and nfe_docreferenciado.loja_fk= ${idLoja} and compracab_fk is not null and nfe_docreferenciado.compracab_fk = fn_compra_cabecalho.id_compracab and fn_compra_cabecalho.fornecedor_fk = cd_fornecedor.id_forn`
    });

    const docReferenciado2 = await useDB({
        query: `SELECT cod_modelo ,num_doc,dataemissao_doc,serie,numserie_ecf,subserie, cod_participante,id FROM nfe_docreferenciado WHERE loja_fk=${idLoja} AND nfe_cabecalho_fk=${idNfeCab} AND compracab_fk IS null  AND ecf_cupomcab_fk IS null   AND nfe_cabecalho_ref_fk IS null`
    });

    const docReferenciado3 = await useDB({
        query: `SELECT nfe_Cabecalho.modelo_Nfecab, nfe_Cabecalho.numerodocfiscal_Nfecab,nfe_Cabecalho.dataemissao_Nfecab,nfe_Cabecalho.serie_Nfecab, nfe_Cabecalho.chaveacesso_Nfecab FROM Nfe_Docreferenciado, nfe_cabecalho  WHERE nfe_cabecalho_fk= ${idNfeCab} and nfe_Cabecalho.loja_fk = ${idLoja} and nfe_cabecalho_fk is not null`
    });

    const docReferenciado4 = await useDB({
        query: `SELECT ecf_Cupomcab.coo_Cupom, ecf_Cupomcab.serieecf_Cupom, ecf_Cupomcab_fk FROM Nfe_Docreferenciado, ecf_cupomcab, nfe_cabecalho  WHERE nfe_cabecalho_fk= ${idNfeCab} and nfe_cabecalho.loja_fk=${idLoja} and ecf_cupomcab_fk is not null AND nfe_docreferenciado.ecf_cupomcab_fk = ecf_cupomcab.id_cupomcab`
    });

    const nfeLocalEntrega = await useDB({
        query: `SELECT * FROM Nfe_Localentrega WHERE nfecab_fk= ${idNfeCab} and loja_fk= ${idLoja}  `
    });

    const nfeLocalRetirada = await useDB({
        query: `SELECT * FROM Nfe_Localretirada WHERE nfecab_fk= ${idNfeCab} and loja_fk= ${idLoja}  `
    });

    const boletoWs = await useDB({
        query:`select * from Boleto_Ws where id=${idBoleto}  and loja=${idLoja}`
    });

    return { code: 200, results: { nfeCab, nfeCab2, seqDoc, nfeDet, nfeFatura, numTanque, nfeDest, nfeFatu, nfeFatu2, nfeFatu3, nfeFatu4,nfeTransp, medicamentoDet, docReferenciado, docReferenciado2, docReferenciado3, docReferenciado4, nfeLocalEntrega, nfeLocalRetirada,boletoWs } }

};

const codigoibgeuf = async function ({ sigla }) {

    const estado = await useDB({
        query: `select * from Cd_Estado where sigla='${sigla}'`
    });

    return { code: 200, results: { estado } }

};

const numeroserie = async function ({ serie, idLoja }) {

    const impressora = await useDB({
        query: `select * from Ecf_Impressora where numserie_Impr='${serie}' and loja_Fk=${idLoja} `
    });

    return { code: 200, results: { impressora } }

};

const processarFiltro = async function ({ valor, filtro }) {

    const comecandoCom = await useDB({
        query: `SELECT * FROM nfe_cabecalho WHERE ${filtro} like '${valor.toUpperCase()}%'`
    });

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM nfe_cabecalho WHERE ${filtro} LIKE '%${valor.toUpperCase()}%'`
    })

    /**
     * if (filtro.getComparacao().equals("Contendo")) {
            comparacaoLike = " LIKE '%" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    return { code: 200, results: { comecandoCom, contendo } }

    //  public void processarFiltro() {

    /**
     * //string da consulta
            StringBuilder sb = new StringBuilder("SELECT vo FROM VdAbastecimentos vo");
     */

};

const salvarTransportadora = async function ({ idLoja, insertNfeTransporteData }) {

    let statusInsert;

    const idNfeTransporte = await useDB({
        query: `SELECT max(id_nfetransporte)+1 as idc FROM public.nfe_transporte where loja_fk=${idLoja} `
    });

    const insertNfeTransporte = await useDB({
        query: `insert into nfe_transporte  (
            id_nfetransporte,
            loja_fk,
            nfecab_fk,
            transportadora_fk,
            usuarioaltera,
            dataaltera) values(
                ${idNfeTransporte[0].idc},
                ${insertNfeTransporteData.loja_fk},
                ${insertNfeTransporteData.nfecab_fk},
                ${insertNfeTransporteData.transportadora_fk},
                ${insertNfeTransporteData.usuarioaltera},
                '${insertNfeTransporteData.dataaltera}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idNfeTransporte, statusInsert } }

};


const salvarTransportadora2 = async function ({ idLoja, insertNfeTransporteData }) {

    let statusInsert;

    const idNfeTransporte = await useDB({
        query: `SELECT max(id_nfetransporte)+1 as idc FROM public.nfe_transporte where loja_fk=${idLoja} `
    });

    const insertNfeTransporte = await useDB({
        query: `insert into nfe_transporte  (
            id_nfetransporte,
            loja_fk,
            nfecab_fk,
            transportadora_fk,
            usuarioaltera,
            dataaltera) values(
                ${idNfeTransporte[0].idc},
                ${insertNfeTransporteData.loja_fk},
                ${insertNfeTransporteData.nfecab_fk},
                ${insertNfeTransporteData.transportadora_fk},
                ${insertNfeTransporteData.usuarioaltera},
                '${insertNfeTransporteData.dataaltera}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idNfeTransporte, statusInsert } }

};

const setarCombustivel = async function ({ idTipoComb, idLoja }) {

    const tipoCombPreco = await useDB({
        query: `select * from Cd_Tipocomb_Preco where tipocombustivel_Fk=${idTipoComb} and loja_Fk=${idLoja}`
    });

    const numTanque = await useDB({
        query: `select numero_tanque from cd_tanque where loja_fk=${idLoja}  and tipocombustivel_fk=${idTipoComb} order  by numero_tanque asc `
    });

    return { code: 200, results: { tipoCombPreco, numTanque } }

};

const inserir = async function ({ idLoja, serie, numeroDoc }) {

    const seqDoc = await useDB({
        query: `SELECT * FROM Nfe_Seqdoc WHERE loja_Fk=${idLoja} AND padrao=true AND modelo='55'`
    });

    const nfeCab = await useDB({
        query: `select * from Nfe_Cabecalho where loja_fk=${idLoja} and numerodocfiscal_Nfecab='${numeroDoc}' and serie_Nfecab='${serie}' and (statusnota_Nfecab='4' or statusnota_Nfecab='5' or statusnota_Nfecab='6'  or statusnota_Nfecab='7'  or statusnota_Nfecab='9' )`
    });

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    return { code: 200, results: { seqDoc, nfeCab, configNfe } }

};

const pesquisarPorColuna = async function ({ colunaBusca, textoBusca }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Nfe_Cabecalho WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase()}%' ORDER BY ${colunaBusca} ASC`
    });

    return { code: 200, results: { pesquisa } }

};

const consultarStatus = async function ({ idLoja }) {

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    return { code: 200, results: { configNfe } }

};

const validar = async function ({ idLoja }) {

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk=${idLoja}`
    });

    const configContbili = await useDB({
        query: ` SELECT cpf_cont from cf_config_contabilista  ORDER BY id_configcontabilista DESC`
    });

    return { code: 200, results: { configNfe, configContbili } }

};

const validarxml = async function ({ idNfeCab, idLoja }) {

    const xmlRetorno = await useDB({
        query: `select xml_retorno from nfe_cabecalho  where id_nfe_cabecalho=${idNfeCab} and loja_fk=${idLoja} `
    });

    return { code: 200, results: { xmlRetorno } }

};

const validar2 = async function ({ idLoja }) {

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk=${idLoja}`
    });

    const configContbili = await useDB({
        query: ` SELECT cpf_cont from cf_config_contabilista  ORDER BY id_configcontabilista DESC`
    });

    return { code: 200, results: { configNfe, configContbili } }


};

const cancelarNFe = async function ({ idLoja, insertNfeEventoData, idProd, chaveAcesso }) {

    let statusInsert;

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    const idNfeEvento = await useDB({
        query: `SELECT max(id)+1 as idc FROM public.nfe_evento where loja_fk=${idLoja} `
    });

    const insertNfeEvento = await useDB({
        query: `INSERT INTO public.nfe_evento(
            id, 
            loja_fk, 
            nfecab_fk, 
            protocolo, 
            motivo_evento, 
            motivo_retorno, 
            tipo, 
            usuarioaltera, 
            dataaltera) VALUES (
                ${idNfeEvento[0].idc},
                ${insertNfeEventoData.loja_fk}, 
                ${insertNfeEventoData.nfecab_fk}, 
                '${insertNfeEventoData.protocolo}', 
                '${insertNfeEventoData.motivo_evento}', 
                '${insertNfeEventoData.motivo_retorno}',
                '${insertNfeEventoData.tipo}', 
                ${insertNfeEventoData.usuarioaltera}, 
                '${insertNfeEventoData.dataaltera}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    const updateFatura = await useDB({
        query: `update fn_fatura set chavenfe=null where loja_fk=${idLoja}  and chavenfe='${chaveAcesso}' `
    });

    return { code: 200, results: { configNfe, idNfeEvento, statusInsert, estoqueGeral, updateFatura } }

};

const cancelarNFe3 = async function ({ idLoja, idProd, chaveAcesso }) {


    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    const updateFatura = await useDB({
        query: `update fn_fatura set chavenfe=null where loja_fk=${idLoja}  and chavenfe='${chaveAcesso}' `
    });

    return { code: 200, results: { estoqueGeral, updateFatura } }

};

const cancelarNFe2 = async function ({ idLoja, insertNfeEventoData }) {


    let statusInsert;

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    const idNfeEvento = await useDB({
        query: `SELECT max(id)+1 as idc FROM public.nfe_evento where loja_fk=${idLoja} `
    });

    const insertNfeEvento = await useDB({
        query: `INSERT INTO public.nfe_evento(
            id, 
            loja_fk, 
            nfecab_fk, 
            protocolo, 
            motivo_evento, 
            motivo_retorno, 
            tipo, 
            usuarioaltera, 
            dataaltera) VALUES (
                ${idNfeEvento[0].idc},
                ${insertNfeEventoData.loja_fk}, 
                ${insertNfeEventoData.nfecab_fk}, 
                '${insertNfeEventoData.protocolo}', 
                '${insertNfeEventoData.motivo_evento}', 
                '${insertNfeEventoData.motivo_retorno}',
                '${insertNfeEventoData.tipo}', 
                ${insertNfeEventoData.usuarioaltera}, 
                '${insertNfeEventoData.dataaltera}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });


    const updateFatura = await useDB({
        query: `update fn_fatura set chavenfe=null where loja_fk=${idLoja}  and chavenfe='${chaveAcesso}' `
    });

    return { code: 200, results: { configNfe, idNfeEvento, statusInsert, updateFatura } }

    return { code: 200, results: {} }

};

const cartaNFe = async function ({ idLoja, insertNfeEventoData }) {

    let statusInsert

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk=${idLoja}`
    });

    const idNfeEvento = await useDB({
        query: `SELECT max(id)+1 as idc FROM public.nfe_evento where loja_fk=${idLoja} `
    });

    const insertNfeEvento = await useDB({
        query: `INSERT INTO public.nfe_evento(
        id, 
        loja_fk, 
        nfecab_fk, 
        protocolo, 
        motivo_evento, 
        motivo_retorno, 
        tipo, 
        usuarioaltera, 
        dataaltera) VALUES (
            ${idNfeEvento[0].idc},
            ${insertNfeEventoData.loja_fk}, 
            ${insertNfeEventoData.nfecab_fk}, 
            '${insertNfeEventoData.protocolo}', 
            '${insertNfeEventoData.motivo_evento}', 
            '${insertNfeEventoData.motivo_retorno}',
            '${insertNfeEventoData.tipo}', 
            ${insertNfeEventoData.usuarioaltera}, 
            '${insertNfeEventoData.dataaltera}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });


    return { code: 200, results: { configNfe, idNfeEvento, statusInsert } }

};

const inutilizarNFe = async function ({ idLoja, insertNfeEventoData, serie }) {

    let statusInsert

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk=${idLoja}`
    });

    const idNfeEvento = await useDB({
        query: `SELECT max(id)+1 as idc FROM public.nfe_evento where loja_fk=${idLoja} `
    });

    const insertNfeEvento = await useDB({
        query: `INSERT INTO public.nfe_evento(
        id, 
        loja_fk, 
        nfecab_fk, 
        protocolo, 
        motivo_evento, 
        motivo_retorno, 
        tipo, 
        usuarioaltera, 
        dataaltera) VALUES (
            ${idNfeEvento[0].idc},
            ${insertNfeEventoData.loja_fk}, 
            ${insertNfeEventoData.nfecab_fk}, 
            '${insertNfeEventoData.protocolo}', 
            '${insertNfeEventoData.motivo_evento}', 
            '${insertNfeEventoData.motivo_retorno}',
            '${insertNfeEventoData.tipo}', 
            ${insertNfeEventoData.usuarioaltera}, 
            '${insertNfeEventoData.dataaltera}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const seqDoc = await useDB({
        query: `SELECT * FROM Nfe_Seqdoc WHERE loja_Fk=${idLoja} AND padrao=true AND modelo='55'and serie='${serie}' `
    });


    return { code: 200, results: { configNfe, idNfeEvento, statusInsert, seqDoc } }


};

const imprimirNFe = async function ({ idLoja }) {

    const configNFe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    return { code: 200, results: { configNFe } }

};

const imprimirNFe2 = async function ({ idNfeCab, idLoja, xmlRetorno }) {

    const xml = await useDB({
        query: `select xml_retorno from nfe_cabecalho  where id_nfe_cabecalho=${idNfeCab} and loja_fk=${idLoja} `
    });

    const updateXmlRetorno = await useDB({
        query: `update nfe_cabecalho set xml_retorno='${xmlRetorno}' where id_nfe_cabecalho=${idNfeCab} and loja_fk=${idLoja}`
    });

    const cpfCont = await useDB({
        query: ` SELECT cpf_cont from cf_config_contabilista  ORDER BY id_configcontabilista DESC`
    });

    return { code: 200, results: { xml, updateXmlRetorno, cpfCont } }

};

const xmlpdf = async function ({ idNfeCab, idLoja }) {

    const xmlRetorno = await useDB({
        query: `select xml_retorno from nfe_cabecalho  where id_nfe_cabecalho=${idNfeCab} and loja_fk=${idLoja} `
    });

    const logo = await useDB({
        query: `select logo_loja from cf_loja where id_loja=${idLoja} `
    });

    return { code: 200, results: { xmlRetorno, logo } }

};

const xmlpdfprevia = async function ({ idLoja }) {


    const logo = await useDB({
        query: `select logo_loja from cf_loja where id_loja=${idLoja} `
    });

    return { code: 200, results: { logo } }

};

const enviarNFE = async function ({ idLoja, insertNfeTranspData, xmlRetorno, idNfeCab, idProd, idLote, idTipoComb, numTanque }) {

    let statusInsert;

    const idNfeTransporte = await useDB({
        query: `SELECT max(id_nfetransporte)+1 as idc FROM public.nfe_transporte where loja_fk=${idLoja} `
    });

    const insertNfeTransp = await useDB({
        query: `insert into nfe_transporte  (
            id_nfetransporte,
            loja_fk,
            nfecab_fk,
            transportadora_fk,
            usuarioaltera,
            dataaltera) values(
                ${idNfeTransporte[0].idc},
                ${insertNfeTranspData.loja_fk},
                ${insertNfeTranspData.nfecab_fk},
                ${insertNfeTranspData.transportadora_fk},
                ${insertNfeTranspData.usuarioaltera},
                '${insertNfeTranspData.dataaltera}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk=${idLoja}`
    });

    const cpfCont = await useDB({
        query: ` SELECT cpf_cont from cf_config_contabilista  ORDER BY id_configcontabilista DESC`
    });

    const updateXmlRetorno = await useDB({
        query: `update nfe_cabecalho set xml_retorno='${xmlRetorno}' where id_nfe_cabecalho=${idNfeCab} and loja_fk=${idLoja}`
    });

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    const lote = await useDB({
        query: `select * from Cd_Lote where id_Lote=${idLote} and loja_Fk=${idLoja}`
    });

    const tanque = await useDB({
        query: `select * from Cd_Tanque where loja_Fk=${idLoja}  and numero_Tanque=${numTanque} and tipocombustivel_Fk=${idTipoComb} `
    });

    return { code: 200, results: { idNfeTransporte, statusInsert, configNfe, cpfCont, updateXmlRetorno, estoqueGeral, lote, tanque } }

};

const enviarNFE2 = async function ({ idLoja, xmlRetorno, idNfeCab, numTanque, idTipoComb, idProd, idLote }) {

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk=${idLoja}`
    });

    const updateXmlRetorno = await useDB({
        query: `update nfe_cabecalho set xml_retorno='${xmlRetorno}' where id_nfe_cabecalho=${idNfeCab} and loja_fk=${idLoja}`
    });

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    const lote = await useDB({
        query: `select * from Cd_Lote where id_Lote=${idLote} and loja_Fk=${idLoja}`
    });

    const tanque = await useDB({
        query: `select * from Cd_Tanque where loja_Fk=${idLoja}  and numero_Tanque=${numTanque} and tipocombustivel_Fk=${idTipoComb} `
    });

    const tanque2 = await useDB({
        query: `select * from Cd_Tanque where loja_Fk=${idLoja} and tipocombustivel_Fk=${idTipoComb} `
    });

    return { code: 200, results: { configNfe, updateXmlRetorno, estoqueGeral, tanque, lote, tanque2 } }

};

const histpv = async function ({ idLoja, insertDataAlthistTanque }) {

    let statusInsert;

    const idAlthisTanque = await useDB({
        query: `select max(id)+1 as idc  from es_althist_tanque  where loja_fk=${idLoja} `
    });

    const insertAlthistTanque = await useDB({
        query: `INSERT INTO public.es_althist_tanque(
            id, 
            loja_fk, 
            tanque_fk, 
            combustivel_fk, 
            estoqueantes, 
            estoquedepois,  
            usuarioaltera, 
            origem, 
            dataaltera)VALUES (
                ${idAlthisTanque[0].idc}, 
                ${insertDataAlthistTanque.loja_fk},  
                ${insertDataAlthistTanque.tanque_fk}, 
                ${insertDataAlthistTanque.combustivel_fk},
                ${insertDataAlthistTanque.estoqueantes}, 
                ${insertDataAlthistTanque.estoquedepois},  
                ${insertDataAlthistTanque.usuarioaltera}, 
                'nfe', 
                '${insertDataAlthistTanque.dataaltera}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idAlthisTanque, statusInsert } }

};

const atualizaconvenio = async function ({ idNfeCab, idLoja, idCupomCab, serie, cooCupom, idCliente }) {

    const docReferenciado = await useDB({
        query: `SELECT * FROM Nfe_Docreferenciado WHERE nfe_cabecalho_fk=${idNfeCab} and loja_fk=${idLoja} and ecf_Cupomcab_fk is not null`
    });

    const valorPago = await useDB({
        query: `SELECT sum(valorpago_contasreceber) AS pp  FROM public.fn_contasreceber  where loja_fk=${idLoja} and cupomcab_fk=${idCupomCab}  and statusreceb_contasreceber IN ('P','Q')`
    });

    const contasReceber = await useDB({
        query: `select Fn_Contasreceber.* from Fn_Contasreceber, ecf_cupomcab where Fn_Contasreceber.loja_fk=${idLoja} and Fn_Contasreceber.cliente_Fk=${idCliente} and ecf_Cupomcab.serieecf_Cupom='${serie}' and ecf_Cupomcab.coo_Cupom=${cooCupom}  and Fn_Contasreceber.cupomcab_fk is not null and  statusreceb_Contasreceber  in ('P') and Fn_Contasreceber.cupomcab_fk = ecf_cupomcab.id_cupomcab`
    });

    const idContasReceber = await useDB({
        query: `SELECT max(id_contasreceber)+1 as idc FROM public.fn_contasreceber where loja_fk=${idLoja} `
    });

    const updateCliente = await useDB({
        query: `UPDATE public.cd_cliente as c  SET  saldodev_cli=(SELECT SUM(valorrestante_contasreceber)  FROM public.fn_contasreceber  where cliente_fk=${idCliente}  and statusreceb_contasreceber in ('P','F'))where (SELECT SUM(valorrestante_contasreceber)  FROM public.fn_contasreceber  where cliente_fk=${idCliente} and statusreceb_contasreceber in ('P','F')) is not null`
    });

    const updateCliente2 = await useDB({
        query: `UPDATE public.cd_cliente as c set diasatraso_cli=(SELECT DATE_PART('day', now() - min(datavenc_contasreceber))  FROM public.fn_contasreceber where cliente_fk=${idCliente}  and statusreceb_contasreceber in ('P','F')) where (SELECT DATE_PART('day', now() - min(datavenc_contasreceber))  FROM public.fn_contasreceber where cliente_fk=${idCliente}  and statusreceb_contasreceber in ('P','F'))>0`
    });

    return { code: 200, results: { docReferenciado, valorPago, contasReceber, idContasReceber, updateCliente, updateCliente2 } }

};

const pegarDadosnfe = async function ({ idLoja }) {

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    return { code: 200, results: { configNfe } }

};

const consultar = async function ({ idLoja, dataInicio, dataFim, tipoOperacao, idNfeCab }) {

    const nfeCab = await useDB({
        query: `select numerodocfiscal_Nfecab, modelo_Nfecab, valortotal_Nfecab, serie_Nfecab, tipooperacao_Nfecab, dataemissao_Nfecab, statusnota_Nfecab, id_Nfe_Cabecalho  from Nfe_Cabecalho where (cast(dataentradasaida_Nfecab as date)  between '${dataInicio}'  and '${dataFim}')  and loja_fk=${idLoja}   and tipooperacao_Nfecab='${tipoOperacao}' and statusnota_Nfecab in ('4','5','6','7','9')  order by numerodocfiscal_Nfecab asc`
    });

    const razaoSocial = await useDB({
        query: `SELECT razaosocial_nfedest  FROM public.nfe_destinatario where loja_fk=${idLoja} and nfecab_fk=${idNfeCab} `
    });

    return { code: 200, results: { nfeCab, razaoSocial } }

};

const verificardesttr = async function ({ idLoja }) {

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    return { code: 200, results: { configNfe } }

};

const verificardestte = async function ({ idLoja }) {

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    return { code: 200, results: { configNfe } }

};

const verificardestt = async function ({ idLoja }) {

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    return { code: 200, results: { configNfe } }

};

const verificardest = async function ({ idLoja }) {

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    return { code: 200, results: { configNfe } }

};

const mailnfe = async function ({ idNfeCab, idLoja, insertEmailData }) {

    let statusInsert;

    const xmlRetorno = await useDB({
        query: `select xml_retorno from nfe_cabecalho  where id_nfe_cabecalho=${idNfeCab} and loja_fk=${idLoja} limit 1 `
    });

    const logo = await useDB({
        query: `select logo_loja from cf_loja where id_loja=${idLoja} `
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
            situacao)   VALUES (
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

    return { code: 200, results: { xmlRetorno, logo, statusInsert } }
}

const LerNoProtv = async function ({ chave }) {

    const nfeCab = await useDB({
        query: `SELECT * FROM Nfe_Cabecalho WHERE chaveacesso_Nfecab='NFe${chave}' and statusnota_nfecab in ('5','6','7','9') `
    });

    return { code: 200, results: { nfeCab } }

};

const LerNoProt = async function ({ chave }) {

    const nfeCab = await useDB({
        query: `SELECT * FROM Nfe_Cabecalho WHERE chaveacesso_Nfecab='NFe${chave}' and statusnota_nfecab in ('5','6','7','9') `
    });

    return { code: 200, results: { nfeCab } }

};

const LerNonfe = async function ({ idLoja, chave }) {

    const cupomCab = await useDB({
        query: `select * from Ecf_Cupomcab where loja_fk=${idLoja} and chave='NFe${chave}' or chave='CFe${chave}' `
    });

    return { code: 200, results: { cupomCab } }

};

const LerNoecf = async function ({ numeroImpr, idLoja, cooCupom, serie }) {

    const impressora = await useDB({
        query: `select * from Ecf_Impressora where numero_Ecf_Impr=${numeroImpr} and  loja_Fk=${idLoja} `
    });

    const cupomCab = await useDB({
        query: `select * from Ecf_Cupomcab where loja_fk=${idLoja} and coo_Cupom=${cooCupom} and serieecf_Cupom='${serie}'  `
    });

    return { code: 200, results: { impressora, cupomCab } }

};

const LerNodet = async function ({ numeroBic, idLoja, idTipoComb, idProd, numCodBar, descricaoProd, descTipoComb }) {

    const bico = await useDB({
        query: ` select cd_tanque.tipocombustivel_Fk from Cd_Bico, cd_tanque  where numero_Bic =${numeroBic} and cd_bico.loja_Fk=${idLoja} and cd_bico.tanque_fk = cd_tanque.id_tanque`
    });

    const tipoCombustivel = await useDB({
        query: `select * from Cd_Tipocombustivel where id_Tipocombustivel=${idTipoComb} `
    });

    const produto = await useDB({
        query: `select * from Cd_Produto where id_Prod=${idProd} `
    });

    const codigoBarra = await useDB({
        query: `select produto_Fk from Cd_Codigobarras where numero_Codbar='${numCodBar}' `
    });

    const prod = await useDB({
        query: `select id_Prod from Cd_Produto where descricao_Prod like '%${descricaoProd}%' `
    });

    const tipoComb = await useDB({
        query: ` select id_Tipocombustivel from Cd_Tipocombustivel where descricao_Tipcomb like '%${descTipoComb}%' `
    });

    return { code: 200, results: { bico, tipoCombustivel, produto, codigoBarra, prod, tipoComb } }

};

const pxmlv = async function ({ xmlRetorno, idNfeCab, idLoja }) {

    const updateXmlRetorno = await useDB({
        query: `update nfe_cabecalho set xml_retorno='${xmlRetorno}' where id_nfe_cabecalho=${idNfeCab} and loja_fk=${idLoja}`
    });

    return { code: 200, results: { updateXmlRetorno } }

};

const pxmlinut = async function ({ idLoja, serie, numeroDoc, xmlRetorno, idNfeCab }) {

    const NfeCab = await useDB({
        query: `select id_nfe_cabecalho from nfe_cabecalho  where loja_fk=${idLoja} and statusnota_nfecab='7'  and serie_nfecab='${serie}'  and numerodocfiscal_nfecab='${numeroDoc}'`
    });

    const updateXmlRetorno = await useDB({
        query: `update nfe_cabecalho set xml_retorno='${xmlRetorno}' where id_nfe_cabecalho=${idNfeCab} and loja_fk=${idLoja}`
    });


    return { code: 200, results: { NfeCab, updateXmlRetorno } }

};

const pxml = async function ({ cpfCnpjCliente, cpfCnpjForn, idLoja, xmlRetorno, idNfeCab }) {


    const cliente = await useDB({
        query: `select * from Cd_Cliente where cpfcnpj_Cli='${cpfCnpjCliente}'`
    });

    const forn = await useDB({
        query: `select * from Cd_Fornecedor where cpfcnpj_Forn='${cpfCnpjForn}'`
    });

    const updateXmlRetorno = await useDB({
        query: `update nfe_cabecalho set xml_retorno='${xmlRetorno}' where id_nfe_cabecalho=${idNfeCab} and loja_fk=${idLoja}`
    });

    return { code: 200, results: { cliente, forn, updateXmlRetorno } }

};

const preencherLista1 = async function ({ idLoja }) {

    const lista = await useDB({
        query: `SELECT distinct(infcomplementares_nfecab) FROM public.nfe_cabecalho where infcomplementares_nfecab is not null and infcomplementares_nfecab!='' and loja_fk =${idLoja} limit 50`
    });

    return { code: 200, results: { lista } }

};

const carregarcsts = async function ({ }) {

    const cstMenor90 = await useDB({
        query: `SELECT distinct(cod_cst) FROM public.cd_cst where  cod_cst <=90  order by cod_cst`
    });

    const cstMaior100 = await useDB({
        query: `SELECT distinct(cod_cst)  FROM public.cd_cst  where   cod_cst >=100   order by cod_cst`
    });

    /* String h = " cod_cst <=90 ";
    if (lojaLogada.getTipocrtLoja().equals("0")) {
        h = " cod_cst >=100 ";
    }
    List<Object> p = new CargoRN().listarobj("SELECT distinct(cod_cst)\n"
            + "  FROM public.cd_cst\n"
            + "  where  " + h + " \n"
            + "  order by cod_cst"); */


    const codCfop = await useDB({
        query: `SELECT  distinct(codigo_cfop) FROM public.cd_cfop where cast(codigo_cfop as text) like '5%'  or  cast(codigo_cfop as text) like '6%'  or  cast(codigo_cfop as text) like '7%'  order by codigo_cfop asc`
    });

    const codCfop2 = await useDB({
        query: `SELECT  distinct(codigo_cfop)  FROM public.cd_cfop  where cast(codigo_cfop as text) like '1%'  or  cast(codigo_cfop as text) like '2%'  or  cast(codigo_cfop as text) like '3%'  order by codigo_cfop asc`
    });

    const codCstpsicofinsMaior49 = await useDB({
        query: `SELECT distinct(cod_cstpiscofins) FROM public.cd_cstpiscofins where cod_cstpiscofins>49 and cod_cstpiscofins!=99  order by cod_cstpiscofins asc`
    });

    const codCstpsicofinsMenor49 = await useDB({
        query: `SELECT distinct(cod_cstpiscofins) FROM public.cd_cstpiscofins where cod_cstpiscofins<=49 and cod_cstpiscofins!=99  order by cod_cstpiscofins asc`
    });


    /*  String h2 = " cod_cstpiscofins>49 ";
     if (nfeCabecalho.getTipooperacaoNfecab().equals("2")
             || nfeCabecalho.getTipooperacaoNfecab().equals("3")
             || nfeCabecalho.getTipooperacaoNfecab().equals("7")
             || nfeCabecalho.getTipooperacaoNfecab().equals("8")
             || nfeCabecalho.getTipooperacaoNfecab().equals("5")) {
         h2 = " cod_cstpiscofins<=49 "; */


    return { code: 200, results: { cstMenor90, cstMaior100, codCfop, codCfop2, codCstpsicofinsMaior49, codCstpsicofinsMenor49 } }

};

const confirmanfe = async function ({ idLoja, chaveAcesso, insertDocReferenciadoData, insertDocReferenciadoData2 }) {

    let statusInsert, statusInsert2;

    const compraCab = await useDB({
        query: `select * from Fn_Compra_Cabecalho where loja_fk=${idLoja} and chaveacesso_Compracab='${chaveAcesso}'`
    });

    const idDocReferenciado = await useDB({
        query: `SELECT max(id)+1 as idc FROM public.nfe_docreferenciado where loja_fk=${idLoja} `
    });

    const insertDocReferenciado = await useDB({
        query: `insert into nfe_docreferenciado (
            id,
            loja_fk,
            nfe_cabecalho_fk,
            cod_modelo,
            num_doc,
            usuarioaltera,
            dataaltera,
            dataemissao_doc)values(
                ${idDocReferenciado[0].idc},
                ${insertDocReferenciadoData.loja_fk},
                ${insertDocReferenciadoData.nfe_cabecalho_fk},
                '${insertDocReferenciadoData.cod_modelo}',
                ${insertDocReferenciadoData.num_doc},
                ${insertDocReferenciadoData.usuarioaltera},
                '${insertDocReferenciadoData.dataaltera}',
                '${insertDocReferenciadoData.dataemissao_doc}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const insertDocReferenciado2 = await useDB({
        query: `insert into nfe_docreferenciado (
            id,
            loja_fk,
            nfe_cabecalho_fk,
            cod_modelo,
            num_doc,
            usuarioaltera,
            dataaltera,
            dataemissao_doc,
            compracab_fk)values(
                ${idDocReferenciado[0].idc},
                ${insertDocReferenciadoData2.loja_fk},
                ${insertDocReferenciadoData2.nfe_cabecalho_fk},
                '${insertDocReferenciadoData2.cod_modelo}',
                ${insertDocReferenciadoData2.num_doc},
                ${insertDocReferenciadoData2.usuarioaltera},
                '${insertDocReferenciadoData2.dataaltera}',
                '${insertDocReferenciadoData2.dataemissao_doc}',
                ${insertDocReferenciadoData2.compracab_fk})`
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });


    return { code: 200, results: { compraCab, idDocReferenciado, statusInsert, statusInsert2 } }

};

const excluirnfe = async function ({ idLoja, idDocRef }) {

    const deleteDocReferenciado = await useDB({
        query: `DELETE FROM public.nfe_docreferenciado WHERE loja_fk=${idLoja}  and id=${idDocRef} `
    });


    return { code: 200, results: { deleteDocReferenciado } }

};

const consultarf = async function ({ dataInicio, dataFim, idLoja }) {

    const nfeCab = await useDB({
        query: `select * from Nfe_Cabecalho where (cast(dataentradasaida_Nfecab as date)  between '${dataInicio}'  and '${dataFim}')  and loja_fk=${idLoja}  and statusnota_Nfecab in ('5')  order by numerodocfiscal_Nfecab asc`
    });

    return { code: 200, results: { nfeCab } }

};

const gerarf = async function ({ idNfeCab, idLoja }) {

    const nfeCab = await useDB({
        query: `select * from Nfe_Cabecalho where id_Nfe_Cabecalho=${idNfeCab} and loja_Fk=${idLoja} order by numerodocfiscal_Nfecab asc `
    });

    const xmlRetorno = await useDB({
        query:`select xml_retorno from nfe_cabecalho  where id_nfe_cabecalho=${idNfeCab} and loja_fk=${idLoja} `
    });

    return { code: 200, results: { nfeCab, xmlRetorno } }

};

const gerarzip = async function({ idNfeCab, idLoja, dataFim, dataInicio }){ 

    const nfeCab = await useDB({
        query: `select * from Nfe_Cabecalho where (cast(dataentradasaida_Nfecab as date)  between '${dataInicio}'  and '${dataFim}')  and loja_fk=${idLoja}  and statusnota_Nfecab in ('5')  order by numerodocfiscal_Nfecab asc`
    });

    const xmlRetorno = await useDB({
        query:`select xml_retorno from nfe_cabecalho  where id_nfe_cabecalho=${idNfeCab} and loja_fk=${idLoja} `
    });

    return { code: 200, results: { nfeCab, xmlRetorno } }

    
};

const preencherListaBuscaDestinatario = async function({ idLoja }){ 

    const destinatario = await useDB({ 
    query: `select *  from Nfe_Destinatario  where loja_fk =${idLoja}`
 }); 

 return { code: 200, results: { destinatario }}  
    
};

const pesquisarPordestd = async function({ idLoja, colunaBusca, textoBusca }){ 

    const destinatario = await useDB({ 
    query: `select distinct *  from Nfe_Destinatario where loja_fk=${idLoja} and (upper(${colunaBusca}) like '%${textoBusca.toUpperCase()}%') `
 }); 

 return { code: 200, results: { destinatario }}  
    
};



module.exports = {
    ex,
    listareventos,
    listarnotasmanifestadas,
    salvarNota2,
    salvarNota,
    salvarEntrega,
    salvarDestinatario,
    salvarfaturapagamento,
    salvarcabnfe,
    salvarloteitemnfe,
    salvaritemnfe,
    salvarnaturezaeinfo,
    salvaritemnfe2,
    salvarnfecab2,
    salvarlotesitemnfe3,
    salvaritensnfe3,
    salvarnfecab3,
    salvarcuponsnfe4,
    salvaritensnfe4,
    salvarnotasnfe5a,
    salvarnotasnfe5,
    salvarnotasnfe4s,
    salvarcuponsnfe7,
    salvaritensnfe7,
    atualizaSequenciador,
    salvarEmitente,
    salvarRetirada,
    preencherListaBuscaNormal,
    preencherListaBusca,
    pegardestinatario,
    pesquisarNotasNormais2,
    consultaLotesNota,
    consultarLotesNotaTransferencia,
    consultarNotas,
    consultarNotass2,
    consultarNotass,
    consultarDetalhes,
    consultarDetalhess,
    selecionaNatureza,
    listaOperacao,
    listaOperacao2,
    pegarCodigoDeBarras,
    adicionarProduto3,
    adicionarProduto3s,
    verificaritens2,
    inseriritenscupons2,
    listaCupom,
    listaCupom22,
    pegaritensusandocupom,
    pesquisarCuponsAvista,
    pesquisarCuponsAvista2,
    verificadocref,
    verificadocref2,
    verificadocref3,
    jaReferenciado,
    jaReferenciado2,
    setarModeloSeriexml,
    setaplanoconta,
    setarModeloSerie,
    adicionarCupons,
    verificaListaCupons,
    setarProduto,
    pesquisarPorColunaDescricao,
    pesquisarCodigoProduto,
    pesquisarCodigoServico,
    pegaibpt,
    pegarEstoque,
    pegarVenda,
    pegarCusto,
    onCellEdit,
    confirmarBusca,
    codigoibgeuf,
    numeroserie,
    processarFiltro,
    salvarTransportadora,
    salvarTransportadora2,
    setarCombustivel,
    inserir,
    pesquisarPorColuna,
    consultarStatus,
    validar,
    validarxml,
    validar2,
    cancelarNFe,
    cancelarNFe3,
    cartaNFe,
    inutilizarNFe,
    imprimirNFe,
    imprimirNFe2,
    xmlpdf,
    xmlpdfprevia,
    enviarNFE,
    enviarNFE2,
    histpv,
    atualizaconvenio,
    pegarDadosnfe,
    consultar,
    verificardesttr,
    verificardestte,
    verificardestt,
    verificardest,
    mailnfe,
    LerNoProtv,
    LerNoProt,
    LerNonfe,
    LerNoecf,
    LerNodet,
    pxmlv,
    pxmlinut,
    pxml,
    preencherLista1,
    carregarcsts,
    confirmanfe,
    excluirnfe,
    consultarf,
    gerarf,
    gerarzip,
    preencherListaBuscaDestinatario,
    pesquisarPordestd
}