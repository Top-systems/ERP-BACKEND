const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const excluirempresa = async function ({ idEmpresa }) {

    const cliente = await useDB({
        query: `select * from Cd_Cliente where empresa_Fk=${idEmpresa}`
    });

    const nfeCab = await useDB({
        query: `select * from Nfe_Cabecalho where empresa_Fk=${idEmpresa}`
    });

    const deleteGrupoDescEmpConv = await useDB({
        query: `delete from cd_grupo_desc_empresaconveniada where empresaconveniada_fk=${idEmpresa} `
    });

    const deleteGrupoProibido = await useDB({
        query: `delete from cd_grupo_proibido where empresaconveniada_fk=${idEmpresa}`
    });

    return { code: 200, results: { cliente, nfeCab, deleteGrupoDescEmpConv, deleteGrupoProibido } }

};

const faixas = async function ({ }) {

    const faixa = await useDB({
        query: "SELECT * FROM Cd_Faixavencimentocab"
    });

    return { code: 200, results: { faixa } }

};

const listaGrupoDesconto = async function ({ idEmpresa }) {

    const grupoEmpConv = await useDB({
        query: `SELECT * FROM Cd_Grupo_Desc_Empresaconveniada WHERE empresaconveniada_Fk='${idEmpresa}' ORDER BY id DESC`
    });

    return { code: 200, results: { grupoEmpConv } }

};

const adicionarGrupoProduto = async function ({ idEmpresa }) {

    const grupoDescEmpConv = await useDB({
        query: `SELECT * FROM Cd_Grupo_Desc_Empresaconveniada WHERE empresaconveniada_Fk='${idEmpresa}' ORDER BY id DESC`
    });

    const grupoProibido = await useDB({
        query: `SELECT * FROM Cd_Grupo_Proibido WHERE empresaconveniada_Fk='${idEmpresa}' ORDER BY id DESC`
    });

    return { code: 200, results: { grupoDescEmpConv, grupoProibido } }

};

const adicionarGrupoProdutoProibido = async function ({ idEmpresa }) {

    const grupoProibido = await useDB({
        query: `SELECT * FROM Cd_Grupo_Proibido WHERE empresaconveniada_Fk='${idEmpresa}' ORDER BY id DESC`
    });

    const grupoDescEmpConv = await useDB({
        query: `SELECT * FROM Cd_Grupo_Desc_Empresaconveniada WHERE empresaconveniada_Fk='${idEmpresa}' ORDER BY id DESC`
    });


    return { code: 200, results: { grupoProibido, grupoDescEmpConv } }

};

const listaGrupoProibido = async function ({ idEmpresa }) {

    const grupoProibido = await useDB({
        query: `SELECT * FROM Cd_Grupo_Proibido WHERE empresaconveniada_Fk='${idEmpresa}' ORDER BY id DESC`
    });

    return { code: 200, results: { grupoProibido } }

};

const processarFiltro = async function ({ valor, filtro }) {

    const comecandoCom = await useDB({
        query: `SELECT * FROM cd_empresaconveniada WHERE ${filtro} like '${valor.toUpperCase()}%'`
    });

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_empresaconveniada WHERE ${filtro} LIKE '%${valor.toUpperCase()}%'`
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

const atualizaClienteMaxDias = async function ({ idEmpresa }) {

    const cliente = await useDB({
        query: `SELECT * FROM Cd_Cliente WHERE empresa_Fk=${idEmpresa}`
    });

    return { code: 200, results: { cliente } }

};

const salvar = async function ({ idFaixaVencimento, idLoja, idEmpresa, idContasReceber, dataVenc }) {

    const faixaVencimento = await useDB({
        query: `SELECT * FROM Cd_Faixavencimentocab WHERE id_Faixavencimentocab=${idFaixaVencimento}`
    });

    const contasReceber = await useDB({
        query: `SELECT id_contasreceber,datavenc_contasreceber,datalanc_contasreceber  FROM public.fn_contasreceber  where loja_fk=${idLoja}  and cliente_fk in (select id_cli from cd_cliente  where empresa_fk = ${idEmpresa})  and statusreceb_contasreceber in ('P','F')`
    });

    const updateContasReceber = await useDB({
        query: `UPDATE public.fn_contasreceber SET datavenc_contasreceber='${dataVenc}'WHERE id_contasreceber=${idContasReceber}  and loja_fk=${idLoja} and datavenc_contasreceber!='${dataVenc}' `
    });


    return { code: 200, results: { faixaVencimento, contasReceber, updateContasReceber } }

};

const run = async function ({ maxDiasAtraso, diaAtraso, idCli }) {

    const contasReceber = await useDB({
        query: `SELECT datavenc_contasreceber, statusreceb_contasreceber,cliente_fk,diasbloqueio_empconv FROM public.fn_contasreceber as rec inner join cd_cliente as c on c.id_cli=rec.cliente_fk inner join cd_empresaconveniada as e on c.empresa_fk=e.id_empconv where  statusreceb_contasreceber in ('P','F') `
    });

    const updateClienteB = await useDB({
        query: `UPDATE public.cd_cliente   SET status_cli='B',maxdiasatraso_cli=${maxDiasAtraso},diasatraso_cli=${diaAtraso}  WHERE  id_cli=${idCli}`
    });

    const updateClienteA = await useDB({
        query: `UPDATE public.cd_cliente   SET status_cli='B',maxdiasatraso_cli=${maxDiasAtraso},diasatraso_cli=${diaAtraso}  WHERE  id_cli=${idCli}`
    });


    return { code: 200, results: { contasReceber, updateClienteB, updateClienteA } }

};

const pegarfaixa = async function ({ descFaixaVenc, idFaixaVencimentoCab }) {

    const faixa = await useDB({
        query: `select * from Cd_Faixavencimentocab where descricao_Faixavenccab='${descFaixaVenc}' `
    });

    const faixa2 = await useDB({
        query:`select * from Cd_Faixavencimentodet where  faixavencimentocab_Fk=${idFaixaVencimentoCab} `
    });

    return { code: 200, results: { faixa, faixa2 } }

};

const pesquisarPorColuna = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
    query:  `SELECT * FROM Cd_Empresaconveniada WHERE UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase()}%' ORDER BY ${colunaBusca} ASC`
 }); 

 return { code: 200, results: { pesquisa }}  
    
};

const verificardest = async function({ idLoja }){ 

    const configNfe = await useDB({ 
    query: `select * from Cf_ConfigNfe where loja_Fk = ${idLoja}`
 }); 

 return { code: 200, results: { configNfe }}  
    
};

module.exports = {
    excluirempresa,
    faixas,
    listaGrupoDesconto,
    adicionarGrupoProduto,
    adicionarGrupoProdutoProibido,
    listaGrupoProibido,
    processarFiltro,
    atualizaClienteMaxDias,
    salvar,
    run,
    pegarfaixa,
    pesquisarPorColuna,
    verificardest
}