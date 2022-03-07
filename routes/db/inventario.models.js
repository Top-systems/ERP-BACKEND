const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const buscari = async function ({ campo, valor, idInventarioCab, idLoja }) {

    const inventarioDetProduto = await useDB({
        query: `select Lf_Inventario_Det.id, Lf_Inventario_Det.estoque, Lf_Inventario_Det.precocusto, Lf_Inventario_Det.valortotal, Lf_Inventario_Det.codigobarras, Lf_Inventario_Det.qtd_Entrada, Lf_Inventario_Det.qtd_Saida, Lf_Inventario_Det.estoque_Inicial, Lf_Inventario_Det.aliq_Icms, Lf_Inventario_Det.unidade, Lf_Inventario_Det.produto_Fk from Lf_Inventario_Det, lf_inventario_cab  where upper(cast(Lf_Inventario_Det.${campo} as text)) like '%${valor.toUpperCase()}%' and lf_Inventario_Cab.id=${idInventarioCab}  and lf_Inventario_Cab.loja_Fk=${idLoja} and Lf_Inventario_Det.produto_Fk is not null and Lf_Inventario_Det.tanque_Fk is null order by Lf_Inventario_Det.valortotal desc`
    });

    const inventarioDetTanque = await useDB({
        query: `select Lf_Inventario_Det.id, Lf_Inventario_Det.estoque, Lf_Inventario_Det.precocusto, Lf_Inventario_Det.valortotal, Lf_Inventario_Det.codigobarras, Lf_Inventario_Det.qtd_Entrada, Lf_Inventario_Det.qtd_Saida, Lf_Inventario_Det.estoque_Inicial, Lf_Inventario_Det.aliq_Icms, Lf_Inventario_Det.unidade, Lf_Inventario_Det.tanque_fk from Lf_Inventario_Det, lf_inventario_cab  where upper(cast(Lf_Inventario_Det.${campo} as text)) like '%${valor.toUpperCase()}%' and lf_Inventario_Cab.id=${idInventarioCab}  and lf_Inventario_Cab.loja_Fk=${idLoja} and Lf_Inventario_Det.produto_Fk is not null and Lf_Inventario_Det.tanque_Fk is null order by Lf_Inventario_Det.valortotal desc`
    });

    return { code: 200, results: { inventarioDet: inventarioDetProduto, inventarioDetTanque } }

};

const pesquisarPorColunaProduto = async function ({ colunaBuscaproduto, textoBuscaproduto }) {

    const produto = await useDB({
        query: `SELECT * FROM Cd_Produto WHERE UPPER(CAST(${colunaBuscaproduto} as text)) like '%${textoBuscaproduto.toUpperCase()}%' and movfisica_Prod='S' ORDER BY ${colunaBuscaproduto} ASC`
    });

    return { code: 200, results: { produto } }

};

const pegarclass = async function ({ idProd, idLoja, idTanque }) {

    const descricaoClassfic1 = await useDB({
        query: `select descricao_classfic from cd_produto as p inner join cd_tributacaoicms as i on i.id=p.tributacaoicms_fk inner join lf_classfiscal as l on l.id = i.classfiscal_fk where id_prod=${idProd} `
    });

    const descricaoClassfic2 = await useDB({
        query: `select descricao_classfic from cd_tanque as t inner join cd_tipocombustivel as p on p.id_tipocombustivel=t.tipocombustivel_fk inner join cd_tributacaoicms as i on i.id=p.tributacaoicms_fk inner join lf_classfiscal as l on l.id = i.classfiscal_fk where t.id_tanque=${idTanque} and t.loja_fk=${idLoja} `
    });

    return { code: 200, results: { descricaoClassfic1, descricaoClassfic2 } }

};

