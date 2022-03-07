const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const buscarchave = async function ({ idLoja, chave }) {

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    const idNfeManifesto = await useDB({
        query: `SELECT id FROM public.nfe_manifesto where chave='${chave}' and loja_fk=${idLoja}`
    })

    return { code: 200, results: { configNfe, idNfeManifesto } }

};

const init = async function ({ idLoja }) {

    let statusDelete = "";

    const configGeral = await useDB({
        query: `select * from Cf_Config_Geral where loja_fk=${idLoja}`
    });

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    //TIRAR LIMIT 100, coloquei so pra nao pesar nos testes
    const datahoraCupom = await useDB({
        query: `SELECT datahora_cupom FROM public.ecf_cupomcab where loja_fk=${idLoja} order by id_cupomcab desc LIMIT 100`
    });

    const deleted = await useDB({
        query: `DELETE FROM public.fn_compra_detalhe WHERE produto_fk is null and tipocombustivel_fk is null;`
    }).then(() => {
        statusDelete = "Registros apagados com sucesso"
    }).catch((err) => {
        statusDelete = err.message
    })

    return { code: 200, results: { configGeral, configNfe, datahoraCupom, statusDelete } }

};

const setareventomdf = async function ({ idLoja }) {

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    //TIRAR LIMIT 2, coloquei so pra nao pesar nos testes
    const nfeManifesto = await useDB({
        query: `select * from Nfe_Manifesto where loja_fk = ${idLoja} and ambiente='${configNfe[0].ambiente}' and empresa not in('ultimonsu','xml compra')  order by data_Emissao desc LIMIT 2`
    })


    return { code: 200, results: { configNfe, nfeManifesto } }

};

const listarnotasmanifestadas = async function ({ idLoja, ano, dataInicial, dataFinal, valores }) {


    const chaveAno = await useDB({
        query: `SELECT distinct chave FROM public.nfe_manifesto as n inner join fn_compra_cabecalho as cab on cab.chaveacesso_compracab=n.chave where cab.loja_fk=${idLoja} and n.loja_fk=${idLoja} and situacao_nota='3' and empresa not in('ultimonsu','xml compra') and to_char(dataentradasaida_compracab,'YYYY') ='${ano}'`
    });

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    const dataEmissao = await useDB({
        query: `select * from Nfe_Manifesto where Loja_fk = ${idLoja} and ambiente='${configNfe[0].ambiente}' and (data_Emissao between '${dataInicial}' and '${dataFinal}' ) and empresa not in('ultimonsu','xml compra') order by data_Emissao desc`
    });

    const nsu = await useDB({
        query: `select * from Nfe_Manifesto where loja_fk = ${idLoja} and ambiente='${configNfe[0].ambiente}' and nsu like '%${valores.nsu}%'  and empresa not in('ultimonsu','xml compra') order by nsu desc`
    });

    const empresa = await useDB({
        query: `select * from Nfe_Manifesto where loja_fk = ${idLoja} and ambiente='${configNfe[0].ambiente}' and upper(empresa) like '%${valores.empresa.toUpperCase()}%' and empresa not in('ultimonsu','xml compra') order by empresa desc`
    });

    const numero = await useDB({
        query: `select * from Nfe_Manifesto where loja_fk=${idLoja} and ambiente='${configNfe[0].ambiente}' and cast(numero as text) like '%${valores.numero}%'  and empresa not in('ultimonsu','xml compra') order by numero desc`
    });

    const chave = await useDB({
        query: `select * from Nfe_Manifesto where loja_fk= ${idLoja} and ambiente='${configNfe[0].ambiente}' and cast(chave as text) like '%${valores.chave}%'  and empresa not in('ultimonsu','xml compra') order by chave desc`
    });

    const valorNota = await useDB({
        query: `select * from Nfe_Manifesto where loja_fk=${idLoja} and ambiente='${configNfe[0].ambiente}' and cast(valor_Nota as text) like '%${valores.valorNota}%'  and empresa not in('ultimonsu','xml compra') order by valor_Nota  desc`
    });

    //LIMIT 1 POR MOTIVOS DE TESTE
    const cnpj = await useDB({
        query: `select * from Nfe_Manifesto where loja_fk= ${idLoja} and ambiente='${configNfe[0].ambiente}' and cast(cnpj as text) like '%${valores.cnpj}%' and empresa not in('ultimonsu','xml compra') order by cnpj desc LIMIT 1`
    });

    const manifestada = await useDB({
        query: `select * from Nfe_Manifesto where loja_fk= ${idLoja} and ambiente='${configNfe[0].ambiente}' and evento_Realizado='${valores.manifestada}' and empresa not in('ultimonsu','xml compra') order by cnpj desc`
    });

    const nfeManifesto = await useDB({
        query: `select * from Nfe_Manifesto where loja_fk = ${idLoja} and ambiente='${configNfe[0].ambiente}' and empresa not in('ultimonsu','xml compra')  order by data_Emissao desc LIMIT 2`
    });

    return { code: 200, results: { chaveAno, configNfe, dataEmissao, nsu, empresa, numero, chave, valorNota, cnpj, manifestada, nfeManifesto } }

};

const jalancado = async function ({ chave, idLoja }) {

    const chaveAcesso = await useDB({
        query: `SELECT  chaveacesso_compracab FROM public.fn_compra_cabecalho where chaveacesso_compracab='${chave}'  and loja_fk=${idLoja}`
    });

    return { code: 200, results: { chaveAcesso } }

};

const alterarlotemed = async function ({ idCompraMedicamento, idLoja }) {

    const compraMedicamento = await useDB({
        query: `select * from Fn_Compra_Medicamentodet where id_Compra_Medicamentodet=${idCompraMedicamento} and loja_Fk=${idLoja}`
    })

    return { code: 200, results: { compraMedicamento } }
};

const setarCompra = async function ({ idLoja, numDoc, idCompraCab, idCompraDet, idTanque }) {

    const compraCab = await useDB({
        query: `SELECT compracab_fk FROM public.nfe_docreferenciado where loja_fk=${idLoja} and num_doc=${numDoc}  and numserie_ecf='compra'`
    });

    const compraCabecalho = await useDB({
        query: `select * from Fn_Compra_Cabecalho where loja_Fk=${idLoja} and id_Compracab=${idCompraCab}`
    });

    const numDocFiscal = await useDB({
        query: `SELECT numerodocfiscal_nfecab,chaveacesso_nfecab FROM public.nfe_docreferenciado as d inner join nfe_cabecalho as cab on d.nfe_cabecalho_fk=cab.id_nfe_cabecalho where compracab_fk=${idCompraCab} and d.loja_fk=${idLoja} and cab.loja_fk=${idLoja}`
    });

    const numDocSerie = await useDB({
        query: `SELECT  cab.numdoc,cab.serie FROM public.vd_m1_docreferenciado as d inner join vd_m1 as cab on d.vd_m1_fk=cab.id_m1 where compracab_fk=${idCompraCab} and d.loja_fk=${idLoja}  and cab.loja_fk=${idLoja} and situacao=1 and  tipooperacao='5'`
    });

    const compraDet = await useDB({
        query: `select * from Fn_Compra_detalhe where compracab_fk=${idCompraCab} and loja_Fk=${idLoja} order by sequencia asc`
    });

    const compraMedicamentoDet = await useDB({
        query: `select * from Fn_Compra_Medicamentodet where compradet_fk=${idCompraDet} and loja_Fk=${idLoja}`
    });

    const compraCombustivelDet = await useDB({
        query: `select * from Fn_Compra_Combustiveldet where compradet_fk=${idCompraDet} and loja_Fk=${idLoja}`
    });

    const tanque = await useDB({
        query: `select * from Cd_Tanque where loja_Fk=${idLoja} and id_Tanque=${idTanque}`
    });

    const compraTransp = await useDB({
        query: `select * from Fn_Compra_Transp where compracab_fk=${idCompraCab} and loja_Fk=${idLoja}`
    });

    const compraFormula = await useDB({
        query: `select Fn_Compra_Formula.* from Fn_Compra_Formula, fn_compra_detalhe where compracab_fk=${idCompraCab} and Fn_Compra_Formula.loja_Fk=${idLoja} and fn_compra_formula.compradet_fk = fn_compra_detalhe.id_compradet`
    });

    const contasPagar = await useDB({
        query: `select * from Fn_Contaspagar where compra_fk=${idCompraCab} and loja_Fk=${idLoja} and status_Contaspagar!='D'`
    })

    return { code: 200, results: { compraCab, compraCabecalho, numDocFiscal, numDocSerie, compraDet, compraMedicamentoDet, compraCombustivelDet, tanque, compraTransp, compraFormula, contasPagar } }

};

