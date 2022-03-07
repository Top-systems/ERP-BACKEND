const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const recebetxt = async function ({ idForn, ean, insertPedidoFornData }) {

    let statusInsert;

    const pedidoFornProd = await useDB({
        query: ` select id,(select produto_fk FROM public.cd_codigobarras   where numero_codbar=p.ean limit 1) as cb  FROM public.cd_pedido_forn_prod as p  where fornecedor_fk=${idForn} and ean='${ean}' and ean!=''`
    });

    const insertPedidoForn = await useDB({
        query: ` INSERT INTO public.cd_pedido_forn_prod( 
            fornecedor_fk, 
            produto_fk, 
            usuarioaltera, 
            dataaltera, 
            codprod,  
            descricao, 
            ean,
            precoconsumidor ,
            precofab,
            fabricante,
            lista,
            codicms) VALUES (
                ${insertPedidoFornData.fornecedor_fk}, 
                ${insertPedidoFornData.produto_fk}, 
                ${insertPedidoFornData.usuarioaltera},  
                '${insertPedidoFornData.dataaltera}',  
                ${insertPedidoFornData.codprod}, 
                '${insertPedidoFornData.descricao}',  
                '${insertPedidoFornData.ean}',
                ${insertPedidoFornData.precoconsumidor},
                ${insertPedidoFornData.precofab},
                '${insertPedidoFornData.fabricante}',
                '${insertPedidoFornData.lista}',
                '${insertPedidoFornData.codicms}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { pedidoFornProd, statusInsert } }

};

const altera = async function ({ cnpjForn, ean }) {

    const fornecedor = await useDB({
        query: `select * from Cd_Fornecedor where cpfcnpj_Forn='${cnpjForn}' `
    });

    const pedidoForn = await useDB({
        query: `SELECT nome_forn FROM public.cd_pedido_forn_prod as d inner join cd_fornecedor as f on f.id_forn=d.fornecedor_fk  where  ean='${ean}'  and   cpfcnpj_forn='${cnpjForn}' `
    });

    return { code: 200, results: { fornecedor, pedidoForn } }

};

const pegarProd = async function ({ cnpjForn }) {

    const pedidoForn = await useDB({
        query: `select Cd_Pedido_Forn_Prod.* from Cd_Pedido_Forn_Prod, cd_fornecedor where cd_fornecedor.cpfcnpj_Forn ='${cnpjForn}' and Cd_Pedido_Forn_Prod.fornecedor_fk = cd_fornecedor.id_forn order by descricao asc `
    });

    return { code: 200, results: { pedidoForn } }

};

const pesquisar = async function ({ cnpjForn, campo, valor }) {

    const pedidoForn = await useDB({
        query: `select Cd_Pedido_Forn_Prod.* from Cd_Pedido_Forn_Prod, cd_fornecedor where cd_fornecedor.cpfcnpj_Forn ='${cnpjForn}' and upper(Cd_Pedido_Forn_Prod.${campo}) like '%${valor.toUpperCase()}%' and Cd_Pedido_Forn_Prod.fornecedor_fk = cd_fornecedor.id_forn order by Cd_Pedido_Forn_Prod.${campo} asc `
    });

    return { code: 200, results: { pedidoForn } }

};

const pegarConfig = async function ({ idLoja, idForn }) {

    const fornecedorConfig = await useDB({
        query: `SELECT * FROM Cd_Fornecedor_Config WHERE loja_Fk=${idLoja} AND fornecedor_Fk=${idForn}`
    });

    const forn = await useDB({
        query: `select * from Cd_Fornecedor where id_Forn=${idForn} `
    });

    return { code: 200, results: { fornecedorConfig, forn } }

};

const pegarconfignull = async function ({ idLoja, idForn }) {

    const fornConfig = await useDB({
        query: `SELECT * FROM Cd_Fornecedor_Config WHERE loja_Fk=${idLoja} AND fornecedor_Fk=${idForn}`
    });

    return { code: 200, results: { fornConfig } }

};

const salvar = async function ({ idLoja, insertPedidoDetData }) {

    let statusInsert;

    const idPedidoCab = await useDB({
        query: `select max(id)+1 as idc from cd_pedido_cab where loja_fk=${idLoja} `
    });

    const idPedidoDet = await useDB({
        query: `select max(id)+1 as idc from cd_pedido_det where loja_fk=${idLoja} `
    });

    const insertPedidoDet = await useDB({
        query: `INSERT INTO public.cd_pedido_det(
           id, 
           loja_fk, 
           usuarioaltera, 
           dataaltera, 
           pedido_fk, 
           produto_fk, 
           ean,  
           qtd, 
           preco, 
           unidade,
           total,
           status)    VALUES (
               ${idPedidoDet[0].idc}, 
               ${insertPedidoDetData.loja_fk}, 
               ${insertPedidoDetData.usuarioaltera}, 
               '${insertPedidoDetData.dataaltera}', 
               ${insertPedidoDetData.pedido_fk}, 
               ${insertPedidoDetData.produto_fk},    
               '${insertPedidoDetData.ean}', 
               ${insertPedidoDetData.qtd}, 
               ${insertPedidoDetData.preco}, 
               '${insertPedidoDetData.unidade}',
               ${insertPedidoDetData.total},
               'P');`

    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });


    return { code: 200, results: { idPedidoCab, idPedidoDet, statusInsert } }

};

const excluirpedido = async function ({ idPedido, idLoja }) {

    const deletePedidoDet = await useDB({
        query: `DELETE FROM public.cd_pedido_det WHERE pedido_fk=${idPedido} and loja_fk=${idLoja} `
    });

    const deletePedidoCab = await useDB({
        query: `DELETE FROM public.cd_pedido_cab WHERE id=${idPedido}  and loja_fk=${idLoja} `
    });

    return { code: 200, results: { deletePedidoDet, deletePedidoCab } }

};

const salvarpedidonobanco = async function ({ idLoja, insertPedidoCabData, insertPedidoDetData }) {

    let statusInsert, statusInsert2;

    const idPedidoCab = await useDB({
        query: `select max(id)+1 as idc from cd_pedido_cab where loja_fk=${idLoja} `
    });

    const insertPedidoCab = await useDB({
        query: `INSERT INTO public.cd_pedido_cab( 
            id, 
            loja_fk, 
            usuarioaltera, 
            dataaltera,
            data_pedido, 
            tipo_pag,  
            codigo_cliente, 
            tipo_compra, 
            pedido,   
            layout, 
            status,
            itens,
            unidades,
            total,
            fornecedor_fk)  VALUES (
                ${idPedidoCab[0].idc}, 
                ${insertPedidoCabData.loja_fk}, 
                ${insertPedidoCabData.usuarioaltera},  
                '${insertPedidoCabData.dataaltera}',  
                '${insertPedidoCabData.data_pedido}', 
                '${insertPedidoCabData.tipo_pag}',  
                '${insertPedidoCabData.codigo_cliente}', 
                '${insertPedidoCabData.tipo_compra}', 
                '${insertPedidoCabData.pedido}', 
                '${insertPedidoCabData.layout}',  
                '${insertPedidoCabData.status}',
                ${insertPedidoCabData.itens},
                ${insertPedidoCabData.unidades},
                ${insertPedidoCabData.total},
                ${insertPedidoCabData.fornecedor_fk} );`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const idPedidoDet = await useDB({
        query: `select max(id)+1 as idc from cd_pedido_det where loja_fk=${idLoja} `
    });

    const insertPedidoDet = await useDB({
        query: `INSERT INTO public.cd_pedido_det(
           id, 
           loja_fk, 
           usuarioaltera, 
           dataaltera, 
           pedido_fk, 
           produto_fk, 
           ean,  
           qtd, 
           preco, 
           unidade,
           total,
           status)    VALUES (
               ${idPedidoDet[0].idc}, 
               ${insertPedidoDetData.loja_fk}, 
               ${insertPedidoDetData.usuarioaltera}, 
               '${insertPedidoDetData.dataaltera}', 
               ${insertPedidoDetData.pedido_fk}, 
               ${insertPedidoDetData.produto_fk},    
               '${insertPedidoDetData.ean}', 
               ${insertPedidoDetData.qtd}, 
               ${insertPedidoDetData.preco}, 
               '${insertPedidoDetData.unidade}',
               ${insertPedidoDetData.total},
               'E');`

    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });

    return { code: 200, results: { idPedidoCab, statusInsert, idPedidoDet, statusInsert2 } }

};

const preencherListaBusca = async function ({ idLoja, idForn }) {

    const listaPedidoCab = await useDB({
        query: `select * from Cd_Pedido_Cab where loja_fk=${idLoja} order by id desc`
    });

    const forn = await useDB({
        query: `select * from Cd_Fornecedor where id_Forn=${idForn} `
    });

    return { code: 200, results: { listaPedidoCab, forn } }

};

const pesquisarPorColuna = async function ({ colunaBusca, textoBusca, idLoja, idForn }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Cd_Pedido_Cab WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase()}%' and loja_fk=${idLoja}  ORDER BY id desc`
    });

    const forn = await useDB({
        query: `select * from Cd_Fornecedor where id_Forn=${idForn} `
    });

    return { code: 200, results: { pesquisa, forn } }

};

