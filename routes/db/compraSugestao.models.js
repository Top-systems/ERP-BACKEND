const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const cProduto = async function ({ idLoja, ean, dataPedido }) {

    const loja = await useDB({
        query: `select * from Cf_Loja where id_Loja=${idLoja} LIMIT 1`
    });

    const nomeForn = await useDB({
        query: `SELECT nome_forn FROM public.cd_pedido_forn_prod as d inner join cd_fornecedor as f on f.id_forn=d.fornecedor_fk where  ean='${ean}' `
    });

    const idDet = await useDB({
        query: `select det.id from cd_pedido_det as det inner join cd_pedido_cab as cab on cab.id=det.pedido_fk where det.loja_fk=${idLoja} and cab.loja_fk=${idLoja} and cab.status='1' and cast(data_pedido as date)='${dataPedido}'  and det.status='E' and det.ean='${ean}' `
    })

    return { code: 200, results: { loja, nomeForn, idDet } }

};

const pesquisarPorColunaprodutox = async function ({ colunaBuscaprodutox, textoBuscaprodutox, codBar }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Cd_Produto WHERE UPPER(CAST(${colunaBuscaprodutox} as text))  like '%${textoBuscaprodutox.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBuscaprodutox} ASC`
    });

    const codBarras = await useDB({
        query: `SELECT * FROM Cd_Codigobarras WHERE numero_Codbar LIKE '%${codBar}%' AND ativo_Codbar='S'`
    })

    return { code: 200, results: { pesquisa, codBarras } }

};

const pesquisarPorColunaDescricaox = async function ({ colunaBuscaprodutox, textoBuscaprodutox, codBar }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Cd_Produto WHERE CAST(descricao_Prod as text)  like '%${textoBuscaprodutox.toUpperCase().replaceAll("\D", "")}%' ORDER BY ${colunaBuscaprodutox} ASC`
    });

    const codBarras = await useDB({
        query: `SELECT * FROM Cd_Codigobarras WHERE numero_Codbar LIKE '%${codBar}%' `
    })



    return { code: 200, results: { pesquisa, codBarras } }

};

const pesquisarCodigoProdutox = async function ({ idProd }) {

    const produto = await useDB({
        query: `SELECT * FROM Cd_Produto WHERE id_Prod = ${idProd}`
    });

    return { code: 200, results: { produto } }

};

const listarFabricantes = async function ({ }) {

    const fabricantes = await useDB({
        query: "select * from Cd_Fabricante order by id_Fab asc"
    });

    return { code: 200, results: { fabricantes } }

};

const listarGrupos = async function ({ }) {

    const grupos = await useDB({
        query: "select * from Cd_Grupoproduto  order by id_Grpprod asc"
    });

    return { code: 200, results: { grupos } }

};

const pesquisarPorColuna = async function ({ colunaBusca, textoBusca, idLoja }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Cd_Compra_Sugestao WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\D", "")}%'  and loja_fk=${idLoja}  ORDER BY id desc`
    });

    return { code: 200, results: { pesquisa } }

};

const excluirItens = async function ({ idCompraSugestaoDet, idLoja, total, idCab }) {

    let statusDelete = "";
    let statusUpdate = "";

    const deleted = await useDB({
        query: `DELETE FROM public.cd_compra_sugestao_det WHERE id=${idCompraSugestaoDet} and loja_fk=${idLoja}`
    }).then(() => {
        statusDelete = "Registro deletado com sucesso"
    }).catch((err) => {
        statusDelete = err.message
    });

    const update = await useDB({
        query: `UPDATE public.cd_compra_sugestao SET total=${total} WHERE id=${idCab} and loja_fk=${idLoja} `
    }).then(() => {
        statusUpdate = "Registro atualizado com sucesso"
    }).catch((err) => {
        statusUpdate = err.message
    })

    return { code: 200, results: { statusDelete, statusUpdate } }

};

const excluir = async function ({ idLoja, idCompraSugestao }) {

    let statusDelete = "", statusDelete2 = "", statusDelete3 = "";

    const deleteDet = await useDB({
        query: `DELETE FROM public.cd_compra_sugestao_det WHERE compra_sugestao_fk=${idCompraSugestao}  and loja_fk=${idLoja}`
    }).then(() => {
        statusDelete = "Registro apagado com sucesso";
    }).catch((err) => {
        statusDelete = err.message;
    })

    const deleteDetLoja = await useDB({
        query: `DELETE FROM public.cd_compra_sugestao_detloja WHERE compra_sugestao_fk=${idCompraSugestao}  and loja_fk=${idLoja}`
    }).then(() => {
        statusDelete2 = "Registro apagado com sucesso";
    }).catch((err) => {
        statusDelete2 = err.message;
    })

    const deleteCompraSugestao = await useDB({
        query: `DELETE FROM public.cd_compra_sugestao WHERE id=${idCompraSugestao}  and loja_fk=${idLoja}`
    }).then(() => {
        statusDelete3 = "Registro apagado com sucesso";
    }).catch((err) => {
        statusDelete3 = err.message;
    })

    return { code: 200, results: { statusDelete, statusDelete2, statusDelete3 } }

};

const selecionar = async function ({ idLoja, idCompraSugestao }) {

    const countId = await useDB({
        query: `SELECT cast(count(id) as integer) FROM public.cd_compra_sugestao_det where compra_sugestao_fk=${idCompraSugestao}  and loja_fk=${idLoja}`
    });

    const loja = await useDB({
        query: `select * from Cf_Loja where id_Loja in ( select distinct Cd_Compra_Sugestao_DetLoja.loja from Cd_Compra_Sugestao_DetLoja, cd_compra_sugestao where cd_Compra_Sugestao.id=${idCompraSugestao} and  cd_Compra_Sugestao.loja_Fk=${idLoja} )  `
    })

    return { code: 200, results: { countId, loja } }

};