const pesquisarPorColunaproduto = async function ({ colunaBuscaproduto, textoBuscaproduto, codigoBarra }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Cd_Produto WHERE UPPER(CAST(${colunaBuscaproduto} as text))  like '%${textoBuscaproduto.toUpperCase().replaceAll("\D", "")}%' ORDER BY ${colunaBuscaproduto} ASC`
    });

    const codigoBar = await useDB({
        query: `SELECT * FROM Cd_Codigobarras WHERE numero_Codbar LIKE '%${codigoBarra}%'`
    })

    return { code: 200, results: { pesquisa, codigoBar } }

};

const pesquisarPorColunaDescricao = async function ({ colunaBuscaproduto, textoBuscaproduto, codigoBarra }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Cd_Produto WHERE UPPER(CAST(descricao_prod as text))  like '%${textoBuscaproduto.toUpperCase().replaceAll("\D", "")}%' ORDER BY ${colunaBuscaproduto} ASC`
    });

    const codigoBar = await useDB({
        query: `SELECT * FROM Cd_Codigobarras WHERE numero_Codbar LIKE '%${codigoBarra}%'`
    })

    return { code: 200, results: { pesquisa, codigoBar } }

};

const pegarEstoque = async function ({ idProd, idLoja }) {

    const estoque = await useDB({
        query: `SELECT estoque FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { estoque } }

};

const pegarCusto = async function ({ idProd, idLoja }) {

    const custo = await useDB({
        query: `SELECT precocusto_Prod FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { custo } }

};
const verificaTanque2 = async function ({ idTipoCombustivel, idLoja }) {

    const tanque = await useDB({
        query: `SELECT * FROM Cd_Tanque WHERE tipocombustivel_Fk=${idTipoCombustivel} AND loja_Fk=${idLoja}`
    });

    return { code: 200, results: { tanque } }

};

const verificaTanque = async function ({ idTipoCombustivel, idLoja }) {

    const tanque = await useDB({
        query: `SELECT * FROM Cd_Tanque WHERE tipocombustivel_Fk=${idTipoCombustivel} AND loja_Fk=${idLoja}`
    });

    return { code: 200, results: { tanque } }

};

const atualizarPreco = async function ({ idProd, idLoja }) {

    const estoque = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { estoque } }

};

