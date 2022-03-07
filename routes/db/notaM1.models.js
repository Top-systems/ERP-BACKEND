const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const consultaLotesNota = async function ({ idLoja, idProd, idCompraCab }) {

    const compraMedicamento = await useDB({
        query: `select Fn_Compra_Medicamentodet.* from Fn_Compra_Medicamentodet, cd_lote, fn_Compra_detalhe where Fn_Compra_Medicamentodet.loja_Fk=${idLoja} and cd_Lote.produto_Fk=${idProd} and fn_Compra_detalhe.compracab_fk=${idCompraCab} and fn_compra_medicamentodet.lote_fk = cd_lote.id_lote and fn_compra_medicamentodet.compradet_fk = fn_compra_detalhe.id_compradet`
    });

    const lote = await useDB({
        query: `select * from Cd_Lote where produto_Fk=${idProd} and qtde_Lote > 0`
    });

    return { code: 200, results: { compraMedicamento, lote } }

};

const salvarNotaCancelada = async function ({ idLote, idLoja, idProd }) {

    const lote = await useDB({
        query: `select * from Cd_Lote where id_Lote=${idLote} and loja_Fk=${idLoja}`
    });

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { lote, estoqueGeral } }

};

const selecionaNatureza = async function ({ idTribNatureza }) {

    const tribNatureza = await useDB({
        query: `select * from Cd_Trib_Naturezaoper where id=${idTribNatureza}`
    });

    return { code: 200, results: { tribNatureza } }

};

const jaReferenciado = async function ({ idCompraCab, idLoja }) {

    const M1Docreferenciado = await useDB({
        query: `select fn_Compra_Cabecalho.numerodocfiscal_Compracab from Vd_M1_Docreferenciado, fn_compra_cabecalho, vd_m1 where compracab_fk=${idCompraCab} and vd_m1_docreferenciado.loja_Fk=${idLoja} and compracab_fk is not null and vd_M1.situacao!=2`
    });

    const DocReferenciado = await useDB({
        query: `select fn_Compra_Cabecalho.numerodocfiscal_Compracab from Nfe_Docreferenciado, fn_compra_cabecalho, nfe_cabecalho  where compracab_fk=${idCompraCab} and nfe_docreferenciado.loja_Fk=${idLoja} and compracab_fk is not null and nfe_Cabecalho.statusnota_Nfecab!='6' AND nfe_docreferenciado.compracab_fk = fn_compra_cabecalho.id_compracab and nfe_docreferenciado.nfe_cabecalho_fk = nfe_cabecalho.id_nfe_cabecalho`
    });

    return { code: 200, results: { M1Docreferenciado, DocReferenciado } }

};

const jaReferenciado2 = async function ({ idCupomCab, idLoja }) {

    const M1Docreferenciado = await useDB({
        query: `select ecf_Cupomcab.coo_Cupom from Vd_M1_Docreferenciado, ecf_cupomcab, vd_m1 where ecf_cupomcab_fk=${idCupomCab} and vd_m1_docreferenciado.loja_Fk=${idLoja} and ecf_Cupomcab_fk is not null and vd_M1.situacao!=2`
    });

    const docReferenciado = await useDB({
        query: `select ecf_Cupomcab.coo_Cupom from nfe_Docreferenciado, ecf_cupomcab, nfe_cabecalho where ecf_cupomcab_fk=${idCupomCab} and nfe_docreferenciado.loja_Fk=${idLoja} and ecf_Cupomcab_fk is not null and nfe_Cabecalho.statusnota_Nfecab!='6' AND nfe_docreferenciado.compracab_fk = ecf_cupomcab.id_cupomcab and nfe_docreferenciado.nfe_cabecalho_fk = nfe_cabecalho.id_nfe_cabecalho`
    });

    return { code: 200, results: { M1Docreferenciado, docReferenciado } }

};

const excluirdetalhe = async function ({ idLoja, idLote, idProd }) {

    const lote = await useDB({
        query: `select * from Cd_Lote where id_Lote=${idLote} and loja_Fk=${idLoja}`
    });

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { lote, estoqueGeral } }

};