const atualizaprodutosb = async function ({ idCompraSugestao, idLoja, idProd, idEncomendaCab, idTipoCombustivel, ean }) {

    const compraSugestaoDet = await useDB({
        query: `select * from Cd_Compra_Sugestao_Det where compra_sugestao_fk=${idCompraSugestao} and loja_Fk=${idLoja}`
    });

    const compraSugestaoDetLojaPorProd = await useDB({
        query: `select * from Cd_Compra_Sugestao_DetLoja where compra_sugestao_fk=${idCompraSugestao} and loja_Fk=${idLoja} and produto_fk=${idProd} `
    });

    const encomendaDet = await useDB({
        query: `select * from Vd_Encomendadet where loja_Fk=${idLoja}  and  encomendacab_fk=${idEncomendaCab}`
    });

    const compraSugestaoDetLojaPorComb = await useDB({
        query: `select * from Cd_Compra_Sugestao_DetLoja where compra_sugestao_fk=${idCompraSugestao} and  loja_Fk=${idLoja} and tipocombustivel_Fk=${idTipoCombustivel}`
    });

    const nomeForn = await useDB({
        query: `SELECT nome_forn FROM public.cd_pedido_forn_prod as d inner join cd_fornecedor as f on f.id_forn=d.fornecedor_fk where ean='${ean}' `
    })

    return { code: 200, results: { compraSugestaoDet, compraSugestaoDetLojaPorProd, encomendaDet, compraSugestaoDetLojaPorComb, nomeForn } }

};

const ultimofornecedor = async function ({ idLoja, idProd, idComb }) {

    const porProduto = await useDB({
        query: `SELECT fornecedor_fk,nome_forn FROM public.fn_compra_detalhe as det inner join fn_compra_cabecalho as cab on det.compracab_fk=cab.id_compracab inner join cd_fornecedor as f on f.id_forn=cab.fornecedor_fk where cab.loja_fk=${idLoja}  and det.loja_fk=${idLoja}  and status_compracab='F' AND naturezaoperacao_fk in (SELECT id FROM public.cd_trib_naturezaoper where tipooperacao='1') and produto_fk=${idProd} order by id_compracab desc`
    });

    const porCombustivel = await useDB({
        query: `SELECT fornecedor_fk,nome_forn FROM public.fn_compra_detalhe as det inner join fn_compra_cabecalho as cab on det.compracab_fk=cab.id_compracab inner join cd_fornecedor as f on f.id_forn=cab.fornecedor_fk where cab.loja_fk=${idLoja}  and det.loja_fk=${idLoja}  and status_compracab='F' AND naturezaoperacao_fk in (SELECT id FROM public.cd_trib_naturezaoper where tipooperacao='1') and tipocombustivel_fk=${idComb} order by id_compracab desc`
    })

    return { code: 200, results: { porProduto, porCombustivel } }

};

const preencherListaBusca = async function ({ idLoja }) {

    const lista = await useDB({
        query: `SELECT * FROM Cd_Compra_Sugestao WHERE loja_fk=${idLoja}  ORDER BY id desc`
    });

    return { code: 200, results: { lista } }

};

const listaForn = async function ({ }) {

    const lista = await useDB({
        query: ` SELECT * FROM Cd_Fornecedor WHERE cotacao='S'`
    });

    return { code: 200, results: { lista } }

};

const sugerir = async function ({ idLoja, dataPedido, ean, idProd, idTipoCombustivel }) {

    const listaLojas = await useDB({
        query: "select * from Cf_Loja"
    });

    const idPedidoDet = await useDB({
        query: `select det.id from cd_pedido_det as det inner join cd_pedido_cab as cab on cab.id=det.pedido_fk where det.loja_fk=${idLoja} and cab.loja_fk=${idLoja} and cab.status='1' and cast(data_pedido as date)='${dataPedido}'  and det.status='E' and det.ean='${ean}' `
    });

    const nomeForn = await useDB({
        query: `SELECT nome_forn FROM public.cd_pedido_forn_prod as d inner join cd_fornecedor as f on f.id_forn=d.fornecedor_fk where  ean='${ean}' `
    });

    const produto = await useDB({
        query: `SELECT * FROM cd_produto WHERE id_prod=${idProd}`
    });

    const tipoCombustivel = await useDB({
        query: `SELECT * FROM cd_tipocombustivel WHERE id_tipocombustivel=${idTipoCombustivel}`
    })

    return { code: 200, results: { listaLojas, idPedidoDet, nomeForn, produto, tipoCombustivel } }

};

const contadores = async function ({ ean }) {

    const nomeForn = await useDB({
        query: `SELECT nome_forn FROM public.cd_pedido_forn_prod as d inner join cd_fornecedor as f on f.id_forn=d.fornecedor_fk where  ean='${ean}' `
    });

    return { code: 200, results: { nomeForn } }

};