const pegarPrecoAtual = async function ({ idProd, idLoja }) {

    const preco = await useDB({
        query: `SELECT precovenda_Prod FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { preco } }

};

const pegarPrecocadastro = async function ({ idProd, idLoja }) {

    const preco = await useDB({
        query: `SELECT precocusto_Prod FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { preco } }

};

const pegarMargem = async function ({ idProd, idLoja }) {

    const margem = await useDB({
        query: `SELECT margem_Prod FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { margem } }

};

const pegarpv = async function ({ idProd, idLoja }) {

    const pv = await useDB({
        query: `SELECT precovenda_Prod FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { pv } }

};

const pegaremax = async function ({ idProd, idLoja }) {

    const emax = await useDB({
        query: `SELECT estoquemax FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { emax } }

};

const pegaremin = async function ({ idProd, idLoja }) {

    const emin = await useDB({
        query: `SELECT estoquemin FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { emin } }

};

const vincularProdutoFornecedor = async function ({ idLoja }) {

    const produtos = await useDB({
        query: `SELECT * FROM Cd_Produtofornec WHERE loja_Fk=${idLoja} ORDER BY id DESC`
    });

    return { code: 200, results: { produtos } }

};

const gerarPagamentos = async function ({ idCompraCab, idLoja }) {

    const contasPagar = await useDB({
        query: `select * from Fn_Contaspagar where compra_fk=${idCompraCab} and loja_Fk=${idLoja}  and  status_Contaspagar!='D'`
    });

    return { code: 200, results: { contasPagar } }

};

const confirmaCompra = async function ({ insertDataCompraDet, idLoja, idProd, idCompraDet, qtdeLote, numLote, insertDataCompraMedicamentoDet, insertDataAltesthist }) {

    let statusInsert = "", statusUpdate = "", statusUpdate2 = "", statusInsert2 = "", statusInsert3 = "";

    const tribUsuConsumo = await useDB({
        query: ` select * from Cd_Trib_Naturezaoper where descricao='USO CONSUMO'`
    });

    const tribCompraMercadoria = await useDB({
        query: ` select * from Cd_Trib_Naturezaoper where descricao='COMPRA MERCADORIA'`
    });

    const planoConta = await useDB({
        query: `select * from Cd_Plano_Conta where nome='NOTAS DE COMPRA'`
    });

    const insert = await useDB({
        query: `insert into fn_compra_detalhe(loja_fk,compracab_fk,id_compradet) values(${insertDataCompraDet.loja_fk},${insertDataCompraDet.compracab_fk},${insertDataCompraDet.id_compradet})`
    }).then(() => {
        statusInsert = `Registro inserido com sucesso`
    }).catch((err) => {
        statusInsert = `message: ${err.message} //// detail: ${err.detail}`;
    });

    const CompraDet = await useDB({
        query: `select max(id_Compradet)+1 as idc from Fn_Compra_Detalhe where loja_Fk=${idLoja}`
    });

    const estoque = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE loja_fk=${idLoja} AND produto_Fk=${idProd}`
    });

    const update = await useDB({
        query: `update es_estoquegeral set precoatacado1_prod=trunc((precocusto_prod+(precocusto_prod*(margematacado1_prod/100))),2), precoatacado2_prod=trunc((precocusto_prod+(precocusto_prod*(margematacado2_prod/100))),2) WHERE produto_fk=${idProd} and loja_fk=${idLoja}`
    }).then(() => {
        statusUpdate = "Registro atualizado com sucesso"
    }).catch(err => {
        statusUpdate = err.message;
    });

    const update2 = await useDB({
        query: `update fn_compra_medicamentodet set qtdelote=${qtdeLote} where loja_fk=${idLoja} and compradet_fk=${idCompraDet} `
    }).then(() => {
        statusUpdate2 = "Registro atualizado com sucesso"
    }).catch(err => {
        statusUpdate2 = err.message;
    });

    const lote = await useDB({
        query: `SELECT * FROM Cd_Lote WHERE loja_Fk=${idLoja} AND numero_Lote='${numLote}' AND produto_Fk=${idProd}`
    })

    const idLote = await useDB({
        query: `SELECT max(id_lote)+1 as idc FROM public.cd_lote where loja_fk=${idLoja}`
    })


    const insert2 = await useDB({
        query: `insert into fn_compra_medicamentodet  (
            id_compra_medicamentodet,
            loja_fk,
            lote_fk,
            compradet_fk,
            qtdelote,
            datafabricacao,
            datavalidade,
            dataaltera,
            usuarioaltera)values
            (${insertDataCompraMedicamentoDet.id_compra_medicamentodet},
             ${insertDataCompraMedicamentoDet.loja_fk},
             ${insertDataCompraMedicamentoDet.lote_fk},
             ${insertDataCompraMedicamentoDet.compradet_fk},
             ${insertDataCompraMedicamentoDet.qtdelote},
             '${insertDataCompraMedicamentoDet.datafabricacao}',
             '${insertDataCompraMedicamentoDet.datavalidade}',
             '${insertDataCompraMedicamentoDet.dataaltera}',
             ${insertDataCompraMedicamentoDet.usuarioaltera})`
    }).then(() => {
        statusInsert2 = `Registro inserido com sucesso`
    }).catch((err) => {
        statusInsert2 = `message: ${err.message} //// detail: ${err.detail}`;
    });

    const idCompraMedicamentoDet = await useDB({
        query: `SELECT max(id_compra_medicamentodet)+1 as idc FROM public.fn_compra_medicamentodet\n  where loja_fk=${idLoja} `
    });

    const compraMedicamentoDet = await useDB({
        query: `SELECT * FROM Fn_Compra_Medicamentodet WHERE loja_Fk=${idLoja} and compradet_Fk=${idCompraDet}`
    });

    const compraDetalhe = await useDB({
        query: `SELECT * FROM Fn_Compra_Detalhe WHERE loja_Fk=${idLoja} and id_Compradet=${idCompraDet}`
    });

    const tribNatureza = await useDB({
        query: `select * from Cd_Trib_Naturezaoper where descricao='COMPRA MERCADORIA'`
    })

    const estoque2 = await useDB({
        query: `select estoque from es_estoquegeral where loja_fk=${idLoja}  and produto_fk=${idProd}`
    });

    const idAltesthist = await useDB({
        query: `SELECT cast(max(id_altesthist)+1 as integer) as idc FROM public.es_altesthist where loja_fk=${idLoja} `
    });

    const insert3 = await useDB({
        query: `INSERT INTO public.es_altesthist(
            id_altesthist,
            loja_fk, 
            produto_fk, 
            datahora_altesthist, 
            qtdeant_altesthist, 
            qtdefinal_altesthist, 
            altestinv_altesthist, 
            usuarioaltera, 
            dataaltera) VALUES (
                ${idAltesthist[0].idc}, 
                ${insertDataAltesthist.loja_fk}, 
                ${insertDataAltesthist.produto_fk}, 
                '${insertDataAltesthist.datahora_altesthist}',  
                ${insertDataAltesthist.qtdeant_altesthist},  
                ${insertDataAltesthist.qtdefinal_altesthist}, 
                'C', 
                ${insertDataAltesthist.usuarioaltera}, 
                '${insertDataAltesthist.dataaltera}')`
    }).then(() => {
        statusInsert3 = `Registro inserido com sucesso`
    }).catch((err) => {
        statusInsert3 = `message: ${err.message} //// detail: ${err.detail}`;
    });

    return { code: 200, results: { tribUsuConsumo, tribCompraMercadoria, planoConta, statusInsert, CompraDet, estoque, statusUpdate, statusUpdate2, lote, idLote, statusInsert2, idCompraMedicamentoDet, compraMedicamentoDet, compraDetalhe, estoque, estoque2, tribNatureza, idAltesthist, statusInsert3 } }

};

const salvaitensformula = async function ({ idProd, idLoja, updateDataEstoque, insertDataCompraFormula }) {

    let statusUpdate = "", statusInsert = "";

    const formula = await useDB({
        query: `SELECT * FROM Cd_Formula where produto_Fk=${idProd}`
    });

    const estoque = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE loja_fk=${idLoja} AND produto_Fk=${idProd}`
    });

    const update = await useDB({
        query: `update es_estoquegeral set estoque = estoque+${updateDataEstoque.estoque}, usuarioaltera = ${updateDataEstoque.usuarioaltera}, dataaltera = '${updateDataEstoque.dataaltera}' where produto_fk = ${updateDataEstoque.condicao.produto_fk} and loja_fk = ${updateDataEstoque.condicao.loja_fk}`
    }).then(() => {
        statusUpdate = `Registro atualizado com sucesso`
    }).catch((err) => {
        statusUpdate = err.message
    })

    const idCompraFormula = await useDB({
        query: `SELECT max(id) + 1 as idc FROM public.fn_compra_formula`
    });

    const insert = await useDB({
        query: ` INSERT INTO public.fn_compra_formula(
            id, 
            loja_fk, 
            qtd, 
            produto_fk, 
            compradet_fk, 
            usuarioaltera, 
            estoqueant,
            dataaltera) VALUES (
                ${idCompraFormula[0].idc}, 
                ${insertDataCompraFormula.loja_fk},  
                ${insertDataCompraFormula.qtd}, 
                ${insertDataCompraFormula.produto_fk},  
                ${insertDataCompraFormula.compradet_fk},  
                ${insertDataCompraFormula.usuarioaltera}, 
                ${insertDataCompraFormula.estoqueant}, 
                '${insertDataCompraFormula.dataaltera}')`
    }).then(() => {
        statusInsert = `Registro inserido com sucesso`
    }).catch((err) => {
        statusInsert = err.message
    })

    return { code: 200, results: { formula, estoque, statusUpdate, idCompraFormula, statusInsert, } }

};

const pixml = async function ({ chave, idLoja, insertDataNfeManifesto }) {

    let statusInsert = "";

    const idNfeManifesto = await useDB({
        query: `SELECT id FROM nfe_manifesto where chave='${chave.replaceAll("\\D", "")}' and loja_fk=${idLoja}`
    });

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    const idManifesto = await useDB({
        query: `SELECT max(id)+1 as idc FROM public.nfe_manifesto where loja_fk=${idLoja}`
    });

    const insert = await useDB({
        query: `INSERT INTO public.nfe_manifesto( 
            id, 
            loja_fk, 
            empresa, 
            cnpj, 
            cpf, 
            ie, 
            numero, 
            chave,  
            ultimo_nsu, 
            data_emissao, 
            tipo_nota, 
            valor_nota, 
            situacao_nota, 
            situacao_confirmacao, 
            nsu, 
            evento_realizado,  
            ambiente, 
            protocolo,
            dataaltera) VALUES 
            (${idManifesto[0].idc}, 
            ${insertDataNfeManifesto.loja_fk},
            '${insertDataNfeManifesto.empresa}',
            '${insertDataNfeManifesto.cnpj}', 
            '${insertDataNfeManifesto.cpf}', 
            '${insertDataNfeManifesto.ie}',
            '${insertDataNfeManifesto.numero}', 
            '${insertDataNfeManifesto.chave.replaceAll("\\D", "")}',
            '0', 
            '${insertDataNfeManifesto.data_emissao}', 
            '1', 
            ${insertDataNfeManifesto.valor_nota}, 
            '1', 
            '1', 
            '0', 
            'N', 
            '${insertDataNfeManifesto.ambiente}',
            '${insertDataNfeManifesto.protocolo}',
            '${insertDataNfeManifesto.dataaltera}')`
    }).then(() => {
        statusInsert = `Registro inserido com sucesso`
    }).catch((err) => {
        statusInsert = err.message
    })




    return { code: 200, results: { idNfeManifesto, configNfe, idManifesto, statusInsert, } }

};

const pxml = async function ({ nomeCid, nomeTransp, cnpjTransp, codigoAnp, insertDataAnpComb, idProd, idLoja, chave, insertDataNfeManifesto }) {

    let statusInsert = "", statusUpdate = "", statusInsert2 = "";

    const CepCid = await useDB({
        query: `SELECT cd_cep.* FROM Cd_Cep, cd_cidade  WHERE cd_cidade.nome_Cid='${nomeCid}' AND cd_cep.cidade_fk = cd_cidade.id_cidade`
    });

    const cep = await useDB({
        query: `SELECT * FROM Cd_Cep order by id_Cep asc`
    })

    const transportadora = await useDB({
        query: `SELECT * FROM Cd_Transportadora WHERE nome_Transp='${nomeTransp}' OR cnpj_Transp='${cnpjTransp}'`
    });

    const codigoAnpComb = await useDB({
        query: `select codigo_anpcomb from cd_anpcombustivel where codigo_anpcomb='${codigoAnp}'`
    });

    const insert = await useDB({
        query: `INSERT INTO public.cd_anpcombustivel(descricao_anpcomb, codigo_anpcomb)VALUES ('${insertDataAnpComb.descricao_anpcomb}', '${insertDataAnpComb.codigo_anpcomb}');`
    }).then(() => {
        statusInsert = "Registro inserido com sucesso"
    }).catch((err) => {
        statusInsert = err.message
    });

    const update = await useDB({
        query: `update cd_produto set anpcombustivel_fk=(select id_anpcombustivel  from cd_anpcombustivel where codigo_anpcomb='${codigoAnp}' limit 1) where id_prod=${idProd} and (anpcombustivel_fk !=(select id_anpcombustivel from cd_anpcombustivel where codigo_anpcomb='${codigoAnp}' limit 1) OR anpcombustivel_fk IS null)`
    }).then(() => {
        statusUpdate = "Registro atualizado com sucesso"
    }).catch((err) => {
        statusUpdate = err.message
    });

    const NfeManifesto = await useDB({
        query: `select id from nfe_manifesto where loja_fk=${idLoja} and chave='${chave.replaceAll("\\D", "")}' and zip is not null `
    });

    const idNfeManifesto = await useDB({
        query: `select max(id)+1 as idc from nfe_manifesto where loja_fk=${idLoja} `
    });

    const insert2 = await useDB({
        query: `INSERT INTO public.nfe_manifesto(
            id, 
            loja_fk,  
            empresa,  
            chave, 
            zip, 
            ambiente)VALUES (
                ${idNfeManifesto[0].idc},
                ${insertDataNfeManifesto.loja_fk},
                '${insertDataNfeManifesto.empresa}',
                '${insertDataNfeManifesto.chave}',
                '${insertDataNfeManifesto.zip}',
                '${insertDataNfeManifesto.ambiente}');`
    }).then(() => {
        statusInsert2 = "Registro inserido com sucesso"
    }).catch((err) => {
        statusInsert2 = err.message
    })


    return { code: 200, results: { CepCid, transportadora, codigoAnpComb, statusInsert, statusUpdate, NfeManifesto, idNfeManifesto, statusInsert2 } }

};

const processarXMLManifesto = async function ({ chaveAcesso, idLoja, idManifesto, nomeCid, nomeTransp, cnpjTransp }) {

    const compraCabecalho = await useDB({
        query: `SELECT * FROM Fn_Compra_Cabecalho WHERE chaveacesso_Compracab='${chaveAcesso}' and loja_Fk=${idLoja}`
    });

    const tribNatureza = await useDB({
        query: `select * from Cd_Trib_Naturezaoper where descricao='COMPRA MERCADORIA'`
    });

    const zip = await useDB({
        query: `select zip from nfe_manifesto where id=${idManifesto} and loja_fk=${idLoja} `
    });

    const cep = await useDB({
        query: `SELECT cd_cep.* FROM Cd_Cep, cd_cidade  WHERE cd_cidade.nome_Cid='${nomeCid}' AND cd_cep.cidade_fk = cd_cidade.id_cidade`
    });

    const TodosCep = await useDB({
        query: `SELECT * FROM Cd_Cep order by id_Cep asc`
    });

    const transportadora = await useDB({
        query: `SELECT * FROM Cd_Transportadora WHERE nome_Transp='${nomeTransp}' OR cnpj_Transp='${cnpjTransp}'`
    });


    return { code: 200, results: { compraCabecalho, tribNatureza, zip, cep, transportadora } }

};

const LerNodet = async function ({ codProd2, idForn, idLoja, codProdFornec, codBarra, cest, insertDataCest }) {

    let statusInsert = "";

    const produtoFornecedor = await useDB({
        query: `SELECT * FROM Cd_Produtofornec WHERE (codprod2='${codProd2}') and codigobarras is not null  AND fornecedor_Fk=${idForn} and loja_Fk=${idLoja}  `
    });

    const produtoFornecedor2 = await useDB({
        query: `SELECT * FROM Cd_Produtofornec WHERE (codprodfornec=${codProdFornec}) and codigobarras is not null  AND fornecedor_Fk=${idForn} and loja_Fk=${idLoja}  and codprodfornec!=0`
    });

    const codigoBarra = await useDB({
        query: `SELECT * FROM Cd_Codigobarras WHERE numero_Codbar='${codBarra}' and numero_Codbar!='0000000000000'`
    });

    const CdCest = await useDB({
        query: `select * from Cd_Cest where cest='${cest}' `
    });

    const insert = await useDB({
        query: `INSERT INTO public.cd_cest(cest, ncm, descricao)VALUES ( '${insertDataCest.cest}', '${insertDataCest.ncm}','')`
    }).then(() => {
        statusInsert = "Registro inserido com sucesso"
    }).catch((err) => {
        statusInsert = err.message
    });

    const produtoFornecedor3 = await useDB({
        query: `SELECT * FROM Cd_Produtofornec WHERE loja_Fk=${idLoja} ORDER BY id DESC`
    })

    return { code: 200, results: { produtoFornecedor, produtoFornecedor2, codigoBarra, CdCest, statusInsert, produtoFornecedor3 } }

};

const LerNocabecalho = async function ({ chaveAcesso, idLoja }) {

    const compraCabecalho = await useDB({
        query: `select * from Fn_Compra_Cabecalho where chaveacesso_Compracab='${chaveAcesso}' and loja_Fk=${idLoja} `
    });

    return { code: 200, results: { compraCabecalho } }

};

const LerNoemitente = async function ({ cnpjTransp }) {

    const fornecedor = await useDB({
        query: `SELECT * FROM Cd_Fornecedor WHERE cpfcnpj_Forn='${cnpjTransp}'`
    });

    return { code: 200, results: { fornecedor } }

};

const LerNoProt = async function ({ chaveAcesso }) {

    const compraCab = await useDB({
        query: `SELECT * FROM Fn_Compra_Cabecalho WHERE chaveacesso_Compracab='${chaveAcesso}'`
    });

    return { code: 200, results: { compraCab } }

};

const LerNoTransp = async function ({ cnpjTransp, nomeCid }) {

    const Transp = await useDB({
        query: `SELECT * FROM Cd_Transportadora WHERE cnpj_Transp='${cnpjTransp}'`
    });

    const CepCid = await useDB({
        query: `SELECT cd_cep.* FROM Cd_Cep, cd_cidade  WHERE cd_cidade.nome_Cid='${nomeCid}' AND cd_cep.cidade_fk = cd_cidade.id_cidade`
    });

    return { code: 200, results: { Transp, CepCid } }

};

const excluir = async function ({ idProd, idLoja, updateDataEstoque, insertDataAltesthist }) {

    let statusUpdate = "", statusInsert = "";

    console.log(insertDataAltesthist);

    const estoqueGeral = await useDB({
        query: `select * from Es_Estoquegeral where produto_Fk=${idProd} and loja_fk=${idLoja}`
    });

    const updateEstoque = await useDB({
        query: `update es_estoquegeral set estoque = estoque- ${updateDataEstoque.Qtd} where produto_fk = ${updateDataEstoque.produto_fk} and loja_fk = ${updateDataEstoque.loja_fk}`
    }).then(() => {
        statusUpdate = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate = err.message;
    });

    const tribNarureza = await useDB({
        query: `select * from Cd_Trib_Naturezaoper where descricao='COMPRA MERCADORIA'`
    });

    const estoque = await useDB({
        query: `select estoque from es_estoquegeral where loja_fk=${idLoja}  and produto_fk=${idProd} `
    });

    const idAltesthist = await useDB({
        query: `SELECT cast(max(id_altesthist)+1 as integer) as idc FROM public.es_altesthist where loja_fk=${idLoja} `
    });

    const insert3 = await useDB({
        query: `INSERT INTO public.es_altesthist(
            id_altesthist,
            loja_fk, 
            produto_fk, 
            datahora_altesthist, 
            qtdeant_altesthist, 
            qtdefinal_altesthist, 
            altestinv_altesthist, 
            usuarioaltera, 
            dataaltera) VALUES (
                ${idAltesthist[0].idc}, 
                ${insertDataAltesthist.loja_fk}, 
                ${insertDataAltesthist.produto_fk}, 
                '${insertDataAltesthist.datahora_altesthist}',  
                ${insertDataAltesthist.qtdeant_altesthist},  
                ${insertDataAltesthist.qtdefinal_altesthist}, 
                'C', 
                ${insertDataAltesthist.usuarioaltera}, 
                '${insertDataAltesthist.dataaltera}')`
    }).then(() => {
        statusInsert = `Registro inserido com sucesso`
    }).catch((err) => {
        statusInsert = `message: ${err.message} //// detail: ${err.detail}`;
    });

    return { code: 200, results: { estoqueGeral, statusUpdate, tribNarureza, estoque, statusInsert } }

};

