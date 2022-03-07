const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const listar = async function ({ dataHora }) {

    const cupomDetProd = await useDB({
        query: `SELECT produto_fk,descricao_prod,id_fab,nome_fab,id_grpprod,descricao_grpprod, SUM(qtde_cupitem) as qtd,SUM(valorfinal_cupitem-descontoglobal_cupitem) as total,SUM(descontoglobal_cupitem) as desconto from ecf_cupomdet_prod AS det  INNER JOIN ecf_cupomcab AS cab ON cab.id_cupomcab=det.cupomcab_fk INNER JOIN cd_produto AS p ON p.id_prod=det.produto_fk INNER JOIN cd_fabricante AS fab ON fab.id_fab=p.fabricante_fk INNER JOIN cd_grupoproduto AS g ON g.id_grpprod=p.grupoprod_fk WHERE cast(datahora_cupom AS DATE)='${dataHora}' AND status_cupom IN ('F','O') AND status_cupitem='F' GROUP BY produto_fk,descricao_prod,id_fab,nome_fab,id_grpprod,descricao_grpprod`
    });

    const cupomDetProd2 = await useDB({
        query:`SELECT  abc,SUM(qtde_cupitem) as qtd,SUM(valorfinal_cupitem-descontoglobal_cupitem) as total,SUM(descontoglobal_cupitem) as desconto from ecf_cupomdet_prod AS det INNER JOIN ecf_cupomcab AS cab ON cab.id_cupomcab=det.cupomcab_fk INNER JOIN es_estoquegeral AS es ON (es.produto_fk=det.produto_fk AND det.loja_fk=es.loja_fk)WHERE cast(datahora_cupom AS DATE)='${dataHora}'AND status_cupom IN ('F','O')AND status_cupitem='F'GROUP BY  abc`
    });

    const cupomDetProd3 = await useDB({
        query:`SELECT nome_forn,SUM(qtde_cupitem) as qtd,SUM(valorfinal_cupitem-descontoglobal_cupitem) as total,SUM(descontoglobal_cupitem) as desconto from ecf_cupomdet_prod AS det  INNER JOIN ecf_cupomcab AS cab ON cab.id_cupomcab=det.cupomcab_fk left JOIN cd_produtofornec AS es ON (es.produto_fk=det.produto_fk AND det.loja_fk=es.loja_fk)left JOIN cd_fornecedor AS f ON es.fornecedor_fk=f.id_forn WHERE cast(datahora_cupom AS DATE)='${dataHora}' AND status_cupom IN ('F','O') AND status_cupitem='F' GROUP BY  nome_forn`
    });

    return { code: 200, results: { cupomDetProd, cupomDetProd2, cupomDetProd3 } }

};

module.exports = {
    listar
}