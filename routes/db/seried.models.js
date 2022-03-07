const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const setarNota = async function ({ idLoja, idSerieD }) {

    const seriDet = await useDB({
        query: `select * from Vd_Seried_Detalhe where loja_fk=${idLoja} and seried_fk=${idSerieD}  order by seqitem_Serieddet asc`
    });

    return { code: 200, results: { seriDet } }

};

const salvar = async function ({ idLoja, insertSeriedDetData, idProd }) {

    let statusInsert;

    const seried = await useDB({
        query: `SELECT * FROM Vd_Seried WHERE loja_fk=${idLoja} ORDER BY id DESC`
    });

    const insertSeriedDet = await useDB({
        query: `insert into vd_seried_detalhe  (
            loja_fk,
            seried_fk,
            id_seried_detalhe,
            seqitem_serieddet,
            cfop_serieddet,
            csticms_serieddet,
            unidade_serieddet,
            cstpis,
            cstcofins) values(
                ${insertSeriedDetData.loja_fk},
                ${insertSeriedDetData.seried_fk},
                ${insertSeriedDetData.id_seried_detalhe},
                ${insertSeriedDetData.seqitem_serieddet},
                '${insertSeriedDetData.cfop_serieddet}',
                '${insertSeriedDetData.csticms_serieddet}',
                '${insertSeriedDetData.unidade_serieddet}',
                '${insertSeriedDetData.cstpis}',
                '${insertSeriedDetData.cstcofins}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const seriedDet = await useDB({
        query: `SELECT * FROM  Vd_Seried_Detalhe WHERE loja_fk=${idLoja} ORDER BY id_Seried_Detalhe DESC`
    });

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE loja_Fk=${idLoja} AND produto_Fk=${idProd}`
    });

    const seqDoc = await useDB({
        query: `SELECT * FROM Nfe_Seqdoc WHERE loja_Fk=${idLoja} AND padrao=true AND modelo='02'`
    });

    return { code: 200, results: { seried, statusInsert, seriedDet, estoqueGeral, seqDoc } }

};

const inserir = async function ({ idLoja }) {

    const seqDoc = await useDB({
        query: `SELECT * FROM Nfe_Seqdoc WHERE loja_Fk=${idLoja} AND modelo='02' AND padrao=true`
    });

    const seqDoc2 = await useDB({
        query: `SELECT * FROM Nfe_Seqdoc WHERE loja_Fk=${idLoja} ORDER BY id DESC`
    });

    return { code: 200, results: { seqDoc, seqDoc2 } }

};

const pesquisarPorColuna = async function ({ colunaBusca, textoBusca }) {

    const seried = await useDB({
        query: `SELECT * FROM Vd_Seried WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase()}%' ORDER BY ${colunaBusca} ASC`
    });

    return { code: 200, results: { seried } }

};

const preencherListaBusca = async function ({ idLoja }) {

    const lista = await useDB({
        query: `SELECT * FROM Vd_Seried WHERE loja_fk=${idLoja} ORDER BY id DESC`
    });

    return { code: 200, results: { lista } }

};

const pesquisarPorColunaDescricao = async function ({ textoBuscaproduto, colunaBuscaproduto, numCodBar }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Cd_Produto WHERE CAST(descricao_Prod as text) like '%${textoBuscaproduto.toUpperCase()}%' AND classeterapeutica_Prod='0' ORDER BY ${colunaBuscaproduto} ASC`
    });

    const codigoBarra = await useDB({
        query: `SELECT cd_codigobarras.* FROM Cd_Codigobarras, cd_produto WHERE numero_Codbar LIKE '%${numCodBar}%' AND ativo_Codbar='S' AND cd_produto.classeterapeutica_Prod='0' and cd_codigobarras.produto_fk = cd_produto.id_prod`
    });

    return { code: 200, results: { pesquisa, codigoBarra } }

};

const pesquisarCodigoProduto = async function ({ idProd }) {

    const produto = await useDB({
        query: `SELECT * FROM Cd_Produto WHERE id_Prod=${idProd} AND classeterapeutica_Prod='0'`
    });

    return { code: 200, results: { produto } }

};

const pesquisarPorColunaProduto = async function ({ textoBuscaproduto, colunaBuscaproduto, numCodBar }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Cd_Produto WHERE UPPER(CAST(${colunaBuscaproduto} as text)) like '%${textoBuscaproduto.toUpperCase()}%' AND classeterapeutica_Prod='0' ORDER BY ${colunaBuscaproduto} ASC`
    });

    const codigoBarra = await useDB({
        query: `SELECT cd_codigobarras.* FROM Cd_Codigobarras, cd_produto WHERE numero_Codbar LIKE '%${numCodBar}%' AND ativo_Codbar='S' AND cd_produto.classeterapeutica_Prod='0' and cd_codigobarras.produto_fk = cd_produto.id_prod`
    });

    return { code: 200, results: { pesquisa, codigoBarra } }

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

const pegarCusto = async function ({ idProd, idLoja }) {

    const precoCusto = await useDB({
        query: `SELECT precocusto_Prod FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { precoCusto } }

};

const pegarVenda = async function ({ idProd, idLoja }) {

    const precoVenda = await useDB({
        query: `SELECT precoVenda_Prod FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { precoVenda } }

};

const pegarEstoque = async function({ idProd, idLoja }){ 

    const estoque = await useDB({ 
    query: `SELECT estoque FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
 }); 

 return { code: 200, results: { estoque }}  
    
};

const onCellEdit = async function({ idProd, idLoja }){ 

    const estoqueGeral = await useDB({ 
    query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
 }); 

 return { code: 200, results: { estoqueGeral }}  
    
};


module.exports = {
    setarNota,
    salvar,
    inserir,
    pesquisarPorColuna,
    preencherListaBusca,
    pesquisarPorColunaDescricao,
    pesquisarCodigoProduto,
    pesquisarPorColunaProduto,
    setarProduto,
    pegarCodigoDeBarras,
    pegarCusto,
    pegarVenda,
    pegarEstoque,
    onCellEdit
}