const adicionarLote3 = async function ({ idLoja, numLote, idProd, insertDataCompraMedicamentoDet, idCompradet }) {

    let statusInsert;

    const lote = await useDB({
        query: `SELECT * FROM Cd_Lote WHERE loja_Fk=${idLoja} AND numero_Lote='${numLote}' AND produto_Fk=${idProd}`
    });

    const idLote = await useDB({
        query: `SELECT max(id_lote) + 1 as idc FROM public.cd_lote where loja_fk=${idLoja} `
    });

    const idCompraMedicamento = await useDB({
        query: `SELECT max(id_compra_medicamentodet)+1 as idc FROM public.fn_compra_medicamentodet where loja_fk=${idLoja} `
    });

    const insert = await useDB({
        query: `insert into fn_compra_medicamentodet (
            id_compra_medicamentodet, 
            loja_fk,
            lote_fk,
            compradet_fk,
            qtdelote,
            datafabricacao,
            datavalidade,
            dataaltera,
            usuarioaltera) values(
                ${idCompraMedicamento[0].idc}, 
                ${insertDataCompraMedicamentoDet.loja_fk}, 
                ${insertDataCompraMedicamentoDet.lote_fk}, 
                ${insertDataCompraMedicamentoDet.compradet_fk}, 
                ${insertDataCompraMedicamentoDet.qtdelote}, 
                '${insertDataCompraMedicamentoDet.datafabricacao}', 
                '${insertDataCompraMedicamentoDet.datavalidade}',
                '${insertDataCompraMedicamentoDet.dataaltera}',
                ${insertDataCompraMedicamentoDet.usuarioaltera})`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const compraMedicamentoDet = await useDB({
        query: `select * from Fn_Compra_Medicamentodet where compradet_Fk=${idCompradet} and loja_Fk=${idLoja}`
    });

    return { code: 200, results: { lote, idLote, idCompraMedicamento, statusInsert, compraMedicamentoDet } }

};

const onCellEdit = async function ({ idCompraDet, idLoja, idProd, insertDataCompraMedicamentoDet }) {

    let statusInsert

    const tribNatureza = await useDB({
        query: `select * from Cd_Trib_Naturezaoper where descricao='COMPRA MERCADORIA'`
    });

    const compraDetalhe = await useDB({
        query: `select * from Fn_Compra_Detalhe where id_Compradet=${idCompraDet} and loja_Fk=${idLoja} `
    });

    const estoque = await useDB({
        query: `SELECT estoque FROM es_estoquegeral WHERE loja_fk=${idLoja} AND produto_fk=${idProd}`
    });

    const idCompraMedicamento = await useDB({
        query: `SELECT max(id_compra_medicamentodet)+1 as idc FROM public.fn_compra_medicamentodet where loja_fk=${idLoja} `
    });

    const insert = await useDB({
        query: `insert into fn_compra_medicamentodet (
            id_compra_medicamentodet, 
            loja_fk,
            lote_fk,
            compradet_fk,
            qtdelote,
            datafabricacao,
            datavalidade,
            dataaltera,
            usuarioaltera) values(
                ${idCompraMedicamento[0].idc}, 
                ${insertDataCompraMedicamentoDet.loja_fk}, 
                ${insertDataCompraMedicamentoDet.lote_fk}, 
                ${insertDataCompraMedicamentoDet.compradet_fk}, 
                ${insertDataCompraMedicamentoDet.qtdelote}, 
                '${insertDataCompraMedicamentoDet.datafabricacao}', 
                '${insertDataCompraMedicamentoDet.datavalidade}',
                '${insertDataCompraMedicamentoDet.dataaltera}',
                ${insertDataCompraMedicamentoDet.usuarioaltera})`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });


    return { code: 200, results: { tribNatureza, compraDetalhe, estoque, idCompraMedicamento, statusInsert } }

};

const pegarCodigoDeBarras = async function ({ idProd }) {

    const codBarra = await useDB({
        query: `SELECT numero_codbar FROM public.cd_codigobarras where ativo_codbar='S' and produto_fk=${idProd} `
    });

    return { code: 200, results: { codBarra } }

};

const pesquisarCodigoProduto = async function ({ idProd }) {

    const produto = await useDB({
        query: `SELECT * FROM Cd_Produto WHERE id_Prod = ${idProd}`
    });

    return { code: 200, results: { produto } }

};

const pesquisarCodigoCombustivel = async function ({ idTipoComb }) {

    const tipoCombustivel = await useDB({
        query: `SELECT * FROM Cd_Tipocombustivel  WHERE id_Tipocombustivel = ${idTipoComb}`
    });

    return { code: 200, results: { tipoCombustivel } }

};

const setarProduto = async function ({ idProd, idLoja }) {

    const estoque = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { estoque } }

};

const setarCombustivel = async function ({ idTipoComb, idLoja }) {

    const tanque = await useDB({
        query: `SELECT * FROM Cd_Tanque WHERE tipocombustivel_Fk=${idTipoComb} AND loja_Fk=${idLoja}`
    });

    const tipoCombPreco = await useDB({
        query: `select * from Cd_Tipocomb_Preco where tipocombustivel_Fk=${idTipoComb} and loja_Fk=${idLoja}`
    });

    return { code: 200, results: { tanque, tipoCombPreco } }

};

const processarFiltro = async function ({ valor, filtro }) {

    const comecandoCom = await useDB({
        query: `SELECT * FROM Fn_Compra_Cabecalho WHERE ${filtro.replace("\\D", "")} like '${valor.replace("\\D", "").toUpperCase()}%'`
    });

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM Fn_Compra_Cabecalho WHERE ${filtro.replace("\\D", "")} LIKE '%${valor.replace("\\D", "").toUpperCase()}%'`
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

const excluirCompra = async function ({ idCompraCab, idLoja, idCompraDet, idProd, idTanque, updateDataEstoque, idCompra, insertDataAltesthist }) {

    let statusUpdate, statusUpdate2, statusDelete, statusDelete2, statusDelete3, statusDelete4, statusDelete5, statusDelete6, statusInsert;

    const compraDet = await useDB({
        query: `select * from Fn_Compra_Detalhe where compracab_fk=${idCompraCab} and loja_Fk=${idLoja}`
    });

    const compraMedicamentoDet = await useDB({
        query: `select * from Fn_Compra_Medicamentodet where compradet_Fk=${idCompraDet} and loja_Fk=${idLoja}`
    });

    const estoqueGeral = await useDB({
        query: `SELECT * FROM es_estoquegeral WHERE loja_fk=${idLoja} AND produto_fk=${idProd}`
    });

    const configVenda = await useDB({
        query: `SELECT * FROM cf_config_venda WHERE loja_fk=${idLoja}`
    });

    const updateEstoque = await useDB({
        query: `update es_estoquegeral   set precoatacado1_prod=trunc((precocusto_prod+(precocusto_prod*(margematacado1_prod/100))),2),  precoatacado2_prod=trunc((precocusto_prod+(precocusto_prod*(margematacado2_prod/100))),2)  WHERE produto_fk=${idProd}   and loja_fk=${idLoja} `
    }).then(() => {
        statusUpdate = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate = err.message;
    });

    const tanqueQtd = await useDB({
        query: `select tanque,quantidade from fn_compra_combustiveldet where loja_fk=${idLoja}  and compradet_fk=${idCompraDet} `
    });

    const tanque = await useDB({
        query: `SELECT * FROM Cd_Tanque WHERE id_Tanque=${idTanque} and loja_Fk=${idLoja}`
    });

    const updateEstoque2 = await useDB({
        query: `update es_estoquegeral set estoque = estoque- ${updateDataEstoque.Qtd} where produto_fk = ${updateDataEstoque.produto_fk} and loja_fk = ${updateDataEstoque.loja_fk}`
    }).then(() => {
        statusUpdate2 = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate2 = err.message;
    });

    const compraCombustivelDet = await useDB({
        query: `select * from Fn_Compra_Combustiveldet where compradet_Fk=${idCompraDet} and loja_Fk=${idLoja}`
    });

    const deleteNfedoc = await useDB({
        query: `delete from Nfe_Docreferenciado where compracab_fk=${idCompraCab} and loja_Fk=${idLoja} and numserie_Ecf='compra' `
    }).then(() => {
        statusDelete = 'Registro apagado com sucesso';
    }).catch((err) => {
        statusDelete = err.message;
    });

    const deleteCompraDetalhe = await useDB({
        query: `delete from Fn_Compra_Detalhe where compracab_fk=${idCompraCab} and loja_Fk=${idLoja}`
    }).then(() => {
        statusDelete2 = 'Registro apagado com sucesso';
    }).catch((err) => {
        statusDelete2 = err.message;
    });

    const deleteCompraTransp = await useDB({
        query: `delete from Fn_Compra_Transp where compracab_fk=${idCompraCab} and loja_Fk=${idLoja}`
    }).then(() => {
        statusDelete3 = 'Registro apagado com sucesso';
    }).catch((err) => {
        statusDelete3 = err.message;
    });

    const deleteContasPagarPag = await useDB({
        query: `DELETE FROM fn_contaspagar_pag where loja_fk=${idLoja} and\n contaspagar_fk=(select id_contaspagar from fn_contaspagar where compra_fk=${idCompra} and loja_fk=${idLoja} limit 1)`
    }).then(() => {
        statusDelete4 = 'Registro apagado com sucesso';
    }).catch((err) => {
        statusDelete4 = err.message;
    });

    const deleteContasPagar = await useDB({
        query: `delete from Fn_Contaspagar where compra_fk=${idCompraCab} and lojaFk=${idLoja}`
    }).then(() => {
        statusDelete5 = 'Registro apagado com sucesso';
    }).catch((err) => {
        statusDelete5 = err.message;
    });

    const deleteCompraCab = await useDB({
        query: `delete from Fn_Compra_Cabecalho where id_Compracab=${idCompraCab} and loja_Fk=${idLoja}`
    }).then(() => {
        statusDelete6 = 'Registro apagado com sucesso';
    }).catch((err) => {
        statusDelete6 = err.message;
    });

    const tribNatureza = await useDB({
        query: `select * from Cd_Trib_Naturezaoper where descricao='COMPRA MERCADORIA'`
    });

    const estoque = await useDB({
        query: `select estoque from es_estoquegeral where loja_fk=${idLoja}  and produto_fk=${idProd} `
    });

    const idAltesthist = await useDB({
        query: `SELECT cast(max(id_altesthist)+1 as integer) as idc FROM public.es_altesthist  where loja_fk=${idLoja} `
    });

    const insert3 = await useDB({
        query: `INSERT INTO public.es_altesthist(
            id_altesthist,
            loja_fk, 
            produto_fk, 
            datahora_altesthist, 
            qtdeant_altesthist, 
            qtdefinal_altesthist, 
            altestinv_altesthist, 
            usuarioaltera, 
            dataaltera) VALUES (
                ${idAltesthist[0].idc}, 
                ${insertDataAltesthist.loja_fk}, 
                ${insertDataAltesthist.produto_fk}, 
                '${insertDataAltesthist.datahora_altesthist}',  
                ${insertDataAltesthist.qtdeant_altesthist},  
                ${insertDataAltesthist.qtdefinal_altesthist}, 
                'D', 
                ${insertDataAltesthist.usuarioaltera}, 
                '${insertDataAltesthist.dataaltera}')`
    }).then(() => {
        statusInsert = `Registro inserido com sucesso`
    }).catch((err) => {
        statusInsert = `message: ${err.message} //// detail: ${err.detail}`;
    });


    return {
        code: 200, results: {
            compraDet, compraMedicamentoDet, estoqueGeral, configVenda, statusUpdate, tanqueQtd, tanque, statusUpdate2, compraCombustivelDet, statusDelete, statusDelete2, statusDelete3, statusDelete4, statusDelete5, statusDelete6,
            tribNatureza, estoque, idAltesthist, statusInsert
        }
    }

};

