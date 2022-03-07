const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const salvarnota = async function ({ numDoc, serie, subSerie, idLoja, idCli, idForn, insertServicoDetData, insertContasPagarData }) {

    let statusInsert, statusInsert2;

    const servicoCab = await useDB({
        query: `SELECT * FROM Vd_Servico_Cab WHERE numdoc='${numDoc}' AND serie='${serie}' AND subserie='${subSerie}' AND loja_Fk=${idLoja} AND cliente_Fk=${idCli}`
    });

    const servicoCab2 = await useDB({
        query: `SELECT * FROM Vd_Servico_Cab WHERE numdoc='${numDoc}' AND serie='${serie}' AND subserie='${serie}' AND fornecedor_Fk=${idForn}`
    });

    const servicoCab3 = await useDB({
        query: ` SELECT * FROM Vd_Servico_Cab WHERE loja_Fk=${idLoja} ORDER BY id DESC`
    });

    const servicoDet = await useDB({
        query: ` SELECT * FROM Vd_Servico_Det WHERE loja_Fk=${idLoja} ORDER BY id DESC`
    });

    const insertServicoDet = await useDB({
        query: `insert into vd_servico_det  (
            id,
            loja_fk,
            servicocab_fk,
            servico_fk,
            cstpiscofins_fk,
            seqitem,
            descricao,
            valortotalitem,
            valordescontoitem,
            natbccred,
            valorbcpis,
            aliquota_pis,
            valorpis,
            valorbccofins,
            aliquota_cofins,
            valorcofins,
            usuarioaltera,
            dataaltera,
            valorpisret,
            valorcofinsret,
            valoriss,
            aliquota_iss,
            comissao,
            cfop) values(
                ${insertServicoDetData.id},
                ${insertServicoDetData.loja_fk},
                ${insertServicoDetData.servicocab_fk},
                ${insertServicoDetData.servico_fk},
                ${insertServicoDetData.cstpiscofins_fk},
                ${insertServicoDetData.seqitem},
                '${insertServicoDetData.descricao}',
                ${insertServicoDetData.valortotalitem},
                ${insertServicoDetData.valordescontoitem},
                ${insertServicoDetData.natbccred},
                ${insertServicoDetData.valorbcpis},
                ${insertServicoDetData.aliquota_pis},
                ${insertServicoDetData.valorpis},
                ${insertServicoDetData.valorbccofins},
                ${insertServicoDetData.aliquota_cofins},
                ${insertServicoDetData.valorcofins},
                ${insertServicoDetData.usuarioaltera},
                '${insertServicoDetData.dataaltera}',
                ${insertServicoDetData.valorpisret},
                '${insertServicoDetData.valorcofinsret}',
                ${insertServicoDetData.valoriss},
                ${insertServicoDetData.aliquota_iss},
                ${insertServicoDetData.comissao},
                '${insertServicoDetData.cfop}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const contasReceber = await useDB({
        query: `SELECT * FROM Fn_Contasreceber WHERE loja_Fk=${idLoja} ORDER BY id_Contasreceber DESC`
    });

    const contasPagar = await useDB({
        query: `SELECT * FROM Fn_Contaspagar WHERE loja_Fk=${idLoja} ORDER BY id_Contaspagar DESC`
    });

    const insertContasPagar = await useDB({
        query: `INSERT INTO public.fn_contaspagar(     
            id_contaspagar, 
            loja_fk,     
            numdoc_contaspagar,     
            status_contaspagar, 
            datalanc_contaspagar,     
            datavencimento_contaspagar,     
            numparcela_contaspagar,     
            totalparcela_contaspagar,    
            servico_fk)    VALUES (
                ${insertContasPagarData.id_contaspagar}, 
                ${insertContasPagarData.loja_fk},  
                ${insertContasPagarData.numdoc_contaspagar}, 
                'P', 
                '${insertContasPagarData.datalanc_contaspagar}',  
                '${insertContasPagarData.datavencimento_contaspagar}', 
                ${insertContasPagarData.numparcela_contaspagar},  
                ${insertContasPagarData.totalparcela_contaspagar}, 
                ${insertContasPagarData.servico_fk});`
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });


    return { code: 200, results: { servicoCab, servicoCab2, servicoCab3, servicoDet, statusInsert, contasReceber, contasPagar, statusInsert2 } }

};

const setar = async function ({ idServicoCab, idLoja, codigo }) {

    const servicoDet = await useDB({
        query: `select * from  Vd_Servico_Det where servicocab_fk=${idServicoCab} and loja_Fk=${idLoja} order by seqitem asc`
    });

    const tabela437 = await useDB({
        query: `select * from  Cd_Tabela_4_3_7 where codigo='${codigo}'`
    });

    return { code: 200, results: { servicoDet, tabela437 } }

};

const listarnatbc = async function ({ }) {

    const lista = await useDB({
        query: `SELECT * FROM Cd_Tabela_4_3_7  ORDER BY id ASC`
    });

    return { code: 200, results: { lista } }

};

const excluirn = async function ({ idServico, idLoja }) {

    const deleteContasPagarPag = await useDB({
        query: `delete  FROM public.fn_contaspagar_pag  where contaspagar_fk in(select id_contaspagar FROM public.fn_contaspagar  where servico_fk=${idServico}  and loja_fk=${idLoja} )   and loja_fk=${idLoja} `
    });

    const deleteContasPagar = await useDB({
        query: `delete  FROM public.fn_contaspagar where servico_fk=${idServico}  and loja_fk=${idLoja} `
    });

    const deleteServicoDet = await useDB({
        query: `DELETE FROM public.vd_servico_det WHERE servicocab_fk=${idServico}  and loja_fk=${idLoja} `
    });

    const deleteServicoCab = await useDB({
        query: `DELETE FROM public.vd_servico_cab WHERE id=${idServico} and loja_fk=${idLoja}`
    });

    return { code: 200, results: { deleteContasPagarPag, deleteContasPagar, deleteServicoDet } }

};

const pesquisarPorColunaservico = async function ({ colunaBuscaservico, textoBuscaservico }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Cd_Servico WHERE UPPER(CAST(${colunaBuscaservico} as text))  like '%${textoBuscaservico.toUpperCase()}%' ORDER BY ${colunaBuscaservico} ASC`
    });

    return { code: 200, results: { pesquisa } }

};