const consultarDetalhes = async function ({ idCompraCab, idLoja }) {


    const M1Docreferenciado = await useDB({
        query: `select fn_Compra_Cabecalho.numerodocfiscal_Compracab from Vd_M1_Docreferenciado, fn_compra_cabecalho, vd_m1 where compracab_fk=${idCompraCab} and vd_m1_docreferenciado.loja_Fk=${idLoja} and compracab_fk is not null and vd_M1.situacao!=2`
    });

    const DocReferenciado = await useDB({
        query: `select fn_Compra_Cabecalho.numerodocfiscal_Compracab from Nfe_Docreferenciado, fn_compra_cabecalho, nfe_cabecalho  where compracab_fk=${idCompraCab} and nfe_docreferenciado.loja_Fk=${idLoja} and compracab_fk is not null and nfe_Cabecalho.statusnota_Nfecab!='5' AND nfe_docreferenciado.compracab_fk = fn_compra_cabecalho.id_compracab and nfe_docreferenciado.nfe_cabecalho_fk = nfe_cabecalho.id_nfe_cabecalho`
    });

    const compraDet = await useDB({
        query: `select * from Fn_Compra_Detalhe where compracab_fk=${idCompraCab} and loja_Fk=${idLoja} and produto_Fk is not null`
    });

    return { code: 200, results: { M1Docreferenciado, DocReferenciado, compraDet } }

};

const consultarNotas = async function ({ idFornecedor, idLoja, numeroDoc, dataInicioNota, dataFimNota }) {

    const numDoc = await useDB({
        query: `select * from Fn_Compra_Cabecalho where fornecedor_Fk=${idFornecedor} and loja_fk=${idLoja} and cast(numerodocfiscal_Compracab as text) like '%${numeroDoc}%' order by numerodocfiscal_Compracab desc`
    });

    const dataEmissao = await useDB({
        query: `select * from Fn_Compra_Cabecalho where fornecedor_Fk=${idFornecedor} and loja_fk=${idLoja} and dataemissao_Compracab between '${dataInicioNota}' and '${dataFimNota}' order by dataemissao_Compracab desc`
    });

    return { code: 200, results: { numDoc, dataEmissao } }

};

const listarreferenciados = async function ({ idLoja }) {

    const docReferenciado = await useDB({
        query: `select * from Vd_M1_Docreferenciado where loja_Fk=${idLoja} `
    });

    return { code: 200, results: { docReferenciado } }

};

const onCellEdit = async function ({ idProd, idLoja }) {

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { estoqueGeral } }

};

const salvarNota = async function ({ numDoc, idLoja }) {

    const m1 = await useDB({
        query: `select * from Vd_M1 where numdoc=${numDoc} and loja_fk=${idLoja}`
    });

    return { code: 200, results: { m1 } }

};