const salvarnotae = async function ({ idLoja, idProd, insertDataAltesthist }) {

    let statusInsert;

    const tribNatureza = await useDB({
        query: `select * from Cd_Trib_Naturezaoper where descricao='COMPRA MERCADORIA'`
    });

    const estoque = await useDB({
        query: `select estoque from es_estoquegeral where loja_fk=${idLoja}  and produto_fk=${idProd} `
    });

    const idAltesthist = await useDB({
        query: `SELECT cast(max(id_altesthist)+1 as integer) as idc FROM public.es_altesthist  where loja_fk=${idLoja} `
    });

    const insert3 = await useDB({
        query: `INSERT INTO public.es_altesthist(
            id_altesthist,
            loja_fk, 
            produto_fk, 
            datahora_altesthist, 
            qtdeant_altesthist, 
            qtdefinal_altesthist, 
            altestinv_altesthist, 
            usuarioaltera, 
            dataaltera) VALUES (
                ${idAltesthist[0].idc}, 
                ${insertDataAltesthist.loja_fk}, 
                ${insertDataAltesthist.produto_fk}, 
                '${insertDataAltesthist.datahora_altesthist}',  
                ${insertDataAltesthist.qtdeant_altesthist},  
                ${insertDataAltesthist.qtdefinal_altesthist}, 
                'C', 
                ${insertDataAltesthist.usuarioaltera}, 
                '${insertDataAltesthist.dataaltera}')`
    }).then(() => {
        statusInsert = `Registro inserido com sucesso`
    }).catch((err) => {
        statusInsert = `message: ${err.message} //// detail: ${err.detail}`;
    });

    return { code: 200, results: { tribNatureza, estoque, idAltesthist, statusInsert } }

};