const pesquisarPorColunaDescricao = async function ({ textoBuscaservico, colunaBuscaservico, idServico }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Cd_Servico WHERE CAST(descricao as text)  like '%${textoBuscaservico.toUpperCase()}%' ORDER BY ${colunaBuscaservico} ASC`
    });

    const servico = await useDB({
        query: `SELECT * FROM Cd_Servico WHERE id = ${idServico}`
    });

    return { code: 200, results: { servico, pesquisa } }

};

const pesquisarCodigoServico = async function ({ idServico }) {

    const servico = await useDB({
        query: `SELECT * FROM Cd_Servico WHERE id = ${idServico}`
    });

    return { code: 200, results: { servico } }

};

const preencherListabusca = async function ({ idLoja }) {

    const lista = await useDB({
        query: ` select * from Vd_Servico_Cab where tipo_Operacao='0'  and fornecedor_Fk is not null and loja_fk=${idLoja} order by data_Entrada desc`
    });

    return { code: 200, results: { lista } }

};

const preencherListabuscaentrada = async function ({ idLoja }) {

    const lista = await useDB({
        query: ` select * from Vd_Servico_Cab where tipo_Operacao='0'  and fornecedor_Fk is not null and loja_fk=${idLoja} order by data_Entrada desc`
    });

    return { code: 200, results: { lista } }

};

const pesquisarPorColuna = async function ({ colunaBusca, textoBusca, idLoja }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Vd_Servico_Cab WHERE (UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase()}%') and loja_fk=${idLoja}  ORDER BY ${colunaBusca} ASC`
    });

    return { code: 200, results: { pesquisa } }

};

module.exports = {
    salvarnota,
    setar,
    listarnatbc,
    excluirn,
    pesquisarPorColunaservico,
    pesquisarPorColunaDescricao,
    pesquisarCodigoServico,
    preencherListabusca,
    preencherListabuscaentrada,
    pesquisarPorColuna
}