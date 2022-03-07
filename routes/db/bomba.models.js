const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const processarFiltro = async function ({ valor, filtro }) {

    const comecandoCom = await useDB({
        query: `SELECT * FROM cd_bomba WHERE ${filtro} like '${valor.toUpperCase()}%'`
    });

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_bomba WHERE ${filtro} LIKE '%${valor.toUpperCase()}%'`
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

const salvar = async function ({ idLoja }) {

    const bomba = await useDB({
        query: `SELECT * FROM Cd_Bomba WHERE loja_Fk=${idLoja} ORDER BY id_Bomba DESC`
    });

    return { code: 200, results: { bomba } }

};

const pesquisarPorColuna = async function ({ colunaBusca, textoBusca, idLoja }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Cd_Bomba WHERE UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase()}%'  and loja_Fk=${idLoja} ORDER BY ${colunaBusca} ASC`
    });

    return { code: 200, results: { pesquisa } }

};

const lacress = async function ({ idLoja, idBomba }) {

    const intervenBico = await useDB({
        query: `select Cd_Lmc_Interven_Bico.* from Cd_Lmc_Interven_Bico, cd_bico, cd_bomba where cd_bico.bomba_fk=${idBomba}  and cd_Lmc_Interven_Bico.loja_Fk=${idLoja} and cd_bico.loja_Fk=${idLoja} and cd_bomba.loja_Fk=${idLoja} and bico_Fk is not null  and LmcInterven_fk is not null and cd_lmc_interven_bico.bico_fk = cd_bico.id_bico  order by id_Lmc_Interven_Bico desc `
    });

    const intervenLacreA = await useDB({
        query: `select * from Cd_Lmc_Interven_Lacre where bomba_Fk=${idBomba}  and loja_Fk=${idLoja} and status_Lmcintervenlacre='A' and bomba_Fk is not null  and LmcInterven_fk is not null  order by id_Lmc_Interven_Lacre desc `
    });

    const intervenLacreR = await useDB({
        query: `select * from Cd_Lmc_Interven_Lacre where bomba_Fk=${idBomba}  and loja_Fk=${idLoja} and status_Lmcintervenlacre='R' and bomba_Fk is not null  and LmcInterven_fk is not null  order by id_Lmc_Interven_Lacre desc `
    });

    return { code: 200, results: { intervenBico, intervenLacreA, intervenLacreR } }

};

const limp = async function ({ idLoja, idBomba, idBico, dataMovimento }) {

    const bico = await useDB({
        query: `select * from Cd_Bico where loja_Fk=${idLoja} and bomba_Fk=${idBomba}  order by numero_Bic asc`
    });

    const lmcDet = await useDB({
        query: `SELECT encerrantefinal  FROM public.cd_lmcdet  where bico_fk=${idBico}   and lmccab_fk=(SELECT id_lmccab  FROM public.cd_lmccab  where loja_fk=${idLoja} and   cast(datamovimento_lmccab as date)='${dataMovimento}'   limit 1)   and loja_fk=${idLoja}  `
    });

    return { code: 200, results: { bico, lmcDet } }

};