const selecionarcab = async function ({ idCompraSugestao, idLoja, idProd, cnpjForn, ean }) {

    const compraSugesatoDet = await useDB({
        query: `select * from Cd_Compra_Sugestao_Det where compra_sugestao_fk=${idCompraSugestao} and  loja_Fk=${idLoja} `
    });

    const numCodBar = await useDB({
        query: `SELECT numero_codbar FROM public.cd_codigobarras where produto_fk=${idProd}  and ativo_codbar='S'`
    });

    const forn = await useDB({
        query: `SELECT nome_forn  FROM public.cd_pedido_forn_prod as d inner join cd_fornecedor as f on f.id_forn=d.fornecedor_fk  where  ean='${ean}'  and  cpfcnpj_forn='${cnpjForn}' `
    });

    return { code: 200, results: { compraSugesatoDet, numCodBar, forn } }

};


const selecionar = async function ({ idLoja, idPedido, cnpjForn, ean, idForn }) {

    const forn = await useDB({
        query: `select * from Cd_Fornecedor where id_Forn=${idForn} `
    });

    const pedidoDet = await useDB({
        query: `select Cd_Pedido_Det.* from Cd_Pedido_Det, cd_produto where loja_fk=${idLoja}  and pedido_fk=${idPedido} and Cd_Pedido_Det.produto_fk = cd_produto.id_prod  order by cd_produto.descricao_Prod asc`
    });

    const pedidoForn = await useDB({
        query: `SELECT nome_forn  FROM public.cd_pedido_forn_prod as d inner join cd_fornecedor as f on f.id_forn=d.fornecedor_fk  where  ean='${ean}'  and  cpfcnpj_forn='${cnpjForn}' `
    });

    return { code: 200, results: { pedidoDet, forn, pedidoForn } }

};