const salvar1 = async function ({ idLoja, insertM1DetData, insertm1MedicamentoDetData, idLote, idProd }) {

    let statusInsert, statusInsert2;

    const m1 = await useDB({
        query: `select * from Vd_M1 where loja_fk=${idLoja} order by id_m1 desc`
    });

    const m1Det = await useDB({
        query: `select * from Vd_M1_Detalhe where loja_fk=${idLoja} order by id_M1_Detalhe desc `
    });

    const insertM1Det = await useDB({
        query: `insert into vd_m1_detalhe  (
            cfop_m1,
            csticms_m1,
            unidade_m1,
            valoricms,
            cstpis,
            cstcofins,
            usuarioaltera,
            dataaltera,
            id_m1_detalhe,
            loja_fk,
            m1_fk) values(
                '${insertM1DetData.cfop_m1}',
                '${insertM1DetData.csticms_m1}',
                '${insertM1DetData.unidade_m1}',
                '${insertM1DetData.valoricms}',
                '${insertM1DetData.cstpis}',
                '${insertM1DetData.cstcofins}',
                ${insertM1DetData.usuarioaltera},
                '${insertM1DetData.dataaltera}',
                ${insertM1DetData.id_m1_detalhe},
                ${insertM1DetData.loja_fk},
                ${insertM1DetData.m1_fk})`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const insertm1MedicamentoDet = await useDB({
        query: `insert into vd_m1_medicamentodet  (
            id_m1_medicamentodet,
            loja_fk,
            lote_fk,
            m1det_fk,
            qtdelote,
            datafabricacao,
            datavalidade,
            usuarioaltera,
            dataaltera) values(
                ${insertm1MedicamentoDetData.id_m1_medicamentodet},
                ${insertm1MedicamentoDetData.loja_fk},
                ${insertm1MedicamentoDetData.lote_fk},
                ${insertm1MedicamentoDetData.m1det_fk},
                ${insertm1MedicamentoDetData.qtdelote},
                '${insertm1MedicamentoDetData.datafabricacao}',
                '${insertm1MedicamentoDetData.datavalidade}',
                ${insertm1MedicamentoDetData.usuarioaltera},
                '${insertm1MedicamentoDetData.dataaltera}')`
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });

    const m1MedicamentoDet = await useDB({
        query: `select * from Vd_M1_Medicamentodet where loja_Fk=${idLoja} order by id_M1_Medicamentodet desc `
    });

    const lote = await useDB({
        query: `select * from Cd_Lote where id_Lote=${idLote} and loja_Fk=${idLoja}`
    });

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    const nfeSeqDoc = await useDB({
        query: `SELECT * FROM Nfe_Seqdoc WHERE loja_Fk=${idLoja} AND padrao=true AND modelo='01'`
    });

    return { code: 200, results: { m1, m1Det, statusInsert, statusInsert2, m1MedicamentoDet, lote, estoqueGeral, nfeSeqDoc } }

};

const salvar2 = async function ({ idLoja, insertM1DetData, insertm1MedicamentoDetData, idLote, idProd }) {

    let statusInsert, statusInsert2;

    const m1 = await useDB({
        query: `select * from Vd_M1 where loja_fk=${idLoja} order by id_M1 desc`
    });

    const m1Det = await useDB({
        query: `select * from Vd_M1_Detalhe where loja_fk=${idLoja} order by id_M1_Detalhe desc `
    });

    const insertM1Det = await useDB({
        query: `insert into vd_m1_detalhe  (
            cfop_m1,
            csticms_m1,
            unidade_m1,
            valoricms,
            cstpis,
            cstcofins,
            usuarioaltera,
            dataaltera,
            id_m1_detalhe,
            loja_fk,
            m1_fk) values(
                '${insertM1DetData.cfop_m1}',
                '${insertM1DetData.csticms_m1}',
                '${insertM1DetData.unidade_m1}',
                '${insertM1DetData.valoricms}',
                '${insertM1DetData.cstpis}',
                '${insertM1DetData.cstcofins}',
                ${insertM1DetData.usuarioaltera},
                '${insertM1DetData.dataaltera}',
                ${insertM1DetData.id_m1_detalhe},
                ${insertM1DetData.loja_fk},
                ${insertM1DetData.m1_fk})`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const insertm1MedicamentoDet = await useDB({
        query: `insert into vd_m1_medicamentodet  (
            id_m1_medicamentodet,
            loja_fk,
            lote_fk,
            m1det_fk,
            qtdelote,
            datafabricacao,
            datavalidade,
            usuarioaltera,
            dataaltera) values(
                ${insertm1MedicamentoDetData.id_m1_medicamentodet},
                ${insertm1MedicamentoDetData.loja_fk},
                ${insertm1MedicamentoDetData.lote_fk},
                ${insertm1MedicamentoDetData.m1det_fk},
                ${insertm1MedicamentoDetData.qtdelote},
                '${insertm1MedicamentoDetData.datafabricacao}',
                '${insertm1MedicamentoDetData.datavalidade}',
                ${insertm1MedicamentoDetData.usuarioaltera},
                '${insertm1MedicamentoDetData.dataaltera}')`
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });

    const m1MedicamentoDet = await useDB({
        query: `select * from Vd_M1_Medicamentodet where loja_Fk=${idLoja} order by id_M1_Medicamentodet desc `
    });

    const lote = await useDB({
        query: `select * from Cd_Lote where id_Lote=${idLote} and loja_Fk=${idLoja}`
    });

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    const nfeSeqDoc = await useDB({
        query: `SELECT * FROM Nfe_Seqdoc WHERE loja_Fk=${idLoja} AND padrao=true AND modelo='01'`
    });



    return { code: 200, results: { m1, m1Det, statusInsert, statusInsert2, m1MedicamentoDet, lote, estoqueGeral, nfeSeqDoc } }

};

const salvar5 = async function ({ idLoja, insertM1DetData, insertm1MedicamentoDetData, idLote, idProd, insertM1DocReferenciadoData }) {

    let statusInsert, statusInsert2, statusInsert3;

    const m1 = await useDB({
        query: `select * from Vd_M1 where loja_fk=${idLoja} order by id_M1 desc`
    });

    const m1Det = await useDB({
        query: `select * from Vd_M1_Detalhe where loja_fk=${idLoja} order by id_M1_Detalhe desc `
    });

    const insertM1Det = await useDB({
        query: `insert into vd_m1_detalhe  (
            cfop_m1,
            csticms_m1,
            unidade_m1,
            valoricms,
            cstpis,
            cstcofins,
            usuarioaltera,
            dataaltera,
            id_m1_detalhe,
            loja_fk,
            m1_fk) values(
                '${insertM1DetData.cfop_m1}',
                '${insertM1DetData.csticms_m1}',
                '${insertM1DetData.unidade_m1}',
                '${insertM1DetData.valoricms}',
                '${insertM1DetData.cstpis}',
                '${insertM1DetData.cstcofins}',
                ${insertM1DetData.usuarioaltera},
                '${insertM1DetData.dataaltera}',
                ${insertM1DetData.id_m1_detalhe},
                ${insertM1DetData.loja_fk},
                ${insertM1DetData.m1_fk})`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const insertm1MedicamentoDet = await useDB({
        query: `insert into vd_m1_medicamentodet  (
            id_m1_medicamentodet,
            loja_fk,
            lote_fk,
            m1det_fk,
            qtdelote,
            datafabricacao,
            datavalidade,
            usuarioaltera,
            dataaltera) values(
                ${insertm1MedicamentoDetData.id_m1_medicamentodet},
                ${insertm1MedicamentoDetData.loja_fk},
                ${insertm1MedicamentoDetData.lote_fk},
                ${insertm1MedicamentoDetData.m1det_fk},
                ${insertm1MedicamentoDetData.qtdelote},
                '${insertm1MedicamentoDetData.datafabricacao}',
                '${insertm1MedicamentoDetData.datavalidade}',
                ${insertm1MedicamentoDetData.usuarioaltera},
                '${insertm1MedicamentoDetData.dataaltera}')`
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });

    const m1MedicamentoDet = await useDB({
        query: `select * from Vd_M1_Medicamentodet where loja_Fk=${idLoja} order by id_M1_Medicamentodet desc `
    });

    const lote = await useDB({
        query: `select * from Cd_Lote where id_Lote=${idLote} and loja_Fk=${idLoja}`
    });

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    const nfeSeqDoc = await useDB({
        query: `SELECT * FROM Nfe_Seqdoc WHERE loja_Fk=${idLoja} AND padrao=true AND modelo='01'`
    });

    const docReferenciado = await useDB({
        query: `select * from Vd_M1_Docreferenciado where loja_Fk=${idLoja} order by id desc `
    });

    const insertM1DocReferenciado = await useDB({
        query: `insert into vd_m1_docreferenciado  (
            id,
            loja_fk,
            vd_m1_fk,
            vd_m1_ref_fk,
            cod_modelo,
            num_doc,
            usuarioaltera,
            dataaltera,
            dataemissao_doc,
            compracab_fk) values(
                ${insertM1DocReferenciadoData.id},
                ${insertM1DocReferenciadoData.loja_fk},
                ${insertM1DocReferenciadoData.vd_m1_fk},
                ${insertM1DocReferenciadoData.vd_m1_ref_fk},
                '01',
                ${insertM1DocReferenciadoData.num_doc},
                ${insertM1DocReferenciadoData.usuarioaltera},
                '${insertM1DocReferenciadoData.dataaltera}',
                '${insertM1DocReferenciadoData.dataemissao_doc}',
                ${insertM1DocReferenciadoData.compracab_fk})`
    }).then(() => {
        statusInsert3 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert3 = err.message;
    });


    return { code: 200, results: { m1, m1Det, statusInsert, statusInsert2, m1MedicamentoDet, lote, estoqueGeral, nfeSeqDoc, docReferenciado, statusInsert3 } }

};

const salvar4 = async function ({ idLoja, insertM1DetData, insertm1MedicamentoDetData, idLote, idProd, insertM1DocReferenciadoData }) {

    let statusInsert, statusInsert2, statusInsert3;

    const m1 = await useDB({
        query: `select * from Vd_M1 where loja_fk=${idLoja} order by id_M1 desc`
    });

    const m1Det = await useDB({
        query: `select * from Vd_M1_Detalhe where loja_fk=${idLoja} order by id_M1_Detalhe desc `
    });

    const insertM1Det = await useDB({
        query: `insert into vd_m1_detalhe  (
            cfop_m1,
            csticms_m1,
            unidade_m1,
            valoricms,
            cstpis,
            cstcofins,
            usuarioaltera,
            dataaltera,
            id_m1_detalhe,
            loja_fk,
            m1_fk) values(
                '${insertM1DetData.cfop_m1}',
                '${insertM1DetData.csticms_m1}',
                '${insertM1DetData.unidade_m1}',
                '${insertM1DetData.valoricms}',
                '${insertM1DetData.cstpis}',
                '${insertM1DetData.cstcofins}',
                ${insertM1DetData.usuarioaltera},
                '${insertM1DetData.dataaltera}',
                ${insertM1DetData.id_m1_detalhe},
                ${insertM1DetData.loja_fk},
                ${insertM1DetData.m1_fk})`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const insertm1MedicamentoDet = await useDB({
        query: `insert into vd_m1_medicamentodet  (
            id_m1_medicamentodet,
            loja_fk,
            lote_fk,
            m1det_fk,
            qtdelote,
            datafabricacao,
            datavalidade,
            usuarioaltera,
            dataaltera) values(
                ${insertm1MedicamentoDetData.id_m1_medicamentodet},
                ${insertm1MedicamentoDetData.loja_fk},
                ${insertm1MedicamentoDetData.lote_fk},
                ${insertm1MedicamentoDetData.m1det_fk},
                ${insertm1MedicamentoDetData.qtdelote},
                '${insertm1MedicamentoDetData.datafabricacao}',
                '${insertm1MedicamentoDetData.datavalidade}',
                ${insertm1MedicamentoDetData.usuarioaltera},
                '${insertm1MedicamentoDetData.dataaltera}')`
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });

    const m1MedicamentoDet = await useDB({
        query: `select * from Vd_M1_Medicamentodet where loja_Fk=${idLoja} order by id_M1_Medicamentodet desc `
    });

    const lote = await useDB({
        query: `select * from Cd_Lote where id_Lote=${idLote} and loja_Fk=${idLoja}`
    });

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    const nfeSeqDoc = await useDB({
        query: `SELECT * FROM Nfe_Seqdoc WHERE loja_Fk=${idLoja} AND padrao=true AND modelo='01'`
    });

    const docReferenciado = await useDB({
        query: `select * from Vd_M1_Docreferenciado where loja_Fk=${idLoja} order by id desc `
    });

    const insertM1DocReferenciado = await useDB({
        query: `insert into vd_m1_docreferenciado  (
            id,
            loja_fk,
            vd_m1_fk,
            vd_m1_ref_fk,
            cod_modelo,
            num_doc,
            usuarioaltera,
            dataaltera,
            dataemissao_doc,
            compracab_fk) values(
                ${insertM1DocReferenciadoData.id},
                ${insertM1DocReferenciadoData.loja_fk},
                ${insertM1DocReferenciadoData.vd_m1_fk},
                ${insertM1DocReferenciadoData.vd_m1_ref_fk},
                '01',
                ${insertM1DocReferenciadoData.num_doc},
                ${insertM1DocReferenciadoData.usuarioaltera},
                '${insertM1DocReferenciadoData.dataaltera}',
                '${insertM1DocReferenciadoData.dataemissao_doc}',
                ${insertM1DocReferenciadoData.compracab_fk})`
    }).then(() => {
        statusInsert3 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert3 = err.message;
    });


    return { code: 200, results: { m1, m1Det, statusInsert, statusInsert2, m1MedicamentoDet, lote, estoqueGeral, nfeSeqDoc, docReferenciado, statusInsert3 } }

};

const inserir = async function ({ idLoja }) {

    const seqDoc = await useDB({
        query: `SELECT * FROM Nfe_Seqdoc WHERE loja_Fk=${idLoja} AND modelo = '01'  AND padrao=true`
    });

    const seqDoc1 = await useDB({
        query: `SELECT * FROM Nfe_Seqdoc WHERE loja_Fk=${idLoja} ORDER BY id DESC`
    });

    return { code: 200, results: { seqDoc, seqDoc1 } }

};

const pesquisarPorColuna = async function ({ colunaBusca, textoBusca }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM  Vd_Seried WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase()}%' ORDER BY ${colunaBusca} ASC`
    });

    return { code: 200, results: { pesquisa } }

};

const preencherListaBusca = async function ({ idLoja }) {

    const lista = await useDB({
        query: `SELECT * FROM  Vd_M1 WHERE loja_fk=${idLoja} ORDER BY numdoc DESC`
    });

    return { code: 200, results: { lista } }

};

const preencherListaBuscaNormal = async function ({ idLoja }) {

    const lista = await useDB({
        query: `SELECT * FROM  Vd_M1 WHERE loja_fk=${idLoja} ORDER BY numdoc DESC`
    });

    return { code: 200, results: { lista } }

};

const pesquisarNotasNormais = async function ({ idLoja, dataInicio, dataFim, numeroPesquisa }) {

    const dataDoc = await useDB({
        query: `SELECT * FROM  Vd_M1 WHERE loja_fk=${idLoja} AND situacao=1  AND datadoc BETWEEN '${dataInicio}' AND '${dataFim}' ORDER BY datadoc DESC`
    });

    const numDoc = await useDB({
        query: `SELECT * FROM  Vd_M1 WHERE loja_fk=${idLoja} AND situacao=1 AND CAST(numdoc as text) LIKE '%${numeroPesquisa}%' ORDER BY numdoc DESC`
    });

    return { code: 200, results: { dataDoc, numDoc } }

};

const pesquisarNotasNormais2 = async function ({ idLoja, dataInicio, dataFim, numeroPesquisa }) {

    const dataDoc = await useDB({
        query: `SELECT * FROM  Vd_M1 WHERE loja_fk=${idLoja} AND datadoc BETWEEN '${dataInicio}' AND '${dataFim}' ORDER BY datadoc DESC`
    });

    const numDoc = await useDB({
        query: `SELECT * FROM  Vd_M1 WHERE loja_fk=${idLoja} AND CAST(numdoc as text) LIKE '%${numeroPesquisa}%' ORDER BY numdoc DESC`
    });

    return { code: 200, results: { dataDoc, numDoc } }

};

const setarNotaCancelada = async function ({ idM1, idLoja }) {

    const m1Det = await useDB({
        query: `select * from Vd_M1_Detalhe where m1_fk=${idM1} and loja_Fk=${idLoja}`
    });

    const docReferenciado = await useDB({
        query: `select * from Vd_M1_Docreferenciado where vd_m1_fk=${idM1} and loja_Fk=${idLoja}`
    });

    const m1MedicamentoDet = await useDB({
        query: `select Vd_M1_Medicamentodet.* from Vd_M1_Medicamentodet, vd_m1_detalhe where vd_m1_detalhe.m1_fk=${idM1} and vd_m1_medicamentodet.loja_Fk=${idLoja} and enviado_Anvisa!='T'  and enviado_Anvisa!='A' and vd_m1_medicamentodet.m1det_fk = vd_m1_detalhe.id_m1_detalhe`
    });

    return { code: 200, results: { m1Det, docReferenciado, m1MedicamentoDet } }

};

const setarNota = async function ({ idM1, idLoja }) {

    const m1Det = await useDB({
        query: `select * from Vd_M1_Detalhe where m1_fk=${idM1} and loja_Fk=${idLoja}`
    });

    const docReferenciado = await useDB({
        query: `select * from Vd_M1_Docreferenciado where vd_m1_fk=${idM1} and loja_Fk=${idLoja}`
    });

    const m1MedicamentoDet = await useDB({
        query: `select Vd_M1_Medicamentodet.* from Vd_M1_Medicamentodet, vd_m1_detalhe where vd_m1_detalhe.m1_fk=${idM1} and vd_m1_medicamentodet.loja_Fk=${idLoja} and vd_m1_medicamentodet.m1det_fk = vd_m1_detalhe.id_m1_detalhe`
    });

    return { code: 200, results: { m1Det, docReferenciado, m1MedicamentoDet } }

};

const pesquisarPorColunaDescricao = async function ({ colunaBuscaproduto, textoBuscaproduto, codBarra }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Cd_Produto WHERE CAST(${colunaBuscaproduto} as text)  like '%${textoBuscaproduto.toUpperCase()}%' ORDER BY ${colunaBuscaproduto} ASC`
    });

    const codigoBarras = await useDB({
        query: `SELECT * FROM Cd_Codigobarras WHERE numero_Codbar LIKE '%${codBarra}%' AND ativo_Codbar='S'`
    });

    return { code: 200, results: { pesquisa, codigoBarras } }

};

const ok = async function ({ idLoja }) {

    const seqDoc = await useDB({
        query: `SELECT * FROM Nfe_Seqdoc WHERE loja_Fk=${idLoja} AND modelo = '01'  AND padrao=true`
    });

    const seqDoc1 = await useDB({
        query: `SELECT * FROM Nfe_Seqdoc WHERE loja_Fk=${idLoja} ORDER BY id DESC`
    });

    return { code: 200, results: { seqDoc, seqDoc1 } }

};

const pesquisarCodigoProduto = async function ({ idProd, codBarra }) {

    const produto = await useDB({
        query: `SELECT * FROM Cd_Produto WHERE id_Prod = ${idProd}`
    });

    const codigoBarras = await useDB({
        query: `SELECT * FROM Cd_Codigobarras WHERE numero_Codbar LIKE '%${codBarra}%' AND ativo_Codbar='S'`
    });

    return { code: 200, results: { produto, codigoBarras } }

};

const pesquisarPorColunaproduto = async function ({ colunaBuscaproduto, textoBuscaproduto, codBarra }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Cd_Produto WHERE CAST(${colunaBuscaproduto} as text)  like '%${textoBuscaproduto.toUpperCase()}%' ORDER BY ${colunaBuscaproduto} ASC`
    });

    const codigoBarras = await useDB({
        query: `SELECT * FROM Cd_Codigobarras WHERE numero_Codbar LIKE '%${codBarra}%' AND ativo_Codbar='S'`
    });

    return { code: 200, results: { pesquisa, codigoBarras } }

};

const setarProduto = async function ({ idProd, idLoja }) {

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { estoqueGeral } }

};

const pegarCodigoDeBarras = async function ({ idProd }) {

    const numCodBar = await useDB({
        query: `SELECT numero_codbar FROM public.cd_codigobarras where ativo_codbar='S' and produto_fk=${idProd} `
    });

    return { code: 200, results: { numCodBar } }

};

const listaOperacao = async function ({ tipoOperacao }) {

    const tribNatureza = await useDB({
        query: `select * from Cd_Trib_Naturezaoper where tipooperacao='${tipoOperacao}'`
    });

    return { code: 200, results: { tribNatureza } }

};

const listaOperacao2 = async function ({ tipoOperacao }) {

    const tribNatureza = await useDB({
        query: `select * from Cd_Trib_Naturezaoper where tipooperacao='${tipoOperacao}'`
    });

    return { code: 200, results: { tribNatureza } }

};

const listaOperacao3 = async function ({ tipoOperacao }) {

    const tribNatureza = await useDB({
        query: `select * from Cd_Trib_Naturezaoper where tipooperacao='${tipoOperacao}'`
    });

    return { code: 200, results: { tribNatureza } }

};

const listaCupom = async function ({ idLoja, dataInicio, dataFim, cooCupom }) {

    const dataHora = await useDB({
        query: `SELECT * FROM Ecf_Cupomcab WHERE loja_fk= ${idLoja} AND (cast(datahora_Cupom as date) BETWEEN '${dataInicio}'  AND '${dataFim}') AND status_Cupom in('F','O','D')  and coo_Cupom!=0 ORDER BY datahora_Cupom desc`
    });

    const cupom = await useDB({
        query: `SELECT * FROM Ecf_Cupomcab WHERE loja_fk=${idLoja} AND cast(coo_Cupom as text) LIKE  '${cooCupom}%'  AND status_Cupom in ('F','O','D')  and coo_Cupom!=0 ORDER BY coo_Cupom asc`
    });

    return { code: 200, results: { dataHora, cupom } }

};

const listaDetalhe = async function ({ idCupomCab, idLoja }) {

    const M1Docreferenciado = await useDB({
        query: `select ecf_Cupomcab.coo_Cupom from Vd_M1_Docreferenciado, ecf_cupomcab, vd_m1 where ecf_cupomcab_fk=${idCupomCab} and vd_m1_docreferenciado.loja_Fk=${idLoja} and ecf_Cupomcab_fk is not null and vd_M1.situacao!=2`
    });

    const docReferenciado = await useDB({
        query: `select ecf_Cupomcab.coo_Cupom from nfe_Docreferenciado, ecf_cupomcab, nfe_cabecalho where ecf_cupomcab_fk=${idCupomCab} and nfe_docreferenciado.loja_Fk=${idLoja} and ecf_Cupomcab_fk is not null and nfe_Cabecalho.statusnota_Nfecab!='6' AND nfe_docreferenciado.compracab_fk = ecf_cupomcab.id_cupomcab and nfe_docreferenciado.nfe_cabecalho_fk = nfe_cabecalho.id_nfe_cabecalho`
    });

    const cupomDetProd = await useDB({
        query: `select * from Ecf_Cupomdet_Prod where loja_fk=${idLoja} and cupomcab_fk=${idCupomCab} and status_Cupitem='F' order by seqitem asc`
    });

    return { code: 200, results: { M1Docreferenciado, docReferenciado, cupomDetProd } }

};

const adicionarProduto = async function ({ idProd, idLoja, idCupomDet }) {

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    const cupomdetLoteMed = await useDB({
        query: `select * from Ecf_Cupomdet_Lotemed where loja_fk=${idLoja} and cupomdet_fk=${idCupomDet} and enviado_Anvisa!='T' and enviado_Anvisa!='A'`
    });

    return { code: 200, results: { estoqueGeral, cupomdetLoteMed } }

};

const adicionarProduto3 = async function ({ idProd, idLoja, idCompraDet }) {

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    const compraMedicamentoDet = await useDB({
        query: `select * from Fn_Compra_Medicamentodet where loja_Fk=${idLoja} and compradet_fk=${idCompraDet} `
    });

    return { code: 200, results: { estoqueGeral, compraMedicamentoDet } }

};

const adicionarProduto2 = async function ({ idProd, idLoja }) {

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });


    return { code: 200, results: { estoqueGeral } }

};