const salvar = async function ({ numDocFiscal, idForn, serieCompracab, chaveAcesso, idLoja, insertDataCompraCab, insertDataCompraTransp, insertDataCompraDet, insertDataCompraCombustivel, idTanque, idProd, numLote, insertDataCompraMedicamentoDet, insertDataCompraMedicamentoDet2, updateDataContasPagar, insertDataDocReferenciado }) {

    let statusInsert, statusInsert2, statusInsert3, statusInsert4, statusUpdate, statusInsert5, statusInsert6, statusUpdate2, statusInsert7;

    const compraCab = await useDB({
        query: `SELECT * FROM Fn_Compra_Cabecalho WHERE  (numerodocfiscal_Compracab='${numDocFiscal}' and fornecedor_Fk=${idForn} and serie_Compracab='${serieCompracab}')`
    });

    const compraCab2 = await useDB({
        query: `SELECT * FROM Fn_Compra_Cabecalho WHERE chaveacesso_Compracab='${chaveAcesso}' or (numerodocfiscal_Compracab='${numDocFiscal}' and fornecedor_Fk=${idForn} and serie_Compracab='${serieCompracab}')`
    });

    //COMENTADO PRA TESTES
    /* const compraCab3 = await useDB({
        query:`SELECT * FROM Fn_Compra_Cabecalho WHERE loja_fk = ${idLoja} ORDER BY id_Compracab DESC`
    }); */

    const insertCompraCab = await useDB({
        query: `insert into fn_compra_cabecalho (id_compracab,loja_fk,fornecedor_fk) values(${insertDataCompraCab.id_compracab},${insertDataCompraCab.loja_fk}, ${insertDataCompraCab.fornecedor_fk})`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = `Erro: ${err.message} ||||||||| Detalhe: ${err.detail}`;
    });

    const idCompraTransp = await useDB({
        query: `SELECT max(id_compratransp)+1 as idc FROM public.fn_compra_transp where loja_fk=${idLoja} `
    });


    const insertCompraTransp = await useDB({
        query: `insert into fn_compra_transp (id_compratransp,transportadora_fk,compracab_fk,loja_fk) values(${idCompraTransp[0].idc}, ${insertDataCompraTransp.transportadora_fk}, ${insertDataCompraTransp.compracab_fk}, ${insertDataCompraTransp.loja_fk})`
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = `Erro: ${err.message} ||||||||| Detalhe: ${err.detail}`;
    });

    const idCompraDet = await useDB({
        query: `SELECT max(id_compradet)+1 as idc FROM public.fn_compra_detalhe where loja_fk=${idLoja} `
    });

    const insertCompraDet = await useDB({
        query: `insert into fn_compra_detalhe (id_compradet ,loja_fk,compracab_fk) values(${idCompraDet[0].idc}, ${insertDataCompraDet.loja_fk}, ${insertDataCompraDet.compracab_fk})`
    }).then(() => {
        statusInsert3 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert3 = `Erro: ${err.message} ||||||||| Detalhe: ${err.detail}`;
    });

    const idCompraCombustivel = await useDB({
        query: `SELECT max(id_compra_combustiveldet)+1 as idc FROM public.fn_compra_combustiveldet where loja_fk=${idLoja} `
    });

    const insertCompraCombustivel = await useDB({
        query: `INSERT INTO public.fn_compra_combustiveldet(
            id_compra_combustiveldet, 
            loja_fk, 
            compradet_fk,  
            usuarioaltera,  
            dataaltera, 
            quantidade, 
            tanque)VALUES(
                ${idCompraCombustivel[0].idc}, 
                ${insertDataCompraCombustivel.loja_fk}, 
                ${insertDataCompraCombustivel.compradet_fk},  
                ${insertDataCompraCombustivel.usuarioaltera}, 
                '${insertDataCompraCombustivel.dataaltera}',  
                ${insertDataCompraCombustivel.quantidade},
                ${insertDataCompraCombustivel.tanque})`
    }).then(() => {
        statusInsert4 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert4 = err.message;
    });

    const tanque = await useDB({
        query: `SELECT * FROM cd_tanque WHERE id_tanque=${idTanque} AND loja_fk=${idLoja}`
    });

    const valorUnitarioIdProduto = await useDB({
        query: `select det.valorunitario,det.produto_fk from fn_compra_detalhe as det inner join fn_compra_cabecalho as cab on cab.id_compracab=det.compracab_fk where det.produto_fk=${idProd} and det.loja_fk=${idLoja} order by cab.id_compracab desc limit 3;`
    });

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE loja_fk=${idLoja} AND produto_Fk=${idProd}`
    });

    const updateEstoque = await useDB({
        query: `update es_estoquegeral set precoatacado1_prod=trunc((precocusto_prod+(precocusto_prod*(margematacado1_prod/100))),2), precoatacado2_prod=trunc((precocusto_prod+(precocusto_prod*(margematacado2_prod/100))),2) WHERE produto_fk=${idProd}   and loja_fk=${idLoja} `
    }).then(() => {
        statusUpdate = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate = err.message;
    });

    const lote = await useDB({
        query: `SELECT * FROM Cd_Lote WHERE loja_Fk=${idLoja} AND numero_Lote='${numLote}' AND produto_Fk=${idProd}`
    });

    const idLote = await useDB({
        query: `SELECT max(id_lote) + 1 as idc FROM public.cd_lote where loja_fk=${idLoja} `
    });

    const idCompraMedicamentoDet = await useDB({
        query: `SELECT max(id_compra_medicamentodet)+1 as idc  FROM public.fn_compra_medicamentodet where loja_fk=${idLoja} `
    });

    const insertCompraMedicamentoDet = await useDB({
        query: `insert into fn_compra_medicamentodet (
            id_compra_medicamentodet, 
            loja_fk,
            lote_fk,
            compradet_fk,
            qtdelote,
            datafabricacao,
            datavalidade,
            dataaltera,
            usuarioaltera) values(
                ${idCompraMedicamentoDet[0].idc}, 
                ${insertDataCompraMedicamentoDet.loja_fk}, 
                ${insertDataCompraMedicamentoDet.lote_fk}, 
                ${insertDataCompraMedicamentoDet.compradet_fk}, 
                ${insertDataCompraMedicamentoDet.qtdelote}, 
                '${insertDataCompraMedicamentoDet.datafabricacao}', 
                '${insertDataCompraMedicamentoDet.datavalidade}',
                '${insertDataCompraMedicamentoDet.dataaltera}',
                ${insertDataCompraMedicamentoDet.usuarioaltera})`
    }).then(() => {
        statusInsert5 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert5 = err.message;
    });

    const idCompraMedicamentoDet2 = await useDB({
        query: `SELECT max(id_compra_medicamentodet)+1 as idc  FROM public.fn_compra_medicamentodet where loja_fk=${idLoja} `
    });

    const insertCompraMedicamentoDet2 = await useDB({
        query: `insert into fn_compra_medicamentodet (
            id_compra_medicamentodet, 
            loja_fk,
            lote_fk,
            compradet_fk,
            qtdelote,
            datafabricacao,
            datavalidade) values(
                ${idCompraMedicamentoDet2[0].idc}, 
                ${insertDataCompraMedicamentoDet2.loja_fk}, 
                ${insertDataCompraMedicamentoDet2.lote_fk}, 
                ${insertDataCompraMedicamentoDet2.compradet_fk}, 
                ${insertDataCompraMedicamentoDet2.qtdelote}, 
                '${insertDataCompraMedicamentoDet2.datafabricacao}', 
                '${insertDataCompraMedicamentoDet2.datavalidade}')`
    }).then(() => {
        statusInsert6 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert6 = err.message;
    });

    const idContasPagar = await useDB({
        query: `SELECT max(id_contaspagar)+1 as idc FROM public.fn_contaspagar where loja_fk=${idLoja} `
    });

    const updateContasPagar = await useDB({
        query: `update fn_contaspagar set compra_fk=${updateDataContasPagar.compra_fk} where id_contaspagar=${updateDataContasPagar.condicao.id_contaspagar} and loja_fk=${updateDataContasPagar.condicao.loja_fk}`
    }).then(() => {
        statusUpdate2 = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate2 = err.message;
    });

    const idNfeDocReferenciado = await useDB({
        query: `SELECT max(id)+1 as idc FROM public.nfe_docreferenciado where loja_fk=${idLoja}`
    });

    const insertDocReferenciado = await useDB({
        query: `INSERT INTO public.nfe_docreferenciado(
            id, 
            loja_fk, 
            compracab_fk,  
            num_doc,
            numserie_ecf,  
            cod_modelo,
            dataemissao_doc)VALUES(
                ${idNfeDocReferenciado[0].idc}, 
                ${insertDataDocReferenciado.loja_fk},  
                ${insertDataDocReferenciado.compracab_fk},  
                ${insertDataDocReferenciado.num_doc}, 
                'compra',
                '06',
                '2018-01-01')`
    }).then(() => {
        statusInsert7 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert7 = err.message;
    });


    return { code: 200, results: { compraCab, compraCab2, statusInsert, idCompraTransp, statusInsert2, idCompraDet, statusInsert3, idCompraCombustivel, statusInsert4, tanque, valorUnitarioIdProduto, estoqueGeral, statusUpdate, lote, idLote, idCompraMedicamentoDet, statusInsert5, idCompraMedicamentoDet2, statusInsert6, idContasPagar, statusUpdate2, idNfeDocReferenciado, statusInsert7 } }

};


const verificalmc = async function ({ idLoja, dataMovimento, tipoComb }) {

    const idLmcSituacao = await useDB({
        query: `SELECT id_lmcsituacao FROM public.cd_lmcsituacao as s inner join cd_lmccab as cab on s.lmccab_fk=cab.id_lmccab where cab.loja_fk=${idLoja} and s.loja_fk=${idLoja} and s.situacao='F' and cab.datamovimento_lmccab='${dataMovimento}'  and tipocombustivel_fk=${tipoComb} `
    });

    return { code: 200, results: { idLmcSituacao } }

};

const inserir = async function ({ }) {

    const tribNatureza = await useDB({
        query: `select * from Cd_Trib_Naturezaoper where descricao='COMPRA MERCADORIA'`
    });

    const planoConta = await useDB({
        query: `select * from Cd_Plano_Conta where nome='NOTAS DE COMPRA'`
    });

    return { code: 200, results: { tribNatureza, planoConta } }

};

const inserir2 = async function ({ }) {

    const tribNatureza = await useDB({
        query: `select * from Cd_Trib_Naturezaoper where descricao='COMPRA MERCADORIA'`
    });

    const planoConta = await useDB({
        query: `select * from Cd_Plano_Conta where nome='NOTAS DE COMPRA'`
    });

    return { code: 200, results: { tribNatureza, planoConta } }

};

const pesquisarPorColuna = async function ({ colunaBusca, textoBusca, idLoja, descricaoProd, descricaoTipcomb, dataInicioentrada, dataFimentrada, dataInicioemissao, dataFimemissao }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Fn_Compra_Cabecalho WHERE UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase()}%' AND loja_Fk=${idLoja} ORDER BY ${colunaBusca} ASC`
    });

    const pesquisaCompraDetProd = await useDB({
        query: `SELECT Fn_Compra_Detalhe.* FROM Fn_Compra_Detalhe, cd_produto WHERE upper(cd_produto.descricao_Prod)  like '%${descricaoProd.toUpperCase()}%' and produto_Fk is not null AND cd_produto.id_prod = Fn_Compra_Detalhe.produto_fk and fn_compra_detalhe.loja_fk=${idLoja}`
    });

    const pesquisaCompraDetTipoComb = await useDB({
        query: `SELECT Fn_Compra_Detalhe.* FROM Fn_Compra_Detalhe, cd_tipocombustivel WHERE upper(cd_tipocombustivel.descricao_Tipcomb) like '%${descricaoTipcomb.toUpperCase()}%' and tipocombustivel_Fk is not null AND Fn_Compra_Detalhe.tipocombustivel_fk = cd_tipocombustivel.id_tipocombustivel and fn_compra_detalhe.loja_fk=${idLoja}`
    });

    const dataentrada = await useDB({
        query: `SELECT * FROM Fn_Compra_Cabecalho WHERE (cast(dataentradasaida_Compracab as date) between '${dataInicioentrada}' and '${dataFimentrada}') and loja_fk=${idLoja}`
    });

    const dataemissao = await useDB({
        query: `SELECT * FROM Fn_Compra_Cabecalho WHERE (cast(dataemissao_Compracab as date)  between '${dataInicioemissao}' and '${dataFimemissao}') and loja_fk=${idLoja}`
    });

    return { code: 200, results: { pesquisa, pesquisaCompraDetProd, pesquisaCompraDetTipoComb, dataentrada, dataemissao } }

};

