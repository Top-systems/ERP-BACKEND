const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const selecionar = async function ({ idEncomendaCab, idLoja }) {

    const encomendaDet = await useDB({
        query: `select * from Vd_Encomendadet where encomendacab_fk=${idEncomendaCab} and loja_Fk=${idLoja} `
    });

    return { code: 200, results: { encomendaDet } }

};

const listarn = async function ({ idLoja }) {

    const encomendaCab = await useDB({
        query: `select * from Vd_Encomendacab where loja_Fk=${idLoja} order by id_Encomendacab desc`
    });

    return { code: 200, results: { encomendaCab } }

};

const lista = async function ({ inicio, fim, idLoja }) {

    /* String n = "";
    if (!tipo.equals("0")) {
        n = " and statusEncomenda='" + tipo + "' ";
    } */

    const encomendaCab = await useDB({
        query: `select * from Vd_Encomendacab where (cast(dataaltera as date) between '${inicio}' and '${fim}') and loja_Fk=${idLoja} `
    });

    return { code: 200, results: { encomendaCab } }

};

const salvar = async function({ idLoja, insertEncomendaCabData, insertEncomendaDetData }){ 

    let statusInsert, statusInsert2;

    const idEncomendaCab = await useDB({ 
        query: `select max(id_encomendacab)+1  as idc from vd_encomendacab where loja_fk=${idLoja} `
    }); 


    const insertEncomendaCab = await useDB({
        query:`INSERT INTO public.vd_encomendacab( 
            id_encomendacab, 
            loja_fk, 
            nome,
            endereco, 
            numero, 
            bairro, 
            telefone,  
            status_encomenda, 
            usuarioaltera, 
            dataaltera)  VALUES (
                ${idEncomendaCab[0].idc}, 
                ${insertEncomendaCabData.loja_fk}, 
                '${insertEncomendaCabData.nome}', 
                '${insertEncomendaCabData.endereco}', 
                '${insertEncomendaCabData.numero}', 
                '${insertEncomendaCabData.bairro}', 
                '${insertEncomendaCabData.telefone}',   
                '${insertEncomendaCabData.status_encomenda}', 
                ${insertEncomendaCabData.usuarioaltera}, 
                '${insertEncomendaCabData.dataaltera}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const idEncomendaDet = await useDB({ 
        query: `select max(id_encomendaDet)+1  as idc from vd_encomendaDet where loja_fk=${idLoja} `
    }); 

    const insertEncomendaDet = await useDB({
        query:`INSERT INTO public.vd_encomendadet(
            id_encomendadet, 
            loja_fk, 
            produto_fk, 
            encomendacab_fk, 
            quantidade,  
            usuarioaltera, 
            dataaltera) VALUES (
                ${idEncomendaDet[0].idc}, 
                ${insertEncomendaDetData.loja_fk}, 
                ${insertEncomendaDetData.produto_fk}, 
                ${insertEncomendaDetData.encomendacab_fk},  
                ${insertEncomendaDetData.quantidade},  
                ${insertEncomendaDetData.usuarioaltera}, 
                '${insertEncomendaDetData.dataaltera}')`
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });

 return { code: 200, results: { idEncomendaCab, statusInsert, idEncomendaDet, statusInsert2 }}  
    
};

module.exports = {
    selecionar,
    listarn,
    lista,
    salvar
}