const pegarCusto = async function ({ idLoja, idProd }) {

    const precoCusto = await useDB({
        query: `SELECT precocusto_Prod FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { precoCusto } }

};

const pegarVenda = async function({ idProd, idLoja }){ 

    const precoVenda = await useDB({ 
        query: `SELECT precovenda_Prod FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    }); 

 return { code: 200, results: { precoVenda }}  
    
};

const pegarEstoque = async function({ idProd, idLoja }){ 

    const estoque = await useDB({ 
        query: `SELECT Estoque FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    }); 

 return { code: 200, results: { estoque }}  
    
};

const salvarfncancelada = async function({ numDoc, idLoja }){ 

    const m1 = await useDB({ 
        query: `select * from Vd_M1 where numdoc=${numDoc} and loja_fk=${idLoja}`
    }); 

 return { code: 200, results: { m1 }}  
    
};

module.exports = {
    consultaLotesNota,
    salvarNotaCancelada,
    selecionaNatureza,
    jaReferenciado,
    jaReferenciado2,
    excluirdetalhe,
    consultarDetalhes,
    consultarNotas,
    listarreferenciados,
    onCellEdit,
    salvarNota,
    salvar1,
    salvar2,
    salvar5,
    salvar4,
    inserir,
    pesquisarPorColuna,
    preencherListaBusca,
    preencherListaBuscaNormal,
    pesquisarNotasNormais,
    pesquisarNotasNormais2,
    setarNotaCancelada,
    setarNota,
    pesquisarPorColunaDescricao,
    ok,
    pesquisarCodigoProduto,
    pesquisarPorColunaproduto,
    setarProduto,
    pegarCodigoDeBarras,
    listaOperacao,
    listaOperacao2,
    listaOperacao3,
    listaCupom,
    listaDetalhe,
    adicionarProduto,
    adicionarProduto3,
    adicionarProduto2,
    pegarCusto, 
    pegarVenda,
    pegarEstoque,
    salvarfncancelada
}