const salvar = async function ({ idLoja, descricaoBusca, loja_fk, data_sugestao, tipo, descricaoInsert, total, qtd, qtdVendida, estoqueAtual, estoqueMax, estoqueMin, produto_fk, compra_sugestao_fk, precocusto, origem, ean, tipocombustivel_fk, encomenda_fk, loja }) {

    let statusInsert = " ", statusInsert2 = " ", statusInsert3 = " ", statusInsert4 = " ", statusInsert5 = " ";

    const compraSugestaoId = await useDB({
        query: `select id from Cd_Compra_Sugestao where loja_Fk=${idLoja} and descricao='${descricaoBusca}'`
    });

    const idCompraSugestao = await useDB({
        query: `select max(id)+1 as idc from Cd_Compra_Sugestao where loja_Fk=${idLoja}`
    });

    const insert = await useDB({
        query: `INSERT INTO public.cd_compra_sugestao( 
                id, 
                loja_fk, 
                data_sugestao, 
                tipo, 
                descricao, 
                total) VALUES (
                    ${idCompraSugestao[0].idc}, 
                    ${loja_fk}, 
                    '${data_sugestao}', 
                    '${tipo}',
                    '${descricaoInsert}', 
                    ${total})`
    }).then(() => {
        statusInsert = "Registro inserido com sucesso";
    }).catch((err) => {
        statusInsert = err.message
    });

    const idCompraSugestaoDet = await useDB({
        query: `select max(id)+1 as idc from Cd_Compra_Sugestao_Det where loja_Fk=${idLoja}`
    });

    const insertDetProd = await useDB({
        query: `INSERT INTO public.cd_compra_sugestao_det(
                id, 
                loja_fk, 
                qtd, 
                qtd_vendida, 
                estoqueatual, 
                estoquemax, 
                estoquemin,
                produto_fk, 
                compra_sugestao_fk, 
                precocusto,
                origem,
                ean) VALUES (
                    ${idCompraSugestaoDet[0].idc}, 
                    ${loja_fk},
                    ${qtd}, 
                    ${qtdVendida}, 
                    ${estoqueAtual}, 
                    ${estoqueMax}, 
                    ${estoqueMin},
                    ${produto_fk}, 
                    ${compra_sugestao_fk}, 
                    ${precocusto}, 
                    '${origem}',
                    '${ean}' )`
    }).then(() => {
        statusInsert2 = "Registro inserido com sucesso"
    }).catch((err) => {
        statusInsert2 = err.message
    })

    const insertDetComb = await useDB({
        query: `INSERT INTO public.cd_compra_sugestao_det(
                id, 
                loja_fk, 
                qtd, 
                qtd_vendida, 
                estoqueatual, 
                estoquemax, 
                estoquemin,
                tipocombustivel_fk, 
                compra_sugestao_fk, 
                precocusto,
                origem,
                ean) VALUES (
                    ${idCompraSugestaoDet[0].idc + 1}, 
                    ${loja_fk},
                    ${qtd}, 
                    ${qtdVendida}, 
                    ${estoqueAtual}, 
                    ${estoqueMax}, 
                    ${estoqueMin},
                    ${tipocombustivel_fk}, 
                    ${compra_sugestao_fk}, 
                    ${precocusto}, 
                    '${origem}',
                    '${ean}' )`
    }).then(() => {
        statusInsert3 = "Registro inserido com sucesso"
    }).catch((err) => {
        statusInsert3 = err.message
    });

    const idCompraSugestaoDetloja = await useDB({
        query: `select max(id)+1 as idc from Cd_Compra_Sugestao_DetLoja where loja_Fk=${idLoja}`
    });


    const insertDetLojaProd = await useDB({
        query: `INSERT INTO public.cd_compra_sugestao_detloja(
                id, 
                loja_fk, 
                qtd, 
                qtd_vendida, 
                estoqueatual, 
                estoquemax, 
                estoquemin,
                produto_fk, 
                compra_sugestao_fk, 
                precocusto,
                loja,
                origem,
                encomendafk) VALUES (
                    ${idCompraSugestaoDetloja[0].idc}, 
                    ${loja_fk},
                    ${qtd}, 
                    ${qtdVendida}, 
                    ${estoqueAtual}, 
                    ${estoqueMax}, 
                    ${estoqueMin},
                    ${produto_fk}, 
                    ${compra_sugestao_fk}, 
                    ${precocusto}, 
                    ${loja},
                    '${origem}',
                    '${encomenda_fk}' )`
    }).then(() => {
        statusInsert4 = "Registro inserido com sucesso"
    }).catch((err) => {
        statusInsert4 = err.message
    })

    const insertDetLojaComb = await useDB({
        query: `INSERT INTO public.cd_compra_sugestao_detloja(
                id, 
                loja_fk, 
                qtd, 
                qtd_vendida, 
                estoqueatual, 
                estoquemax, 
                estoquemin,
                tipocombustivel_fk, 
                compra_sugestao_fk, 
                precocusto,
                loja) VALUES (
                    ${idCompraSugestaoDetloja[0].idc + 1}, 
                    ${loja_fk},
                    ${qtd}, 
                    ${qtdVendida}, 
                    ${estoqueAtual}, 
                    ${estoqueMax}, 
                    ${estoqueMin},
                    ${tipocombustivel_fk}, 
                    ${compra_sugestao_fk}, 
                    ${precocusto}, 
                    '${loja}' )`
    }).then(() => {
        statusInsert5 = "Registro inserido com sucesso"
    }).catch((err) => {
        statusInsert5 = err.message
    });





    return { code: 200, results: { compraSugestaoId, idCompraSugestao, statusInsert, idCompraSugestaoDet, statusInsert2, statusInsert3, idCompraSugestaoDetloja, statusInsert4, statusInsert5 } }
};

const pegarProdutosLoja = async function ({ }) {

    const loja = await useDB({
        query: "select * from Cf_Loja"
    });

    return { code: 200, results: { loja } }

};

const pegarestoques = async function ({ idLoja }) {

    const estoqueminMaior0 = await useDB({
        query: `select cd_produto.descricao_Prod, cd_fabricante.nome_Fab,cd_grupoproduto.descricao_Grpprod, cd_produto.dataaltera as a,cd_produto.usuarioaltera as b,cd_produto.id_Prod,cd_fabricante.id_Fab, cd_grupoproduto.id_Grpprod, cd_produto.classeterapeutica_Prod, es_estoquegeral.estoque,es_estoquegeral.estoquemin,es_estoquegeral.estoquemax,es_estoquegeral.precocusto_Prod  from Es_Estoquegeral , cd_produto, cd_fabricante, cd_grupoproduto where es_estoquegeral.loja_fk=${idLoja} and cd_produto.status_Prod='A' AND cd_produto.id_prod = es_estoquegeral.produto_fk AND cd_produto.fabricante_fk = cd_fabricante.id_fab AND cd_produto.grupoprod_fk = cd_grupoproduto.id_grpprod AND es_estoquegeral.estoquemin>0`
    });

    const estoquemaxMaior0 = await useDB({
        query: `select cd_produto.descricao_Prod, cd_fabricante.nome_Fab,cd_grupoproduto.descricao_Grpprod, cd_produto.dataaltera as a,cd_produto.usuarioaltera as b,cd_produto.id_Prod,cd_fabricante.id_Fab, cd_grupoproduto.id_Grpprod, cd_produto.classeterapeutica_Prod, es_estoquegeral.estoque,es_estoquegeral.estoquemin,es_estoquegeral.estoquemax,es_estoquegeral.precocusto_Prod  from Es_Estoquegeral , cd_produto, cd_fabricante, cd_grupoproduto where es_estoquegeral.loja_fk=${idLoja} and cd_produto.status_Prod='A' AND cd_produto.id_prod = es_estoquegeral.produto_fk AND cd_produto.fabricante_fk = cd_fabricante.id_fab AND cd_produto.grupoprod_fk = cd_grupoproduto.id_grpprod AND es_estoquegeral.estoquemax>0`
    });

    const estoques = { estoquemaxMaior0, estoqueminMaior0 }


    return { code: 200, results: { estoques } }

};