const consultarpedidosantacruz = async function ({ ean, idForn }) {

    const pedidoForn = await useDB({
        query: `select * from Cd_Pedido_Forn_Prod where ean='${ean}'  and fornecedor_Fk=${idForn} `
    });

    return { code: 200, results: { pedidoForn } }

};

const consultarpedidopanpharma = async function ({ ean, idForn }) {

    const pedidoForn = await useDB({
        query: `select * from Cd_Pedido_Forn_Prod where ean='${ean}'  and fornecedor_Fk=${idForn} `
    });

    return { code: 200, results: { pedidoForn } }

};

const consultarpedidopanarello = async function ({ ean, idForn }) {

    const pedidoForn = await useDB({
        query: `select * from Cd_Pedido_Forn_Prod where ean='${ean}'  and fornecedor_Fk=${idForn} `
    });

    return { code: 200, results: { pedidoForn } }

};

const consultarpedidocloseup = async function ({ ean, idForn }) {

    const pedidoForn = await useDB({
        query: `select * from Cd_Pedido_Forn_Prod where ean='${ean}'  and fornecedor_Fk=${idForn} `
    });

    return { code: 200, results: { pedidoForn } }

};

const consultarpedidofidelize = async function ({ ean, idForn }) {

    const pedidoForn = await useDB({
        query: `select * from Cd_Pedido_Forn_Prod where ean='${ean}'  and fornecedor_Fk=${idForn} `
    });

    return { code: 200, results: { pedidoForn } }

};

