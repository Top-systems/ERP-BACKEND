const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const processarFiltro = async function ({ valor, filtro }) {

    const comecandoCom = await useDB({
        query: `SELECT * FROM cd_Bico WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "")}%'`
    });

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_Bico WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "")}%'`
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
            StringBuilder sb = new StringBuilder("SELECT vo FROM CdBico vo");
     */

};

const salvar = async function ({ idLoja, loja_fk, bomba_fk, tanque_fk, numero_bic, codhexa_bic, tipo_preco, precovar_bic, ativo_bic, usuarioaltera, dataaltera, milhoes_encerrante, idBico }) {

    let statusInsert = "", statusUpdate = "";

    const id = await useDB({
        query: `select max(id_bico)+1 as idc from cd_bico where loja_fk=${idLoja}`
    });


    const insert = await useDB({
        query: `INSERT INTO public.cd_bico(
             id_bico, 
             loja_fk, 
             bomba_fk, 
             tanque_fk, 
             numero_bic, 
             codhexa_bic,   
             tipo_preco, 
             precovar_bic, 
             ativo_bic, 
             usuarioaltera, 
             dataaltera, 
             status_bico, 
             milhoes_encerrante)VALUES(
                 ${id[0].idc}, 
                 ${loja_fk},    
                 ${bomba_fk},  
                 ${tanque_fk},
                 ${numero_bic},  
                 '${codhexa_bic}',  
                 '${tipo_preco}',
                 ${precovar_bic}, 
                 '${ativo_bic}',  
                 ${usuarioaltera},
                 '${dataaltera}',   
                 'L', 
                 ${milhoes_encerrante})`
    }).then(() => {
        statusInsert = "Registro inserido com sucesso";
    }).catch((err) => {
        statusInsert = err.message;
    });

    const update = await useDB({
        query: `UPDATE public.cd_bico SET bomba_fk=${bomba_fk}, tanque_fk=${tanque_fk} where id_bico=${idBico} and loja_fk=${idLoja}`
    }).then(() => {
        statusUpdate = "Registro atualizado com sucesso"
    }).catch((err) => {
        statusUpdate = err.message;
    });

    return { code: 200, results: { id, statusInsert, statusUpdate } }

};

const codigos = async function ({ idBico, idLoja }) {

    const codBarra = await useDB({
        query: `select * from Codigobarras_Bico where bico_fk=${idBico} and loja_fk=${idLoja}`
    });

    return { code: 200, results: { codBarra } }

};

const pesquisarPorColuna = async function ({ colunaBusca, textoBusca, idLoja }) {

    const pesquisar = await useDB({
        query: `SELECT * FROM Cd_Bico WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\D", "")}%'  and loja_Fk=${idLoja} ORDER BY ${colunaBusca} ASC`
    });

    return { code: 200, results: { pesquisar } }

};

const adicionarcb = async function ({ codBar, idLoja, id, loja_fk, bico_fk, codigobarras }) {

    let statusInsert = "";
    
    const codBarras = await useDB({
        query: `select * from Cd_Codigobarras where numero_Codbar='${codBar}'`
    });

    const codBarrasBico = await useDB({
        query: `SELECT * FROM Codigobarras_Bico WHERE loja_Fk=${idLoja} ORDER BY id DESC`
    });

    const insert = await useDB({
        query: `INSERT INTO public.codigobarras_bico(
            id, 
            loja_fk, 
            bico_fk, 
            codigobarras) VALUES (
                ${id},  
                ${loja_fk}, 
                ${bico_fk},  
                '${codigobarras}')`
    }).then(() => {
        statusInsert = "Registro inserido com sucesso"
    }).catch((err) => {
        statusInsert = err.message;
    })

    return { code: 200, results: { codBarras, codBarrasBico, statusInsert } }

};

const pegarhist = async function({ idBico, idLoja }){ 

    const hist = await useDB({ 
        query: `select * from Es_Althist_Preco where bico_fk =${idBico} and loja_Fk=${idLoja} order by id desc`
    }); 

 return { code: 200, results: { hist }}  
    
};

const histpv = async function({ idLoja, loja_fk, bico_fk, precovenda, dataaltera, usuarioaltera }){ 

    let statusInsert = ""; 

    const id = await useDB({ 
        query: `select max(id)+1 as idc from es_althist_preco  where loja_fk=${idLoja}`
    }); 

    const insert = await useDB({ 
        query: `INSERT INTO public.es_althist_preco( 
            id, 
            loja_fk, 
            bico_fk, 
            precovenda, 
            dataaltera, 
            usuarioaltera,
            origem)VALUES (
                ${id[0].idc},
                ${loja_fk}, 
                ${bico_fk}, 
                ${precovenda}, 
                '${dataaltera}',  
                ${usuarioaltera}, 
                'cadastro bico');` 
    }).then((result) => {
        statusInsert = "Registro inserido com sucesso";
    }).catch((err) => {
        statusInsert = err.message;
    })

 return { code: 200, results: { id, statusInsert }}  
    
};

module.exports = {
    processarFiltro,
    salvar,
    codigos,
    pesquisarPorColuna,
    adicionarcb,
    pegarhist,
    histpv
}