const listarcupons = async function ({ idLoja, inicio, fim, idProd }) {

    const cupons = await useDB({
        query: `SELECT distinct(id_prod),descricao_prod,classeterapeutica_prod, nome_fab,id_fab, descricao_grpprod,id_grpprod FROM ecf_cupomdet_prod AS det INNER JOIN cd_produto AS p ON p.id_prod=det.produto_fk INNER JOIN cd_fabricante AS f ON f.id_fab=p.fabricante_fk INNER JOIN cd_grupoproduto AS g ON g.id_grpprod=p.grupoprod_fk INNER JOIN ecf_cupomcab AS cab ON cab.id_cupomcab=det.cupomcab_fk WHERE status_prod ='A' AND status_cupom IN ('F','O','D') AND status_cupitem='F' AND det.loja_fk=${idLoja}  AND cab.loja_fk=${idLoja} AND (CAST(datahora_cupom AS DATE) BETWEEN '${inicio}'  AND '${fim}')`
    });

    const qteCupomItem = await useDB({
        query: `select sum(qtde_Cupitem) from Ecf_Cupomdet_Prod, ecf_cupomcab  where ecf_cupomdet_prod.loja_fk=${idLoja} and ecf_cupomdet_prod.produto_Fk=${idProd} and ecf_Cupomcab.status_Cupom in('F','O','D') and status_Cupitem='F'  and (cast(ecf_Cupomcab.datahora_Cupom as date) between '${inicio}'  and '${fim}') AND ecf_cupomcab.id_cupomcab = ecf_cupomdet_prod.cupomcab_fk`
    })

    return { code: 200, results: { cupons, qteCupomItem } }

};

const listarcuponsbico = async function ({ idLoja, inicio, fim, idTipoComb }) {

    const cupomBico = await useDB({
        query: `select cd_tipocombustivel.descricao_Tipcomb,ecf_Cupomcab.datahora_Cupom,Ecf_Cupomdet_Bico.loja_fk ,cd_tipocombustivel.id_Tipocombustivel from Ecf_Cupomdet_Bico , cd_tipocombustivel, ecf_cupomcab, cd_bico, cd_tanque  where ecf_cupomdet_bico.loja_fk=${idLoja}  and cd_bico.loja_Fk=${idLoja} and cd_tanque.loja_Fk=${idLoja} and ecf_Cupomcab.status_Cupom in('F','O','D') and ecf_cupomdet_bico.status_Cupdetbic='F'  and (cast(ecf_Cupomcab.datahora_Cupom as date) between '${inicio}'  and '${fim}') AND cd_tipocombustivel.id_tipocombustivel = cd_tanque.tipocombustivel_fk AND cd_tanque.id_tanque = cd_bico.tanque_fk AND cd_bico.id_bico = ecf_cupomdet_bico.bico_fk AND ecf_cupomdet_bico.cupomcab_fk = ecf_cupomcab.id_cupomcab order by ecf_Cupomcab.datahora_Cupom desc`
    });

    const qtdeCupom = await useDB({
        query: `select sum(qtde_Cupdetbic) from Ecf_Cupomdet_Bico, cd_bico, cd_tanque, cd_tipocombustivel, ecf_cupomcab where Ecf_Cupomdet_Bico.loja_fk=${idLoja} and cd_bico.loja_Fk=${idLoja} and cd_tanque.loja_Fk=${idLoja} and cd_tipocombustivel.id_Tipocombustivel=${idTipoComb} and ecf_Cupomcab.status_Cupom in('F','O','D') and ecf_cupomdet_bico.status_Cupdetbic='F'  and (cast(ecf_Cupomcab.datahora_Cupom as date) between '${inicio}'  and '${fim}') AND cd_tipocombustivel.id_tipocombustivel = cd_tanque.tipocombustivel_fk AND cd_tanque.id_tanque = cd_bico.tanque_fk AND cd_bico.id_bico = ecf_cupomdet_bico.bico_fk AND ecf_cupomdet_bico.cupomcab_fk = ecf_cupomcab.id_cupomcab `
    })

    return { code: 200, results: { cupomBico, qtdeCupom } }

};

const listarnfe = async function ({ idLoja, dataInicio, dataFim, idProd }) {

    const nfeProd = await useDB({
        query: `SELECT distinct(id_prod),descricao_prod,classeterapeutica_prod, nome_fab,id_fab, descricao_grpprod,id_grpprod FROM nfe_detalhe AS det INNER JOIN cd_produto AS p ON p.id_prod=det.produto_fk INNER JOIN cd_fabricante AS f ON f.id_fab=p.fabricante_fk INNER JOIN cd_grupoproduto AS g ON g.id_grpprod=p.grupoprod_fk INNER JOIN nfe_cabecalho AS cab ON cab.id_nfe_cabecalho=det.nfecab_fk WHERE status_prod ='A' AND statusnota_nfecab IN ('5') AND tipooperacao_nfecab IN ('2','3','8') AND det.loja_fk=${idLoja} AND cab.loja_fk=${idLoja} AND (CAST(dataentradasaida_nfecab AS DATE) BETWEEN '${dataInicio}'  AND '${dataFim}')`
    });

    const qtd = await useDB({
        query: `select sum(quantidade) from Nfe_Detalhe, nfe_cabecalho where nfe_detalhe.loja_fk=${idLoja} and nfe_detalhe.produto_Fk=${idProd} and (nfe_Cabecalho.tipooperacao_Nfecab='2' or nfe_Cabecalho.tipooperacao_Nfecab='3' or nfe_Cabecalho.tipooperacao_Nfecab='8' ) and nfe_Cabecalho.statusnota_Nfecab='5'  and (cast(nfe_Cabecalho.dataentradasaida_Nfecab  as date) between '${dataInicio}'  and '${dataFim}') AND nfe_detalhe.nfecab_fk = nfe_Cabecalho.id_nfe_cabecalho`
    });

    const qtd2 = await useDB({
        query: `select sum(quantidade) from Nfe_Detalhe, nfe_cabecalho where nfe_detalhe.loja_fk=${idLoja} and nfe_detalhe.produto_Fk=${idProd} and (nfe_Cabecalho.tipooperacao_Nfecab='2') and nfe_Cabecalho.statusnota_Nfecab='5'  and (cast(nfe_Cabecalho.dataentradasaida_Nfecab  as date) between '${dataInicio}'  and '${dataFim}') and nfe_Cabecalho.infcomplementares_Nfecab like 'Pedido:%' AND nfe_detalhe.nfecab_fk = nfe_Cabecalho.id_nfe_cabecalho`
    });

    return { code: 200, results: { nfeProd, qtd, qtd2 } }

};