const consultarpedidopharmalink = async function ({ ean, idForn }) {

    const pedidoForn = await useDB({
        query: `select * from Cd_Pedido_Forn_Prod where ean='${ean}'  and fornecedor_Fk=${idForn} `
    });

    return { code: 200, results: { pedidoForn } }

};

const run = async function ({ cnpjForn, insertFornData, ean, insertPedidoFornData }) {

    let statusInsert, statusInsert2;

    const id_forn = await useDB({
        query: `select id_forn from cd_fornecedor where cpfcnpj_forn='${cnpjForn}' limit 1 `
    });

    const insertForn = await useDB({
        query: `INSERT INTO public.cd_fornecedor(	 
        nome_forn, 
        codibgepais_forn, 
        cpfcnpj_forn, 
        ie_forn, 
        codibgecidade, 
        endereco_forn, 
        numeroendereco_forn,  
        bairro_forn, 
        cep_forn,  
        tipoemp_forn, 
        uf_forn, 
        cidade_forn)	VALUES ('
        ${insertFornData.nomeForn}', 
        1058, 
        '${insertFornData.cpfcnpj_forn}', 
        '', 
        0, 
        '', 
        '', 
        '', 
        '', 
        'J', 
        '', 
        '');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const pedidoForn = await useDB({
        query:`select id from cd_pedido_forn_prod  where ean='${ean}'  and fornecedor_fk=(SELECT id_forn from cd_fornecedor where cpfcnpj_forn='${cnpjForn}' limit 1 ) limit 1 `
    });

    const insertPedidoForn = await useDB({
        query:`INSERT INTO public.cd_pedido_forn_prod(	 
            fornecedor_fk,  
            codprod, 
            estoque, 
            estoque_inter,  
            precofab,  
            precoconsumidor, 
            descricao, 
            lista, 
            generico, 
            ean,  
            qtdcaixa, 
            fabricante, 
            ncm)	VALUES (
                (SELECT id_forn from cd_fornecedor where cpfcnpj_forn='${cnpjForn}' limit 1 ),  
                ${insertPedidoFornData.codprod},  
                0, 
                0, 
                ${insertPedidoFornData.precofab}, 
                ${insertPedidoFornData.precoconsumidor}, 
                '${insertPedidoFornData.descricao}', 
                '${insertPedidoFornData.lista}', 
                '${insertPedidoFornData.generico}',   
                '${insertPedidoFornData.ean}', 
                ${insertPedidoFornData.qtdcaixa},  
                '${insertPedidoFornData.fabricante}',  
                '${insertPedidoFornData.ncm}');`
    }).then(() => {
        statusInsert2 = 'Registro  com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });

    return { code: 200, results: { id_forn, statusInsert, pedidoForn, statusInsert2 } }

};


module.exports = {
    recebetxt,
    altera,
    pegarProd,
    pesquisar,
    pegarConfig,
    pegarconfignull,
    salvar,
    excluirpedido,
    salvarpedidonobanco,
    preencherListaBusca,
    pesquisarPorColuna,
    selecionarcab,
    selecionar,
    consultarpedidosantacruz,
    consultarpedidopanpharma,
    consultarpedidopanarello,
    consultarpedidocloseup,
    consultarpedidofidelize,
    consultarpedidopharmalink,
    run
}