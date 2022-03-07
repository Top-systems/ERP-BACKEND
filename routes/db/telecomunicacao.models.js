const telecomunicacao = require('../telecomunicacao.routes.js');
const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const excluir = async function ({ idLoja, idTelecomunicacao }) {

    const deleteContasPagarPag = await useDB({
        query: `DELETE FROM fn_contaspagar_pag where loja_fk=${idLoja} and contaspagar_fk=(select id_contaspagar from fn_contaspagar where telecomunicacao_fk =${idTelecomunicacao} and loja_fk=${idLoja})`
    });

    const deleteContasPagar = await useDB({
        query: `delete from Fn_Contaspagar where telecomunicacao_fk=${idTelecomunicacao} and loja_Fk=${idLoja}`
    });

    const deleteTelecomunicacao = await useDB({
        query: `delete  from  Fn_Telecomunicacao where id=${idTelecomunicacao} and loja_Fk=${idLoja}`
    });

    return { code: 200, results: { deleteContasPagarPag, deleteContasPagar, deleteTelecomunicacao } }

};

const popularListaconsumoAgua = async function ({ }) {

    const lista = await useDB({
        query: `SELECT * FROM Cd_Tabela_4_4_2 ORDER BY id ASC`
    });

    return { code: 200, results: { lista } }

};

const verificaTiponota = async function ({ idLoja, idTelecomunicacao }) {

    const contasPagar = await useDB({
        query: `SELECT * FROM Fn_Contaspagar WHERE loja_Fk=${idLoja} and telecomunicacao_fk=${idTelecomunicacao}`
    });

    return { code: 200, results: { contasPagar } }

};

const processarFiltro = async function ({ valor, filtro }) {

    const comecandoCom = await useDB({
        query: `SELECT * FROM fn_telecomunicacao WHERE ${filtro} like '${valor.toUpperCase()}%'`
    });

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM fn_telecomunicacao WHERE ${filtro} LIKE '%${valor.toUpperCase()}%'`
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

const excluirFiltro = async function ({ idLoja }) {

    const telecomunicacao = await useDB({
        query: `select * from Fn_Telecomunicacao where loja_Fk=${idLoja} order by id desc`
    });

    return { code: 200, results: { telecomunicacao } }

};

const listaAlvo = async function ({ idLoja }) {

    const telecomunicacao = await useDB({
        query: `select * from Fn_Telecomunicacao where loja_Fk=${idLoja} order by id desc`
    });

    return { code: 200, results: { telecomunicacao } }

};

const salvar = async function ({ idLoja, idForn, numNota, idTelecomunicacao, telecomunicacao_fk, idContasPagar }) {

    const tele1 = await useDB({
        query: `SELECT id  FROM public.fn_telecomunicacao  where loja_fk=${idLoja} and fornecedor_fk=${idForn} and numnota=${numNota}`
    });

    const tele2 = await useDB({
        query: `SELECT id FROM public.fn_telecomunicacao where loja_fk=${idLoja} and fornecedor_fk=${idForn} and numnota=${numNota} and id!=${idTelecomunicacao}`
    });

    const tele3 = await useDB({
        query: `SELECT * FROM Fn_Telecomunicacao WHERE loja_fk=${idLoja} ORDER BY id DESC`
    });

    const contasPagar = await useDB({
        query: `SELECT * FROM Fn_Contaspagar WHERE loja_Fk=${idLoja} ORDER BY id_Contaspagar DESC`
    });

    const updateContaspagar = await useDB({
        query: `update fn_contaspagar  set telecomunicacao_fk=${telecomunicacao_fk}  where id_contaspagar=${idContasPagar} and loja_fk=${idLoja}`
    });

    return { code: 200, results: { tele1, tele2, tele3, contasPagar } }

};

const inserir = async function ({ }) {

    const planoConta = await useDB({
        query: `select * from Cd_Plano_Conta where nome='TELEFONE/ACESSO INTERNET'`
    });

    return { code: 200, results: { planoConta } }

};

const pesquisarPorColuna = async function ({ colunaBusca, textoBusca, idLoja }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Fn_Telecomunicacao WHERE UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase()}%'  and loja_Fk=${idLoja} ORDER BY ${colunaBusca} ASC`
    });

    return { code: 200, results: { pesquisa } }

};

const preencherListaBusca = async function ({ idLoja }) {

    const lista = await useDB({
        query: `select * from Fn_Telecomunicacao where loja_Fk=${idLoja} order by id desc`
    });

    return { code: 200, results: { lista } }

};

module.exports = {
    excluir,
    popularListaconsumoAgua,
    verificaTiponota,
    processarFiltro,
    excluirFiltro,
    listaAlvo,
    salvar,
    inserir,
    pesquisarPorColuna,
    preencherListaBusca
}