const Utils = require('./use.js');
const { useDB, useQuery } = Utils;
const arr = [1, 2, 3, 4]

const processar = async function ({ idLoja, inicio, fim, idProd }) {

    /* String hqlgrupos = " inner join cd_produto as prod "
        + " on prod.id_prod = det.produto_fk";
 */

    const produtoFKCupomDet = await useDB({
        query: `SELECT count(produto_fk) FROM ecf_cupomdet_prod as det inner join ecf_cupomcab as cab on (cab.id_cupomcab=det.cupomcab_fk and cab.loja_fk=det.loja_fk)  where det.loja_fk=${idLoja}  and cab.status_cupom in ('F','O') and cab.coo_cupom!=0  and status_cupitem='F'  and (cast(cab.datahora_cupom as date) between '${inicio}' and '${fim}')`
    });

    const produtoFKNfeCab = await useDB({
        query: `select count(produto_fk) from nfe_detalhe as det inner join nfe_cabecalho as cab on (cab.id_nfe_cabecalho=det.nfecab_fk and cab.loja_fk=det.loja_fk)  where det.loja_fk=${idLoja} and (cast(cab.dataentradasaida_nfecab as date) between '${inicio}' and '${fim}') `
    });

    const produtoFKSeriedDet = await useDB({
        query: `select count(produto_fk) from vd_seried_detalhe as det inner join  vd_seried as cab on (cab.id=det.seried_fk and cab.loja_fk=det.loja_fk)  where det.loja_fk=${idLoja} and (cab.datadoc between '${inicio}' and '${fim}') `
    });

    const cupomDetProd = await useDB({
        query: `SELECT produto_fk,qtde_cupitem,valorfinal_cupitem,grupoprod_fk FROM ecf_cupomdet_prod as det inner join ecf_cupomcab as cab on (cab.id_cupomcab=det.cupomcab_fk and cab.loja_fk=det.loja_fk) inner join cd_produto as prod on prod.id_prod = det.produto_fk where det.loja_fk=${idLoja} and status_cupom in ('F','O') and status_cupitem='F'  and (cast(cab.datahora_cupom as date) between '${inicio}' and '${fim}') ;`
    });

    const produto = await useDB({
        query: `SELECT id_prod, grupoprod_fk,descricao_grpprod,fabricante_fk,nome_fab,descricao_prod FROM public.cd_produto as p inner join cd_grupoproduto as gp on p.grupoprod_fk=gp.id_grpprod  inner join cd_fabricante as f on p.fabricante_fk=f.id_fab where id_prod=${idProd} `
    });

    const produto2 = await useDB({
        query: `select produto_fk,quantidade,valortotalitem,grupoprod_fk from nfe_detalhe as det inner join nfe_cabecalho as cab on (cab.id_nfe_cabecalho=det.nfecab_fk and cab.loja_fk=det.loja_fk) inner join cd_produto as prod on prod.id_prod = det.produto_fk where det.loja_fk=${idLoja} and (cast(cab.dataentradasaida_nfecab as date) between '${inicio}' and '${fim}') ;`
    });

    const produto3 = await useDB({
        query: `select produto_fk,qtde_serieddet,valortotal_serieddet,grupoprod_fk from vd_seried_detalhe as det inner join  vd_seried as cab on (cab.id=det.seried_fk and cab.loja_fk=det.loja_fk) inner join cd_produto as prod on prod.id_prod = det.produto_fk  where det.loja_fk=${idLoja} and (cab.datadoc between '${inicio}' and '${fim}') ;`
    });

    return { code: 200, results: { produtoFKCupomDet, produtoFKNfeCab, produtoFKSeriedDet, cupomDetProd, produto, produto2, produto3 } }

};

const pegarDescricao = async function ({ idProd }) {

    const descricao = await useDB({
        query: `SELECT descricao_Prod FROM Cd_Produto WHERE id_Prod=${idProd}`
    });

    return { code: 200, results: { descricao } }

};

const pegarDescricaoGrupo = async function ({ idGrpprod }) {

    const descricao = await useDB({
        query: `SELECT descricao_grpprod FROM cd_grupoproduto WHERE id_grpprod =${idGrpprod}`
    });

    return { code: 200, results: { descricao } }

};

const atualizarCadastros = async function({ idLoja, idProd }){ 

    let statusUpdate, statusUpdate2, statusUpdate3, statusUpdate4;

    const updateEstoque = await useDB({ 
        query: `UPDATE es_estoquegeral SET abc='' where loja_fk=${idLoja}`
    }).then((result) => {
        statusUpdate = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate = err.message;
    });

    const updateEstoqueA = await useDB({
        query:`UPDATE es_estoquegeral SET abc='A' where loja_fk=${idLoja} and produto_fk=${idProd}`
    }).then(() => {
        statusUpdate2 = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate2 = err.message;
    });

    const updateEstoqueB = await useDB({
        query:`UPDATE es_estoquegeral SET abc='B' where loja_fk=${idLoja} and produto_fk=${idProd}`
    }).then(() => {
        statusUpdate3 = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate3 = err.message;
    });

    const updateEstoqueC = await useDB({
        query:`UPDATE es_estoquegeral SET abc='C' where loja_fk=${idLoja} and produto_fk=${idProd}`
    }).then(() => {
        statusUpdate4 = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate4 = err.message;
    });

    

 return { code: 200, results: { statusUpdate, statusUpdate2, statusUpdate3, statusUpdate4 }}  
    
};


module.exports = {
    processar,
    pegarDescricao,
    pegarDescricaoGrupo,
    atualizarCadastros
}