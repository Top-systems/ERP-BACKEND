const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const salvar = async function ({ idLoja }) {

    const idRede = await useDB({
        query: `SELECT max(id)+1 as idc FROM public.cd_rede where loja_fk=${idLoja} `
    });

    return { code: 200, results: { idRede } }

};

const pesquisarPorColuna = async function ({ colunaBusca, textoBusca }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Cd_Rede WHERE UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase()}%' ORDER BY ${colunaBusca} ASC`
    });

    return { code: 200, results: { pesquisa } }

};

const salvarusuario = async function ({ idLoja }) {

    const idRedeUsuario = await useDB({
        query: `SELECT max(id)+1 as idc FROM public.cd_rede_usuario where loja_fk=${idLoja} `
    });

    return { code: 200, results: { idRedeUsuario } }

};

const listarve = async function ({ idRede }) {

    const redeUsuarioVendedor = await useDB({
        query: ` select Cd_Rede_usuario.* from Cd_Rede_usuario, cd_rede where rede_fk=${idRede} and cd_Rede.programa='vendedor' order by nome asc`
    });

    const redeUsuarioFidelidade = await useDB({
        query: ` select Cd_Rede_usuario.* from Cd_Rede_usuario, cd_rede where rede_fk=${idRede} and cd_Rede.programa='fidelidade' order by nome asc`
    });

    return { code: 200, results: { redeUsuarioVendedor, redeUsuarioFidelidade } }

};

const listarprodutos = async function ({ idRede }) {

    const lista = await useDB({
        query: ` select  Cd_Rede_Produto.* from Cd_Rede_Produto, cd_rede where rede_fk=${idRede} and  cd_Rede.programa='vendedor' order by produto asc`
    });

    return { code: 200, results: { lista } }

};

const filtrarn = async function ({ idRede, campo, valor }) {

    const redeRegistro = await useDB({
        query: `select Cd_Rede_Registro.* from Cd_Rede_Registro, cd_rede where rede_fk=${idRede} and evento='nota' and upper(cast(${campo} as text)) like '%${valor.toUpperCase()}%' and cd_Rede.programa='vendedor' order by id desc`
    });

    return { code: 200, results: { redeRegistro } }

};

const filtrarv = async function ({ idRede, campo, valor }) {

    const redeRegistro = await useDB({
        query: `select Cd_Rede_Registro.* from Cd_Rede_Registro, cd_rede where rede_fk=${idRede} and evento='venda' and upper(cast(${campo} as text)) like '%${valor.toUpperCase()}%' and cd_Rede.programa='vendedor' order by id desc`
    });

    return { code: 200, results: { redeRegistro } }

};

const filtrarvd = async function ({ idRede, campo, valor }) {

    const redeRegistro = await useDB({
        query: `select Cd_Rede_Registro.* from Cd_Rede_Registro, cd_rede where rede_fk=${idRede} and evento='desconto' and upper(cast(${campo} as text)) like '%${valor.toUpperCase()}%' and cd_Rede.programa='vendedor' order by id desc`
    });

    return { code: 200, results: { redeRegistro } }

};

const filtrarvp = async function ({ idRede, campo, valor }) {

    const redeRegistro = await useDB({
        query: `select Cd_Rede_Registro.* from Cd_Rede_Registro, cd_rede where rede_fk=${idRede} and evento='premio' and upper(cast(${campo} as text)) like '%${valor.toUpperCase()}%' and cd_Rede.programa='vendedor' order by id desc`
    });

    return { code: 200, results: { redeRegistro } }

};

const listarregistros = async function ({ idRede }) {

    const redeRegistroFidelidade = await useDB({
        query: ` select Cd_Rede_Registro.* from Cd_Rede_Registro, cd_rede where rede_fk=${idRede} and evento='resgate' and cd_Rede.programa='fidelidade'  order by id desc`
    });

    const redeRegistroVendedor = await useDB({
        query: ` select Cd_Rede_Registro.* from Cd_Rede_Registro, cd_rede where rede_fk=${idRede} and evento='nota' and cd_Rede.programa='vendedor'  order by id desc`
    });

    const redeRegistroVendedorV = await useDB({
        query: ` select Cd_Rede_Registro.* from Cd_Rede_Registro, cd_rede where rede_fk=${idRede} and evento='venda' and cd_Rede.programa='vendedor'  order by id desc`
    });

    const redeRegistroFidelidadeD = await useDB({
        query: ` select Cd_Rede_Registro.* from Cd_Rede_Registro, cd_rede where rede_fk=${idRede} and evento='resgate' and cd_Rede.programa='fidelidade'  order by id desc`
    });

    const redeRegistroFidelidadeP = await useDB({
        query: ` select Cd_Rede_Registro.* from Cd_Rede_Registro, cd_rede where rede_fk=${idRede} and evento='premio' and cd_Rede.programa='fidelidade'  order by id desc`
    });

    return { code: 200, results: { redeRegistroVendedor, redeRegistroFidelidade, redeRegistroVendedorV, redeRegistroFidelidadeD, redeRegistroFidelidadeP } }

};

const listarlista = async function ({ idRede, idLoja, ean }) {

    const redeProduto = await useDB({
        query: `select * from Cd_Rede_Produto where rede_fk=${idRede} and loja_Fk=${idLoja} and ean='${ean}' `
    });

    const idRedeProduto = await useDB({
        query: `SELECT max(id)+1 as idc FROM public.cd_rede_produto where loja_fk=${idLoja} `
    });

    return { code: 200, results: { redeProduto, idRedeProduto } }

};

const consultar = async function ({ idLoja, insertRedeUsuarioData, cpf, idRede }) {

    let statusInsert

    const idRedeUsuario = await useDB({
        query: `SELECT max(id)+1 as idc  FROM public.cd_rede_usuario  where loja_fk=${idLoja}  `
    });

    const insertRedeUsuario = await useDB({
        query:`INSERT INTO public.cd_rede_usuario(  
            id, 
            nome,
            cpf,  
            rede_fk,
            loja_fk,
            cartao) VALUES (
                ${idRedeUsuario[0].idc}, 
                '${insertRedeUsuarioData.nome}', 
                '${insertRedeUsuarioData.cpf}', 
                ${insertRedeUsuarioData.rede_fk}, 
                ${insertRedeUsuarioData.loja_fk}, 
                '${insertRedeUsuarioData.cartao}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const redeUsuario = await useDB({
        query:`SELECT id  FROM public.cd_rede_usuario  where cpf='${cpf}' and rede_fk=${idRede} and loja_fk=${idLoja}  limit 1`
    });

    return { code: 200, results: { idRedeUsuario, statusInsert, redeUsuario } }

};


module.exports = {
    salvar,
    pesquisarPorColuna,
    salvarusuario,
    listarve,
    listarprodutos,
    filtrarn,
    filtrarv,
    filtrarvd,
    filtrarvp,
    listarregistros,
    listarlista,
    consultar
}