const listarnfebico = async function ({ idLoja, dataInicio, dataFim, idProd }) {

    const tipoComb = await useDB({
        query: `select cd_tipocombustivel.descricao_Tipcomb, nfe_Cabecalho.dataentradasaida_Nfecab,cf_Loja.id_Loja, cd_tipocombustivel.id_Tipocombustivel from  Nfe_Detalhe, cd_tipocombustivel, nfe_cabecalho, cf_loja  where nfe_detalhe.loja_fk=${idLoja}  and (cast(nfe_Cabecalho.dataentradasaida_Nfecab as date) between '${dataInicio}'  and '${dataFim}') and (nfe_Cabecalho.tipooperacao_Nfecab='2' or nfe_Cabecalho.tipooperacao_Nfecab='3'  or nfe_Cabecalho.tipooperacao_Nfecab='8' ) and nfe_Cabecalho.statusnota_Nfecab='5'  AND nfe_detalhe.nfecab_fk = nfe_Cabecalho.id_nfe_cabecalho AND nfe_detalhe.tipocombustivel_fk = cd_tipocombustivel.id_tipocombustivel AND cf_loja.id_loja = nfe_detalhe.loja_fk order by nfe_Cabecalho.dataentradasaida_Nfecab desc`
    });

    const qtd = await useDB({
        query: `select sum(quantidade) from Nfe_Detalhe, nfe_cabecalho where nfe_detalhe.loja_fk=${idLoja} and nfe_detalhe.produto_Fk=${idProd} and (nfe_Cabecalho.tipooperacao_Nfecab='2' or nfe_Cabecalho.tipooperacao_Nfecab='3' or nfe_Cabecalho.tipooperacao_Nfecab='8' ) and nfe_Cabecalho.statusnota_Nfecab='5'  and (cast(nfe_Cabecalho.dataentradasaida_Nfecab  as date) between '${dataInicio}'  and '${dataFim}') AND nfe_detalhe.nfecab_fk = nfe_Cabecalho.id_nfe_cabecalho`
    });

    return { code: 200, results: { tipoComb, qtd } }

};

const listarseried = async function ({ idLoja, dataInicio, dataFim, idProd }) {

    const produto = await useDB({
        query: `select cd_produto.descricao_Prod, cd_fabricante.nome_Fab, cd_grupoproduto.descricao_Grpprod, vd_seried.datadoc, cf_Loja.id_Loja, cd_produto.id_Prod, cd_fabricante.id_Fab,cd_grupoproduto.id_Grpprod,cd_produto.classeterapeutica_Prod from vd_seried_Detalhe, cd_produto, cd_fabricante, cd_grupoproduto, vd_seried, cf_loja where vd_seried_detalhe.loja_fk=${idLoja} and (vd_seried.datadoc between '${dataInicio}'  and '${dataFim}') and vd_seried.situacao=1 and cd_produto.status_Prod='A' AND vd_seried_detalhe.produto_fk = cd_produto.id_prod AND cd_produto.fabricante_fk = cd_fabricante.id_fab AND cd_produto.grupoprod_fk = cd_grupoproduto.id_grpprod AND vd_seried_detalhe.seried_fk = vd_seried.id AND vd_seried_detalhe.loja_fk = cf_loja.id_loja order by vd_seried.datadoc  desc`
    });

    const qteSeried = await useDB({
        query: `select sum(qtde_Serieddet) from Vd_Seried_Detalhe, vd_seried where vd_seried_detalhe.loja_fk=${idLoja} and Vd_Seried_Detalhe.produto_Fk=${idProd} and vd_Seried.situacao=1 and (vd_Seried.datadoc between '${dataInicio}'  and '${dataFim}') AND vd_seried_detalhe.seried_fk = vd_seried.id`
    })

    return { code: 200, results: { produto, qteSeried } }

};

const listarm1 = async function ({ idLoja, dataInicio, dataFim, idProd }) {

    const produto = await useDB({
        query: `select cd_produto.descricao_Prod, cd_fabricante.nome_Fab, cd_grupoproduto.descricao_Grpprod, vd_m1.datadoc, cf_Loja.id_Loja, cd_produto.id_Prod, cd_fabricante.id_Fab,cd_grupoproduto.id_Grpprod,cd_produto.classeterapeutica_Prod from vd_m1_Detalhe, cd_produto, cd_fabricante, cd_grupoproduto, vd_m1, cf_loja where vd_m1_detalhe.loja_fk=${idLoja} and (vd_m1.datadoc between '${dataInicio}'  and '${dataFim}') and vd_m1.situacao=1 and (vd_M1.tipooperacao='2' or vd_M1.tipooperacao='5' or vd_M1.tipooperacao='8') and cd_produto.status_Prod='A' AND vd_m1_detalhe.produto_fk = cd_produto.id_prod AND cd_produto.fabricante_fk = cd_fabricante.id_fab AND cd_produto.grupoprod_fk = cd_grupoproduto.id_grpprod AND vd_m1_detalhe.m1_fk = vd_m1.id_m1 AND vd_m1_detalhe.loja_fk = cf_loja.id_loja order by vd_m1.datadoc  desc`
    });

    const qtd = await useDB({
        query: `select sum(qtde_M1) from Vd_M1_Detalhe, vd_m1 where vd_m1_detalhe.loja_fk=${idLoja} and vd_m1_detalhe.produto_Fk=${idProd} and vd_M1.situacao=1  and (vd_M1.tipooperacao='2' or vd_M1.tipooperacao='5' or vd_M1.tipooperacao='8') and (vd_M1.datadoc between '${dataInicio}' and '${dataFim}') AND vd_m1_detalhe.m1_fk = vd_m1.id_m1`
    })

    return { code: 200, results: { produto, qtd } }

};