const inserircab = async function ({ idLoja, insertLmcIntervenData, insertIntervenLacreData, idBomba, insertIntervenBicoData }) {

    let statusInsert, statusInsert2, statusInsert3;

    const idLmcInterven = await useDB({
        query: `SELECT max(id_lmc_interven)+1 as idc FROM public.cd_lmc_interven  where loja_fk=${idLoja} `
    });

    const insertLmcInterven = await useDB({
        query: `INSERT INTO public.cd_lmc_interven(
            id_lmc_interven, 
            loja_fk, 
            lmccab_fk, 
            numerointerven, 
            motivo,  
            nomeinterventor, 
            cpfinterventor, 
            cnpjinterventora, 
            datahora, 
            hash_lmcinterven, 
            usuarioaltera, 
            dataaltera) VALUES (
                ${idLmcInterven[0].idc}, 
                ${insertLmcIntervenData.loja_fk}, 
                ${insertLmcIntervenData.lmccab_fk}, 
                ${insertLmcIntervenData.numerointerven}, 
                '${insertLmcIntervenData.motivo}',  
                '${insertLmcIntervenData.nomeinterven}', 
                '${insertLmcIntervenData.cpfinterventor}',  
                '${insertLmcIntervenData.cnpjinterventora}',   
                '${insertLmcIntervenData.datahora}',  
                '', 
                ${insertLmcIntervenData.usuarioaltera}, 
                '${insertLmcIntervenData.dataaltera}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const idLmcIntervenLacre = await useDB({
        query: `SELECT max(id_lmc_interven_lacre)+1 as idc  FROM public.cd_lmc_interven_lacre   where loja_fk=${idLoja} `
    });

    const insertIntervenLacre = await useDB({
        query: `INSERT INTO public.cd_lmc_interven_lacre( 
            id_lmc_interven_lacre, 
            loja_fk, 
            bomba_fk, 
            lmcinterven_fk, 
            numerolacre, 
            lacreremovido, 
            status_lmcintervenlacre, 
            usuarioaltera, 
            dataaltera) VALUES (
                ${idLmcIntervenLacre[0].idc}, 
                ${insertIntervenLacreData.loja_fk}, 
                ${insertIntervenLacreData.bomba_fk}, 
                ${insertIntervenLacreData.lmcinterven_fk}, 
                '${insertIntervenLacreData.numerolacre}',  
                '', 
                '${insertIntervenLacreData.status_lmcintervenlacre}', 
                ${insertIntervenLacreData.usuarioaltera},  
                '${insertIntervenLacreData.dataaltera}');`
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });

    const bico = await useDB({
        query: `select * from Cd_Bico where bomba_Fk=${idBomba}  and loja_Fk=${idLoja} `
    });

    const idIntervenBico = await useDB({
        query: `SELECT max(id_lmc_interven_bico)+1 as idc  FROM public.cd_lmc_interven_bico   where loja_fk=${idLoja} `
    });

    const insertIntervenBico = await useDB({
        query: `INSERT INTO public.cd_lmc_interven_bico( 
            id_lmc_interven_bico, 
            loja_fk, 
            tipocombustivel_fk, 
            bico_fk, 
            lmcinterven_fk,  
            enc_antes, 
            enc_depois, 
            tanque, 
            usuarioaltera, 
            dataaltera) VALUES (
                ${idIntervenBico[0].idc}, 
                ${insertIntervenBicoData.loja_fk},  
                ${insertIntervenBicoData.tipocombustivel_fk},  
                ${insertIntervenBicoData.bico_fk}, 
                ${insertIntervenBicoData.lmcinterven_fk},  
                ${insertIntervenBicoData.enc_antes}, 
                ${insertIntervenBicoData.enc_depois}, 
                ${insertIntervenBicoData.tanque}, 
                ${insertIntervenBicoData.usuarioaltera}, 
                '${insertIntervenBicoData.dataaltera}');`
    }).then(() => {
        statusInsert3 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert3 = err.message;
    });

    return { code: 200, results: { idLmcInterven, statusInsert, idLmcIntervenLacre, statusInsert2, bico, idIntervenBico, statusInsert3 } }

};

const excluiri = async function ({ idLoja, idLmcInterven }) {

    const deleteIntervenLacre = await useDB({
        query: `delete from public.cd_lmc_interven_lacre  where loja_fk=${idLoja} and lmcinterven_fk=${idLmcInterven}`
    });

    const deleteIntervenBico = await useDB({
        query: `delete from public.cd_lmc_interven_bico  where loja_fk=${idLoja} and lmcinterven_fk=${idLmcInterven}`
    });

    const deleteInterven = await useDB({
        query: `delete from public.cd_lmc_interven where loja_fk=${idLoja} and id_lmc_interven=${idLmcInterven}`
    });

    return { code: 200, results: { deleteInterven, deleteIntervenBico, deleteIntervenLacre } }

};

const pegarbicos = async function ({ idBomba, idLoja }) {

    const bico = await useDB({
        query: `select * from Cd_Bico where bomba_Fk=${idBomba} and loja_Fk=${idLoja}  order by numero_Bic asc`
    });

    return { code: 200, results: { bico } }

};

const atualizabicos = async function ({ idBomba, idLoja, idBico, dataMovimento }) {

    const bico = await useDB({
        query: `select * from Cd_Bico where loja_Fk=${idLoja} and bomba_Fk=${idBomba}  order by numero_Bic asc`
    });

    const lmcDet = await useDB({
        query:`SELECT encerrantefinal  FROM public.cd_lmcdet  where bico_fk=${idBico}  and lmccab_fk=(SELECT id_lmccab  FROM public.cd_lmccab  where loja_fk=${idLoja} and   cast(datamovimento_lmccab as date)='${dataMovimento}'   limit 1)   and loja_fk=${idLoja}  `
    });

    return { code: 200, results: { bico, lmcDet } }

};

const editarl = async function({ idLmcInterven, idLoja }){ 

    const lmcIntervenBico = await useDB({ 
    query: `select * from Cd_Lmc_Interven_Bico  where lmcinterven_fk=${idLmcInterven}  and loja_Fk=${idLoja} `
 }); 

 const lmcIntervenLacreR = await useDB({
     query:`select * from Cd_Lmc_Interven_Lacre  where lmcinterven_fk=${idLmcInterven}  and loja_Fk=${idLoja}  and status_Lmcintervenlacre='R'`
 });

 const lmcIntervenLacreA = await useDB({
     query:`select * from Cd_Lmc_Interven_Lacre  where lmcinterven_fk=${idLmcInterven}  and loja_Fk=${idLoja}  and status_Lmcintervenlacre='A'`
 });

 return { code: 200, results: { lmcIntervenBico, lmcIntervenLacreA, lmcIntervenLacreR }}  
    
};

module.exports = {
    processarFiltro,
    salvar,
    pesquisarPorColuna,
    lacress,
    limp,
    inserircab,
    excluiri,
    pegarbicos,
    atualizabicos,
    editarl
}