const preencherListaBusca = async function ({ idLoja }) {

    const lista = await useDB({
        query: `SELECT * FROM Fn_Compra_Cabecalho WHERE loja_Fk=${idLoja} ORDER BY dataentradasaida_Compracab desc`
    });

    return { code: 200, results: { lista } }

};

const manifestarnotas2 = async function ({ idLoja }) {

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    return { code: 200, results: { configNfe } }

};

const salvareventodfe = async function ({ idLoja, cnpjLoja, motivoretorno, descricaoevento }) {

    const nfeEvento = await useDB({
        query: `select * from Nfe_Evento where loja_fk = ${idLoja} and motivo_Evento='CNPJ:${cnpjLoja}-${descricaoevento}' and motivo_Retorno='${motivoretorno}' `
    });

    const nfeEvento2 = await useDB({
        query: `select * from Nfe_Evento where loja_fk = ${idLoja} order by id desc`
    });

    return { code: 200, results: { nfeEvento, nfeEvento2 } }

};

const manifestarnotas233 = async function ({ idLoja }) {

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    return { code: 200, results: { configNfe } }

};

const downloadxml = async function ({ idLoja, idManifesto, updateDataZip }) {

    let statusUpdate;

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    const zip = await useDB({
        query: `select zip from nfe_manifesto where id=${idManifesto} and loja_fk=${idLoja} `
    });

    const updateZip = await useDB({
        query: `update nfe_manifesto set zip='${updateDataZip.zip}' where id=${updateDataZip.condicao.id} and loja_fk=${updateDataZip.condicao.loja_fk}`
    }).then(() => {
        statusUpdate = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate = err.message;
    });

    return { code: 200, results: { configNfe, zip, statusUpdate } }

};

const downloadxml22 = async function ({ idLoja, idManifesto, updateDataZip }) {

    let statusUpdate;

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    const zip = await useDB({
        query: `select zip from nfe_manifesto where id=${idManifesto} and loja_fk=${idLoja} `
    });

    const updateZip = await useDB({
        query: `update nfe_manifesto set zip='${updateDataZip.zip}' where id=${updateDataZip.condicao.id} and loja_fk=${updateDataZip.condicao.loja_fk}`
    }).then(() => {
        statusUpdate = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate = err.message;
    });

    return { code: 200, results: { configNfe, zip, statusUpdate } }

};

const downloadxml2 = async function ({ idLoja, idManifesto, updateDataZip }) {

    let statusUpdate;

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    const zip = await useDB({
        query: `select zip from nfe_manifesto where id=${idManifesto} and loja_fk=${idLoja} `
    });

    const updateZip = await useDB({
        query: `update nfe_manifesto set zip='${updateDataZip.zip}' where id=${updateDataZip.condicao.id} and loja_fk=${updateDataZip.condicao.loja_fk}`
    }).then(() => {
        statusUpdate = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate = err.message;
    });

    return { code: 200, results: { configNfe, zip, statusUpdate } }

};