const setarestoqueqtd = async function ({ idLoja, idProd }) {

    const estoque = await useDB({
        query: `select estoque,estoquemin,estoquemax,precocusto_Prod from Es_Estoquegeral where loja_fk=${idLoja} and produto_Fk=${idProd}`
    });

    return { code: 200, results: { estoque } }

};

const setarestoqueqtdbico = async function ({ idLoja, idTipoCombustivel }) {

    const tanque = await useDB({
        query: ` select estoque_Tanque, estoquemin_Tanque, capacidade_Tanque from Cd_Tanque where loja_Fk=${idLoja} and tipocombustivel_Fk=${idTipoCombustivel}`
    });

    return { code: 200, results: { tanque } }

};

const ultimacompra = async function ({ idLoja, idProd }) {

    const compraDetalhe = await useDB({
        query: `select fn_Compra_Cabecalho.dataentradasaida_Compracab, valorunitario, valordesconto from Fn_Compra_Detalhe, fn_compra_cabecalho where fn_compra_detalhe.loja_Fk=${idLoja} and produto_Fk=${idProd} AND fn_compra_detalhe.compracab_fk = fn_compra_cabecalho.id_compracab order by fn_Compra_Cabecalho.dataentradasaida_Compracab desc`
    });

    return { code: 200, results: { compraDetalhe } }

};

const ultimacomprabico = async function ({ idLoja, idTipoCombustivel }) {

    const compraDetalhe = await useDB({
        query: `select fn_Compra_Cabecalho.dataentradasaida_Compracab, valorunitario, valordesconto from Fn_Compra_Detalhe, fn_compra_cabecalho where fn_compra_detalhe.loja_Fk=${idLoja} and fn_compra_detalhe.tipocombustivel_fk=${idTipoCombustivel} AND fn_compra_detalhe.compracab_fk = fn_compra_cabecalho.id_compracab order by fn_Compra_Cabecalho.dataentradasaida_Compracab desc`
    });

    return { code: 200, results: { compraDetalhe } }

};

const pegarEstoquesZero = async function ({ }) {

    const estoque = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE estoque=0`
    });

    return { code: 200, results: { estoque } }

};

const pegarQuantidadeVendidaporLoja = async function ({ idLoja, dataInicio, dataFim }) {

    const produto = await useDB({
        query: `select produto_fk,qtde_cupitem from ecf_cupomdet_prod as det  inner join ecf_cupomcab as cab  on (cab.id_cupomcab=det.cupomcab_fk and cab.loja_fk=det.loja_fk)  where det.loja_fk=${idLoja} and cab.status_cupom in ('F','O') and cab.coo_cupom!=0  and status_cupitem='F'  and cab.datahora_cupom between '${dataInicio}'  and '${dataFim}'`
    });

    const nfeDetalhe = await useDB({
        query: `select produto_fk,quantidade from nfe_detalhe as det  inner join nfe_cabecalho as cab  on (cab.id_nfe_cabecalho=det.nfecab_fk and cab.loja_fk=det.loja_fk)  where det.loja_fk=${idLoja}  and cab.dataentradasaida_nfecab between '${dataInicio}'  and '${dataFim}' and  statusnota_nfecab='5' and tipooperacao_nfecab in ('2','3','8')`
    });

    const seried = await useDB({
        query: `select produto_fk,qtde_serieddet from vd_seried_detalhe as det  inner join  vd_seried as cab  on (cab.id=det.seried_fk and cab.loja_fk=det.loja_fk) where det.loja_fk=${idLoja}  and cab.datadoc between '${dataInicio}'  and '${dataFim}'`
    })

    return { code: 200, results: { produto, nfeDetalhe, seried } }

};

const pegarQuantidadeVendida = async function ({ idLoja, dataInicio, dataFim, idProd }) {

    const cupomDet = await useDB({
        query: `select produto_fk,qtde_cupitem  from ecf_cupomdet_prod as det  inner join ecf_cupomcab as cab  on (cab.id_cupomcab=det.cupomcab_fk and cab.loja_fk=det.loja_fk)  where det.loja_fk=${idLoja}  and status_cupom in ('F','O') and status_cupitem='F'  and det.produto_fk=${idProd} and cab.datahora_cupom between '${dataInicio}'  and '${dataFim}'`
    });

    const nfeDetalhe = await useDB({
        query: `select produto_fk,quantidade  from nfe_detalhe as det  inner join nfe_cabecalho as cab  on (cab.id_nfe_cabecalho=det.nfecab_fk and cab.loja_fk=det.loja_fk)  where det.loja_fk=${idLoja}  and det.produto_fk=${idProd} and cab.dataentradasaida_nfecab between '${dataInicio}'  and '${dataFim}' and  statusnota_nfecab='5' and tipooperacao_nfecab in ('2','3','8')`
    });

    const seried = await useDB({
        query: `select produto_fk,qtde_serieddet  from vd_seried_detalhe as det  inner join  vd_seried as cab  on (cab.id=det.seried_fk and cab.loja_fk=det.loja_fk) where det.loja_fk=${idLoja}  and det.produto_fk=${idProd} and cab.datadoc between '${dataInicio}'  and '${dataFim}' `
    })

    return { code: 200, results: { cupomDet, nfeDetalhe, seried } }

};

const pegarEncomendas = async function ({ idLoja, dataInicio, dataFim }) {

    const encomenda = await useDB({
        query: `SELECT * FROM Vd_Encomendadet, vd_Encomendacab WHERE vd_Encomendacab.status_Encomenda='A' and (cast(vd_Encomendacab.dataaltera as date) between '${dataInicio}'  and '${dataFim}') and vd_Encomendacab.loja_fk=${idLoja} AND vd_encomendadet.encomendacab_fk = vd_encomendacab.id_encomendacab`
    });

    return { code: 200, results: { encomenda } }

};

const pegarEstoquesProduto = async function ({ idProd, idLoja }) {

    const estoque1 = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd}`
    });

    const estoque2 = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_Fk=${idLoja}`
    })

    return { code: 200, results: { estoque1, estoque2 } }

};

const pegarPrecoMedio = async function ({ idProd, idLoja }) {

    const precoMedio = await useDB({
        query: `SELECT precomediocompra_Prod FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_Fk=${idLoja}`
    });

    return { code: 200, results: { precoMedio } }

};

const pegarEstoqueMin = async function ({ idProd, idLoja }) {

    const estoqueMin = await useDB({
        query: `SELECT estoquemin FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_Fk=${idLoja}`
    });

    return { code: 200, results: { estoqueMin } }

};

const pegarEstoqueMax = async function ({ idProd, idLoja }) {

    const estoqueMax = await useDB({
        query: `SELECT estoqueMax FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_Fk=${idLoja}`
    });

    return { code: 200, results: { estoqueMax } }

};

const pegarEstoqueAtual = async function ({ idProd, idLoja }) {

    const estoque = await useDB({
        query: `SELECT estoque FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_Fk=${idLoja}`
    });

    return { code: 200, results: { estoque } }

};

const pegarCurva = async function ({ idProd, idLoja }) {

    const curva = await useDB({
        query: `SELECT abc FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_Fk=${idLoja}`
    });

    return { code: 200, results: { curva } }

};

const pegarCurvad = async function ({ idLoja, idProd }) {

    const curva = await useDB({
        query: `SELECT abc FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_Fk=${idLoja}`
    });

    return { code: 200, results: { curva } }

};

const pegarUltimaCompra = async function ({ idLoja, idProd }) {

    const ultimaCompra = await useDB({
        query: `SELECT dataultimacompra FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_Fk=${idLoja}`
    });

    return { code: 200, results: { ultimaCompra } }

};

const pesquisarCodigoProduto = async function ({ idProd }) {

    const produto = await useDB({
        query: `SELECT * FROM Cd_Produto WHERE id_Prod = ${idProd}`
    });

    return { code: 200, results: { produto } }

};

const pesquisarPorColunaproduto = async function({ colunaBuscaproduto, textoBuscaproduto, codBarra }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Produto WHERE UPPER(CAST(${colunaBuscaproduto} as text))  like '%${textoBuscaproduto.toUpperCase().replaceAll("\D", "")}%' ORDER BY ${colunaBuscaproduto} ASC`
    }); 

    const codigoBarra = await useDB({ 
        query:`SELECT * FROM Cd_Codigobarras WHERE numero_Codbar LIKE '%${codBarra}%' AND ativo_Codbar='S'`  
    });
    

 return { code: 200, results: { pesquisa, codigoBarra }}  
    
};