const pegarCusto = async function ({ idProd, idLoja }) {

    const precoCusto = await useDB({
        query: `SELECT precocusto_Prod FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { precoCusto } }

};

const pegarCodigoDeBarras = async function ({ idProd }) {

    const numCodBar = await useDB({
        query: `SELECT numero_codbar FROM public.cd_codigobarras where ativo_codbar='S' and produto_fk=${idProd} `
    });

    return { code: 200, results: { numCodBar } }

};

const onCellEdit = async function ({ updateInventarioDetData, idInventarioCab, idLoja }) {

    let statusUpdate;

    const updateInventarioDet = await useDB({
        query: `UPDATE public.lf_inventario_det SET estoque=${updateInventarioDetData.estoque}, precocusto=${updateInventarioDetData.precocusto}, valortotal=${updateInventarioDetData.valortotal}, qtd_entrada=${updateInventarioDetData.qtd_entrada},  qtd_saida=${updateInventarioDetData.qtd_saida}, estoque_inicial=${updateInventarioDetData.estoque_inicial} WHERE  loja_fk=${updateInventarioDetData.condicao.loja_fk} and id=${updateInventarioDetData.condicao.id} `
    }).then(() => {
        statusUpdate = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate = err.message;
    });

    const valorTotal = await useDB({
        query: `SELECT  sum(valortotal) FROM public.lf_inventario_det  where inventario_cab_fk=${idInventarioCab} and loja_fk=${idLoja} and (produto_fk is not null or tanque_fk is not null)`
    });

    return { code: 200, results: { statusUpdate, valorTotal } }

};

const excluir = async function ({ idInventarioCab, idLoja }) {

    const inventarioDet = await useDB({
        query: `select * from Lf_Inventario_Det where inventario_cab_fk=${idInventarioCab} and loja_Fk=${idLoja} order by id asc`
    });

    return { code: 200, results: { inventarioDet } }

};

const listar = async function ({ idLoja, idInventarioCab }) {

    const inventarioCab = await useDB({
        query: `select * from Lf_Inventario_Cab where loja_fk=${idLoja} order by id desc`
    });

    const valorTotal = await useDB({
        query: `SELECT sum(valortotal) FROM public.lf_inventario_det  where inventario_cab_fk=${idInventarioCab}  and loja_fk=${idLoja} and (produto_fk is not null or tanque_fk is not null)`
    });

    return { code: 200, results: { inventarioCab, valorTotal } }

};

const salvar = async function ({ idLoja, insertInventarioDetData, insertInventarioDetData2 }) {

    let statusInsert, statusInsert2

    const idInventarioCab = await useDB({
        query: `select max(id) from Lf_Inventario_Cab where loja_fk=${idLoja}`
    });

    const idInventarioDet = await useDB({
        query: `SELECT max(id)+1 as idc FROM public.lf_inventario_det where loja_fk=${idLoja} `
    });

    const insertInventarioDet = await useDB({
        query: `INSERT INTO lf_inventario_det( 
            id,
            loja_fk, 
            inventario_cab_fk, 
            produto_fk, 
            estoque, 
            precocusto, 
            valortotal, 
            qtd_entrada, 
            qtd_saida, 
            estoque_inicial,          
            unidade, 
            usuarioaltera, 
            dataaltera,
            aliq_icms,
            codigobarras,
            descricao,
            perdassobras) VALUES (
                ${idInventarioDet[0].idc},
                ${insertInventarioDetData.loja_fk}, 
                ${insertInventarioDetData.inventario_cab_fk}, 
                ${insertInventarioDetData.produto_fk}, 
                ${insertInventarioDetData.estoque}, 
                ${insertInventarioDetData.precocusto}, 
                ${insertInventarioDetData.valortotal}, 
                ${insertInventarioDetData.qtd_entrada}, 
                ${insertInventarioDetData.qtd_saida}, 
                ${insertInventarioDetData.estoque_inicial}, 
                ${insertInventarioDetData.unidade}, 
                ${insertInventarioDetData.usuarioaltera}, 
                '${insertInventarioDetData.dataaltera}',
                ${insertInventarioDetData.aliq_icms},
                ${insertInventarioDetData.codigobarras},
                '${insertInventarioDetData.descricao}',
                ${insertInventarioDetData.perdassobras});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const insertInventarioDet2 = await useDB({
        query: `INSERT INTO lf_inventario_det( 
            id,
            loja_fk, 
            inventario_cab_fk, 
            tanque_fk, 
            estoque, 
            precocusto, 
            valortotal, 
            qtd_entrada, 
            qtd_saida, 
            estoque_inicial,          
            unidade, 
            usuarioaltera, 
            dataaltera,
            aliq_icms,
            codigobarras,
            descricao,
            perdassobras) VALUES (
                ${idInventarioDet[0].idc},
                ${insertInventarioDetData2.loja_fk}, 
                ${insertInventarioDetData2.inventario_cab_fk}, 
                ${insertInventarioDetData2.tanque_fk}, 
                ${insertInventarioDetData2.estoque}, 
                ${insertInventarioDetData2.precocusto}, 
                ${insertInventarioDetData2.valortotal}, 
                ${insertInventarioDetData2.qtd_entrada}, 
                ${insertInventarioDetData2.qtd_saida}, 
                ${insertInventarioDetData2.estoque_inicial}, 
                ${insertInventarioDetData2.unidade}, 
                ${insertInventarioDetData2.usuarioaltera}, 
                '${insertInventarioDetData2.dataaltera}',
                ${insertInventarioDetData2.aliq_icms},
                ${insertInventarioDetData2.codigobarras},
                '${insertInventarioDetData2.descricao}',
                ${insertInventarioDetData2.perdassobras});`
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });

    return { code: 200, results: { idInventarioCab, idInventarioDet, statusInsert, statusInsert2 } }

};

const gerar = async function ({ idLoja, idTanque, dataInicial, dataFinal, idTipoComb, idProd, idInventarioCab }) {

    const tanqueComb = await useDB({
        query: `select id_tanque,descricao_tipcomb  from cd_tanque as cb inner join cd_tipocombustivel as tp on tp.id_tipocombustivel=cb.tipocombustivel_fk where cb.loja_fk=${idLoja}`
    });

    const compraCombDet = await useDB({
        query: `select  d.quantidade,det.estoque,det.valortotalitem,det.valorunitario,det.qtdecaixa from fn_compra_combustiveldet as d inner join fn_compra_detalhe as det on d.compradet_fk=det.id_compradet  inner join fn_compra_cabecalho as cab on cab.id_compracab=det.compracab_fk where d.tanque=${idTanque} and d.loja_fk=${idLoja} and det.loja_fk=${idLoja}  and cab.loja_fk=${idLoja}  and cab.naturezaoperacao_fk in  (SELECT id FROM public.cd_trib_naturezaoper  where tipooperacao='1') and (cast(cab.dataentradasaida_compracab as date)  between '${dataInicial}' and '${dataFinal}')`
    });

    const nfeDet = await useDB({
        query: `select  d.quantidade ,d.estoque,d.valortotalitem from  nfe_detalhe as d inner join nfe_cabecalho as cab on cab.id_nfe_cabecalho=d.nfecab_fk inner join cd_tanque  as t on t.tipocombustivel_fk=d.tipocombustivel_fk where t.id_tanque=${idTanque} and d.loja_fk=${idLoja}  and cab.loja_fk=${idLoja}  and t.loja_fk=${idLoja}  and cab.statusnota_nfecab in ('5')   and cab.tipooperacao_nfecab in ('2','3','5','8') and (cast(cab.dataemissao_nfecab as date) between '${dataInicial}'  and '${dataFinal}') `
    });

    const nfeDet2 = await useDB({
        query: `select  d.quantidade ,d.estoque,d.valortotalitem from  nfe_detalhe as d inner join nfe_cabecalho as cab on cab.id_nfe_cabecalho=d.nfecab_fk inner join cd_tanque  as t on t.tipocombustivel_fk=d.tipocombustivel_fk where t.id_tanque=${idTanque} and d.loja_fk=${idLoja}  and cab.loja_fk=${idLoja}  and t.loja_fk=${idLoja}  and cab.statusnota_nfecab in ('5')   and cab.tipooperacao_nfecab in ('4','1') and (cast(cab.dataemissao_nfecab as date) between '${dataInicial}'  and '${dataFinal}') `
    });

    const sumlmcDet = await useDB({
        query: `SELECT SUM((encerrantefinal-encerranteinicial)-afericao) as vt,tanque FROM cd_lmcdet AS s INNER JOIN cd_lmccab AS cab ON cab.id_lmccab=s.lmccab_fk WHERE s.loja_fk=${idLoja}AND s.tanque=${idTanque} AND cab.loja_fk=${idLoja} AND s.situacao='F' AND (datamovimento_lmccab BETWEEN '${dataInicial}' AND '${dataFinal}') group by tanque `
    });

    const tanque = await useDB({
        query: `select * from Cd_Tanque where id_Tanque=${idTanque} and loja_Fk=${idLoja}`
    });

    const compraCombDet2 = await useDB({
        query: `select  avg((((valortotalitem+subicmsvalor+ seguro+frete+ipi+outrasdespesas+fcpst)-  valordesconto)/det.quantidade)) as vu  from fn_compra_combustiveldet as d inner join fn_compra_detalhe as det on d.compradet_fk=det.id_compradet  inner join fn_compra_cabecalho as cab on cab.id_compracab=det.compracab_fk where d.tanque=${idTanque}  and d.loja_fk=${idLoja} and det.loja_fk=${idLoja}  and cab.loja_fk=${idLoja}  and cab.naturezaoperacao_fk in (SELECT id  FROM public.cd_trib_naturezaoper  where tipooperacao='1')  and (cast(cab.dataentradasaida_compracab as date) between '${dataInicial}' and '${dataFinal}') and det.quantidade>0`
    });

    const compraDet = await useDB({
        query: `SELECT  (((valortotalitem+subicmsvalor+ seguro+frete+ipi+outrasdespesas+fcpst)-  valordesconto)/quantidade) as vu FROM public.fn_compra_detalhe  where tipocombustivel_fk=${idTipoComb}  and loja_fk=${idTipoComb} and quantidade>0  order by  id_compradet desc  limit 1`
    });

    const estoque = await useDB({
        query: `SELECT estoque  FROM public.lf_inventario_det as d inner join lf_inventario_cab as cab on cab.id=d.inventario_cab_fk  where  cab.loja_fk=${idLoja}   and d.loja_fk=${idLoja}   and tanque_fk=${idTanque}  order by data_inventario desc `
    });

    const codigoBarra = await useDB({
        query: `select produto_fk,p.descricao_prod from cd_codigobarras as cb inner join cd_produto as p on p.id_prod =cb.produto_fk where cb.ativo_codbar='S' and p.status_prod='A' and p.movfisica_prod='S' and tipoitem_fk = 1 order by p.descricao_prod asc`
    });

    const compraDet2 = await useDB({
        query: `select  (d.quantidade*d.qtdecaixa) as qtd,d.estoque,d.valortotalitem,d.valorunitario,d.qtdecaixa from fn_compra_detalhe as d inner join fn_compra_cabecalho as cab on cab.id_compracab=d.compracab_fk where d.produto_fk=${idProd} and d.loja_fk=${idLoja}  and cab.loja_fk=${idLoja}  and cab.naturezaoperacao_fk in (SELECT id  FROM public.cd_trib_naturezaoper  where tipooperacao='1') and (cast(cab.dataentradasaida_compracab as date)  between '${dataInicial}' and '${dataFinal}')`
    });

    const m1 = await useDB({
        query: `select  d.qtde_m1 ,d.estoque_m1,d.valortotal_m1 from vd_m1_detalhe as d inner join vd_m1 as cab on cab.id_m1=d.m1_fk where d.produto_fk=${idProd}  and d.loja_fk=${idLoja} and cab.situacao=1  and cab.loja_fk=${idLoja}  and cab.tipooperacao in ('1','4') and (cab.datadoc between '${dataInicial}' and '${dataFinal}')`
    });

    const m12 = await useDB({
        query: `select  d.qtde_m1 ,d.estoque_m1,d.valortotal_m1 from vd_m1_detalhe as d inner join vd_m1 as cab on cab.id_m1=d.m1_fk where d.produto_fk=${idProd}  and d.loja_fk=${idLoja} and cab.situacao=1  and cab.loja_fk=${idLoja}  and cab.tipooperacao in ('2','4') and (cab.datadoc between '${dataInicial}' and '${dataFinal}')`
    });

    const nfeDet3 = await useDB({
        query: `select  d.quantidade ,d.estoque,d.valortotalitem from  nfe_detalhe as d inner join nfe_cabecalho as cab on cab.id_nfe_cabecalho=d.nfecab_fk where d.produto_fk=${idProd} and d.loja_fk=${idLoja} and cab.statusnota_nfecab in ('5')   and cab.loja_fk=${idLoja}  and cab.tipooperacao_nfecab in ('2','3','5','8') and (cast(cab.dataemissao_nfecab as date) between '${dataInicial}'  and '${dataFinal}') `
    });

    const nfeDet4 = await useDB({
        query: `select  d.quantidade ,d.estoque,d.valortotalitem from  nfe_detalhe as d inner join nfe_cabecalho as cab on cab.id_nfe_cabecalho=d.nfecab_fk where d.produto_fk=${idProd} and d.loja_fk=${idLoja} and cab.statusnota_nfecab in ('5')   and cab.loja_fk=${idLoja}  and cab.tipooperacao_nfecab in ('4', '1') and (cast(cab.dataemissao_nfecab as date) between '${dataInicial}'  and '${dataFinal}') and cab.statusnota_nfecab='F'`
    });

    const cupomDetProd = await useDB({
        query: `select  d.qtde_cupitem ,d.estoqueantprod_cupitem,d.valorfinal_cupitem from  ecf_cupomdet_prod as d inner join ecf_cupomcab as cab on cab.id_cupomcab=d.cupomcab_fk where d.produto_fk=${idProd} and d.loja_fk=${idLoja}  and cab.loja_fk=${idLoja}  and status_cupom in ('F','O') and status_cupitem='F'   and (cast(cab.datahora_cupom as date) between '${dataInicial}'  and '${dataFinal}')`
    });

    const vdSerieD = await useDB({
        query: `select  d.qtde_serieddet ,d.estoque_serieddet,d.valortotal_serieddet from vd_seried_detalhe as d inner join vd_seried as cab on cab.id=d.seried_fk where d.produto_fk=${idProd} and d.loja_fk=${idLoja} and cab.situacao=1 and cab.loja_fk=${idLoja}  and (cab.datadoc between '${dataInicial}' and '${dataFinal}')`
    });

    const produto = await useDB({
        query: `select * from Cd_Produto where id_Prod=${idProd}`
    })

    const numCodBar = await useDB({
        query: `SELECT numero_codbar FROM cd_codigobarras  WHERE produto_fk=${idProd} AND ativo_codbar='S'`
    });

    const estoquePC = await useDB({
        query: `select estoque,precocusto_prod as vp,precocusto_prod as vc from es_estoquegeral  where produto_fk=${idProd} and loja_fk=${idLoja}`
    });

    const valorQtde = await useDB({
        query: `select  d.valorunitario, d.qtdecaixa from fn_compra_detalhe as d inner join fn_compra_cabecalho as cab on cab.id_compracab=d.compracab_fk  where d.loja_fk=${idLoja} and cab.loja_fk=${idLoja}  and d.produto_fk=${idProd} and cab.naturezaoperacao_fk in (SELECT id  FROM public.cd_trib_naturezaoper  where tipooperacao='1')  and (cast(cab.dataentradasaida_compracab as date) <= '${dataFinal}') order by cab.dataentradasaida_compracab desc `
    });

    const inventarioDetEstoque = await useDB({
        query: `SELECT estoque FROM public.lf_inventario_det as d inner join lf_inventario_cab as cab on cab.id=d.inventario_cab_fk  where  cab.loja_fk=${idLoja}   and d.loja_fk=${idLoja}  and produto_fk=${idProd}  order by data_inventario desc `
    });

    const inventarioCab = await useDB({
        query: `SELECT  id FROM public.lf_inventario_cab   where loja_fk=${idLoja} order by id desc`
    });

    const inventarioDet = await useDB({
        query: `select * from Lf_Inventario_Det where loja_Fk=${idLoja} and inventario_cab_fk=${idInventarioCab} `
    });

    return { code: 200, results: { tanqueComb, compraCombDet, nfeDet, nfeDet2, sumlmcDet, tanque, compraCombDet2, compraDet, estoque, codigoBarra, compraDet2, m1, m12, nfeDet3, nfeDet4, cupomDetProd, vdSerieD, produto, numCodBar, estoquePC, valorQtde, inventarioDetEstoque, inventarioCab, inventarioDet } }

};

const perdassobrastanque = async function ({ idLoja, idTipoComb, dataInicial, dataFinal }) {

    const sumPerdasSobras = await useDB({
        query: `SELECT sum( perdas_sobras) FROM public.cd_lmcsituacao as s where loja_fk=${idLoja}  and tipocombustivel_fk=${idTipoComb}  and lmccab_fk in (SELECT id_lmccab  FROM public.cd_lmccab  where (cast(datamovimento_lmccab as date) between '${dataInicial}' and '${dataFinal}')  and loja_fk=${idLoja})`
    });

    const countIdTanque = await useDB({
        query: `SELECT count(id_tanque) as tt  from cd_tanque as t  where t.loja_fk=${idLoja}  and tipocombustivel_fk=${idTipoComb}`
    });

    return { code: 200, results: { sumPerdasSobras, countIdTanque } }

};

const novo = async function ({ idLoja }) {

    const dataInventario = await useDB({
        query: `SELECT  cast(data_inventario + INTERVAL '1' day as date) as dt FROM public.lf_inventario_cab  where loja_fk=${idLoja} order by id desc`
    });

    return { code: 200, results: { dataInventario } }

};

const abrirtanques = async function ({ idLoja, dataMovimento, idTanque }) {

    const lmcEstoque = await useDB({
        query: `select Cd_Lmcestoque.* from Cd_Lmcestoque, cd_lmccab where cd_lmccab.loja_Fk=${idLoja} and cd_Lmccab.datamovimento_Lmccab='${dataMovimento}' and cd_Lmcestoque.loja_Fk=${idLoja}  and cd_Lmccab.situacao='F'  order by tanque asc   `
    });

    const tanque = await useDB({
        query: `select  * from Cd_Tanque where id_Tanque=${idTanque} and loja_Fk=${idLoja} `
    });

    return { code: 200, results: { lmcEstoque, tanque } }

};

const setar = async function ({ idInventarioCab, idLoja }) {

    const inventarioDet = await useDB({
        query: `SELECT loja_fk, inventario_cab_fk, produto_fk, descricao, estoque, precocusto,  valortotal, qtd_entrada, qtd_saida, estoque_inicial, unidade, id, aliq_icms, codigobarras, tanque_fk,perdassobras FROM public.lf_inventario_det  where inventario_cab_fk=${idInventarioCab} and loja_fk=${idLoja} order by codigobarras asc`
    });

    const inventarioDet2 = await useDB({
        query: `select * from Lf_Inventario_Det where inventario_cab_fk=${idInventarioCab}  and loja_Fk=${idLoja} order by codigobarras asc `
    });

    return { code: 200, results: { inventarioDet, inventarioDet2 } }

};

const excluirp = async function ({ idLoja, idInventarioCab }) {

    const idInventario = await useDB({
        query: `SELECT count(id) FROM public.lf_inventario_det where loja_fk=${idLoja} and inventario_cab_fk=${idInventarioCab}`
    });

    const inventarioDetProd = await useDB({
        query: `select id,estoque,precocusto,valortotal,codigobarras, qtd_entrada,qtd_saida,estoque_inicial,aliq_icms,unidade,produto_fk, p.descricao_prod,perdassobras   from lf_inventario_det as d inner join cd_produto as p on p.id_prod=d.produto_fk  where inventario_cab_fk=${idInventarioCab} and d.loja_fk=${idLoja} and produto_fk is not null  and tanque_fk is null  order by valortotal,p.descricao_prod asc`
    });

    const inventarioDetTanque = await useDB({
        query: `select id,estoque,precocusto,valortotal,codigobarras, qtd_entrada,qtd_saida,estoque_inicial,aliq_icms,unidade,tanque_fk, tp.descricao_tipcomb,perdassobras   from lf_inventario_det as d inner join cd_tanque as t on t.id_tanque=d.tanque_fk  inner join cd_tipocombustivel as tp on tp.id_tipocombustivel=t.tipocombustivel_fk  where inventario_cab_fk=${idInventarioCab} and d.loja_fk=${idLoja} and t.loja_fk=${idLoja} and produto_fk is  null  and tanque_fk is not null  order by valortotal,tp.descricao_tipcomb asc`
    });

    const sumValorTotal = await useDB({
        query: `SELECT sum(valortotal) FROM public.lf_inventario_det  where inventario_cab_fk=${idInventarioCab}  and loja_fk=${idLoja} and (produto_fk is not null or tanque_fk is not null)`
    });

    return { code: 200, results: { idInventario, inventarioDetProd, inventarioDetTanque, sumValorTotal } }

};

const ok = async function ({ idLoja, insertInventarioDetData, idInventarioCab }) {

    let statusInsert;

    const idInventarioDet = await useDB({
        query: `SELECT max(id) + 1 as idc FROM public.lf_inventario_det where loja_fk=${idLoja} `
    });

    const insertInventarioDet = await useDB({
        query: `INSERT INTO lf_inventario_det( 
            id,
            loja_fk, 
            inventario_cab_fk, 
            produto_fk, 
            estoque, 
            precocusto, 
            valortotal, 
            qtd_entrada, 
            qtd_saida, 
            estoque_inicial,          
            unidade, 
            usuarioaltera, 
            dataaltera,
            aliq_icms,
            codigobarras,
            descricao,
            perdassobras) VALUES (
                ${idInventarioDet[0].idc},
                ${insertInventarioDetData.loja_fk}, 
                ${insertInventarioDetData.inventario_cab_fk}, 
                ${insertInventarioDetData.produto_fk}, 
                ${insertInventarioDetData.estoque}, 
                ${insertInventarioDetData.precocusto}, 
                ${insertInventarioDetData.valortotal}, 
                ${insertInventarioDetData.qtd_entrada}, 
                ${insertInventarioDetData.qtd_saida}, 
                ${insertInventarioDetData.estoque_inicial}, 
                ${insertInventarioDetData.unidade}, 
                ${insertInventarioDetData.usuarioaltera}, 
                '${insertInventarioDetData.dataaltera}',
                ${insertInventarioDetData.aliq_icms},
                ${insertInventarioDetData.codigobarras},
                '${insertInventarioDetData.descricao}',
                ${insertInventarioDetData.perdassobras});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const sumValorTotal = await useDB({
        query: `SELECT sum(valortotal) FROM public.lf_inventario_det  where inventario_cab_fk=${idInventarioCab}  and loja_fk=${idLoja} and (produto_fk is not null or tanque_fk is not null)`
    });

    return { code: 200, results: { idInventarioDet, statusInsert, sumValorTotal } }

};

const es = async function ({ idLoja, idProd, insertInventarioDetData, insertInventarioDetData2, idInventarioCab }) {

    let statusInsert, statusInsert2;

    const estoque = await useDB({
        query: ` select estoque from Es_Estoquegeral  where  loja_fk=${idLoja} and produto_Fk=${idProd} `
    });

    const estoqueGeral = await useDB({
        query: `select cd_produto.id_Prod, es_estoquegeral.estoque, es_estoquegeral.precocusto_Prod, lf_classfiscal.icms_Classfic, cd_unidade.sigla_Unid, cd_produto.descricao_Prod from   Es_Estoquegeral, cd_produto, cd_unidade, lf_classfiscal  where  es_estoquegeral.loja_fk=${idLoja} and cast(es_estoquegeral.estoque as double precision)>0  and es_estoquegeral.produto_Fk is not null and cd_produto.movfisica_Prod='S' and cd_produto.tipoitem_Fk= 1 AND es_estoquegeral.produto_fk = cd_produto.id_prod AND cd_produto.unidade_fk = cd_unidade.id_unid`
    });

    /* if (!det.isEmpty() && !x.toString().isEmpty()) {
        h = " and vo.produtoFk.idProd not in (" + x.toString() + ") ";
        h = h.replaceAll(",\\)", ")");
    }

    String detss = "select vo.produtoFk.idProd,vo.estoque,vo.precocustoProd,"
            + " vo.produtoFk.tributacaoicmsFk.classfiscalFk.icmsClassfic,"
            + " vo.produtoFk.unidadeFk.siglaUnid,"
            + " vo.produtoFk.descricaoProd,vo.produtoFk.idProd "
            + "  from   EsEstoquegeral vo "
            + " where  vo.cfLoja=" + loja.getIdLoja() + ""
            + " and cast(vo.estoque as double)>0 "
            + " " + h
            + " and vo.produtoFk is not null "
            + "  "
            + " and vo.produtoFk.movfisicaProd='S'"
            + " and vo.produtoFk.tipoitemFk.idTipoitem = 1";
 */


    const idInventarioDet = await useDB({
        query: `SELECT max(id) + 1 as idc FROM public.lf_inventario_det where loja_fk=${idLoja} `
    });

    const insertInventarioDet = await useDB({
        query: `INSERT INTO lf_inventario_det( 
            id,
            loja_fk, 
            inventario_cab_fk, 
            produto_fk, 
            estoque, 
            precocusto, 
            valortotal, 
            qtd_entrada, 
            qtd_saida, 
            estoque_inicial,          
            unidade, 
            usuarioaltera, 
            dataaltera,
            aliq_icms,
            codigobarras,
            descricao,
            perdassobras) VALUES (
                ${idInventarioDet[0].idc},
                ${insertInventarioDetData.loja_fk}, 
                ${insertInventarioDetData.inventario_cab_fk}, 
                ${insertInventarioDetData.produto_fk}, 
                ${insertInventarioDetData.estoque}, 
                ${insertInventarioDetData.precocusto}, 
                ${insertInventarioDetData.valortotal}, 
                ${insertInventarioDetData.qtd_entrada}, 
                ${insertInventarioDetData.qtd_saida}, 
                ${insertInventarioDetData.estoque_inicial}, 
                ${insertInventarioDetData.unidade}, 
                ${insertInventarioDetData.usuarioaltera}, 
                '${insertInventarioDetData.dataaltera}',
                ${insertInventarioDetData.aliq_icms},
                ${insertInventarioDetData.codigobarras},
                '${insertInventarioDetData.descricao}',
                ${insertInventarioDetData.perdassobras});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const tanque = await useDB({
        query:`select id_tanque, estoque_tanque,(SELECT  valorunitario FROM public.fn_compra_detalhe where  tipocombustivel_fk=tp.id_tipocombustivel  and loja_fk=${idLoja}  order by id_compradet desc limit 1) as vt,sigla_unid as aliq,sigla_unid, descricao_tipcomb, id_tanque as idc  from cd_tanque as cb inner join cd_tipocombustivel as tp on tp.id_tipocombustivel=cb.tipocombustivel_fk inner join cd_unidade as un on un.id_unid=tp.unidade_fk where cb.loja_fk=${idLoja} `
    });

    const insertInventarioDet2 = await useDB({
        query: `INSERT INTO lf_inventario_det( 
            id,
            loja_fk, 
            inventario_cab_fk, 
            tanque_fk, 
            estoque, 
            precocusto, 
            valortotal, 
            qtd_entrada, 
            qtd_saida, 
            estoque_inicial,          
            unidade, 
            usuarioaltera, 
            dataaltera,
            aliq_icms,
            codigobarras,
            descricao,
            perdassobras) VALUES (
                ${idInventarioDet[0].idc},
                ${insertInventarioDetData2.loja_fk}, 
                ${insertInventarioDetData2.inventario_cab_fk}, 
                ${insertInventarioDetData2.tanque_fk}, 
                ${insertInventarioDetData2.estoque}, 
                ${insertInventarioDetData2.precocusto}, 
                ${insertInventarioDetData2.valortotal}, 
                ${insertInventarioDetData2.qtd_entrada}, 
                ${insertInventarioDetData2.qtd_saida}, 
                ${insertInventarioDetData2.estoque_inicial}, 
                ${insertInventarioDetData2.unidade}, 
                ${insertInventarioDetData2.usuarioaltera}, 
                '${insertInventarioDetData2.dataaltera}',
                ${insertInventarioDetData2.aliq_icms},
                ${insertInventarioDetData2.codigobarras},
                '${insertInventarioDetData2.descricao}',
                ${insertInventarioDetData2.perdassobras});`
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });

    const sumValorTotal = await useDB({
        query:`SELECT sum(valortotal) FROM public.lf_inventario_det  where inventario_cab_fk=${idInventarioCab}  and loja_fk=${idLoja} and (produto_fk is not null or tanque_fk is not null)`
    });


    return { code: 200, results: { estoque, estoqueGeral, statusInsert, tanque, statusInsert2, sumValorTotal } }

};


module.exports = {
    buscari,
    pesquisarPorColunaProduto,
    pegarclass,
    pegarCusto,
    pegarCodigoDeBarras,
    onCellEdit,
    excluir,
    listar,
    salvar,
    gerar,
    perdassobrastanque,
    novo,
    abrirtanques,
    setar,
    excluirp,
    ok,
    es
}