const buscarNFe = async function ({ idLoja, ambiente, insertDataNfeManifesto }) {

    let statusInsert, statusUpdate;

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    const nfeManifesto = await useDB({
        query: `select * from Nfe_Manifesto where ambiente='${ambiente}' and empresa='ultimonsu' and loja_fk=${idLoja}`
    });

    const idNfeManifesto = await useDB({
        query: `SELECT max(id)+1 as idc FROM nfe_manifesto WHERE loja_fk=${idLoja} `
    });

    const insertNfeManifesto = await useDB({
        query: `INSERT INTO public.nfe_manifesto(
            id, 
            loja_fk, 
            empresa, 
            protocolo, 
            nsu,
            ambiente,
            dataaltera)VALUES (
                ${idNfeManifesto[0].idc}, 
                ${insertDataNfeManifesto.loja_fk}, 
                'ultimonsu' , 
                '${insertDataNfeManifesto.protocolo} 00:00:00', 
                '000000000000000',
                '${insertDataNfeManifesto.ambiente}',
                '${insertDataNfeManifesto.dataaltera}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const nfeManifesto1 = await useDB({
        query: `select * from Nfe_Manifesto where ambiente='${insertDataNfeManifesto.ambiente}' and empresa='ultimonsu' and loja_fk=${insertDataNfeManifesto.loja_fk} `
    });

    const updateNSu = await useDB({
        query: `update cd_nsu  set ambiente='${ambiente}'  where (ambiente='' or ambiente is null) and loja_fk=${idLoja}`
    }).then(() => {
        statusUpdate = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate = err.message;
    });

    const nsu = await useDB({
        query: `select * from Cd_Nsu where loja_fk=${idLoja} and ambiente='${ambiente}' order by id desc`
    });

    const nfeManifesto2 = await useDB({
        query: `select * from Nfe_Manifesto where ambiente='${ambiente}' and loja_fk=${idLoja} order by id desc`
    });

    const nsu2 = await useDB({
        query: `select * from Cd_Nsu where loja_fk=${idLoja}  order by id desc`
    });

    return { code: 200, results: { configNfe, nfeManifesto, statusInsert, idNfeManifesto, nfeManifesto1, statusUpdate, nsu, nfeManifesto2, nsu2 } }

};

const pegarDadosnfe = async function ({ idLoja }) {

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    return { code: 200, results: { configNfe } }

};

const consultarStatus = async function ({ idLoja }) {

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    return { code: 200, results: { configNfe } }

};

const imprimirNFe2 = async function ({ idLoja, idManifesto }) {

    const zip = await useDB({
        query: `select zip from nfe_manifesto where id=${idManifesto} and loja_fk=${idLoja} `
    });

    return { code: 200, results: { zip } }

};

const vermn = async function ({ idLoja, motivoRetorno }) {

    const nfeEvento = await useDB({
        query: `select * from Nfe_Evento where loja_fk = ${idLoja} and motivo_Retorno='${motivoRetorno}'  order by dataaltera desc`
    });

    return { code: 200, results: { nfeEvento } }

};

const excluirmed = async function ({ numLote, idProd, idLoja }) {

    const lote = await useDB({
        query: `SELECT * FROM Cd_Lote WHERE loja_Fk=${idLoja} AND numero_Lote='${numLote}' AND produto_Fk=${idProd}`
    });

    return { code: 200, results: { lote } }

};

const listarlista = async function ({ idLoja, idRede, ean, chave }) {

    const rede = await useDB({
        query: `select * from Cd_Rede where loja_Fk=${idLoja} and api='objectpro' and programa='vendedor' `
    });

    const redeProduto = await useDB({
        query: `select Cd_Rede_Produto.* from Cd_Rede_Produto, cd_rede where ean='${ean}' and rede_fk=${idRede}  and Cd_Rede_Produto.loja_Fk=${idLoja} and cd_Rede.programa='vendedor' AND cd_rede.id = cd_rede_produto.rede_fk`
    });

    const rederegistro = await useDB({
        query: `select id from cd_rede_registro where ean='${ean}' and rede_fk=${idRede}  and loja_fk=${idLoja} and chave='${chave}' `
    });

    const idRedeRegistro = await useDB({
        query: `SELECT max(id)+1 as idc FROM public.cd_rede_registro where loja_fk=${idLoja} `
    });

    return { code: 200, results: { rede, redeProduto, rederegistro, idRedeRegistro } }

};

const listarest = async function ({ idLoja, idProd }) {

    const tribNatureza = await useDB({
        query: `select * from Cd_Trib_Naturezaoper where descricao='COMPRA MERCADORIA'`
    });

    const estoque = await useDB({
        query: `select estoque from es_estoquegeral where loja_fk=${idLoja}  and produto_fk=${idProd} `
    });

    return { code: 200, results: { tribNatureza, estoque } }

};

const criarestoques = async function ({ idLoja, idProd }) {

    const idEstoque = await useDB({
        query: `SELECT max(id_Estoquegeral) FROM Es_Estoquegeral where loja_fk=${idLoja}`
    });

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE loja_fk=${idLoja} AND produto_Fk=${idProd}`
    });

    return { code: 200, results: { idEstoque, estoqueGeral } }

};

const carregarcsts = async function ({ }) {

    const codCstMenor90 = await useDB({
        query: `SELECT distinct(cod_cst) FROM public.cd_cst where cod_cst <=90  order by cod_cst`
    });

    const codCstMaior100 = await useDB({
        query: `SELECT distinct(cod_cst) FROM public.cd_cst where cod_cst >=100  order by cod_cst`
    });

    const codCstPiscoFins = await useDB({
        query: `SELECT distinct(cod_cstpiscofins) FROM public.cd_cstpiscofins where cod_cstpiscofins>49 order by cod_cstpiscofins asc`
    });

    const codCfop = await useDB({
        query: `SELECT distinct(codigo_cfop) FROM public.cd_cfop where cast(codigo_cfop as text) like '1%' or  cast(codigo_cfop as text) like '2%' or  cast(codigo_cfop as text) like '3%' order by codigo_cfop asc`
    });

    return { code: 200, results: { codCstMenor90, codCstMaior100, codCstPiscoFins, codCfop } }

};

const histpv = async function ({ idLoja, insertDataAlthistPreco }) {

    let statusInsert;

    const idAlthistPreco = await useDB({
        query: `select max(id)+1 as idc from es_althist_preco where loja_fk=${idLoja} `
    });

    const insertAlthistPreco = await useDB({
        query: `INSERT INTO public.es_althist_preco( 
            id, 
            loja_fk,
            produto_fk, 
            precovenda,  
            precocusto, 
            dataaltera, 
            usuarioaltera,
            origem) VALUES (
                ${idAlthistPreco[0].idc},
                ${insertDataAlthistPreco.loja_fk}, 
                ${insertDataAlthistPreco.produto_fk}, 
                ${insertDataAlthistPreco.precovenda}, 
                ${insertDataAlthistPreco.precocusto}, 
                '${insertDataAlthistPreco.dataaltera}',  
                ${insertDataAlthistPreco.usuarioaltera}, 
                'compra');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idAlthistPreco, statusInsert } }

};

const histpvTanque = async function({ idLoja, insertDataAlthistTanque }){ 

    let statusInsert;

    const idAlthisTanque = await useDB({ 
        query: `select max(id)+1 as idc  from es_althist_tanque  where loja_fk=${idLoja} `
    }); 

    const insertAlthistTanque = await useDB({
        query:`INSERT INTO public.es_althist_tanque(
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
                'compra', 
                '${insertDataAlthistTanque.dataaltera}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

 return { code: 200, results: { idAlthisTanque, statusInsert }}  
    
};

const gerarzip = async function({ dataInicial, dataFinal, idLoja, chave }){ 

    const compraCab = await useDB({ 
        query: `select * from Fn_Compra_Cabecalho where (cast(dataentradasaida_Compracab as date)  between '${dataInicial}'  and '${dataFinal}')  and loja_fk=${idLoja}  and modelo_Compracab in ('55') and chaveacesso_Compracab is not null  order by numerodocfiscal_Compracab asc`
    }); 

    /* const compraCab = await useDB({ 
        query: `select * from Fn_Compra_Cabecalho where (cast(tipodatab as date)  between '${dataInicial}'  and '${dataFinal}')  and loja_fk=${idLoja}  and modelo_Compracab in ('55') and chaveacesso_Compracab is not null  order by numerodocfiscal_Compracab asc`
    });  */

    const zip = await useDB({
        query:`select zip from nfe_manifesto where chave='${chave}' and loja_fk=${idLoja} `
    });

 return { code: 200, results: { compraCab, zip }}  
    
};



module.exports = {
    buscarchave,
    init,
    setareventomdf,
    listarnotasmanifestadas,
    jalancado,
    alterarlotemed,
    setarCompra,
    pesquisarPorColunaproduto,
    pesquisarPorColunaDescricao,
    pegarEstoque,
    pegarCusto,
    verificaTanque2,
    verificaTanque,
    atualizarPreco,
    pegarPrecoAtual,
    pegarPrecocadastro,
    pegarMargem,
    pegarpv,
    pegaremax,
    pegaremin,
    vincularProdutoFornecedor,
    gerarPagamentos,
    confirmaCompra,
    salvaitensformula,
    pixml,
    pxml,
    processarXMLManifesto,
    LerNodet,
    LerNocabecalho,
    LerNoemitente,
    LerNoProt,
    LerNoTransp,
    excluir,
    adicionarLote3,
    onCellEdit,
    pegarCodigoDeBarras,
    pesquisarCodigoProduto,
    pesquisarCodigoCombustivel,
    setarProduto,
    setarCombustivel,
    processarFiltro,
    excluirCompra,
    salvarnotae,
    salvar,
    verificalmc,
    inserir,
    inserir2,
    pesquisarPorColuna,
    preencherListaBusca,
    manifestarnotas2,
    salvareventodfe,
    manifestarnotas233,
    downloadxml,
    downloadxml22,
    downloadxml2,
    buscarNFe,
    pegarDadosnfe,
    consultarStatus,
    imprimirNFe2,
    vermn,
    excluirmed,
    listarlista,
    listarest,
    criarestoques,
    carregarcsts,
    histpv,
    histpvTanque,
    gerarzip
}