const pesquisarPorColunaDescricao = async function({ textoBuscaproduto, colunaBuscaproduto, codBarra }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Produto WHERE CAST(descricao_Prod as text) like '%${textoBuscaproduto.toUpperCase().replaceAll("\D", "")}%' ORDER BY ${colunaBuscaproduto} ASC`
    }); 

    const codigoBarra = await useDB({ 
        query:`SELECT * FROM Cd_Codigobarras WHERE numero_Codbar LIKE '%${codBarra}%' AND ativo_Codbar='S'`  
    });

 return { code: 200, results: { pesquisa, codigoBarra }}  
    
};

const pegarEstoque = async function({ idProd, idLoja }){ 

    const estoque = await useDB({ 
        query: `SELECT estoque FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    }); 

 return { code: 200, results: { estoque }}  
    
};


const pegarCusto = async function({ idProd, idLoja }){ 

    const custo = await useDB({ 
        query:`SELECT precocusto_Prod FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}` 
    }); 

 return { code: 200, results: { custo }}  
    
};

const pegarCodigoDeBarras = async function({ idProd }){ 

    const codigoBarra = await useDB({ 
        query: `SELECT numero_codbar FROM public.cd_codigobarras where ativo_codbar='S' and produto_fk=${idProd}`
    }); 

 return { code: 200, results: { codigoBarra }}  
    
};

const pegarCodigoDeBarrasx = async function({ idProd, idTipoCombustivel }){ 

    const produto = await useDB({ 
        query: `select * from Cd_Produto where id_Prod=${idProd}` 
    }); 

    const combustivel = await useDB({ 
        query:  `select * from Cd_Tipocombustivel where id_Tipocombustivel=${idTipoCombustivel}`
    });

    const codBarra = await useDB({ 
        query: `SELECT numero_codbar FROM public.cd_codigobarras where ativo_codbar='S' and produto_fk=${idProd}` 
    })

 return { code: 200, results: { produto, combustivel, codBarra }}  
    
};

const pegarConf = async function({ idLoja }){ 

    const conf = await useDB({ 
        query: `SELECT * FROM Cf_Config_Geral WHERE loja_fk=${idLoja}`
    }); 

 return { code: 200, results: { conf }}  
    
};

