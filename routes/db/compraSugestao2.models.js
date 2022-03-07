const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const pegarQuantidadeVendida = async function ({ idLoja, idProd, dataCupom, dataDet, dataSerie }) {

    const quantidadeCupom = await useDB({
        query: `select produto_fk,qtde_cupitem  from ecf_cupomdet_prod as det  inner join ecf_cupomcab as cab  on (cab.id_cupomcab=det.cupomcab_fk and cab.loja_fk=det.loja_fk)  where det.loja_fk=${idLoja} and status_cupom in ('F','O') and status_cupitem='F'  and det.produto_fk=${idProd} and cab.datahora_cupom between '${dataCupom.dataInicio}'  and '${dataCupom.dataFim}' ;`
    });

    const quantidadeDetahe = await useDB({
        query: `select produto_fk,quantidade  from nfe_detalhe as det  inner join nfe_cabecalho as cab  on (cab.id_nfe_cabecalho=det.nfecab_fk and cab.loja_fk=det.loja_fk)  where det.loja_fk=${idLoja}  and det.produto_fk=${idProd} and cab.dataentradasaida_nfecab between '${dataDet.dataInicio}'  and '${dataDet.dataFim}' ;`
    });

    const quantidadeSerie = await useDB({
        query: `select produto_fk,qtde_serieddet  from vd_seried_detalhe as det  inner join  vd_seried as cab  on (cab.id=det.seried_fk and cab.loja_fk=det.loja_fk) where det.loja_fk=${idLoja}  and det.produto_fk=${idProd} and cab.datadoc between '${dataSerie.dataInicio}'  and '${dataSerie.dataFim}' ;`
    });


    return { code: 200, results: { quantidadeCupom, quantidadeDetahe, quantidadeSerie } }

};

const pegarEncomendas = async function({  }){ 

    const encomenda = await useDB({ 
        query: `SELECT Vd_Encomendadet.* FROM Vd_Encomendadet, vd_encomendacab WHERE status_Encomenda='A' and Vd_Encomendadet.encomendacab_fk = vd_encomendacab.id_encomendacab`
    }); 

 return { code: 200, results: { encomenda }}  
    
};

const pegarEstoqueProduto = async function({ idProd, idLoja }){ 

    const estoqueGeral = await useDB({ 
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd}`
    }); 

    const estoqueGeral2 = await useDB({
        query:`SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_Fk=${idLoja}`
    });

 return { code: 200, results: { estoqueGeral, estoqueGeral2 }}  
    
};

const pesquisarCodigoProduto = async function({ idProd }){ 

    const produto = await useDB({ 
        query:  `SELECT * FROM Cd_Produto WHERE id_Prod = ${idProd}`
    }); 

 return { code: 200, results: { produto }}  
    
};

const pesquisarPorColunaProduto = async function({ colunaBuscaProduto, textoBuscaProduto, numCodBar }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Produto WHERE UPPER(CAST(${colunaBuscaProduto} as text))  LIKE '${textoBuscaProduto.toUpperCase()}%' ORDER BY ${colunaBuscaProduto} ASC`
    }); 

    const codigoBarra = await useDB({
        query:`SELECT * FROM Cd_Codigobarras WHERE numero_Codbar LIKE '%${numCodBar}%' AND ativo_Codbar='S'`
    });

 return { code: 200, results: { pesquisa, codigoBarra }}  
    
};


const pesquisarPorColunaDescricao = async function({ colunaBuscaProduto, textoBuscaProduto, numCodBar }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Produto WHERE UPPER(CAST(descricao_prod as text))  LIKE '${textoBuscaProduto.toUpperCase()}%' ORDER BY ${colunaBuscaProduto} ASC`
    }); 

    const codigoBarra = await useDB({
        query:`SELECT * FROM Cd_Codigobarras WHERE numero_Codbar LIKE '%${numCodBar}%' AND ativo_Codbar='S'`
    });

 return { code: 200, results: { pesquisa, codigoBarra }}  
    
};

const pegarEstoque = async function({ idProd, idLoja }){ 

    const estoque = await useDB({ 
        query: `SELECT estoque FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    }); 

    const precoCusto = await useDB({
        query:`SELECT precocusto_Prod FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

 return { code: 200, results: { estoque, precoCusto }}  
    
};

const pegarCodigoDeBarras = async function({ idProd }){ 

    const numeroCodBar = await useDB({ 
        query: `SELECT numero_codbar FROM public.cd_codigobarras where ativo_codbar='S' and produto_fk=${idProd} `
    }); 

 return { code: 200, results: { numeroCodBar }}  
    
};

module.exports = {
    pegarQuantidadeVendida,
    pegarEncomendas,
    pegarEstoqueProduto,
    pesquisarCodigoProduto,
    pesquisarPorColunaProduto,
    pesquisarPorColunaDescricao,
    pegarEstoque,
    pegarCodigoDeBarras
}