const processar2 = async function({ idLoja, DataCupom, DataNfe, DataSeried, DataProdutoCupomDet, idProd }){ 

    const cupomDet = await useDB({ 
        query: `SELECT count(produto_fk) FROM ecf_cupomdet_prod as det inner join ecf_cupomcab as cab on (cab.id_cupomcab=det.cupomcab_fk and cab.loja_fk=det.loja_fk)  where det.loja_fk=${idLoja}  and cab.status_cupom in ('F','O') and cab.coo_cupom!=0  and status_cupitem='F'  and (cast(cab.datahora_cupom as date) between '${DataCupom.dataInicio}' and '${DataCupom.dataFim}')`
    }); 

    const nfeDet = await useDB({ 
        query: `select count(produto_fk) from nfe_detalhe as det inner join nfe_cabecalho as cab on (cab.id_nfe_cabecalho=det.nfecab_fk and cab.loja_fk=det.loja_fk)  where det.loja_fk=${idLoja} and (cast(cab.dataentradasaida_nfecab as date) between '${DataNfe.dataInicio}' and '${DataNfe.dataFim}')`
    });

    const seried = await useDB({ 
        query:  `select count(produto_fk) from vd_seried_detalhe as det inner join  vd_seried as cab on (cab.id=det.seried_fk and cab.loja_fk=det.loja_fk)  where det.loja_fk=${idLoja} and (cab.datadoc between '${DataSeried.dataInicio}' and '${DataSeried.dataFim}') ;`
    });

    const produtoCupomDet = await useDB({ 
        query: `SELECT produto_fk,qtde_cupitem,valorfinal_cupitem,grupoprod_fk FROM ecf_cupomdet_prod as det inner join ecf_cupomcab as cab on (cab.id_cupomcab=det.cupomcab_fk and cab.loja_fk=det.loja_fk) inner join cd_produto as prod on prod.id_prod = det.produto_fk where det.loja_fk=${idLoja} and status_cupom in ('F','O') and status_cupitem='F'  and (cast(cab.datahora_cupom as date) between '${DataProdutoCupomDet.dataInicio}' and '${DataProdutoCupomDet.dataFim}')`
    });

    const produto = await useDB({ 
        query:  `SELECT id_prod, grupoprod_fk,descricao_grpprod,fabricante_fk,nome_fab,descricao_prod FROM public.cd_produto as p inner join cd_grupoproduto as gp on p.grupoprod_fk=gp.id_grpprod  inner join cd_fabricante as f on p.fabricante_fk=f.id_fab where id_prod=${idProd}`
    });

    const seriedDetalhe = await useDB({ 
        query: `select produto_fk,qtde_serieddet,valortotal_serieddet,grupoprod_fk from vd_seried_detalhe as det inner join  vd_seried as cab on (cab.id=det.seried_fk and cab.loja_fk=det.loja_fk) inner join cd_produto as prod on prod.id_prod = det.produto_fk where det.loja_fk=${idLoja} and (cab.datadoc between '${DataSeried.dataInicio}' and '${DataSeried.dataFim}')`
    })


 return { code: 200, results: { cupomDet, nfeDet, seried, produtoCupomDet, produto, seriedDetalhe }}  
    
};


const atualizaCadastros = async function({ idLoja, idProdA, idProdB, idProdC, idProdD }){ 

    let statusUpdate1 = "", statusUpdate2 = "", statusUpdate3 = "", statusUpdate4 = "", statusUpdate5 = "";

    const update1 = await useDB({ 
        query: `UPDATE es_estoquegeral SET  abc='' where loja_fk=${idLoja}`
    }).then(()=>{
        statusUpdate1 = "Registro atualizado com sucesso";
    }).catch((err)=>{
        statusUpdate1 = err.message;
    });

    const update2 = await useDB({ 
        query: `UPDATE es_estoquegeral SET abc='A' where loja_fk=${idLoja} and produto_fk=${idProdA}` 
    }).then(() => {
        statusUpdate2 = `atualizando curva abc do produto ${idProdA} para 'A'`
    }).catch((err) => {
        statusUpdate2 = err.message
    })

    const update3 = await useDB({ 
        query: `UPDATE es_estoquegeral SET abc='B' where loja_fk=${idLoja} and produto_fk=${idProdB}` 
    }).then(() => {
        statusUpdate3 = `atualizando curva abc do produto ${idProdB} para 'B'`
    }).catch((err) => {
        statusUpdate3 = err.message
    });

    const update4 = await useDB({ 
        query: `UPDATE es_estoquegeral SET abc='C' where loja_fk=${idLoja} and produto_fk=${idProdC}` 
    }).then(() => {
        statusUpdate4 = `atualizando curva abc do produto ${idProdC} para 'C'`
    }).catch((err) => {
        statusUpdate4 = err.message
    })

    const update5 = await useDB({ 
        query: `UPDATE es_estoquegeral SET abc='D' where loja_fk=${idLoja} and produto_fk=${idProdD}` 
    }).then(() => {
        statusUpdate5 = `atualizando curva abc do produto ${idProdD} para 'D'`
    }).catch((err) => {
        statusUpdate5 = err.message
    })

 return { code: 200, results: { statusUpdate1, statusUpdate2, statusUpdate3, statusUpdate4, statusUpdate5} }  
    
};


module.exports = {
    cProduto,
    pesquisarPorColunaprodutox,
    pesquisarPorColunaDescricaox,
    pesquisarCodigoProdutox,
    listarFabricantes,
    listarGrupos,
    pesquisarPorColuna,
    excluirItens,
    excluir,
    selecionar,
    atualizaprodutosb,
    ultimofornecedor,
    preencherListaBusca,
    listaForn,
    sugerir,
    contadores,
    salvar,
    pegarProdutosLoja,
    pegarestoques,
    listarcupons,
    listarcuponsbico,
    listarnfe,
    listarnfebico,
    listarseried,
    listarm1,
    setarestoqueqtd,
    setarestoqueqtdbico,
    ultimacompra,
    ultimacomprabico,
    pegarEstoquesZero,
    pegarQuantidadeVendidaporLoja,
    pegarQuantidadeVendida,
    pegarEncomendas,
    pegarEstoquesProduto,
    pegarPrecoMedio,
    pegarEstoqueMin,
    pegarEstoqueMax,
    pegarEstoqueAtual,
    pegarCurva,
    pegarCurvad,
    pegarUltimaCompra,
    pesquisarCodigoProduto,
    pesquisarPorColunaproduto,
    pesquisarPorColunaDescricao,
    pegarEstoque,
    pegarCusto,
    pegarCodigoDeBarras,
    pegarCodigoDeBarrasx,
    pegarConf,
    processar2,
    atualizaCadastros
}